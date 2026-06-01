# 🕯️ Afterlogin: The Hunt

**A haunted-house identity-governance game where the ghosts are your forgotten accounts, the ontology decides who's really dead, and every exorcism comes with a citation.**

Built for the **Microsoft Agents League — Creative Apps track** (GitHub Copilot). Single-file, zero-dependency, runs offline. MajorKey-themed.

> Synthetic data only. No PII, no real tenant data. Every account, sign-in, and policy is fabricated for demonstration.

---

## The pitch in one breath

Every dormant, orphaned, or over-privileged account that lingers past its purpose becomes a **ghost** haunting the Manor. You are the **Revenant Auditor**. Sweep your green lantern to reveal the rooms, investigate each spirit, and pass judgment before dawn. The twist that makes it a game *and* a real safety lesson: **not every ghost is dead** — some are service accounts still silently powering a live process. Exorcise one of those and you trigger a **poltergeist cascade** (you broke production).

And something is **hunting the ghosts**. Leave a high-severity spirit un-judged and the Hungry will **possess** it — turning a passive orphan into an active threat racing toward the **Vault** (Tier-0). That's the truest thing about identity security: *your forgotten accounts are the attack surface.*

## Run it

**The game** — just open `index.html` in any Chromium browser, full screen. Click **Begin the Night**. Move the mouse (the lantern), click a room, **Divine** the bindings, **Summon** the grimoire, then judge. Watch the Scrying Pool (top-left) for the Hunt.

**The MCP server** — the same manor, playable headlessly by GitHub Copilot:

```bash
node mcp-server.mjs
```

Register it for Copilot in VS Code (`.vscode/mcp.json`):

```json
{ "servers": { "orphan-manor": { "command": "node", "args": ["mcp-server.mjs"] } } }
```

Then in Copilot Chat: *"List the rooms, divine the Boiler Room, and only lay it to rest if it's truly dead."* The browser game and the MCP server share one model — the visual showpiece and the agent surface are the same product. That's the track's "built for Copilot" bonus, earned rather than bolted on.

## How the Microsoft IQ layers are load-bearing (not decorative)

| Layer | Role in the manor | Why it's load-bearing |
|---|---|---|
| **Fabric IQ** | The **spirit-threads** — the entity ontology (account → owns → mailbox, → member-of → group, → *invoked-by* → live job). "Is this ghost dead?" is a multi-hop graph question. | Strip it and the game is random clicking; the threads are the only way to know a "dead" account is secretly load-bearing. |
| **Foundry IQ** | The **grimoire** — cited evidence per judgment (sign-in logs, CMDB, runbook line, CA policy) and the threat's risk dossier (impossible travel). | Every exorcism and banishment must be justified with a citation; that's what makes it an audit artifact, not a guess. |

## Identity threats — the Hunt

Active threats are a second, *predatory* class of entity (reusing the L3 Threat-Response flow):

- **The Possession** — account takeover (impossible travel). Ignites mid-game and **moves** along the entitlement graph toward the Vault.
- **Possession-of-the-ignored** — if it reaches an un-judged grade-D/F ghost, it **possesses** it (strength ×, harder to banish). This is the interlock: cleaning ghosts starves the predator; ignoring them feeds it.
- **Banish (L3 rite)** — requires summoning the cited risk dossier first (no banishing on hearsay), then revoke/isolate.

## How it maps to the judging rubric

| Criterion | Weight | How Afterlogin scores |
|---|---|---|
| Accuracy & Relevance | 20% | Real orphaned-account / attack-surface problem; redeems to an audit-ready triage tool; Fabric IQ load-bearing; MCP bonus hit |
| Reasoning & Multi-step | 20% | Each judgment is a multi-hop ontology + cited-evidence inference; the threat AI pathfinds and prioritizes bait |
| Reliability & Safety | 20% | The *entire game* is "don't make the unsafe call" — poltergeist on a wrong exorcism, false-positive tension, human-judged, cited |
| Creativity & Originality | 15% | A voiced haunted-house IGA game — nobody ships this |
| UX & Presentation | 15% | Lantern fog-of-war, procedural ghosts, animated threads, Web Audio mood, a live predator |
| Community vote | 10% | "Exorcise the ghost," beat-the-Hunt tension, shareable |

## Build status

**Real now (this repo):**
- Lantern fog-of-war engine, procedural ghosts (severity-graded), animated Fabric IQ spirit-threads
- Foundry IQ cited grimoire; three judgment rites with correct/incorrect consequences
- **Poltergeist cascade** fail-state (exorcising a load-bearing account)
- **Live threat** that ignites, hops the entitlement graph, and **possesses** un-judged ghosts; banish rite gated on cited evidence
- Ledger scoring, Dawn clock, win/lose, procedural Web Audio (drone, stings, dread swell)
- Working **MCP server** (10 tools) so Copilot can play it headlessly

