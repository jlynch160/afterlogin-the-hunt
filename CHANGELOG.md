# Changelog

## [0.4.8] - 2026-06-02 — Student dossier vocabulary + bright factory map cells

- **Kid vocabulary in the dossier/combat** — a tag-safe substitution (rewrites only text *between* tags, never `onclick`/`class`/attributes) maps the case + combat panels to kid wording under the Student theme: ghost→helper, Lay to Rest→Tidy Away, the Hollow/Hungry→the Gremlin, Warden→Checker, Sentinel→Chaser, banish→shoo away, judgment→decision, etc. The boss-intro card name/tier are kid-ified too.
- **Bright factory map cells** — under the Student theme the procedural room cells use a light blue factory-floor tint, a warm amber "needs tidying" glow and gold walls instead of the menacing red, a softened amber status label, and the scary red "dread eyes" are skipped. Pro rendering is untouched.

## [0.4.7] - 2026-06-02 — Student theme reads like a Student theme

- **Readable Student homepage** — the bright office-building hero was drowning the copy. Dimmed the art, restored a strong vignette, put the title/brief on a blurred dark panel, and switched the muted Pro text colours to high-contrast light + gold.
- **Kid intro crawl** — the Student theme now tells "The Helper Patrol" at Sunnyside Factory (lost helpers, the Gremlin, the Checker 🔎 + the Chaser 🧹, the morning bell) instead of the spooky "The Hunters" crawl. Theme swaps the `#crawl` content and restores the Pro version when you switch back.
- **Factory map** — under the Student theme the board relabels to a factory: `SUNNYSIDE FACTORY 🏭`, factory floor names, room names (Front Desk, Machine Room, Loading Dock, the Control Room…), "HAUNTED" → "NEEDS TIDYING", and the Vault → "THE CONTROL ROOM · THE CORE". Driven by a per-theme `map` of relabels with Pro wording as the fallback.

## [0.4.6] - 2026-06-02 — Student art is in

- **Student ("Little Helpers") art wired** — 11 new cartoon images in `assets/helpers/`: the sunny office-building main screen (`house.png`), the six helper characters, the Gremlin threat, and the three bosses. Added them to `HELPER_OK` so they load under the Student theme.
- **Light-background blend fix** — the ghost renderer screen-blends art so dark backgrounds drop out (tuned for the dark Pro art). The Student art has light backgrounds, so under the Student theme ghosts now draw source-over with the existing radial edge-feather (soft character portraits) instead of washing out white.

## [0.4.5] - 2026-06-02 — "Choose your mode" entry screen + theme-aware art

- **Profile / mode-select screen** — a new first screen (after the password gate) with two cards, **🎓 Student · The Little Helpers** and **👻 Adult · Spectral Response Unit**. Picking one sets the theme and dissolves to the home screen. Choice persists; you can still switch from the homepage picker.
- **Theme-aware art loading** — `loadAllArt()` now reloads from `assets/helpers/` when the Student theme is active (gated by a `HELPER_OK` manifest so there are no 404s before art exists) and clears the recolor/pattern caches on every theme switch, so Student art drops in automatically once added. Student homepage hero swaps to `assets/helpers/house.png` when present.

## [0.4.4] - 2026-06-02 — two audiences: a theme engine (Student + Pro)

- **Theme engine** — one codebase, two skins, chosen on the homepage:
  - **👻 Pro · "Spectral Response Unit"** — the original Ghostbusters-energy build (dark, violet, cinematic).
  - **🎓 Student · "The Little Helpers"** — a brighter, friendlier Minions-energy skin (blue + gold palette, gentler "lost helpers / messy files / the Gremlin" framing, softer homepage with the spookier flourishes dialed down).
- The accent colour is now fully themeable: converted ~95 hard-coded CSS purple glows to a `--accentRGB` variable and routed the 4 canvas accent draws through a JS `ACR` var, so a single `setTheme()` reskins the whole UI live (palette + homepage copy + 3-act brief). Choice persists in `localStorage`. Original-flavoured branding (no trademarked franchise names/art) to stay hackathon-compliant.
- *Next pass:* themed in-game vocabulary + new Student art (helper-bots, bright office rooms, the Gremlin) via the asset hooks.

## [0.4.3] - 2026-06-02 — Ask GitHub Copilot (live second opinion)

- **"Ask GitHub Copilot" button** in the Reasoning tab — sends the case signals to `/api/reason` and renders Copilot's verdict as a colour-coded second-opinion card that either **✓ concurs** with the agent council or **⚠ dissents** (recommending a different rite), with confidence + model + latency. Falls back to an on-device skeptic when no model is configured, so the beat always lands in a demo.

