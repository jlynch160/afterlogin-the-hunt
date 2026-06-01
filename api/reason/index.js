/**
 * Afterlogin — POST /api/reason  (the Warden, live)
 * ---------------------------------------------------------------------------
 * Server-side LLM reasoning so API keys never touch the browser. Mirrors
 * backend/server.mjs::reasonLLM. Configure ONE provider via SWA app settings:
 *   GitHub Models : GITHUB_MODELS_TOKEN (free; GITHUB_MODELS_MODEL default gpt-4o)
 *   Azure OpenAI  : AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_KEY (+ AZURE_OPENAI_DEPLOYMENT)
 *   OpenAI        : OPENAI_API_KEY (+ OPENAI_MODEL)
 * Unconfigured → {configured:false}; the game falls back to on-device reasoning.
 */
const WARDEN_SYS = 'You are the Warden, an L2 identity-governance agent triaging a forgotten account. ' +
  'Choose the SAFE, least-destructive action: "rest" (deprovision — ONLY if truly dead with no live bindings), ' +
  '"bind" (disable + monitor — if load-bearing or high-privilege), or "ack" (it is a living, least-privilege resident). ' +
  'Reply with ONLY JSON: {"rite":"rest|bind|ack","why":"<=180 chars rationale","conf":0-100}.';

function provider() {
  if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) return 'azure-openai';
  if (process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN) return 'github-models';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

module.exports = async function (context, req) {
  const J = (status, body) => { context.res = { status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body }; };
  if (req.method === 'OPTIONS') return J(204, {});

  const prov = provider();
  if (!prov) return J(200, { configured: false, note: 'No model configured. Set GITHUB_MODELS_TOKEN (or AZURE_OPENAI_* / OPENAI_API_KEY) in the Static Web App configuration.' });

  let sig = req.body;
  if (typeof sig === 'string') { try { sig = JSON.parse(sig || '{}'); } catch (e) { sig = {}; } }
  sig = sig || {};

  const t0 = Date.now();
  const usr = `Account ${sig.label} (${sig.kind}, grade ${sig.grade}). Last interactive sign-in: ${sig.last}. ` +
    `MFA: ${sig.mfa}. Bindings: ${(sig.bindings || []).join('; ') || 'none'}. Evidence: ${(sig.evidence || []).join('; ') || 'none'}.`;
  const messages = [{ role: 'system', content: WARDEN_SYS }, { role: 'user', content: usr }];

  let url, headers = { 'content-type': 'application/json' }, model, jsonMode = true;
  if (prov === 'azure-openai') {
    model = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
    const ver = process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview';
    url = process.env.AZURE_OPENAI_ENDPOINT.replace(/\/$/, '') + `/openai/deployments/${model}/chat/completions?api-version=${ver}`;
    headers['api-key'] = process.env.AZURE_OPENAI_KEY;
  } else if (prov === 'github-models') {
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

  try {
    const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!r.ok) return J(502, { error: `model HTTP ${r.status}`, source: prov, configured: true });
    const j = await r.json();
    const txt = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
    const m = txt.match(/\{[\s\S]*\}/);
    if (!m) return J(502, { error: 'model returned no JSON', source: prov, configured: true });
    const o = JSON.parse(m[0]);
    if (!o.rite) return J(502, { error: 'no rite in response', source: prov, configured: true });
    const tokens = j.usage && j.usage.total_tokens;
    return J(200, { rite: o.rite, why: o.why, conf: o.conf, model, source: prov, latency: Date.now() - t0, tokens });
  } catch (e) {
    return J(502, { error: String(e.message), source: prov, configured: true });
  }
};
