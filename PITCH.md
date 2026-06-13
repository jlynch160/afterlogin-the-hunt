# Afterlogin — submission pitch (copy/paste ready)

## One-liner
**The only entry that's a *playable* training game teaching real attack-response with real
Microsoft controls — powered by *provably*-real multi-agent tooling — for SOC pros *and* beginners.**

## Short description (portal)
Afterlogin: The Hunt is a cinematic game that trains the human judgment behind identity security.
You're the night auditor of a haunted estate; every "spirit" is a real account. An AI **agent
council** (Warden + Skeptic debate, a Council synthesises) investigates via real function tools —
but it can be wrong and never names the verdict. **You** decide. Neglect a high-risk account and an
adversary takes it over; you fight the **multi-stage kill-chain** by choosing the control that
actually stops the attack (a stolen session token needs a session revoke, not a password reset).

Every action maps to a real control — **Lay to Rest = deprovision, Bind & Watch = Conditional
Access + monitoring, Acknowledge = access review** — surfaced live in **Pro view**. One engine, two
faces: a tense SOC night (The Hunt) and a coached, friendly trainer (Helper Patrol).

## Why it wins its lane (say this, in this order)
1. **Playable, not watchable.** Most security entries are dashboards, briefs, or attacker-viz you
   *watch*. Afterlogin is a game you *play* that *trains a real, employable skill*.
2. **Provably real agents.** "Multi-agent" is everywhere this year — few *prove* it. `/api/reason`
   is a genuine tool-calling Warden+Skeptic+Council loop; the **same tools are exposed over MCP**;
   there's an **Azure AI Foundry** connected-agents path; and the game **streams the live tool-call
   trace on screen** with an in-app **architecture explorer** showing the running tier. Open the
   repo and the MCP/Foundry code is right there.
3. **Real Microsoft controls, taught.** Not narrative dressing on data — the actual Entra / Defender
   / Purview / Conditional Access mapping, with the gotchas people get wrong, reinforced in a
   run-end training debrief.
4. **Two audiences.** SOC professionals get a sharp tactical sim; everyone else gets a coached
   onboarding (mission briefing + Pro view + objective rail) that teaches the loop in 60 seconds.
5. **Human-in-the-loop as a mechanic.** A Discernment meter rewards verifying before acting and
   penalises rubber-stamping the AI — the discipline of working safely with AI, made playable.

## Microsoft tech
Azure Static Web Apps + managed Functions · Azure OpenAI / GitHub Models (function calling) ·
**Model Context Protocol** · **Azure AI Foundry Agent Service** · Entra/Defender/Purview/Sentinel
concepts as the real controls behind the game. **Synthetic data only — no PII.**

## Links
- 🎮 Live: https://victorious-plant-0c1e7790f.7.azurestaticapps.net
- 📦 Code: https://github.com/jlynch160/afterlogin-the-hunt
- 🎬 Demo: `afterlogin-demo.webm` (2¼-min directed tour) — or click **▶ 90-second showcase** in-app