## [0.4.2] - 2026-06-02 — showcase moments + reasoning gets its own tab

- **Boss intro cards** — a dimmed, slam-in reveal card (art + name + HP/AC + stinger) when a floor guardian spawns; the final guardian gets the "⚜ The Final Guardian" treatment.
- **Animated d20** — every strike rolls a tumbling 20-sided die that spins through faces and lands on the actual roll; turns gold on a natural 20.
- **Room-entry reveal** — entering a chamber now fades the aura in and *draws the summoning circle itself* (scales up from the center) over ~0.5s.
- **Dawn camera pull-back** — when the manor is cleansed, the camera cinematically pulls back over the board before the Dawn end-screen.
- **Reasoning is now its own tab** — the ghost dossier splits into **⚖ Decision · ◈ Reasoning · 📜 Dossier**. The agent council, séance dial, and streaming trace get a full-width pane; the Decision tab shows a compact "the council recommends…" line with a *see reasoning ›* link. Opens on the Reasoning tab by default (with a live pulse dot while the agents are still thinking).

## [0.4.1] - 2026-06-01 — act-aware threats, ultimate boss, recurring nemesis, new recruits

- **Act-aware bosses** — each act has its own three guardians: Act I (Token Thief / Consent Daemon / The Hollow), Act II (Oversharer / Exfiltrator / The Hollow), Act III (Intruder / Pivot / **The Hollow Ascendant**), with act-specific abilities. `BOSSES`/`BOSS_ABILITIES` swap per act in `enterAct`.
- **The Hollow as a recurring nemesis** — the third boss is the same shadow across all acts: he **escapes** at the end of Act I ("a door left unsealed") and Act II ("someone is helping him"), and is finally destroyed as **The Hollow Ascendant** (HP 150 ultimate) in Act III. Act-aware end-screen title/verdict + dawn banner.
- **Ultimate final boss** for the last area (The Hollow Ascendant) with escalated stats + abilities.
- **New Sanctum recruits / agents** — the Archivist (auto-summons evidence), the Cartographer (kill-chain map + CA ward), the Oracle (foresight + vault ward), joining the recruitable Skeptic.
- **Narrative cleanup** — act-aware judgment feed (Purge/Quarantine for Act II, Sever/Contain for Act III instead of identity wording); act-aware poltergeist text.

## [0.4.0] - 2026-06-01 — three-act campaign, roguelite meta-loop, live agents

### Three-act campaign (maps to the Microsoft security stack)
- **Act I — The Haunting of Identity** (Entra): the original game — orphaned/dormant/privileged accounts, takeover, the load-bearing twist.
- **Act II — The Bleeding Archive** (Purview): data-protection ghosts (oversharing, mislabeled files, exfil channels); rites **Purge / Quarantine & Encrypt / Classify & Keep**; the data-poltergeist (purging a live business share) preserves the Act I twist.
- **Act III — The Convergence** (Defender XDR): identity + data collide into a live breach kill-chain; rites **Sever / Contain & Investigate / Confirm Benign**; the trap is over-reacting and severing a false-positive or load-bearing live asset mid-incident.
- Content-swap engine: `ACTS` config + `DATA*_SOULS/DETAILS/WHISPERS/LORE`, `enterAct(n)`; act-aware rite buttons + dossier panels; acts selectable from the Sanctum.

### Roguelite meta-loop ("Govern. Die. Return." — Hades-style)
- Persistent **Soul Essence** (`localStorage`); a share banks every run, win or lose.
- **The Sanctum** between-runs hub: 7 permanent boons that carry over (recruit the Skeptic as a 3rd agent, +starting Ledger/Essence, pre-divined rooms, +Sentinel damage, +essence/judgment, vault ward).

### Live agents + presentation
- **SWA managed functions** `/api/reason` (the Warden — provider-agnostic: Azure OpenAI/Foundry · GitHub Models · OpenAI) and `/api/ground` (Foundry IQ via Azure AI Search). Deployed site auto-uses `/api/reason`; falls back to on-device when unconfigured.
- Séance reasoning dial with story narration; live agent-council strip; souls-become-stars + constellation; cleanse shockwaves; haunted-room data-whispers; vault heartbeat; ghosts track the cursor; AI room scenes.
- Deployed to **Azure Static Web Apps** (Free) with a client-side access gate + asset manifest.

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
