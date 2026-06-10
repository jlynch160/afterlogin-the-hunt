/**
 * Foundry path — runs the council as REAL Azure AI Foundry agents.
 * Activates ONLY when FOUNDRY_PROJECT_ENDPOINT + FOUNDRY_AGENT_WARDEN + FOUNDRY_AGENT_SKEPTIC
 * are set (agents created by foundry/setup.mjs). Returns null on any issue so index.js
 * falls back to the inline tool-calling agents. Tool execution is wired to the same
 * synthetic store (helpers.runTool) — the agents reason in Foundry, the tools run here.
 *
 * NOTE: method names follow @azure/ai-agents v1 (threads / messages / runs). If your
 * installed SDK differs, adjust in runAgent(); the inline path is the tested fallback.
 */
module.exports.runFoundryCouncil = async function (sig, helpers) {
  const endpoint = process.env.FOUNDRY_PROJECT_ENDPOINT;
  const wardenId = process.env.FOUNDRY_AGENT_WARDEN;
  const skepticId = process.env.FOUNDRY_AGENT_SKEPTIC;
  const councilId = process.env.FOUNDRY_AGENT_COUNCIL;
  if (!endpoint || !wardenId || !skepticId) return null;

  let AgentsClient, DefaultAzureCredential;
  try { ({ AgentsClient } = require('@azure/ai-agents')); ({ DefaultAzureCredential } = require('@azure/identity')); }
  catch (e) { return null; } // SDK not installed -> inline fallback

  const client = new AgentsClient(endpoint, new DefaultAzureCredential());
  const { recordFor, runTool } = helpers;
  const rec = recordFor(sig);
  const acct = (sig.label || 'the account') + ' (' + rec.kind + ', grade ' + rec.grade + ')';
  const trace = [];
  const t0 = Date.now();

  const warden = await runAgent(client, wardenId, 'Investigate ' + acct + ' using your tools, then give your read.', rec, runTool, trace, 'Warden');
  const skeptic = await runAgent(client, skepticId, 'Account: ' + acct + '. The Warden concluded: "' + warden + '". Verify independently with the tools, then contest or confirm.', rec, runTool, trace, 'Skeptic');

  let council = 'The evidence is in — the verdict is yours.', confidence = 60;
  if (councilId) {
    const c = await runAgent(client, councilId, 'Warden: ' + warden + '\nSkeptic: ' + skeptic + '\nSummarise the advisory in one sentence and a confidence percent; do NOT name the verdict.', rec, runTool, trace, 'Council');
    const mm = (c || '').match(/\{[\s\S]*\}/);
    if (mm) { try { const o = JSON.parse(mm[0]); if (o.council) council = String(o.council); if (typeof o.confidence === 'number') confidence = o.confidence; } catch (e) {} }
    else if (c) council = c;
  }
  const citations = Array.from(new Set(trace.map(function (x) { return x.result && x.result.source; }).filter(Boolean)));
  return { configured: true, agentic: true, foundry: true, warden: warden, skeptic: skeptic, council: council, confidence: confidence, citations: citations, toolCalls: trace.length, trace: trace, model: 'foundry-agent', source: 'azure-ai-foundry', latency: Date.now() - t0 };
};

async function runAgent(client, agentId, userMsg, rec, runTool, trace, who) {
  const thread = await client.threads.create();
  await client.messages.create(thread.id, 'user', userMsg);
  let run = await client.runs.create(thread.id, agentId);
  for (let i = 0; i < 15; i++) {
    if (['completed', 'failed', 'cancelled', 'expired'].indexOf(run.status) >= 0) break;
    if (run.status === 'requires_action' && run.requiredAction && run.requiredAction.submitToolOutputs) {
      const calls = run.requiredAction.submitToolOutputs.toolCalls || [];
      const outputs = calls.map(function (tc) {
        const result = runTool(tc.function.name, rec);
        trace.push({ agent: who, tool: tc.function.name, result: result });
        return { toolCallId: tc.id, output: JSON.stringify(result) };
      });
      run = await client.runs.submitToolOutputs(thread.id, run.id, outputs);
    } else {
      await new Promise(function (r) { setTimeout(r, 1000); });
      run = await client.runs.get(thread.id, run.id);
    }
  }
  let text = '';
  for await (const m of client.messages.list(thread.id, { order: 'desc' })) {
    if (m.role === 'assistant') { text = (m.content || []).map(function (c) { return (c.text && c.text.value) || c.text || ''; }).join(' ').trim(); break; }
  }
  return text;
}
