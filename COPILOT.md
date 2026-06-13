# Use this project's MCP server from GitHub Copilot (VS Code) — ~5 min

This satisfies the **GitHub Copilot (required)** criterion *honestly* and on-spec: you connect this
repo's **Identity-Governance MCP server** to **GitHub Copilot in VS Code** and drive the agents'
real tools from a Copilot Chat. The Creative Apps track explicitly asks for exactly this
("build MCP servers that integrate directly with GitHub Copilot").

## Prerequisites
- **VS Code** (1.102+), **GitHub Copilot** + **Copilot Chat** extensions, signed in with a Copilot
  plan, and **Node 18+**.
- Install the server deps once:
  ```bash
  cd mcp && npm install
  ```

## 1. Add the MCP config
Create **`.vscode/mcp.json`** in the repo root (a ready-to-copy `.vscode/mcp.json.example` is in the
repo — just rename it):
```json
{
  "servers": {
    "afterlogin-identity": {
      "type": "stdio",
      "command": "node",
      "args": ["server.js", "--stdio"],
      "cwd": "${workspaceFolder}/mcp"
    }
  }
}
```
VS Code launches the server automatically — no separate terminal needed.

## 2. Start it + confirm the tools
- Open the **MCP view** (Command Palette → **MCP: List Servers**) → start **afterlogin-identity**
  (or it starts on first use). You should see it healthy with **5 tools**.
- Open **Copilot Chat** → switch the mode dropdown to **Agent** → click the **🔧 tools** icon and
  confirm `afterlogin-identity` is checked. The tools are:
  `list_accounts · get_signin_activity · get_dependencies · get_oauth_grants · get_group_memberships`

## 3. Drive the agents' tools from Copilot Chat (record this)
Ask Copilot, in Agent mode, things like:
> *"Use the afterlogin-identity tools: list the accounts, then for **svc-billing-reconcile** get its
> dependencies and OAuth grants, and tell me whether it's safe to deprovision and why."*

> *"Which accounts have live dependencies but no recent interactive sign-in? Call get_dependencies
> and get_signin_activity and flag the load-bearing ones."*

Copilot will call your MCP tools, show the tool invocations, and reason over the cited results —
the same identity-governance engine the game runs, now driven by Copilot. **Screen-record ~30–60s
of this** for the demo video.

## 4. Document it truthfully in the README
Replace the GitHub Copilot placeholder in `README.md` with what you actually did, e.g.:
> *Built in VS Code with GitHub Copilot. The project's MCP server (`mcp/`) is connected to GitHub
> Copilot via `.vscode/mcp.json`; in Copilot Agent mode I drive the five identity tools from chat to
> investigate accounts — see the demo at [timestamp]. Copilot Chat was also used to [debug X /
> generate Y / explain Z].*

Only state what's true. The MCP-in-Copilot integration above is real and reproducible — that alone
is a solid, on-spec GitHub Copilot story.

## Troubleshooting
- Tools don't appear → MCP view → **Restart** the server; check Node 18+ and that `npm install` ran in `mcp/`.
- "Agent" mode missing → update VS Code + the Copilot Chat extension.
- Prefer HTTP? `cd mcp && npm start` (serves `http://localhost:8080/mcp`) and use
  `{ "type": "http", "url": "http://localhost:8080/mcp" }` in `mcp.json` instead.
