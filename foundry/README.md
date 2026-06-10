# Afterlogin — Azure AI Foundry agent path

Turn the in-game *"Foundry IQ"* council into **real Azure AI Foundry agents** that
investigate via tools, debate, and synthesise — with inference staying in your tenant.

The game's `/api/reason` already runs **inline tool-calling agents** (the tested default).
This adds a higher tier: when `FOUNDRY_*` settings are present, `/api/reason` routes to your
**Foundry agents** instead (and silently falls back to the inline agents on any error).

```
Foundry agents   →  inline tool-calling agents  →  scripted council
(if provisioned)     (default, always works)        (no model configured)
```

## Steps (all in the Jefflynch107@gmail.com sub)

**1. Create a Foundry project + model**
- Azure AI Foundry portal → **Create project** (in `rg-afterlogin`).
- **Deploy** a `gpt-4o` model in the project. Copy the **project endpoint**
  (`https://<name>.services.ai.azure.com/api/projects/<project>`).

**2. Provision the agents (one command)**
```bash
cd foundry
npm install
az login                      # as a member with "Azure AI User" on the project
FOUNDRY_PROJECT_ENDPOINT="https://<name>.services.ai.azure.com/api/projects/<project>" node setup.mjs
```
It prints `FOUNDRY_AGENT_WARDEN/SKEPTIC/COUNCIL` ids.

**3. Point the game's API at Foundry**
Set these on the Static Web App api settings:
```bash
az staticwebapp appsettings set -n afterlogin -g rg-afterlogin --subscription 3226d5fa-52e1-40c0-9c74-67e984356692 --setting-names FOUNDRY_PROJECT_ENDPOINT="<endpoint>" FOUNDRY_AGENT_WARDEN="<id>" FOUNDRY_AGENT_SKEPTIC="<id>" FOUNDRY_AGENT_COUNCIL="<id>"
```

**4. Auth for the Function**
The Function authenticates with `DefaultAzureCredential`. Give the Static Web App's
**managed identity** the **"Azure AI User"** role on the Foundry project (Portal → project
→ Access control → add role assignment). (For a quick local test you can instead use a
service principal via `AZURE_CLIENT_ID/TENANT_ID/CLIENT_SECRET` app settings.)

**5. (Optional) Wire the agents to your MCP server**
The agents above use function tools that `/api/reason` executes against the synthetic store.
To have **Foundry call your hosted MCP server directly**, add an **MCP tool** to each agent in
the portal (Agent → Tools → add MCP, URL = your `…/mcp` from `mcp/`). Then the agents fetch the
identity signals over MCP themselves — the fullest "real Microsoft agents" loop.

## Verify
Play a case (Divine → Summon) — the council header shows **"● live agents · N tools"**, and the
response's `source` is `azure-ai-foundry` (vs `github-models`/`azure-openai` for the inline path).

> SDK note: `setup.mjs` and `api/reason/foundry.js` follow `@azure/ai-agents` v1
> (`threads` / `messages` / `runs`). If your installed SDK version names methods differently,
> adjust those calls — the inline tool-calling agents remain the tested fallback either way.
