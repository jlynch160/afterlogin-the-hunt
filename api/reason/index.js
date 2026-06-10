/**
 * Afterlogin — POST /api/reason  (REAL multi-agent, tool-calling council)
 * ---------------------------------------------------------------------------
 * Two autonomous agents (Warden, Skeptic) investigate a forgotten account by
 * CALLING TOOLS over a synthetic identity store, debate, then a Council agent
 * synthesises a cited advisory. The human still decides — agents never name the
 * final verdict. Returns {warden, skeptic, council, confidence, citations, trace}.
 *
 * Configure ONE provider via SWA app settings (else -> {configured:false}, game
 * falls back to its scripted council):
 *   GitHub Models : GITHUB_MODELS_TOKEN (free; GITHUB_MODELS_MODEL default gpt-4o)
 *   Azure OpenAI  : AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_KEY (+ AZURE_OPENAI_DEPLOYMENT)
 *   OpenAI        : OPENAI_API_KEY (+ OPENAI_MODEL)
 */

// ── synthetic identity store the agents read through TOOLS (no real PII) ──
const STORE = {
  'svc-billing-reconcile': {
    grade: 'F', kind: 'service account',
    signin: { lastInteractive: '412 days ago', lastTokenRefresh: '3 hours ago (non-interactive)', mfa: 'not enforced' },
    dependencies: [{ name: 'nightly AP-Close job (runbook AP-Close.ps1:88)', status: 'LIVE' }, { name: 'delegated rights from adm-breakglass', status: 'inactive' }],
    oauthGrants: [], groups: ['Finance-Service-Accounts'],
    source: 'Entra sign-in logs · Purview runbook index · CMDB'
  },
  'svc-etl-nightly': {
    grade: 'F', kind: 'service account',
    signin: { lastInteractive: '377 days ago', lastTokenRefresh: '1 hour ago (app-only)', mfa: 'not enforced' },
    dependencies: [{ name: 'nightly ETL into the warehouse (ETL-Nightly.ps1)', status: 'LIVE' }, { name: 'created by adm-estate-steward', status: 'inactive' }],
    oauthGrants: [], groups: ['Data-Service-Accounts'],
    source: 'Entra sign-in logs · Data Factory pipeline registry'
  },
  'adm-legacy-backup': {
    grade: 'F', kind: 'privileged admin',
    signin: { lastInteractive: '511 days ago', lastTokenRefresh: 'none', mfa: 'not enforced' },
    dependencies: [{ name: 'tape-backup service (decommissioned 2022)', status: 'inactive' }, { name: 'group: Backup-Operators (empty)', status: 'inactive' }],
    oauthGrants: [], groups: ['Domain Admins', 'Backup-Operators'],
    source: 'Entra roles · CMDB decommission record'
  },
  'adm-breakglass-02': {
    grade: 'D', kind: 'privileged admin',
    signin: { lastInteractive: '88 days ago', lastTokenRefresh: 'n/a', mfa: 'FIDO2 (phishing-resistant)' },
    dependencies: [{ name: 'emergency Global Admin (break-glass, governed)', status: 'LIVE (by design)' }],
    oauthGrants: [], groups: ['Global Administrators (break-glass)'],
    governance: 'Governed by break-glass policy; attested last quarter; excluded from the MFA campaign by design.',
    source: 'Entra PIM · break-glass policy · access review'
  },
  'adm-estate-steward': {
    grade: 'F', kind: 'privileged admin (the master key)',
    signin: { lastInteractive: '604 days ago', lastTokenRefresh: 'none', mfa: 'never enforced' },
    dependencies: [{ name: 'created svc-etl-nightly and other service identities', status: 'historical' }],
    oauthGrants: [], groups: ['Global Administrators'],
    source: 'Entra roles · Tier-0 privileged audit'
  },
  'app-orchard-connector': {
    grade: 'D', kind: 'third-party enterprise app',
    signin: { lastInteractive: 'n/a (app)', lastTokenRefresh: 'active', mfa: 'n/a' },
    dependencies: [], groups: [],
    oauthGrants: [{ scope: 'Mail.Read.All + offline_access', consent: 'tenant-wide, admin-consented', status: 'LIVE' }],
    source: 'Enterprise apps · OAuth consent audit'
  },
  'usr-j.okafor': {
    grade: 'B', kind: 'member',
    signin: { lastInteractive: '2 hours ago', lastTokenRefresh: 'active', mfa: 'registered' },
    dependencies: [{ name: 'owns Q3-Close workbook', status: 'LIVE' }, { name: 'shares AP mailbox with usr-m.santos', status: 'LIVE' }],
    oauthGrants: [], groups: ['Finance-Readers'],
    source: 'Entra sign-in logs · access package'
  },
  'usr-m.santos': {
    grade: 'A', kind: 'member',
    signin: { lastInteractive: '11 minutes ago', lastTokenRefresh: 'active', mfa: 'registered' },
    dependencies: [], oauthGrants: [], groups: ['Records-Team'],
    source: 'Entra sign-in logs'
  }
};

