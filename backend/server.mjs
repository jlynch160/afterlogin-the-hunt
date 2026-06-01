#!/usr/bin/env node
/**
 * Afterlogin — backend REST API + risk-scoring engine
 * ---------------------------------------------------------------------------
 * Zero-dependency Node HTTP server over the synthetic Entra-style dataset in
 * ../data/identities.json. It derives a "haunting grade" from real identity
 * signals (privilege, dormancy, live bindings, risk) the same way a real IGA
 * triage tool would, exposes a threat feed, and accepts judgment posts.
 *
 *   Run:  node backend/server.mjs        (listens on http://localhost:8787)
 *   The browser game and the MCP server share this exact scoring model.
 *
 * Synthetic data only. No PII. For demonstration / hackathon use.
 */
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { isConfigured as foundryReady, groundQuery } from './foundry-iq.mjs';
import { isConfigured as entraReady, fetchTenant, redact } from './entra.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(readFileSync(join(__dir, '..', 'data', 'identities.json'), 'utf8'));
const PORT = process.env.PORT || 8787;

/* ----------------------------- scoring engine ---------------------------- */
const PRIV = ['Domain Admins', 'Global Administrator', 'Directory.ReadWrite.All', 'Backup Operators', 'Privileged Role Administrator'];
const DAY = 86400000;
const NOW = Date.parse('2026-05-30T14:00:00Z'); // fixed clock for deterministic synthetic scoring

function daysSince(ts) { return ts ? Math.floor((NOW - Date.parse(ts)) / DAY) : Infinity; }
function isPrivileged(idn) { return (idn.assignedRoles || []).some(r => PRIV.includes(r)); }

// load-bearing = still feeds a living process (recent app-only auth, runbook refs, or active oauth)
function bindings(idn) {
  const b = [];
  (idn.runbookReferences || []).forEach(r => b.push({ label: `invoked by ${r}`, live: true }));
  if (idn.lastNonInteractiveSignIn && daysSince(idn.lastNonInteractiveSignIn) < 7)
    b.push({ label: 'non-interactive token refresh < 7d', live: true });
  if (idn.conditionalAccess) b.push({ label: `governed by ${idn.conditionalAccess}`, live: true });
  (idn.oauth2Grants || []).forEach(g => b.push({ label: `OAuth grant: ${g}`, live: idn.ground_truth !== 'orphaned' }));
  (idn.memberOf || []).filter(g => /retired|empty|operators/i.test(g) && idn.ground_truth === 'orphaned')
    .forEach(g => b.push({ label: `group ${g} (stale)`, live: false }));
  if (!b.length) b.push({ label: 'no resolvable bindings', live: false });
  return b;
}
function loadBearing(idn) { return bindings(idn).some(x => x.live); }

function grade(idn) {
  const dormant = daysSince(idn.lastInteractiveSignIn);
  const priv = isPrivileged(idn);
  const lb = loadBearing(idn);
  let score = 0;
  if (priv) score += 45;                    // privilege = blast radius
  if (dormant > 365) score += 35; else if (dormant > 180) score += 20; else if (dormant > 90) score += 10;
  if (!idn.mfaRegistered && idn.accountType !== 'servicePrincipal') score += 15;
  if (idn.riskLevel === 'high') score += 15; else if (idn.riskLevel === 'medium') score += 8;
  if (idn.accountEnabled && !lb && dormant > 180) score += 10; // enabled, dead, dormant = pure liability
  const g = score >= 75 ? 'F' : score >= 55 ? 'D' : score >= 35 ? 'C' : score >= 18 ? 'B' : 'A';
  return { grade: g, score, dormantDays: dormant === Infinity ? null : dormant, privileged: priv, loadBearing: lb };
}

// recommended rite: the auditable, least-destructive correct action
function recommend(idn) {
  const m = grade(idn);
  if (!m.loadBearing && (m.grade === 'F' || m.grade === 'D' || m.grade === 'C')) return 'rest';
  if (m.loadBearing && m.privileged) return 'bind';
  if (idn.ground_truth === 'active') return 'ack';
  return 'bind';
}

function enrich(idn) {
  const m = grade(idn);
  return {
    id: idn.id, upn: idn.userPrincipalName, displayName: idn.displayName, type: idn.accountType,
    enabled: idn.accountEnabled, risk: idn.riskLevel, mfa: idn.mfaRegistered,
    roles: idn.assignedRoles, groups: idn.memberOf, owner: idn.owner, ownerStatus: idn.ownerStatus,
    lastInteractiveSignIn: idn.lastInteractiveSignIn, lastNonInteractiveSignIn: idn.lastNonInteractiveSignIn,
    haunting: m, bindings: bindings(idn), recommendedRite: recommend(idn),
    truly: m.loadBearing ? 'load-bearing (do NOT deprovision)' : 'orphaned (safe to lay to rest)',
    threat: idn.threatProfile || null,
  };
}

