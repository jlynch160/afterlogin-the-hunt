# Changelog

## [0.3.0] - 2026-05-30 — genuine Foundry IQ + submission artifacts

- **Real Foundry IQ integration** (`backend/foundry-iq.mjs`): agentic, permission-aware, cited retrieval over Azure AI Search (the layer Foundry IQ is built on). Wired into the backend (`GET /api/ground`, `foundryIQ` health flag) and the MCP `summon_evidence` tool (async). Pluggable via `FOUNDRY_SEARCH_*` env; falls back to baked synthetic evidence offline. Verified end-to-end (fallback path).
- **Synthetic knowledge corpus** (`data/knowledge/*.md`) to index into Foundry IQ.
- **Submission docs:** `ARCHITECTURE.md` (mermaid diagram) and `SUBMISSION.md` (project description).
- **D&D turn-based combat, party roster, Autopilot, IQ-flow stepper, centered modal, cinematic WebGL grade** (prior iterations this session).
- Compliance pass vs Agents League rules: synthetic data only, no PII/secrets/confidential info, original work, procedural audio.


## [0.2.0] - 2026-05-30 — atmosphere, agents, soundtrack & backend

A major visual + systems pass.

### Visual overhaul
- **Real ghost apparitions:** floating sheet-spirits with wavy animated hems, glowing eyes, drifting motion, severity-driven menace (F/D wraiths get screaming mouths + red glow; admins wear crowns; service accounts spin gears; peaceful judged spirits close their eyes / gain a halo).
- **Shadow-demon creature:** the Possession is now a roiling multi-eyed horned monster with horns, smoke trail, claw tendrils reaching toward its next room.
- **Gothic environment:** moonlit arched windows with moonbeams, an arcing moon, drifting fog banks, dust motes, cobwebs, candle **sconces** and rising **embers** — and the sky lightens toward dawn.
- **Brightness fix:** softened the fog-of-war (wider lantern, lower darkness) plus candlelight so the manor reads clearly; ghosts haunt the gloom as faint apparitions even unlit.
- **Lantern flame** redrawn as a flickering green flame with halo; rooms are stone alcove arches; the Vault is an ornate banded door with a lock seal.

### Hunter Agents (NEW)
- Allied **L2 Warden** (flags un-investigated wraiths) and **L3 Sentinel** (chases, pins, and weakens the Possession) — sleek holographic constructs with rotating cores, scan-rings, and an energy beam to the threat.

### Soundtrack (NEW)
- Full evolving horror score: minor drone pad with slow filter sweep, wind/whisper bed, a creepy **music-box melody**, a **lub-dub heartbeat** that quickens, and a dissonant **tension drone** that rises as the threat nears the Vault.

### Professional HUD & realistic data
- Top **console bar** (tenant, spirits/resolved KPIs, live THREAT meter) and a legend key.
- Case files now show **realistic Entra attributes** (UPN, objectId, risk, MFA, created, groups, sign-in telemetry).
- Rite buttons rebuilt as clear color-coded **cards** with icon badges (fixes text bleed).
- **Responsive layout** — panels no longer overlap on narrow windows.

### Backend (NEW)
- `backend/server.mjs` — zero-dep REST API + risk-scoring engine over `data/identities.json` (synthetic Entra dataset). Derives haunting grade and load-bearing/orphaned from real signals; `POST /api/judge` returns the poltergeist for exorcising a load-bearing account. Shares one model with the game + MCP server.

## [0.1.0] - 2026-05-30 — first playable vertical slice

Initial build of **Afterlogin: The Hunt** for the Microsoft Agents League Creative Apps track.

### Engine (index.html — single file, zero dependencies)
- **Lantern fog-of-war:** the cursor is a green flame; a radial darkness overlay hides the manor, lantern glow + ghost wake reveal it. Vignette + SVG film-grain overlays.
- **Procedural ghosts:** severity-graded (A–F) wisps drawn as stacked translucent arcs with sine bob, awakening eyes, and grade tags — colour-coded by OWASP-style risk grade.
- **Fabric IQ spirit-threads:** on Divine, animated quadratic-bezier threads fan out to bound entities; **live bindings pulse green** (dashed, glowing), dead ones fray grey. This is the load-bearing "is it truly dead?" mechanic.
- **Foundry IQ grimoire:** per-account cited evidence panel (sign-in logs, CMDB, runbook lines, CA policy).
- **Three judgment rites** — Lay to Rest / Bind & Watch / Acknowledge the Living — with correct/incorrect scoring.
- **Poltergeist cascade** fail-state: exorcising a load-bearing account fires red cracks along its live bindings, screen shake, red flash, −60 ledger.
- **The Hunt:** a Possession ignites (~9s, impossible-travel takeover), hops the entitlement graph every 8s toward the Vault, and **possesses** un-judged grade-D/F ghosts (strength ×, harder to banish). Banish (L3 rite) gated on a cited risk dossier.
- **Systems:** Ledger of the Dead scoring, Dawn clock, win (all judged + threat banished, or survive to dawn) / lose (Vault breached), Scrying Pool event feed, narrator.
- **Procedural Web Audio:** ambient drone with LFO detune, convolution-reverb stings (divine/rest/possess/poltergeist/banish), dread swell scaling with threat proximity to the Vault. No audio assets shipped.

### MCP server (mcp-server.mjs — "built for Copilot")
- Zero-dependency newline-delimited JSON-RPC 2.0 over stdio (initialize / tools/list / tools/call).
- 10 tools sharing the game model: `list_rooms`, `divine_bindings`, `summon_evidence`, `cast_judgment`, `start_hunt`, `advance_hunt`, `summon_threat_evidence`, `banish_threat`, `read_ledger`, `reset_manor`.
- Verified end-to-end: divining reveals load-bearing threads; casting "rest" on a live account returns a poltergeist; the Hunt ignites and possesses bait.

### Notes
- **Synthetic data only** — all accounts, sign-ins, and policies fabricated; no PII.
- Vertical slice = one wing (8 rooms), one active threat type. Boss, multi-wing skins, neural-voice testimony, and leaderboard are roadmap.
