/**
 * Afterlogin — Foundry IQ grounded retrieval client
 * ---------------------------------------------------------------------------
 * A REAL, pluggable integration. Foundry IQ is Microsoft Foundry's knowledge
 * layer; per Microsoft it performs agentic retrieval over knowledge sources and
 * "uses Azure AI Search for indexing and retrieval infrastructure." This client
 * queries that retrieval layer and returns permission-aware, CITED passages.
 *
 * Configure via environment (no secrets in source):
 *   FOUNDRY_SEARCH_ENDPOINT   https://<your-search>.search.windows.net
 *   FOUNDRY_SEARCH_KEY        query API key
 *   FOUNDRY_SEARCH_INDEX      index name (default: orphan-manor-knowledge)
 *   FOUNDRY_SEMANTIC_CONFIG   (optional) semantic config name for extractive answers
 *
 * If unconfigured, isConfigured() returns false and callers fall back to the
 * baked synthetic evidence — so the game runs fully offline for the demo, and
 * lights up real grounded retrieval the moment you point it at a Foundry project.
 *
 * Index the synthetic corpus in /data/knowledge/*.md into your Azure AI Search
 * index first (see README → "Genuine Foundry IQ"). Synthetic data only — no PII.
 */
const EP    = process.env.FOUNDRY_SEARCH_ENDPOINT;
const KEY   = process.env.FOUNDRY_SEARCH_KEY;
const INDEX = process.env.FOUNDRY_SEARCH_INDEX || 'afterlogin-knowledge';
const SEM   = process.env.FOUNDRY_SEMANTIC_CONFIG; // optional
const API   = '2024-07-01';

export function isConfigured() { return !!(EP && KEY); }

/**
 * Ground a question against the Foundry IQ knowledge base.
 * @returns {Promise<{grounded:boolean, question:string, citations:Array}|null>}
 *          null when unconfigured (caller should fall back to baked evidence).
 */
export async function groundQuery(question, top = 3) {
  if (!isConfigured()) return null;
  const url = `${EP.replace(/\/$/, '')}/indexes/${encodeURIComponent(INDEX)}/docs/search?api-version=${API}`;
  const body = { search: question, top, select: 'id,title,content,source' };
  if (SEM) { body.queryType = 'semantic'; body.semanticConfiguration = SEM; body.captions = 'extractive'; body.answers = 'extractive|count-3'; }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'api-key': KEY },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Foundry IQ retrieval ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();

  const citations = (data.value || []).map(d => ({
    title: d.title || d.id,
    source: d.source || d.id,
    score: d['@search.rerankerScore'] ?? d['@search.score'],
    snippet: (d['@search.captions']?.[0]?.text) || String(d.content || '').slice(0, 200),
  }));
  return { grounded: true, question, answers: (data['@search.answers'] || []).map(a => a.text), citations };
}
