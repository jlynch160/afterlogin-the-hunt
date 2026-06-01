#!/usr/bin/env node
/**
 * Afterlogin — MCP server
 * ---------------------------------------------------------------------------
 * Exposes the haunted identity-governance manor as Model Context Protocol tools
 * so GitHub Copilot (VS Code / Copilot CLI) — or any MCP host — can "walk the
 * manor" headlessly: divine bindings, summon cited evidence, pass judgment, and
 * banish active threats. The browser game and this server share one model, so
 * the visual showpiece and the agent surface are the same product.
 *
 * Zero dependencies. Newline-delimited JSON-RPC 2.0 over stdio.
 *   Run:  node mcp-server.mjs
 *   VS Code (.vscode/mcp.json):
 *     { "servers": { "orphan-manor": { "command": "node", "args": ["mcp-server.mjs"] } } }
 *
 * Synthetic data only. No PII. For demonstration / hackathon use.
 */

import { isConfigured as foundryReady, groundQuery } from './backend/foundry-iq.mjs';

/* ----------------------------- the manor model --------------------------- */
const EDGES = [[0,2],[0,3],[2,4],[2,6],[3,4],[3,5],[4,6],[5,7],[6,1],[7,1]];
const adj = {}; EDGES.forEach(([a,b])=>{(adj[a]=adj[a]||[]).push(b);(adj[b]=adj[b]||[]).push(a);});
function bfs(src){const d={[src]:0},q=[src];while(q.length){const n=q.shift();for(const m of adj[n]||[])if(d[m]==null){d[m]=d[n]+1;q.push(m);}}return d;}
const distV = bfs(1);

function freshManor(){
  return {
    ledger: 0, breach: false,
    rooms: [
      { id:0, name:'The Hall', vault:false, soul:null },
      { id:1, name:'The Vault', vault:true, soul:null },
      { id:2, name:'Boiler Room', soul:soul('svc-billing-reconcile','service','F','412 days',false,
        [['invoked by nightly AP-Close job',true],['delegated rights from adm-breakglass',false]],
        ['Last interactive sign-in 412d ago','Non-interactive token refresh 3h ago','Runbook AP-Close.ps1:88 still calls it']) },
      { id:3, name:'The Cellar', soul:soul('adm-legacy-backup','admin','F','511 days',true,
        [['decommissioned tape-backup service',false],['group Backup-Operators (empty)',false]],
        ['No sign-in in 511 days','Backup service decommissioned 2022','Unused Domain Admin — a screaming wraith']) },
      { id:4, name:'East Study', soul:soul('usr-j.okafor','member','B','2 hours',false,
        [['owns Q3-Close workbook',true],['shares AP mailbox',true]],
        ['Active resident, signs in daily','Member of Finance-Readers']) },
      { id:5, name:'Servants Stair', soul:soul('svc-print-spooler','service','C','203 days',true,
        [['print server PRT-07 (retired)',false]],
        ['Print server PRT-07 retired 7 months ago','No runbook callers']) },
      { id:6, name:'Locked Library', soul:soul('adm-breakglass-02','admin','D','88 days',false,
        [['emergency Global Admin (break-glass)',true]],
        ['Dormant by design','Governed by break-glass CA policy','Attested 31d ago — DO NOT remove']) },
      { id:7, name:'Conservatory', soul:soul('usr-m.santos','member','A','11 min',false,
        [['normal daily access',true]],
        ['Healthy active resident','Least-privilege, attested']) },
    ],
    threat: null, // set by start_hunt
  };
}
function soul(label,kind,grade,last,dead,bind,ev){
  return { label, kind, grade, last, dead,
    bind: bind.map(([label,live])=>({label,live})), ev,
    divined:false, summoned:false, judged:null, possessed:false };
}
const GRADE_PTS = {F:40,D:30,C:20,B:12,A:8};
let M = freshManor();

/* ----------------------------- game logic -------------------------------- */
function isBait(roomId){ const r=M.rooms[roomId]; if(!r||!r.soul)return false;
  const s=r.soul; if(s.possessed)return false;
  return (s.grade==='F'||s.grade==='D') && !(s.judged==='rest'||s.judged==='bind'); }

function hopThreat(){
  const t=M.threat; if(!t||t.banished)return 'No active threat.';
  const nbrs=(adj[t.room]||[]).filter(n=>n!==t.prev);
  const cand=nbrs.length?nbrs:adj[t.room];
  const bait=cand.filter(isBait);
  const next=(bait.length?bait:cand).sort((a,b)=>distV[a]-distV[b])[0];
  t.prev=t.room; t.room=next;
  const room=M.rooms[next];
  if(room.vault){ M.breach=true; return `BREACH — the Possession reached ${room.name}. The Vault has fallen.`; }
  if(isBait(next)){ room.soul.possessed=true; room.soul.judged='possessed'; t.strength++; M.ledger-=25;
    return `The Possession crept to ${room.name} and POSSESSED the forgotten ${room.soul.label}. Strength ×${t.strength}. (-25)`; }
  return `The Possession creeps to ${room.name} — ${distV[next]} rooms from the Vault.`;
}

