# 🎬 Afterlogin — Demo Video Talk Track (ElevenLabs-ready)

**Specs:** ~3 min 45 s (the rule allows 5 min max). Record screen with Snip at 1600×900.
Generate the narration in ElevenLabs (a calm, confident voice — e.g. *Adam*, *Daniel*, or *Brian* —
at ~0.9× pace), then lay it over the captured footage.

This talk track is written to **hit every Creative Apps judging criterion** in order: creative app →
Microsoft IQ (Foundry IQ) → GitHub Copilot → innovation, technical depth, and impact.

---

## ▶️ ElevenLabs paste block (just the narration — copy this whole block)

> Forgotten and over-privileged identities are the number one way attackers get into an organization. A stale admin. A service account no one owns. An app granted access that nobody reviews. The hard part isn't the tooling — it's the human judgment to know which door to close. Afterlogin is a game that trains it.
>
> One engine, two worlds. A tense security night for the pros — and a friendly, coached version for everyone else. You're the night auditor of a haunted estate, and every spirit is a real, forgotten account you have to judge before dawn.
>
> You investigate each one. Divine maps what depends on it. Summon sends a real, multi-agent council: a Warden and a Skeptic that call live tools and debate each other, and a Council that delivers a cited recommendation — but never the final verdict.
>
> That evidence is grounded by Foundry IQ — real, cited retrieval over Azure AI Search. The green "grounded" badge you see is live data, not decoration.
>
> Because the AI advises, but you decide. A Discernment meter rewards you for verifying before you act, and penalizes rubber-stamping the AI — the discipline of working safely with AI, turned into a mechanic. And every action maps to a real Microsoft control: deprovision, conditional access, an access review.
>
> Neglect a high-risk account, and it gets taken over. Now you fight the attack itself — and you win by choosing the control that actually stops it. A stolen session token needs a session revoke, not a password reset. The right control is decisive. The wrong one fails — and tells you why.
>
> And this whole identity engine is exposed as an M-C-P server — so I can drive the exact same tools straight from GitHub Copilot, in VS Code. Same agents, same investigation, now inside Copilot.
>
> Best of all — it's real, and you can watch it run. This is the live architecture map. One click fires the agents and lights the path: the orchestrator, the Warden, the tools, the Skeptic, the Council — with real latency and real citations.
>
> Afterlogin trains the human judgment that prevents the number one breach vector — for security pros and total beginners alike. A genuinely playable game, a real multi-agent system, Foundry IQ grounding, and GitHub Copilot. Built for the Microsoft Agents League. Survive the night.

---

## 🎥 Scene-by-scene (what to capture with Snip, matched to each line)

| # | Narration beat | Capture (Snip) |
|---|---|---|
| 1 | "…number one way attackers get in… trains it." | Boot keyhole-unlock → split-world landing |
| 2 | "One engine, two worlds…judge before dawn." | Hover **The Hunt** then **Helper Patrol**; click to enter; (optional) the mission briefing |
| 3 | "You investigate each one…never the final verdict." | Select Records Hall → **Divine** → **Summon**; show the council deliberating + the agent trace panel |
| 4 | "…grounded by Foundry IQ…not decoration." | The dossier's **Foundry IQ · cited evidence** with the green **● Grounded via Foundry IQ** badge |
| 5 | "Because the AI advises, but you decide…access review." | The 🧠 Discernment chip; toggle **🎓 Pro view** so the rite labels show real controls; pass a judgment |
| 6 | "Neglect a high-risk account…tells you why." | A boss kill-chain: the intro card, the stage tracker, pick a remedy (show a wrong-then-right) |
| 7 | "…exposed as an MCP server…inside Copilot." | **VS Code: GitHub Copilot Chat (Agent mode)** calling the afterlogin-identity MCP tools (see `COPILOT.md`) |
| 8 | "…watch it run…real latency and real citations." | **🗺 Live architecture map** → **▶ Run a live investigation**; nodes light up |
| 9 | "Afterlogin trains…Survive the night." | The **Dawn Breaks** finale + run report; end on the title |

---

## ✅ Pre-record checklist
- [ ] Set the model token + Foundry IQ live: `./go-live.ps1 -Sku basic -ModelToken github_pat_xxx` — so scene 3's agent panel and scene 8's "Run" show **live agents** (not "scripted").
- [ ] Do the Copilot + MCP setup (`COPILOT.md`) so scene 7 is real and recordable.
- [ ] Record at 1600×900, mute system audio (Web Audio will be in the capture — keep it low or muted so the voiceover is clear).
- [ ] Keep it **under 5 minutes**; ~3:45 leaves headroom.
- [ ] Upload to **YouTube or Vimeo** (the rules require this — a file in the repo doesn't count) and link it in the submission.

> Tip: the self-running showcase (`?demo`) is great B-roll for scenes 1–3 and 9 if you want hands-free footage to narrate over.
