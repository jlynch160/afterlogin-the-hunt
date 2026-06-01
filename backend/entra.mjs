/**
 * Afterlogin — Microsoft Entra (read-only) tenant connector
 * ---------------------------------------------------------------------------
 * OFF BY DEFAULT. Synthetic data is always the demo path. When configured, this
 * turns REAL risky / dormant / privileged accounts into graded "ghosts" using
 * the same scoring model as the synthetic dataset — so the agents reason over a
 * live tenant instead of fixtures.
 *
 *   Configure (an app registration with READ-ONLY application permissions):
 *     ENTRA_TENANT_ID        directory (tenant) id
 *     ENTRA_CLIENT_ID        application (client) id
 *     ENTRA_CLIENT_SECRET    client secret
 *
 *   Recommended read-only app permissions (admin-consented):
 *     Directory.Read.All · AuditLog.Read.All · IdentityRiskyUser.Read.All
 *     RoleManagement.Read.Directory · (optional) Reports.Read.All
 *
 * The connector degrades gracefully: if a call needs a license/permission you
 * don't have (e.g. signInActivity or riskyUsers need Entra ID P1/P2), it skips
 * that signal and still grades what it can.
 *
 * ⚠ Real tenant data may contain PII. Never commit secrets. Do NOT put real
 *   account data in a public hackathon submission — use ?redact=1, or your own
 *   test tenant. Synthetic remains the default and the thing you demo.
 */
const TENANT = process.env.ENTRA_TENANT_ID;
const CID    = process.env.ENTRA_CLIENT_ID;
const SECRET = process.env.ENTRA_CLIENT_SECRET;
const GRAPH  = 'https://graph.microsoft.com/v1.0';

export function isConfigured() { return !!(TENANT && CID && SECRET); }