/* ----------------------------- in-memory ledger -------------------------- */
const PTS = { F: 40, D: 30, C: 20, B: 12, A: 8 };
let ledger = 0; const judgments = [];
function judge(id, rite) {
  const idn = DATA.identities.find(i => i.id === id || i.userPrincipalName === id);
  if (!idn) return { error: 'identity not found' };
  const m = grade(idn); const lb = m.loadBearing;
  let delta = 0, outcome = '';
  if (rite === 'rest') {
    if (!lb) { delta = PTS[m.grade]; outcome = `Laid to rest — truly orphaned account removed (+${delta}).`; }
    else { delta = -60; outcome = `POLTERGEIST — ${idn.userPrincipalName} was load-bearing; you broke a live process (-60).`; }
  } else if (rite === 'bind') { delta = lb ? 18 : 12; outcome = `Bound & watched — disabled and monitored (+${delta}).`; }
  else if (rite === 'ack') {
    if (!lb && (m.grade === 'F' || m.grade === 'D')) { delta = -20; outcome = `Acknowledged a corpse — breach left as bait (-20).`; }
    else { delta = 12; outcome = `Acknowledged the living — owner documented (+${delta}).`; }
  } else return { error: 'rite must be rest | bind | ack' };
  ledger += delta; judgments.push({ id: idn.id, rite, delta, at: outcome });
  return { ok: true, rite, delta, ledger, outcome, recommendedRite: recommend(idn) };
}

/* --------------------- real LLM reasoning (the Warden) ------------------- */
// Server-side so API keys never touch the browser and there is no CORS to fight.
// Configure ONE of: Azure OpenAI · GitHub Models · OpenAI-compatible (env vars below).
function llmProvider() {
  if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) return 'azure-openai';
  if (process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN) return 'github-models';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}
const WARDEN_SYS = 'You are the Warden, an L2 identity-governance agent triaging a forgotten account. ' +
  'Choose the SAFE, least-destructive action: "rest" (deprovision — ONLY if truly dead with no live bindings), ' +
  '"bind" (disable + monitor — if load-bearing or high-privilege), or "ack" (it is a living, least-privilege resident). ' +
  'Reply with ONLY JSON: {"rite":"rest|bind|ack","why":"<=180 chars rationale","conf":0-100}.';
async function reasonLLM(sig) {
  const provider = llmProvider();
  if (!provider) return { configured: false };
  const usr = `Account ${sig.label} (${sig.kind}, grade ${sig.grade}). Last interactive sign-in: ${sig.last}. ` +
    `MFA: ${sig.mfa}. Bindings: ${(sig.bindings || []).join('; ') || 'none'}. Evidence: ${(sig.evidence || []).join('; ') || 'none'}.`;
  const messages = [{ role: 'system', content: WARDEN_SYS }, { role: 'user', content: usr }];
  let url, headers = { 'content-type': 'application/json' }, model, jsonMode = true;
  if (provider === 'azure-openai') {
    model = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
    const ver = process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview';
    url = process.env.AZURE_OPENAI_ENDPOINT.replace(/\/$/, '') + `/openai/deployments/${model}/chat/completions?api-version=${ver}`;
    headers['api-key'] = process.env.AZURE_OPENAI_KEY;
  } else if (provider === 'github-models') {
    model = process.env.GITHUB_MODELS_MODEL || 'gpt-4o';
    url = (process.env.GITHUB_MODELS_ENDPOINT || 'https://models.inference.ai.azure.com') + '/chat/completions';
    headers['authorization'] = 'Bearer ' + (process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN);
    jsonMode = false; // GitHub Models doesn't always honor response_format
  } else {
    model = process.env.OPENAI_MODEL || 'gpt-4o';
    url = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions';
    headers['authorization'] = 'Bearer ' + process.env.OPENAI_API_KEY;
  }
  const body = { model, messages, temperature: 0.2, max_tokens: 220 };
  if (jsonMode) body.response_format = { type: 'json_object' };
  const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!r.ok) return { error: `model HTTP ${r.status}`, source: provider, configured: true };
  const j = await r.json();
  const txt = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
  const m = txt.match(/\{[\s\S]*\}/);
  if (!m) return { error: 'model returned no JSON', source: provider, configured: true };
  const o = JSON.parse(m[0]);
  if (!o.rite) return { error: 'no rite in response', source: provider, configured: true };
  return { rite: o.rite, why: o.why, conf: o.conf, model, source: provider };
}

