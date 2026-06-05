/**
 * Afterlogin — POST /api/reason  (the Agent Council, live)
 * ---------------------------------------------------------------------------
 * Server-side LLM reasoning so API keys never touch the browser. Configure ONE
 * provider via SWA app settings:
 *   GitHub Models : GITHUB_MODELS_TOKEN (free; GITHUB_MODELS_MODEL default gpt-4o)
 *   Azure OpenAI  : AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_KEY (+ AZURE_OPENAI_DEPLOYMENT)
 *   OpenAI        : OPENAI_API_KEY (+ OPENAI_MODEL)
 * Unconfigured → {configured:false}; the game falls back to scripted reasoning.
 *
 * Two modes:
 *  - Council mode (encounter UX): body includes wardenChar — the game ASSIGNS the
 *    stance each agent argues (so the AI can be deterministically "wrong" or "split"
 *    while the prose is generated live). Returns {warden, skeptic}. The model is told
 *    NOT to name a final verdict, so the player still decides.
 *  - Legacy mode (classic build): returns {rite, why, conf}.
 */
const CHAR = [
  'this account is truly dead — nothing live depends on it any longer',
  'this account is load-bearing — a live process or token still quietly feeds from it',
  'this account is alive and governed — it is in active, sanctioned use and must be left untouched'
];

function provider() {
  if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) return 'azure-openai';
  if (process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN) return 'github-models';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

function endpoint(prov) {
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
  return { url, headers, model, jsonMode };
}

module.exports = async function (context, req) {
  const J = (status, body) => { context.res = { status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body }; };
  if (req.method === 'OPTIONS') return J(204, {});

  const prov = provider();
  if (!prov) return J(200, { configured: false, note: 'No model configured. Set GITHUB_MODELS_TOKEN (or AZURE_OPENAI_* / OPENAI_API_KEY) in the Static Web App configuration.' });

  let sig = req.body;
  if (typeof sig === 'string') { try { sig = JSON.parse(sig || '{}'); } catch (e) { sig = {}; } }
  sig = sig || {};

  const ctx = `Account ${sig.label} (${sig.kind}, grade ${sig.grade}). Last interactive sign-in: ${sig.last || 'unknown'}. ` +
    `Bindings: ${(sig.bindings || []).join('; ') || 'none'}. Evidence: ${(sig.evidence || []).join('; ') || 'none'}.`;

  const council = sig.wardenChar !== undefined && sig.wardenChar !== null;
  let messages;
  if (council) {
    const wc = sig.wardenChar, sc = sig.skepticChar, split = !!sig.split;
    const sys = 'You are two AI security agents debating a forgotten cloud account in a haunted-manor governance game. ' +
      'The WARDEN argues this read of the account: "' + (CHAR[wc] || CHAR[1]) + '". ' +
      ((split && sc !== undefined && sc !== null) ? 'The SKEPTIC DISAGREES and argues instead: "' + (CHAR[sc] || '') + '". '
        : 'The SKEPTIC AGREES with the Warden and reinforces the point with a different detail. ') +
      'Each writes ONE short, specific, in-character sentence (max 150 chars), citing the actual bindings or evidence. ' +
      'Do NOT name a final action or verdict word (rest / bind / acknowledge / lay to rest / deprovision / disable) — argue only the reasoning; the human decides. ' +
      'Return ONLY JSON: {"warden":"...","skeptic":"..."}.';
    messages = [{ role: 'system', content: sys }, { role: 'user', content: ctx }];
  } else {
    const sys = 'You are the Warden, an L2 identity-governance agent triaging a forgotten account. ' +
      'Choose the SAFE, least-destructive action: "rest" (deprovision — ONLY if truly dead with no live bindings), ' +
      '"bind" (disable + monitor — if load-bearing or high-privilege), or "ack" (it is a living, least-privilege resident). ' +
      'Reply with ONLY JSON: {"rite":"rest|bind|ack","why":"<=180 chars rationale","conf":0-100}.';
    messages = [{ role: 'system', content: sys }, { role: 'user', content: ctx }];
  }

  const { url, headers, model, jsonMode } = endpoint(prov);
  const body = { model, messages, temperature: council ? 0.6 : 0.2, max_tokens: 220 };
  if (jsonMode) body.response_format = { type: 'json_object' };

  const t0 = Date.now();
  try {
    const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!r.ok) return J(502, { error: `model HTTP ${r.status}`, source: prov, configured: true });
    const j = await r.json();
    const txt = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
    const m = txt.match(/\{[\s\S]*\}/);
    if (!m) return J(502, { error: 'model returned no JSON', source: prov, configured: true });
    const o = JSON.parse(m[0]);
    const meta = { model, source: prov, latency: Date.now() - t0, tokens: j.usage && j.usage.total_tokens };
    if (council) {
      if (!o.warden || !o.skeptic) return J(502, { error: 'no council in response', source: prov, configured: true });
      return J(200, Object.assign({ warden: String(o.warden), skeptic: String(o.skeptic) }, meta));
    }
    if (!o.rite) return J(502, { error: 'no rite in response', source: prov, configured: true });
    return J(200, Object.assign({ rite: o.rite, why: o.why, conf: o.conf }, meta));
  } catch (e) {
    return J(502, { error: String(e.message), source: prov, configured: true });
  }
};