/* ------------------------------- tools ----------------------------------- */
const TOOLS = {
  list_rooms: {
    description: 'List every room in Afterlogin and the spirit (account) within, with haunting severity grade. Call this first.',
    schema: { type:'object', properties:{}, },
    run(){ const lines=M.rooms.map(r=>{
      if(r.vault) return `#${r.id} ${r.name}  [TIER-0 VAULT]`;
      if(!r.soul) return `#${r.id} ${r.name}  (empty)`;
      const s=r.soul; const state=s.possessed?'POSSESSED':(s.judged||'unjudged');
      return `#${r.id} ${r.name}  ·  ${s.label} [${s.kind}]  grade ${s.grade}  last seen ${s.last}  — ${state}`;
    });
    const th=M.threat&&!M.threat.banished?`\n⚠ Active Possession in #${M.threat.room} (${M.threat.name}), ${distV[M.threat.room]} rooms from the Vault, strength ×${M.threat.strength}.`:'';
    return lines.join('\n')+th+`\n\nLedger: ${M.ledger}`; }
  },
  divine_bindings: {
    description: 'Fabric IQ — reveal an account\'s ontology bindings to learn which threads still lead to a LIVE process (load-bearing) vs. dead. Pass room_id.',
    schema:{ type:'object', properties:{ room_id:{type:'number'} }, required:['room_id'] },
    run({room_id}){ const r=M.rooms[room_id]; if(!r||!r.soul)return 'No spirit there.'; r.soul.divined=true;
      return `Fabric IQ threads for ${r.soul.label}:\n`+r.soul.bind.map(b=>` - ${b.label}  →  ${b.live?'LIVE (load-bearing)':'dead'}`).join('\n')+
      `\n\nVerdict: ${r.soul.bind.some(b=>b.live)?'STILL BOUND TO A LIVING PROCESS — exorcising it would break production.':'no live bindings — truly orphaned.'}`; }
  },
  summon_evidence: {
    description: 'Foundry IQ — agentic, permission-aware grounded retrieval of cited evidence for an account. Uses a real Foundry IQ knowledge base when configured (FOUNDRY_SEARCH_*), else baked synthetic evidence. Pass room_id.',
    schema:{ type:'object', properties:{ room_id:{type:'number'} }, required:['room_id'] },
    async run({room_id}){ const r=M.rooms[room_id]; if(!r||!r.soul)return 'No spirit there.'; r.soul.summoned=true;
      if(foundryReady()){ try{ const g=await groundQuery(r.soul.label+' identity governance evidence sign-in runbook policy');
        if(g&&g.citations.length) return `Foundry IQ (live) — cited evidence for ${r.soul.label}:\n`+g.citations.map(c=>` § ${c.snippet}  [${c.source}]`).join('\n'); }
        catch(e){ /* fall back below */ } }
      return `Foundry IQ — cited evidence for ${r.soul.label}:\n`+r.soul.ev.map(e=>` § ${e}`).join('\n'); }
  },
  cast_judgment: {
    description: 'Pass judgment on an account. rite = "rest" (deprovision; only if truly dead), "bind" (disable & monitor; safe), or "ack" (acknowledge living). Exorcising a load-bearing account triggers a poltergeist cascade.',
    schema:{ type:'object', properties:{ room_id:{type:'number'}, rite:{type:'string',enum:['rest','bind','ack']} }, required:['room_id','rite'] },
    run({room_id,rite}){ const r=M.rooms[room_id]; if(!r||!r.soul)return 'No spirit there.';
      const s=r.soul; if(s.possessed)return 'That spirit is POSSESSED — banish the threat that holds it first.';
      if(s.judged&&s.judged!=='possessed')return `Already judged: ${s.judged}.`;
      if(rite==='rest'){ if(s.dead){ const p=GRADE_PTS[s.grade]; M.ledger+=p; s.judged='rest';
          return `🕊️ Laid to rest: ${s.label}. A truly dead account, gone clean. +${p}. Ledger ${M.ledger}.`; }
        else { M.ledger-=60; s.judged='broken';
          return `💥 POLTERGEIST. ${s.label} was load-bearing — you broke a live process. -60. Ledger ${M.ledger}. (This is why you divine first.)`; } }
      if(rite==='bind'){ const p=s.dead?12:18; M.ledger+=p; s.judged='bind';
        return `🔒 Bound & watched: ${s.label}. Quarantined — safe and reversible. +${p}. Ledger ${M.ledger}.`; }
      // ack
      if(s.dead&&(s.grade==='F'||s.grade==='D')){ M.ledger-=20;
        return `⚠ You acknowledged a corpse (${s.label}) as living. A breach remains — bait for the Hungry. -20. Ledger ${M.ledger}.`; }
      M.ledger+=12; s.judged='ack';
      return `🏠 Acknowledged the living: ${s.label}. Owner documented. +12. Ledger ${M.ledger}.`; }
  },
  start_hunt: {
    description: 'Begin the Hunt — an identity threat ignites (impossible-travel account takeover) and begins moving toward the Vault. Optionally advance it.',
    schema:{ type:'object', properties:{}, },
    run(){ if(M.threat&&!M.threat.banished)return 'The Hunt is already underway.';
      M.threat={ room:4, prev:-1, name:'usr-j.okafor', strength:1, banished:false, summoned:false,
        evidence:['Sign-in: Lagos 06:14 then Seattle 06:18 — IMPOSSIBLE TRAVEL','Risk: High · MFA satisfied by token replay','Token reused vs SharePoint/Q3-Close','Cited: Entra ID Protection'] };
      return `⚠ THE HUNT BEGINS. A Possession wearing usr-j.okafor's face ignites in East Study (#4), ${distV[4]} rooms from the Vault. Use advance_hunt to let it move, or banish it.`; }
  },
  advance_hunt: {
    description: 'Advance the active threat one hop along the entitlement graph toward the Vault (it prefers to possess un-judged high-grade ghosts). Returns what happens.',
    schema:{ type:'object', properties:{}, },
    run(){ return hopThreat(); }
  },
  banish_threat: {
    description: 'Banish the active Possession with the L3 rite (revoke sessions, isolate). Requires summon_threat_evidence first. Stronger (possessed) threats are harder but still banishable.',
    schema:{ type:'object', properties:{}, },
    run(){ const t=M.threat; if(!t||t.banished)return 'No active threat to banish.';
      if(!t.summoned)return 'Summon the cited risk dossier first (summon_threat_evidence) — banish nothing on hearsay.';
      t.banished=true; M.ledger+=50;
      return `⚔️ Banished. Sessions revoked, identity isolated — cited to Entra ID Protection. +50. The threads to the Vault go cold. Ledger ${M.ledger}.`; }
  },
  summon_threat_evidence: {
    description: 'Foundry IQ — pull the cited risk dossier (Entra ID Protection signals) for the active Possession before banishing.',
    schema:{ type:'object', properties:{}, },
    run(){ const t=M.threat; if(!t||t.banished)return 'No active threat.'; t.summoned=true;
      return `Foundry IQ risk dossier for ${t.name}:\n`+t.evidence.map(e=>` § ${e}`).join('\n'); }
  },
  read_ledger: {
    description: 'Read the Ledger of the Dead — your running score and the state of the night.',
    schema:{ type:'object', properties:{}, },
    run(){ const judged=M.rooms.filter(r=>r.soul&&r.soul.judged&&r.soul.judged!=='possessed').length;
      const total=M.rooms.filter(r=>r.soul).length; const poss=M.rooms.filter(r=>r.soul&&r.soul.possessed).length;
      const noThreat=!M.threat||M.threat.banished;
      const won = judged===total && noThreat && !M.breach;
      return `Ledger of the Dead: ${M.ledger}\nSpirits judged: ${judged}/${total}\nPossessions allowed: ${poss}\nVault: ${M.breach?'FALLEN':'secure'}\n${won?'☼ Dawn breaks — the manor is quiet. You win the night.':'The night continues.'}`; }
  },
  reset_manor: {
    description: 'Reset the manor to a fresh night.',
    schema:{ type:'object', properties:{}, },
    run(){ M=freshManor(); return 'The manor resets. A new night falls. Call list_rooms to begin.'; }
  },
};