// build a record from the request payload when an account isn't in the store
function recordFor(sig) {
  if (sig && sig.label && STORE[sig.label]) return STORE[sig.label];
  const binds = (sig && sig.bindings) || [];
  return {
    grade: (sig && sig.grade) || '?', kind: (sig && sig.kind) || 'account',
    signin: { lastInteractive: (sig && sig.last) || 'unknown', lastTokenRefresh: 'unknown', mfa: 'unknown' },
    dependencies: binds.map(b => ({ name: String(b).replace(/\s*\(LIVE\)\s*$/i, ''), status: /LIVE/i.test(String(b)) ? 'LIVE' : 'inactive' })),
    oauthGrants: [], groups: [],
    source: 'Cited evidence (Foundry IQ)'
  };
}

// ── the tools the agents can call ──
const TOOLS = [
  { type: 'function', function: { name: 'get_signin_activity', description: 'Last interactive sign-in, last token refresh, and MFA status for the account.', parameters: { type: 'object', properties: {}, required: [] } } },
  { type: 'function', function: { name: 'get_dependencies', description: 'What still depends on the account: its bindings and whether each is LIVE or inactive.', parameters: { type: 'object', properties: {}, required: [] } } },
  { type: 'function', function: { name: 'get_oauth_grants', description: 'OAuth app consents/grants tied to the account (scope, consent, status).', parameters: { type: 'object', properties: {}, required: [] } } },
  { type: 'function', function: { name: 'get_group_memberships', description: 'Directory groups and privileged roles the account holds.', parameters: { type: 'object', properties: {}, required: [] } } }
];
function runTool(name, rec) {
  const cite = rec.source || 'identity signals';
  if (name === 'get_signin_activity') return Object.assign({}, rec.signin, { source: cite });
  if (name === 'get_dependencies') return { bindings: rec.dependencies, liveCount: rec.dependencies.filter(d => /LIVE/i.test(d.status)).length, source: cite };
  if (name === 'get_oauth_grants') return { grants: rec.oauthGrants, source: cite };
  if (name === 'get_group_memberships') return { groups: rec.groups, governance: rec.governance, source: cite };
  return { error: 'unknown tool' };
}

function provider() {
  if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) return 'azure-openai';
  if (process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN) return 'github-models';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}