/* ----------------------------- HTTP routing ------------------------------ */
const json = (res, code, body) => {
  res.writeHead(code, { 'content-type': 'application/json', 'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type' });
  res.end(JSON.stringify(body, null, 2));
};

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname;
  if (req.method === 'OPTIONS') return json(res, 204, {});

  if (p === '/api/health') return json(res, 200, { ok: true, tenant: DATA.tenant, identities: DATA.identities.length, foundryIQ: foundryReady(), llm: llmProvider(), entra: entraReady() });

  // Read-only LIVE Entra tenant → graded ghosts (OFF by default; synthetic is the demo path).
  // ?limit=N caps results · ?redact=1 masks UPN/displayName for PII-safe demos.
  if (p === '/api/tenant') {
    if (!entraReady()) return json(res, 200, { configured: false,
      note: 'Set ENTRA_TENANT_ID / ENTRA_CLIENT_ID / ENTRA_CLIENT_SECRET (a read-only app registration) to haunt a real tenant. Synthetic data is the default and what you demo.' });
    const limit = Math.max(1, Math.min(40, parseInt(url.searchParams.get('limit') || '14', 10)));
    const doRedact = url.searchParams.get('redact') === '1';
    fetchTenant(limit)
      .then(t => json(res, 200, doRedact && t.identities ? { ...t, identities: t.identities.map(redact) } : t))
      .catch(e => json(res, 502, { error: String(e.message) }));
    return;
  }

  // Real LLM reasoning for the Warden agent (keys stay here, server-side)
  if (p === '/api/reason' && req.method === 'POST') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => {
      let sig; try { sig = JSON.parse(body || '{}'); } catch (e) { return json(res, 400, { error: 'bad json' }); }
      reasonLLM(sig).then(r => json(res, r.error ? 502 : 200, r)).catch(e => json(res, 502, { error: String(e.message), configured: true }));
    });
    return;
  }

  // Genuine Foundry IQ grounded retrieval (falls back to baked evidence when unconfigured)
  if (p === '/api/ground') {
    const q = url.searchParams.get('q') || '';
    if (!foundryReady()) return json(res, 200, { grounded: false, fallback: true,
      note: 'Foundry IQ not configured — set FOUNDRY_SEARCH_ENDPOINT / FOUNDRY_SEARCH_KEY / FOUNDRY_SEARCH_INDEX to enable real grounded retrieval.' });
    groundQuery(q).then(r => json(res, 200, r)).catch(e => json(res, 502, { error: String(e.message) }));
    return;
  }

  if (p === '/api/identities') return json(res, 200, { tenant: DATA.tenant, count: DATA.identities.length, identities: DATA.identities.map(enrich) });

  if (p.startsWith('/api/identities/')) {
    const id = decodeURIComponent(p.split('/').pop());
    const idn = DATA.identities.find(i => i.id === id || i.userPrincipalName === id);
    return idn ? json(res, 200, enrich(idn)) : json(res, 404, { error: 'not found' });
  }

  if (p === '/api/threats') {
    const threats = DATA.identities.filter(i => i.threatProfile).map(i => ({
      identity: i.userPrincipalName, ...i.threatProfile, riskLevel: i.riskLevel,
    }));
    return json(res, 200, { count: threats.length, threats });
  }

  if (p === '/api/ledger') return json(res, 200, { ledger, judgments });

  if (p === '/api/judge' && req.method === 'POST') {
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => { try { const { id, rite } = JSON.parse(body || '{}'); json(res, 200, judge(id, rite)); }
      catch (e) { json(res, 400, { error: 'bad json' }); } });
    return;
  }

  json(res, 404, { error: 'route not found', routes: [
    'GET /api/health', 'GET /api/identities', 'GET /api/identities/:id',
    'GET /api/threats', 'GET /api/ledger', 'POST /api/judge {id,rite}'] });
});

server.listen(PORT, () => {
  console.log(`🕯️  Afterlogin backend — http://localhost:${PORT}`);
  console.log(`   tenant ${DATA.tenant} · ${DATA.identities.length} synthetic identities scored`);
  console.log(`   GET /api/identities · GET /api/threats · POST /api/judge {id,rite}`);
});
