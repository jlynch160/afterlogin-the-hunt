# Afterlogin: The Hunt × Helper Patrol — Submission

> Paste-ready copy for the Microsoft Agents League entry form (Creative Apps track).
> Live app: https://victorious-plant-0c1e7790f.7.azurestaticapps.net
> Repo: https://github.com/jlynch160/afterlogin-the-hunt

---

## Elevator pitch (one line)
A cinematic game that trains real identity-security judgment — powered by genuine, tool-calling AI agents that investigate, debate, and cite their evidence, while *you* make the call.

## Inspiration
Almost every modern breach happens **after** login — a dormant account, an over-permissioned service principal, a forgotten OAuth grant. The tooling to *detect* these is everywhere; what's missing is **trained human judgment** to act on them under pressure. Dashboards don't build that instinct. Games do. I wanted to turn the nightly grind of an identity analyst into something you'd actually *want* to practice — and to prove that AI agents can be a teammate in that loop without taking the human out of it.

## What it does
Afterlogin is one engine wearing two faces:

- **The Hunt** — a tense, gothic SOC night for security pros. You investigate haunted "souls" (synthetic identities) that represent real misconfigurations, and you decide their fate: revoke, quarantine, restore.
- **Helper Patrol** — the *same* engine reskinned as a bright, coached factory game for beginners, with guardrails and plain-language explanations.

In both, when you investigate an identity you **Summon the council**: a **Warden** agent and a **Skeptic** agent each call real function tools over an identity store, investigate independently, and **debate**. A **Council** agent then synthesizes a **cited advisory** — and deliberately *never* issues the verdict. **You** do. Human-in-the-loop isn't a disclaimer here; it's the core mechanic, and the game scores you on judging *after* verifying.

## How I built it
- **Frontend:** a single self-contained HTML file — DOM/CSS/SVG/Web Audio, zero dependencies — with a theme engine that swaps the entire game between the two worlds from one data attribute.
- **Agents:** `POST /api/reason` (Azure Function) runs a real **multi-agent, tool-calling loop** on **`gpt-4o` via GitHub Models**. The Warden and Skeptic call four function tools (`get_signin_activity`, `get_dependencies`, `get_oauth_grants`, `get_group_memberships`), loop until they can answer, then the Council cites and concludes.
- **Grounding:** `POST /api/ground` is a live **Foundry IQ** integration — permission-aware, cited grounded retrieval over **Azure AI Search**. The council's evidence is real, ranked, and sourced.
- **Interoperability:** the same identity tools are exposed over the **Model Context Protocol** (`mcp/`), so the agents' tools can be driven from **GitHub Copilot in VS Code** or any MCP client.
- **Resilience:** three execution tiers fall back safely — Azure AI Foundry connected-agents → inline live agents → a scripted tier — so the app *always* works, even offline.
- **Platform:** Azure Static Web Apps + managed Functions, with GitHub Actions CI/CD on every push.
- **A live architecture map** inside the app pings every endpoint on open and color-codes each of ~35 components by its *real* status — 10 of 11 services verify green live.

## Challenges I ran into
- Keeping it **honest**: agents that say "I'm not sure" are more useful — and harder to build — than agents that always sound confident. The Council is explicitly forbidden from issuing the verdict.
- **One engine, two tones**: making the same logic feel like both a horror game and a friendly trainer without forking the codebase.
- **Provably-real, not theater**: wiring genuine tool-calling, real grounded retrieval, and a live status board so a judge can *verify* the agents are real rather than take my word for it.
- Doing it all as a **single deployable file** with a graceful fallback at every tier.

## Accomplishments I'm proud of
- The council is a **genuine multi-agent debate**, not a single prompt — and you can watch the real tool-call trace on screen.
- **Foundry IQ grounding is live and cited**, verifiable in-app.
- A **human-in-the-loop mechanic** that actually teaches: the game rewards verifying before judging.
- One codebase that serves **both** a SOC professional and a complete beginner.

## What I learned
That the most valuable role for an AI agent in security isn't to decide — it's to **investigate well and argue honestly** so the human decides better. Designing for that changed every prompt, score, and UI choice in the app.

## What's next
- Pluggable real-tenant connectors (Entra ID sign-in logs) behind the same tool interface.
- A team mode where multiple analysts judge the same night and compare calls.
- More floors/scenarios authored from real incident patterns.

## Built with
`Azure AI Foundry` · `Foundry IQ (Azure AI Search)` · `Azure OpenAI / GitHub Models (gpt-4o)` · `Model Context Protocol` · `GitHub Copilot` · `Azure Functions` · `Azure Static Web Apps` · `GitHub Actions` · `HTML/CSS/SVG/Web Audio (zero-dependency)`

## Links
- **Play it live:** https://victorious-plant-0c1e7790f.7.azurestaticapps.net
- **Source:** https://github.com/jlynch160/afterlogin-the-hunt
- **Demo video:** _(add your YouTube/Vimeo URL here)_
