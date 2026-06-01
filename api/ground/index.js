/**
 * Afterlogin — GET /api/ground?q=...  (Foundry IQ grounded retrieval)
 * ---------------------------------------------------------------------------
 * Permission-aware, CITED retrieval over the knowledge base. Mirrors
 * backend/foundry-iq.mjs. Configure via SWA app settings:
 *   FOUNDRY_SEARCH_ENDPOINT   https://<your-search>.search.windows.net
 *   FOUNDRY_SEARCH_KEY        query API key
 *   FOUNDRY_SEARCH_INDEX      index name (default: afterlogin-knowledge)
 *   FOUNDRY_SEMANTIC_CONFIG   (optional) semantic config for extractive answers
 * Unconfigured → {grounded:false, fallback:true}; the game uses baked evidence.
 */
module.exports = async function (context, req) {
  const J = (status, body) => { context.res = { status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body }; };
  if (req.method === 'OPTIONS') return J(204, {});

  const EP = process.env.FOUNDRY_SEARCH_ENDPOINT, KEY = process.env.FOUNDRY_SEARCH_KEY;
  const INDEX = process.env.FOUNDRY_SEARCH_INDEX || 'afterlogin-knowledge';
  const SEM = process.env.FOUNDRY_SEMANTIC_CONFIG, API = '2024-07-01';
  const q = (req.query && req.query.q) || '';

  if (!(EP && KEY)) return J(200, { grounded: false, fallback: true, note: 'Foundry IQ not configured — set FOUNDRY_SEARCH_ENDPOINT / FOUNDRY_SEARCH_KEY / FOUNDRY_SEARCH_INDEX to enable real grounded retrieval.' });

  try {
    const url = `${EP.replace(/\/$/, '')}/indexes/${encodeURIComponent(INDEX)}/docs/search?api-version=${API}`;
    const body = { search: q, top: 3, select: 'id,title,content,source' };
    if (SEM) { body.queryType = 'semantic'; body.semanticConfiguration = SEM; body.captions = 'extractive'; body.answers = 'extractive|count-3'; }
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'api-key': KEY }, body: JSON.stringify(body) });
    if (!res.ok) return J(502, { error: `Foundry IQ retrieval ${res.status}` });
    const data = await res.json();
    const citations = (data.value || []).map(d => ({
      title: d.title || d.id, source: d.source || d.id,
      score: d['@search.rerankerScore'] != null ? d['@search.rerankerScore'] : d['@search.score'],
      snippet: (d['@search.captions'] && d['@search.captions'][0] && d['@search.captions'][0].text) || String(d.content || '').slice(0, 200),
    }));
    return J(200, { grounded: true, question: q, answers: (data['@search.answers'] || []).map(a => a.text), citations });
  } catch (e) { return J(502, { error: String(e.message) }); }
};