let _tok = null, _exp = 0;
async function token() {
  if (_tok && Date.now() < _exp) return _tok;
  const body = new URLSearchParams({ client_id: CID, client_secret: SECRET,
    grant_type: 'client_credentials', scope: 'https://graph.microsoft.com/.default' });
  const r = await fetch(`https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`,
    { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
  if (!r.ok) throw new Error(`Entra token ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  _tok = j.access_token; _exp = Date.now() + (j.expires_in - 120) * 1000;
  return _tok;
}
async function graph(path) {
  const t = await token();
  const r = await fetch(GRAPH + path, { headers: { authorization: 'Bearer ' + t, 'content-type': 'application/json' } });
  if (!r.ok) throw new Error(`Graph ${path} ${r.status}: ${(await r.text()).slice(0, 160)}`);
  return r.json();
}
const safeGraph = async (p) => { try { return await graph(p); } catch { return null; } };

const daysSince = (ts) => ts ? Math.floor((Date.now() - Date.parse(ts)) / 86400000) : null;

/* ---- scoring (real clock) — mirrors the synthetic engine in server.mjs ---- */
function gradeRec(r) {
  const dorm = daysSince(r.lastInteractiveSignIn);
  const priv = (r.assignedRoles || []).length > 0;
  const lb = (r.runbookReferences || []).length > 0 || (r.oauth2Grants || []).length > 0;
  let sc = 0;
  if (priv) sc += 45;
  if (dorm == null) sc += 20; else if (dorm > 365) sc += 35; else if (dorm > 180) sc += 20; else if (dorm > 90) sc += 10;
  if (!r.mfaRegistered && r.accountType !== 'servicePrincipal') sc += 15;
  if (r.riskLevel === 'high') sc += 15; else if (r.riskLevel === 'medium') sc += 8;
  if (r.accountEnabled && !lb && dorm != null && dorm > 180) sc += 10;
  const g = sc >= 75 ? 'F' : sc >= 55 ? 'D' : sc >= 35 ? 'C' : sc >= 18 ? 'B' : 'A';
  return { grade: g, score: sc, dormantDays: dorm, privileged: priv, loadBearing: lb };
}
function bindingsRec(r) {
  const b = [];
  (r.runbookReferences || []).forEach(x => b.push({ label: `invoked by ${x}`, live: true }));
  if (r.lastNonInteractiveSignIn && daysSince(r.lastNonInteractiveSignIn) < 7) b.push({ label: 'non-interactive token refresh < 7d', live: true });
  (r.oauth2Grants || []).forEach(g => b.push({ label: `OAuth grant: ${g}`, live: true }));
  if (!b.length) b.push({ label: 'no resolvable bindings', live: false });
  return b;
}
function recommendRec(m, r) {
  if (!m.loadBearing && (m.grade === 'F' || m.grade === 'D' || m.grade === 'C')) return 'rest';
  if (m.loadBearing && m.privileged) return 'bind';
  if (r.ground_truth === 'active') return 'ack';
  return 'bind';
}
function enrichRec(r) {
  const m = gradeRec(r);
  return {
    id: r.id, upn: r.userPrincipalName, displayName: r.displayName, type: r.accountType,
    enabled: r.accountEnabled, risk: r.riskLevel, mfa: r.mfaRegistered,
    roles: r.assignedRoles, groups: r.memberOf, owner: r.owner, ownerStatus: r.ownerStatus,
    lastInteractiveSignIn: r.lastInteractiveSignIn, lastNonInteractiveSignIn: r.lastNonInteractiveSignIn,
    haunting: m, bindings: bindingsRec(r), recommendedRite: recommendRec(m, r),
    truly: m.loadBearing ? 'load-bearing (do NOT deprovision)' : 'orphaned (safe to lay to rest)',
    live: true,
  };
}

/**
 * Pull the most "haunted" identities from the tenant, graded and ready to use.
 * @returns {Promise<{configured:boolean, tenant?:string, count?:number, identities?:Array}>}
 */
export async function fetchTenant(limit = 14) {
  if (!isConfigured()) return { configured: false };

  // 1) users + sign-in activity (signInActivity needs Entra ID P1 + AuditLog.Read.All)
  let users = [];
  const u = await safeGraph('/users?$top=200&$select=id,displayName,userPrincipalName,accountEnabled,createdDateTime,userType,signInActivity');
  if (u && u.value) users = u.value;
  else { const u2 = await safeGraph('/users?$top=200&$select=id,displayName,userPrincipalName,accountEnabled,createdDateTime,userType'); if (u2 && u2.value) users = u2.value; }

  // 2) risky users (Entra ID P2) → id → riskLevel
  const risk = {};
  const ru = await safeGraph('/identityProtection/riskyUsers?$top=200&$select=id,riskLevel,riskState');
  if (ru && ru.value) ru.value.forEach(x => { risk[x.id] = x.riskLevel; });

  // 3) privileged role members → id → [role names]
  const roles = {};
  const dr = await safeGraph('/directoryRoles?$expand=members');
  if (dr && dr.value) dr.value.forEach(role => (role.members || []).forEach(m => { (roles[m.id] = roles[m.id] || []).push(role.displayName); }));

  // 4) MFA registration report (Reports.Read.All) → id → bool
  const mfa = {}; let mfaFetched = false;
  const mr = await safeGraph('/reports/authenticationMethods/userRegistrationDetails?$top=200&$select=id,isMfaRegistered');
  if (mr && mr.value) { mfaFetched = true; mr.value.forEach(x => { mfa[x.id] = !!x.isMfaRegistered; }); }

  // map → synthetic-shaped records, then grade
  const recs = users.map(x => {
    const si = x.signInActivity || {};
    const lastI = si.lastSignInDateTime || null, lastN = si.lastNonInteractiveSignInDateTime || null;
    const priv = (roles[x.id] || []).length > 0;
    const dorm = daysSince(lastI);
    const gt = (dorm != null && dorm < 30 && !priv) ? 'active' : 'orphaned';
    return {
      id: x.id, displayName: x.displayName, userPrincipalName: x.userPrincipalName,
      accountType: x.userType === 'Guest' ? 'guest' : 'member', accountEnabled: x.accountEnabled !== false,
      riskLevel: risk[x.id] || 'low', mfaRegistered: mfaFetched ? (mfa[x.id] !== false) : true,
      assignedRoles: roles[x.id] || [], memberOf: [], lastInteractiveSignIn: lastI, lastNonInteractiveSignIn: lastN,
      createdDateTime: x.createdDateTime, owner: '—', ownerStatus: gt === 'active' ? 'active' : 'unknown',
      runbookReferences: [], oauth2Grants: [], ground_truth: gt,
    };
  });

  const graded = recs.map(enrichRec).sort((a, b) => b.haunting.score - a.haunting.score);
  return { configured: true, tenant: TENANT, count: graded.length, identities: graded.slice(0, limit) };
}

/** Mask UPN / display name for safe, PII-free demos (deterministic per account). */
export function redact(idn) {
  const h = String(idn.id || idn.upn || '').replace(/[^a-z0-9]/gi, '').slice(-6) || '000000';
  return { ...idn, upn: `user-${h}@redacted.onmicrosoft.com`, displayName: `Account ${h}` };
}
