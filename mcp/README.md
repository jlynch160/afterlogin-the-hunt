# Afterlogin — Identity-Governance MCP Server

The same identity-triage tools the in-game Warden/Skeptic agents use, exposed over the
**Model Context Protocol** so *any* agent — GitHub Copilot, VS Code, Claude, or an **Azure
AI Foundry agent** — can drive them. **Synthetic data only; no real PII.**

## Tools
| Tool | Returns |
|---|---|
| `list_accounts` | every account in the synthetic store |
| `get_signin_activity(account)` | last interactive sign-in, token refresh, MFA status |
| `get_dependencies(account)` | bindings + which are **LIVE** (load-bearing) |
| `get_oauth_grants(account)` | OAuth app consents/grants (scope, status) |
| `get_group_memberships(account)` | groups + privileged roles |

Each result includes a **`source`** citation (Entra sign-in logs, Purview runbook index, CMDB, OAuth consent audit…).

## Run locally
```bash
npm install
npm start            # HTTP  -> POST http://localhost:8080/mcp   (+ GET /health)
npm run stdio        # stdio -> for Claude Desktop / VS Code / Copilot
npm test             # validate over the protocol (no network)
```

## Connect a client (stdio)
**VS Code / GitHub Copilot** — `.vscode/mcp.json`:
```json
{ "servers": { "afterlogin-identity": { "command": "node", "args": ["server.js", "--stdio"], "cwd": "${workspaceFolder}/mcp" } } }
```
**Claude Desktop** — `claude_desktop_config.json`:
```json
{ "mcpServers": { "afterlogin-identity": { "command": "node", "args": ["ABSOLUTE/PATH/mcp/server.js", "--stdio"] } } }
```
Then ask: *“Using the afterlogin-identity tools, triage svc-billing-reconcile — is it safe to deprovision?”* The model will call `get_signin_activity` + `get_dependencies` and reason over the results.

## Host it (Azure Container Apps — in your tenant)
```bash
SUB=3226d5fa-52e1-40c0-9c74-67e984356692
az account set --subscription $SUB
az containerapp up \
  --name afterlogin-mcp \
  --resource-group rg-afterlogin \
  --location eastus2 \
  --source . \
  --ingress external --target-port 8080
# -> https://afterlogin-mcp.<region>.azurecontainerapps.io/mcp
```
(`az containerapp up` builds the Dockerfile, creates the Container Apps env + registry, and deploys.)

---

# Turn these into **real Azure AI Foundry agents**

Goal: the in-game *“Foundry IQ”* Warden & Skeptic become **actual Foundry agents** that call this MCP server and collaborate — inference staying in your sub.

### 1. Project + model (in `Jefflynch107@gmail.com` sub)
- Azure AI Foundry portal → **Create project** (in `rg-afterlogin`).
- **Deploy a model**: `gpt-4o` (Azure OpenAI) in the project.

### 2. Register this MCP server as a tool
- Deploy the Container App above → copy its `/mcp` URL.
- In the agent's **Tools → add an MCP tool (connected tool)** pointing at `https://afterlogin-mcp…/mcp`. The 5 tools above become callable by the agent.

### 3. Create the two agents
- **Warden agent** — instructions: *“Investigate the account by calling the identity tools before forming a view; cite the source; surface doubt; never name the final action — the human decides.”* Attach the MCP tool.
- **Skeptic agent** — instructions: *“The Warden has a read. Independently call the tools to verify, hunting for the contradicting signal; contest or confirm with a cited sentence; never name the verdict.”* Attach the MCP tool.

### 4. Make them collaborate (multi-agent)
- Use **Connected Agents**: an **Orchestrator** agent that calls Warden, then Skeptic, then synthesizes a cited advisory + confidence (no verdict). *(Foundry "connected agents" lets one agent invoke others as tools.)*

### 5. Point the game at Foundry
Swap `api/reason/index.js`'s raw chat-completions for the **Azure AI Agents SDK** (`@azure/ai-agents`):
```js
// pseudocode
const client = new AgentsClient(process.env.FOUNDRY_PROJECT_ENDPOINT, new DefaultAzureCredential());
const thread = await client.threads.create();
await client.messages.create(thread.id, "user", `Triage ${label}`);
const run = await client.runs.createAndPoll(thread.id, ORCHESTRATOR_AGENT_ID);
const msgs = await client.messages.list(thread.id);   // -> warden, skeptic, council + tool trace
```
Set `FOUNDRY_PROJECT_ENDPOINT` + give the Function a managed identity with **Azure AI User** on the project. Now the council the game renders is produced by **real Foundry agents calling real MCP tools** — multi-agent, grounded, in-tenant, human-in-the-loop.

> The current `api/reason` (inline tool-calling agents) is the working fallback and proves the pattern; this Foundry path is the "real Microsoft agents" upgrade for the submission.