function endpoint(prov) {
  let url, headers = { 'content-type': 'application/json' }, model;
  if (prov === 'azure-openai') {
    model = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
    const ver = process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview';
    url = process.env.AZURE_OPENAI_ENDPOINT.replace(/\/$/, '') + `/openai/deployments/${model}/chat/completions?api-version=${ver}`;
    headers['api-key'] = process.env.AZURE_OPENAI_KEY;
  } else if (prov === 'github-models') {
    model = process.env.GITHUB_MODELS_MODEL || 'gpt-4o';
    url = (process.env.GITHUB_MODELS_ENDPOINT || 'https://models.inference.ai.azure.com') + '/chat/completions';
    headers['authorization'] = 'Bearer ' + (process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN);
  } else {
    model = process.env.OPENAI_MODEL || 'gpt-4o';
    url = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions';
    headers['authorization'] = 'Bearer ' + process.env.OPENAI_API_KEY;
  }
  return { url, headers, model };
}
async function chat(ep, messages, useTools) {
  const body = { model: ep.model, messages: messages, temperature: 0.4, max_tokens: 400 };
  if (useTools) { body.tools = TOOLS; body.tool_choice = 'auto'; }
  const r = await fetch(ep.url, { method: 'POST', headers: ep.headers, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('model HTTP ' + r.status);
  const j = await r.json();
  return j.choices[0].message;
}

// one tool-using agent: loops call -> run tools -> call again until it answers (max 4 turns)
async function runAgent(ep, system, userMsg, rec, trace, who) {
  const messages = [{ role: 'system', content: system }, { role: 'user', content: userMsg }];
  for (let turn = 0; turn < 4; turn++) {
    const m = await chat(ep, messages, true);
    messages.push(m);
    if (m.tool_calls && m.tool_calls.length) {
      for (const tc of m.tool_calls) {
        const result = runTool(tc.function.name, rec);
        trace.push({ agent: who, tool: tc.function.name, result: result });
        messages.push({ role: 'tool', tool_call_id: tc.id, content: JSON.stringify(result) });
      }
      continue;
    }
    return (m.content || '').trim();
  }
  return (messages[messages.length - 1].content || '').trim();
}

const WARDEN_SYS = 'You are the WARDEN, an L2 identity-governance agent. Investigate the account by CALLING the provided tools (sign-in activity, dependencies, OAuth grants, group memberships) before forming a view. ' +
  'Then give ONE short, specific read of the account, citing the data source the tools returned. Surface any doubt. Do NOT state a final action or verdict — the human decides. Keep it under 180 chars. Reply with just the sentence.';
const SKEPTIC_SYS = 'You are the SKEPTIC, an adversarial reviewer. The Warden has given a read. Independently CALL the tools to verify it, hunting for a contradicting signal the Warden may have missed (a live token, a hidden grant, governed status). ' +
  'Then contest or confirm in ONE short, specific sentence, citing the data source. Do NOT name a final verdict. Under 180 chars. Reply with just the sentence.';

module.exports = async function (context, req) {
  const J = (status, body) => { context.res = { status: status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body: body }; };
  if (req.method === 'OPTIONS') return J(204, {});
  const prov = provider();
  if (!prov) return J(200, { configured: false, note: 'No model configured. Set GITHUB_MODELS_TOKEN (or AZURE_OPENAI_* / OPENAI_API_KEY) in the Static Web App configuration.' });

  let sig = req.body; if (typeof sig === 'string') { try { sig = JSON.parse(sig || '{}'); } catch (e) { sig = {}; } }
  sig = sig || {};
  const rec = recordFor(sig);
  const acct = (sig.label || 'the account') + ' (' + rec.kind + ', grade ' + rec.grade + ')';
  const ep = endpoint(prov);
  const trace = [];
  const t0 = Date.now();
  try {
    // Foundry path (real Azure AI Foundry agents) — used only if provisioned; falls back to inline agents on any issue.
    if (process.env.FOUNDRY_PROJECT_ENDPOINT) {
      try { const fr = await require('./foundry').runFoundryCouncil(sig, { recordFor: recordFor, runTool: runTool }); if (fr) return J(200, fr); } catch (e) { /* fall through to the inline tool-calling agents */ }
    }
    const warden = await runAgent(ep, WARDEN_SYS, 'Investigate ' + acct + ' and give your read.', rec, trace, 'Warden');
    const skeptic = await runAgent(ep, SKEPTIC_SYS, 'Account: ' + acct + '. The Warden concluded: "' + warden + '". Verify independently, then contest or confirm.', rec, trace, 'Skeptic');
    const synth = await chat(ep, [
      { role: 'system', content: 'You are the COUNCIL chair. Given the Warden and Skeptic findings, write ONE sentence summarising the advisory and your confidence as a percent. Do NOT name a final action — the human decides. Reply ONLY JSON: {"council":"<=160 chars","confidence":0-100}.' },
      { role: 'user', content: 'Warden: ' + warden + '\nSkeptic: ' + skeptic }
    ], false);
    let council = 'The evidence is in — the verdict is yours.', confidence = 60;
    const mm = (synth.content || '').match(/\{[\s\S]*\}/);
    if (mm) { try { const o = JSON.parse(mm[0]); if (o.council) council = String(o.council); if (typeof o.confidence === 'number') confidence = o.confidence; } catch (e) {} }
    const citations = Array.from(new Set(trace.map(function (t) { return t.result && t.result.source; }).filter(Boolean)));
    return J(200, { configured: true, agentic: true, warden: warden, skeptic: skeptic, council: council, confidence: confidence, citations: citations, toolCalls: trace.length, trace: trace, model: ep.model, source: prov, latency: Date.now() - t0 });
  } catch (e) {
    return J(502, { error: String(e.message), source: prov, configured: true });
  }
};