/* --------------------------- JSON-RPC / stdio ---------------------------- */
function send(msg){ process.stdout.write(JSON.stringify(msg)+'\n'); }
function result(id,r){ send({jsonrpc:'2.0',id,result:r}); }
function error(id,code,message){ send({jsonrpc:'2.0',id,error:{code,message}}); }

function handle(msg){
  const {id,method,params} = msg;
  if(method==='initialize'){
    return result(id,{ protocolVersion:'2024-11-05',
      capabilities:{ tools:{} },
      serverInfo:{ name:'orphan-manor', version:'1.0.0' } });
  }
  if(method==='notifications/initialized') return; // notification, no reply
  if(method==='tools/list'){
    return result(id,{ tools:Object.entries(TOOLS).map(([name,t])=>({ name, description:t.description, inputSchema:t.schema })) });
  }
  if(method==='tools/call'){
    const t=TOOLS[params?.name]; if(!t) return error(id,-32602,`Unknown tool: ${params?.name}`);
    Promise.resolve().then(()=>t.run(params.arguments||{}))
      .then(text=>result(id,{ content:[{ type:'text', text:String(text) }] }))
      .catch(e=>result(id,{ content:[{ type:'text', text:'Error: '+e.message }] }));
    return;
  }
  if(id!=null) error(id,-32601,`Method not found: ${method}`);
}

let buf='';
process.stdin.setEncoding('utf8');
process.stdin.on('data',chunk=>{ buf+=chunk; let i;
  while((i=buf.indexOf('\n'))>=0){ const line=buf.slice(0,i).trim(); buf=buf.slice(i+1);
    if(!line) continue; try{ handle(JSON.parse(line)); }catch(e){ /* ignore malformed */ } }
});
process.stderr.write('Afterlogin MCP server ready — walk the halls.\n');
