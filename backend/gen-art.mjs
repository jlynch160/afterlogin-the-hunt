#!/usr/bin/env node
/**
 * Afterlogin — floor texture + room prop generator
 * ---------------------------------------------------------------------------
 * Generates the 4 floor textures + every per-room prop and writes them straight
 * into ../assets/ with the exact filenames the game expects. Run once and the
 * map fills with art. Files that already exist are skipped, so a rerun only
 * makes up the gap (use --force to regenerate). The ghosts, bosses and homepage
 * house are authored separately — this script only does floors + props.
 *
 *   Configure ONE provider (an image-capable model):
 *     OpenAI:        OPENAI_API_KEY=sk-...            (model: gpt-image-1 → transparent props ✓)
 *     Azure OpenAI:  AZURE_OPENAI_ENDPOINT=https://<res>.openai.azure.com
 *                    AZURE_OPENAI_KEY=...
 *                    AZURE_OPENAI_IMAGE_DEPLOYMENT=<your gpt-image-1 or dall-e-3 deployment>
 *
 *   Run:        node backend/gen-art.mjs                 (generate everything missing)
 *               node backend/gen-art.mjs --only floor    (just the 4 floor textures)
 *               node backend/gen-art.mjs --only props    (just the room props)
 *               node backend/gen-art.mjs --force         (regenerate even if present)
 *               node backend/gen-art.mjs --list          (no API calls — just print the plan)
 *
 *   Optional:   OPENAI_IMAGE_MODEL=gpt-image-1   IMAGE_QUALITY=low|medium|high
 *
 * gpt-image-1 gives transparent PNGs for props (best). DALL·E 3 has no
 * transparency — props will sit on a background; prefer gpt-image-1.
 * Synthetic / original art only.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, '..', 'assets');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const PROP = ' top-down view, dark gothic manor game asset, soft drop shadow, centered, painterly, on a transparent background.';
const TEX  = ' seamless tileable top-down texture, dark gothic, moody, subtle, no visible seams.';

const ASSETS = [
  // ── floor textures (opaque, tileable) ──
  { file: 'floor_wood.png',   kind: 'floor', prompt: 'Dark aged wood plank floor.' + TEX },
  { file: 'floor_stone.png',  kind: 'floor', prompt: 'Dark cracked stone flagstone floor.' + TEX },
  { file: 'floor_marble.png', kind: 'floor', prompt: 'Faded dark marble checkerboard floor.' + TEX },
  { file: 'floor_tile.png',   kind: 'floor', prompt: 'Cold grey data-center floor tile with a subtle grid.' + TEX },
  // ── stairwell + per-room hero props (transparent) ──
  { file: 'prop_stairs.png',          kind: 'prop', prompt: 'A stone spiral staircase.' + PROP },
  { file: 'prop_ledger_desk.png',     kind: 'prop', prompt: 'A desk piled with accounting ledgers and gold coins.' + PROP },
  { file: 'prop_filing_cabinets.png', kind: 'prop', prompt: 'A row of tall metal filing cabinets.' + PROP },
  { file: 'prop_exec_desk.png',       kind: 'prop', prompt: 'A grand executive desk with a high-back leather chair.' + PROP },
  { file: 'prop_glass_orrery.png',    kind: 'prop', prompt: 'A glowing glass orrery / floating cloud-server orb.' + PROP },
  { file: 'prop_coffin.png',          kind: 'prop', prompt: 'An old stone coffin / sarcophagus.' + PROP },
  { file: 'prop_printer.png',         kind: 'prop', prompt: 'An old line printer spilling paper beside a boiler.' + PROP },
  { file: 'prop_portrait_easels.png', kind: 'prop', prompt: 'Framed portraits on easels, one empty frame.' + PROP },
  { file: 'prop_server_rack.png',     kind: 'prop', prompt: 'A server rack with blinking patch-panel cables.' + PROP },
  { file: 'prop_sealed_safe.png',     kind: 'prop', prompt: 'A heavy vault safe with a break-glass case.' + PROP },
  { file: 'prop_storage_cot.png',     kind: 'prop', prompt: 'Stacked storage boxes and a folding cot.' + PROP },
  { file: 'prop_grand_desk.png',      kind: 'prop', prompt: 'A grand antique desk with a hanging master key.' + PROP },
  { file: 'prop_reception_desk.png',  kind: 'prop', prompt: 'A hotel reception desk with kiosk screens.' + PROP },
  { file: 'prop_router_lounge.png',   kind: 'prop', prompt: 'A wifi router on a side table with lounge chairs.' + PROP },
  { file: 'prop_iron_gate.png',       kind: 'prop', prompt: 'An ornate wrought-iron gate / portcullis.' + PROP },
];

const argv = process.argv.slice(2);
const FORCE = argv.includes('--force');
const LIST = argv.includes('--list');
const onlyIx = argv.indexOf('--only');
const ONLY = onlyIx >= 0 ? argv[onlyIx + 1] : null; // 'floor' | 'props'

function provider() {
  if (process.env.AZURE_OPENAI_IMAGE_DEPLOYMENT && process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) return 'azure';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const isGptImage = /gpt-image/i.test(MODEL);

async function genOne(a, prov) {
  const transparent = a.kind === 'prop';
  const body = { prompt: a.prompt, size: '1024x1024', n: 1 };
  if (isGptImage) { body.background = transparent ? 'transparent' : 'opaque'; body.output_format = 'png'; body.quality = process.env.IMAGE_QUALITY || 'low'; }
  else { body.response_format = 'b64_json'; } // dall-e-3
  let url, headers;
  if (prov === 'azure') {
    const dep = process.env.AZURE_OPENAI_IMAGE_DEPLOYMENT;
    const ver = process.env.AZURE_OPENAI_IMAGE_API_VERSION || '2025-04-01-preview';
    url = process.env.AZURE_OPENAI_ENDPOINT.replace(/\/$/, '') + `/openai/deployments/${dep}/images/generations?api-version=${ver}`;
    headers = { 'api-key': process.env.AZURE_OPENAI_KEY, 'content-type': 'application/json' };
  } else {
    body.model = MODEL;
    url = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/images/generations';
    headers = { authorization: 'Bearer ' + process.env.OPENAI_API_KEY, 'content-type': 'application/json' };
  }
  const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  const item = j.data && j.data[0];
  let buf;
  if (item && item.b64_json) buf = Buffer.from(item.b64_json, 'base64');
  else if (item && item.url) buf = Buffer.from(await (await fetch(item.url)).arrayBuffer());
  else throw new Error('no image in response');
  writeFileSync(join(OUT, a.file), buf);
}

async function main() {
  let plan = ASSETS;
  if (ONLY === 'floor') plan = plan.filter(a => a.kind === 'floor');
  else if (ONLY === 'props') plan = plan.filter(a => a.kind === 'prop');
  if (!FORCE) plan = plan.filter(a => !existsSync(join(OUT, a.file)));

  console.log(`📋 ${plan.length} asset(s) to generate${ONLY ? ' [--only ' + ONLY + ']' : ''}${FORCE ? ' [--force]' : ' (skipping existing)'}.`);
  if (LIST) { plan.forEach(a => console.log('  · ' + a.file)); return; }
  if (!plan.length) { console.log('✓ Nothing to do — all present. Use --force to regenerate.'); return; }

  const prov = provider();
  if (!prov) { console.error('✗ No image provider configured. Set OPENAI_API_KEY, or AZURE_OPENAI_ENDPOINT/KEY/IMAGE_DEPLOYMENT.'); process.exit(1); }
  console.log(`→ provider: ${prov} · model: ${prov === 'azure' ? process.env.AZURE_OPENAI_IMAGE_DEPLOYMENT : MODEL}`);

  let ok = 0;
  for (const a of plan) {
    process.stdout.write('  ' + a.file.padEnd(26) + ' … ');
    try { await genOne(a, prov); console.log('✓'); ok++; }
    catch (e) { console.log('✗ ' + e.message); }
    await new Promise(r => setTimeout(r, 1200)); // be gentle on rate limits
  }
  console.log(`\n✓ Generated ${ok}/${plan.length} → assets/. Hard-refresh the game (Ctrl+Shift+R).`);
  if (!isGptImage && plan.some(a => a.kind === 'prop')) console.log('  ⚠ Props need transparency — use gpt-image-1 (OPENAI_IMAGE_MODEL=gpt-image-1) for clean cut-outs.');
}
main().catch(e => { console.error('✗ ' + e.message); process.exit(1); });