**Roadmap (stretch):**
- Neural-voice ghost testimony (wire the San Mateo TTS WAVs through a reverb)
- The **Shadow Steward** boss; multiple manor wings (Finance / Healthcare / SLED skins)
- Co-op "Hunt Night" + competitive leaderboard for the League's Show & Tell battle
- Point `divine_bindings` at a real (synthetic) dormant-account export → gamified IGA triage that emits cited deprovisioning recommendations

## Hunter Agents (allied)

Your own autonomous defenders patrol the manor (the L2/L3 roles from identity-agent-demo), rendered as sleek holographic constructs with scan-rings and an energy beam:

- **Warden (L2)** — patrols and auto-**flags** un-investigated wraiths (surfaces grade + dormancy in the Scrying Pool), narrowing your search.
- **Sentinel (L3)** — **hunts the Possession**: chases it across the graph, **pins it in place** (it can't advance while the Sentinel is co-located), and **weakens** its strength. You still land the banish — the agents buy you time and intel.

## Backend & realistic data

A standalone, zero-dependency Node REST API scores a realistic synthetic Entra-style dataset the way a real IGA triage tool would:

```bash
node backend/server.mjs     # http://localhost:8787
```

- `data/identities.json` — synthetic identities with real-shaped fields (objectId GUIDs, UPNs, `lastInteractiveSignIn` / `lastNonInteractiveSignIn`, `riskLevel`, `assignedRoles`, `memberOf`, `oauth2Grants`, `runbookReferences`, owner status).
- **Risk-scoring engine** derives the haunting grade (A–F) from privilege + dormancy + MFA + risk, and resolves **load-bearing vs orphaned** from live bindings (recent app-only auth, runbook refs, active OAuth, sealed CA policy).
- Endpoints: `GET /api/identities` (graded), `GET /api/identities/:id`, `GET /api/threats`, `POST /api/judge {id,rite}` (returns the poltergeist if you exorcise a load-bearing account), `GET /api/ledger`, `GET /api/ground?q=` (Foundry IQ), `GET /api/health`.

## Genuine Foundry IQ (grounded, cited retrieval)

The agent's evidence ("the grimoire") is wired to a **real Foundry IQ knowledge layer**
(`backend/foundry-iq.mjs`) — agentic, permission-aware, cited retrieval over Azure AI Search
(the infrastructure Foundry IQ is built on). It's **pluggable**: configure it and the MCP
`summon_evidence` tool + the backend `/api/ground` return live cited passages; leave it
unset and everything falls back to the baked synthetic evidence (so the demo runs offline).

**Enable it:**
1. In your Microsoft Foundry project, create a **Foundry IQ knowledge base** (Azure AI Search index, e.g. `orphan-manor-knowledge`) and **index the synthetic corpus** in `data/knowledge/*.md` (runbooks, CMDB, CA policy).
2. Set environment variables (never commit secrets):
   ```bash
   export FOUNDRY_SEARCH_ENDPOINT="https://<your-search>.search.windows.net"
   export FOUNDRY_SEARCH_KEY="<query-key>"
   export FOUNDRY_SEARCH_INDEX="orphan-manor-knowledge"
   # optional, for extractive answers:
   export FOUNDRY_SEMANTIC_CONFIG="<semantic-config-name>"
   ```
3. `node backend/server.mjs` → `GET /api/health` now reports `"foundryIQ": true`, and `GET /api/ground?q=...` returns cited results. Copilot driving the MCP `summon_evidence` tool gets the same live grounding.

> Synthetic knowledge only — no PII or confidential data is indexed.
- The browser game, the MCP server, and this backend share **one scoring model** — synthetic data only, no PII.

## Files

```
orphan-manor-demo/
├── index.html              # the whole game — open this
├── mcp-server.mjs          # MCP server — "built for Copilot"
├── backend/
│   ├── server.mjs          # REST API + risk-scoring engine
│   └── foundry-iq.mjs      # genuine Foundry IQ grounded-retrieval client
├── data/
│   ├── identities.json     # synthetic Entra-style dataset
│   └── knowledge/          # synthetic corpus to index into Foundry IQ
├── assets/                 # drop-in AI creature art (+ prompts in README)
├── ARCHITECTURE.md         # architecture diagram (submission)
├── SUBMISSION.md           # project description (submission)
├── staticwebapp.config.json
├── README.md
└── CHANGELOG.md
```

*Personas, accounts, and signals are fictional. For sales conversations, demos, and the hackathon only.*
