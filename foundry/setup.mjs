/**
 * Provision the Afterlogin agents (Warden, Skeptic, Council) in your Azure AI Foundry project.
 * They use function tools over the synthetic identity store; the game's /api/reason executes
 * those tools (wired to the same store / your MCP server) and submits the outputs.
 *
 * Prereqs:
 *   - An Azure AI Foundry project + a `gpt-4o` model deployment in it.
 *   - `az login` as a member with the "Azure AI User" role on the project.
 *   - npm install      (in this foundry/ folder)
 *
 * Run:
 *   FOUNDRY_PROJECT_ENDPOINT="https://<your-project>.services.ai.azure.com/api/projects/<proj>" node setup.mjs
 *
 * It prints the FOUNDRY_AGENT_* ids — set those (plus FOUNDRY_PROJECT_ENDPOINT) on the
 * Static Web App's api settings, and give the Function a managed identity with "Azure AI User".
 */
import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = process.env.FOUNDRY_PROJECT_ENDPOINT;
const model = process.env.FOUNDRY_MODEL || "gpt-4o";
if (!endpoint) { console.error("Set FOUNDRY_PROJECT_ENDPOINT (and az login first)."); process.exit(1); }

const acctSchema = { type: "object", properties: { account: { type: "string", description: "account label, e.g. svc-billing-reconcile" } }, required: ["account"] };
const fn = (name, description) => ({ type: "function", function: { name, description, parameters: acctSchema } });
const TOOLS = [
  fn("get_signin_activity", "Last interactive sign-in, last token refresh, and MFA status for the account."),
  fn("get_dependencies", "What still depends on the account: bindings and which are LIVE (load-bearing)."),
  fn("get_oauth_grants", "OAuth app consents/grants tied to the account (scope, consent, status)."),
  fn("get_group_memberships", "Directory groups and privileged roles the account holds.")
];

const WARDEN = "You are the WARDEN, an L2 identity-governance agent. Investigate the account by CALLING the tools (sign-in activity, dependencies, OAuth grants, group memberships) before forming a view. Give ONE short, specific read citing the data source; surface any doubt; do NOT name the final action — the human decides. Under 180 chars; reply with just the sentence.";
const SKEPTIC = "You are the SKEPTIC, an adversarial reviewer. The Warden has given a read. Independently CALL the tools to verify it, hunting for the contradicting signal the Warden may have missed (a live token, a hidden grant, governed status). Contest or confirm in ONE cited sentence; do NOT name the verdict. Under 180 chars; reply with just the sentence.";
const COUNCIL = "You are the COUNCIL chair. Given the Warden and Skeptic findings, reply ONLY JSON {\"council\":\"<=160 chars\",\"confidence\":0-100}. Summarise the advisory and your confidence; do NOT name a final action — the human decides.";

const client = new AgentsClient(endpoint, new DefaultAzureCredential());
const warden = await client.createAgent(model, { name: "Afterlogin-Warden", instructions: WARDEN, tools: TOOLS });
const skeptic = await client.createAgent(model, { name: "Afterlogin-Skeptic", instructions: SKEPTIC, tools: TOOLS });
const council = await client.createAgent(model, { name: "Afterlogin-Council", instructions: COUNCIL, tools: [] });

console.log("\n✓ Created 3 Foundry agents. Set these on the Static Web App api settings:\n");
console.log("FOUNDRY_PROJECT_ENDPOINT=" + endpoint);
console.log("FOUNDRY_AGENT_WARDEN=" + warden.id);
console.log("FOUNDRY_AGENT_SKEPTIC=" + skeptic.id);
console.log("FOUNDRY_AGENT_COUNCIL=" + council.id);
