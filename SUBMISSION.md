# Afterlogin: The Hunt — Submission

**Microsoft Agents League · AI Skills Fest 2026 · Track: Creative Apps (GitHub Copilot)**

## Inspiration / problem
Every organization is haunted by **forgotten identities** — dormant service accounts,
orphaned admins, stale privileges. They're invisible, dangerous, and the #1 thing
attackers hunt. Identity-governance triage is also *tedious*, so it gets skipped.
Afterlogin makes it a game you *want* to play.

## What it is
A turn-based, **D&D-style** browser game where forgotten accounts are **ghosts** haunting a
manor and you're the auditor who must judge each one before dawn. The twist is the real
lesson: **not every "dead" account is safe to delete** — some are load-bearing service
accounts powering live jobs, and exorcising one unleashes a **poltergeist** (you broke
production). Meanwhile an active **monster** (an account takeover) hunts the ghosts and
advances toward the **Vault** each round — you fight it with **dice-based attacks**.

## How it uses the required tech
- **Built with GitHub Copilot**, and **built *for* Copilot**: an **MCP server** exposes the
  whole game as tools so **GitHub Copilot / Copilot CLI can play it headlessly**
  (`list_rooms`, `divine_bindings`, `summon_evidence`, `cast_judgment`, `banish`, …).
- **Foundry IQ (genuine integration):** the agent's evidence ("the grimoire") comes from
  **agentic, permission-aware, cited retrieval** over a knowledge base (Azure AI Search) of
  synthetic runbooks / CMDB / Conditional-Access docs (`backend/foundry-iq.mjs`,
  `/api/ground`). Offline, it falls back to baked synthetic evidence.
- **Fabric IQ (modelled)** as the identity **ontology** that determines load-bearing vs
  orphaned (the spirit-threads); **Work IQ (modelled)** for work-context signals.

## The agents (the heart of it)
Two AI **hunter agents** are your party:
- **Warden (L2) — reasons:** investigates each ghost, runs a visible analysis pipeline
  (Investigate → Fabric IQ → Foundry IQ → recommendation), and **recommends the correct rite**.
- **Sentinel (L3) — fights:** a party member that **rolls d20 attacks** on the monster each round.
- **Autopilot mode** lets the agents play the whole night hands-free.

## Multi-step reasoning / flow
Investigate → **Divine** (ontology) → **Summon** (cited grounding) → **Agent recommends** →
**Judge** → round resolves (you → Sentinel → monster). A visible **IQ pipeline stepper**
lights up each stage; the **Party roster** shows the agents' live status.

## How to run
- **Game:** open `index.html` (offline, single file).
- **Copilot:** register `mcp-server.mjs` in `.vscode/mcp.json`, then ask Copilot to play.
- **Backend / Foundry IQ:** `node backend/server.mjs`; set `FOUNDRY_SEARCH_*` env to enable
  real grounded retrieval (see README → "Genuine Foundry IQ").

## Responsible / compliant
- **Synthetic data only** — no PII, no secrets, no confidential or proprietary information.
- Original work; zero third-party dependencies; **procedurally generated audio**.
- Mild, tasteful fantasy theme (D&D-style); no real-person likenesses.

## Links (fill in before submitting)
- Demo video (≤5 min, YouTube/Vimeo): `<add>`
- Public GitHub repo: `<add>`
- Architecture diagram: see `ARCHITECTURE.md`
- Microsoft Learn username(s): `<add>`
