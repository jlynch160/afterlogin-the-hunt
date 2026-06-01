#!/usr/bin/env node
/**
 * Afterlogin — Foundry IQ corpus indexer
 * ---------------------------------------------------------------------------
 * Creates the Azure AI Search index that Foundry IQ retrieves over, and uploads
 * the synthetic knowledge corpus in ../data/knowledge/*.md (runbooks, CMDB,
 * Conditional-Access policy). Run this ONCE, then `summon_evidence` / the
 * backend `/api/ground` return REAL, cited grounded retrieval.
 *
 *   Configure (admin key is required to create + upload):
 *     FOUNDRY_SEARCH_ENDPOINT     https://<your-search>.search.windows.net
 *     FOUNDRY_SEARCH_ADMIN_KEY    an ADMIN api-key (not the query key)
 *     FOUNDRY_SEARCH_INDEX        index name (default: afterlogin-knowledge)
 *     FOUNDRY_SEMANTIC_CONFIG     (optional) semantic config name to create
 *
 *   Run:        node backend/index-knowledge.mjs
 *   Preview:    node backend/index-knowledge.mjs --dry-run   (no network; prints chunks)
 *
 * Synthetic data only — no PII. Never commit your keys.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const KDIR  = join(__dir, '..', 'data', 'knowledge');
const API   = '2024-07-01';
const DRY   = process.argv.includes('--dry-run');

const EP    = process.env.FOUNDRY_SEARCH_ENDPOINT;
const KEY   = process.env.FOUNDRY_SEARCH_ADMIN_KEY || process.env.FOUNDRY_SEARCH_KEY;
const INDEX = process.env.FOUNDRY_SEARCH_INDEX || 'afterlogin-knowledge';
const SEM   = process.env.FOUNDRY_SEMANTIC_CONFIG;

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

// Split each markdown file into heading-delimited sections → search documents.
function chunk() {
  const docs = [];
  for (const file of readdirSync(KDIR).filter(f => f.endsWith('.md'))) {
    const text = readFileSync(join(KDIR, file), 'utf8');
    const lines = text.split(/\r?\n/);
    let title = file.replace(/\.md$/, ''), buf = [];
    const flush = () => {
      const content = buf.join('\n').trim();
      if (content) docs.push({ id: slug(file + '-' + title) + '-' + docs.length, title, content, source: file });
      buf = [];
    };
    for (const ln of lines) {
      const h = ln.match(/^#{1,6}\s+(.*)/);
      if (h) { flush(); title = h[1].trim(); } else buf.push(ln);
    }
    flush();
  }
  return docs;
}

async function req(method, path, body) {
  const res = await fetch(`${EP.replace(/\/$/, '')}${path}`, {
    method, headers: { 'content-type': 'application/json', 'api-key': KEY },
    body: body ? JSON.stringify(body) : undefined,
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${txt.slice(0, 300)}`);
  return txt ? JSON.parse(txt) : {};
}

function indexSchema() {
  const schema = {
    name: INDEX,
    fields: [
      { name: 'id',      type: 'Edm.String', key: true,  filterable: true },
      { name: 'title',   type: 'Edm.String', searchable: true },
      { name: 'content', type: 'Edm.String', searchable: true },
      { name: 'source',  type: 'Edm.String', filterable: true, facetable: true },
    ],
  };
  if (SEM) schema.semantic = { configurations: [{ name: SEM,
    prioritizedFields: { titleField: { fieldName: 'title' }, prioritizedContentFields: [{ fieldName: 'content' }] } }] };
  return schema;
}

async function main() {
  const docs = chunk();
  console.log(`📚 ${docs.length} chunks from ${readdirSync(KDIR).filter(f => f.endsWith('.md')).length} files in data/knowledge/`);
  if (DRY) {
    docs.forEach(d => console.log(`  · [${d.source}] ${d.title} — ${d.content.length} chars`));
    console.log('\n(dry run — no network. Set FOUNDRY_SEARCH_* and re-run without --dry-run to index for real.)');
    return;
  }
  if (!EP || !KEY) {
    console.error('✗ Set FOUNDRY_SEARCH_ENDPOINT and FOUNDRY_SEARCH_ADMIN_KEY (an admin key) to index. Use --dry-run to preview.');
    process.exit(1);
  }
  console.log(`→ creating/updating index "${INDEX}" on ${EP}`);
  await req('PUT', `/indexes/${encodeURIComponent(INDEX)}?api-version=${API}`, indexSchema());
  console.log('→ uploading documents');
  const r = await req('POST', `/indexes/${encodeURIComponent(INDEX)}/docs/index?api-version=${API}`,
    { value: docs.map(d => ({ '@search.action': 'mergeOrUpload', ...d })) });
  const ok = (r.value || []).filter(x => x.status).length;
  console.log(`✓ indexed ${ok}/${docs.length} documents into "${INDEX}".`);
  console.log('  Foundry IQ grounding is now LIVE — point the backend/MCP at a QUERY key and call summon_evidence.');
}

main().catch(e => { console.error('✗ ' + e.message); process.exit(1); });
