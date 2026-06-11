# Afterlogin: The Hunt — Submission

## One-liner
A game that trains identity-attack response, powered by a **real multi-agent system** —
Warden & Skeptic agents call tools to investigate, debate, and reach a **cited** advisory;
the human makes the call.

## What it is
The night auditor of a haunted estate triages "spirits" (forgotten accounts) before dawn.
An **Agent Council** investigates each one and advises — but the player decides. Neglect a
high-risk account and an adversary (**The Hollow**) takes it over, triggering a **multi-stage
kill-chain** the player fights by **choosing the control that actually remediates the attack**
(the right one is decisive; the wrong one whiffs with a one-line *why*). It's wrapped as a
polished game with two themes (haunted manor / cheery factory), boss-gated floors, a dice
combat system, ranks, a daily challenge, and a shareable audit report.

## Why it matters
Forgotten and over-privileged identities are a top breach vector, and the *gotchas* are
exactly what people get wrong (a password reset doesn't kill a stolen session token; revoking
sessions doesn't remove an OAuth grant; MFA doesn't strip standing Global Admin). Afterlogin
teaches the **threat → correct-control** mapping and the **human-in-the-loop** discipline of
not blindly trusting AI — through play.

## How it works (the agentic core)
- **`/api/reason`** is a genuine **multi-agent, tool-calling** endpoint. The **Warden** and
  **Skeptic** each call function tools (`get_signin_activity`, `get_dependencies`,
  `get_oauth_grants`, `get_group_memberships`) over a synthetic identity store, investigate
  independently, **debate**, and a **Council** agent synthesises a **cited** advisory + confidence
  — never naming the verdict.
- **MCP server** (`mcp/`) exposes the same tools over the **Model Context Protocol**
  (protocol-validated), so Copilot / VS Code / Foundry can drive them too.
- **Azure AI Foundry** path (`foundry/`) turns the council into real **connected-agents** with a
  one-command provisioning script; `/api/reason` routes to it when configured.
- The game **streams the live tool-call trace** on screen ("● live agents · N tools", with model,
  latency, and citations) — the agentic behaviour is visible, not claimed.
- Layered fallback: **Foundry → inline agents → scripted**, so it always works.
- **Synthetic data only — no PII.**

## Microsoft tech used
Azure Static Web Apps + managed Azure Functions · Azure OpenAI / GitHub Models (function calling)
· **Model Context Protocol** (`@modelcontextprotocol/sdk`) · **Azure AI Foundry Agent Service**
(`@azure/ai-agents`) · Entra/Defender/Purview/Sentinel concepts as the real controls behind the game.

## Mapped to judging criteria
- **Innovation** — a *game* as an agent front-end; agents that teach by being honest-but-uncertain;
  the same tools usable in-game *and* from any MCP client.
- **Technical implementation** — real multi-agent tool-calling loop, MCP server, Foundry path,
  CI/CD, graceful layered fallback. Validated end-to-end.
- **Use of the platform** — MCP + Foundry connected-agents + Azure OpenAI tool calling, deployed
  on Azure SWA, in-tenant inference option.
- **Impact** — teaches real attack-response and identity-governance judgment, with the exact
  gotchas, to a broad audience.
- **Demo quality** — a memorable, polished product (most submissions are bare chat UIs) with a
  self-running showcase mode and an in-game "Behind the Game" architecture reveal.

## Try it
**Live:** https://victorious-plant-0c1e7790f.7.azurestaticapps.net
**Repo:** https://github.com/jlynch160/afterlogin-the-hunt — see `README.md` (architecture) and
`mcp/` / `foundry/` for the agent layers.

## 90-second demo path
1. Read a case → **Divine** (map dependencies) → **Summon** (the agents investigate via tools; the
   trace streams on screen) → judge a clearly-live account: **Acknowledge**.
2. A *load-bearing* trap that **looks** dormant → overrule the surface read → **Bind & Watch**.
3. Neglect an account → **The Hollow** takes it → fight the kill-chain by picking the **right
   remediation** each stage (wrong tool whiffs with a why) → **Dawn**.
4. Open **📖 Behind the Game** → every element maps to a real Microsoft control.
