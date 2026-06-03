# Changelog

## [0.7.5] - 2026-06-02 — Training Mode holds the turn for the coached card

- When the **coached feedback card** appears after a judgment in Training Mode, the game now **pauses the Sentinel's turn** — `playerTurn` / `checkDawn` / story / floor-clear are deferred behind a continuation that only runs when you click **"Got it — continue."** No more dice rolls or attacks firing underneath the popup. (Card backdrop also added to the click-ignore selector so it can't fall through to the map.)

## [0.7.4] - 2026-06-02 — "Kill-chain Severed" payoff on threat containment

- When the **ITDR remediation path** completes on a threat banish (confirm-compromised → revoke sessions → invalidate refresh tokens → disable → force MFA), it now ends with a big **"⚔ Kill-chain Severed"** banner + sting/flash. `startRemediation` gained a `done()` callback to drive it. For the final boss, the end screen is delayed so the full containment path *and* the banner play, then the sunrise finale.

## [0.7.3] - 2026-06-02 — The Microsoft Graph remediation reads as a *path*

- The Graph-API remediation overlay now shows **longer and clearer**: the call cadence is slowed (0.5s → 0.85s apart) and the completed panel holds ~3.6s longer so it reads on camera. Reframed as a sequenced **"REMEDIATION PATH · LIVE · graph.microsoft.com/v1.0"** with a **numbered step connector spine** that fills green as each call returns `2xx`, taller rows, and an **"N/N Microsoft Graph calls · all 2xx · complete"** progress line + stamp. One of the strongest "this is real remediation" beats for the demo.

## [0.7.2] - 2026-06-02 — Microsoft IQ made unmistakable on screen

- The dossier now shows an explicit **"🔎 Foundry IQ · grounded · cited · permission-aware"** badge above the cited evidence and a **"✦ Fabric IQ · semantic graph · live dependency mapping"** badge above the threads, with sharper prompts ("pull Foundry IQ grounded, cited evidence" / "map the Fabric IQ dependency graph"). Makes the required Microsoft IQ integration obvious to judges in a short demo.

## [0.7.0–0.7.1] - 2026-06-02 — Cinematic showcase, on-screen alignment credits, completion certificate

- **Cinematic showcase auto-play** — starting **Hunt Night** now auto-enters Cinematic Mode (HUD hides + letterbox) and exits when stopped: a polished hands-free loop for the demo video / booth.
- **On-screen hackathon-alignment credits** — the homepage foot now reads **"Built with GitHub Copilot · powered by Foundry IQ + Fabric IQ · synthetic data only."**
- **Downloadable completion certificate** — a **📜 Save certificate** button on the result screen renders a shareable PNG (rank seal, outcome, key stats, the Skills Practiced bars, date, and the Copilot/IQ credit). Theme-aware (kid-worded under Student). Reinforces the training-completion angle.

## [0.6.4–0.6.9] - 2026-06-02 — Threat-training reframe, MS-skill alignment, redesigned result screen, Student art fixes

- **Reframed as threat + remediation training** — the homepage now leads with "learn the identity threats that matter and exactly how to remediate each," and nudges Training Mode.
- **Threat learning moments** — every contained threat shows a remediation lesson card in Training Mode (account-takeover / exfiltration / breach by act), mapped to Microsoft Graph + Entra ID Protection / Defender / Purview.
- **Skills aligned to Microsoft** — the Skills Practiced report now uses Microsoft skill areas with **SC-300 / SC-200** tags: Identity lifecycle & access reviews (Entra ID Governance), Impact analysis before deprovisioning, Risk-based investigation (Entra ID Protection), AI-assisted SecOps (Security Copilot), ITDR (Defender for Identity). Tags hidden under the kid theme.
- **Redesigned result screen** — a circular glowing **rank seal**, stat **cards**, a two-column **dashboard** (Agent Performance + After-Action Report), unified card chrome, responsive + scrollable.
- **Fixed Student art not loading** — the theme-switch race guard was discarding Student art (rooms fell back to the procedural ghost). Art now loads once, themed; added a per-room **helper fallback** so every room shows a helper; brightened the Student homepage hero + vignette so the office background is visible again.

## [0.6.3] - 2026-06-02 — Training Mode (game-based training)

- A **Training Mode** toggle on the homepage (persisted in `localStorage`). When on, a green **🎓 TRAINING** badge shows during play, and after **every judgment** a coached card explains: ✓ Correct / ✗ Reconsider, what you chose vs. what the agents recommended, the **real-world lesson** (dormant triage · the load-bearing trap · leave the living), and the **Microsoft Entra mapping**. Fires on the normal path and the poltergeist (wrong-call) path. Kid-worded under the Student theme. Combined with the Skills Practiced report, the game now works as a guided training tool.

## [0.6.2] - 2026-06-02 — "Skills Practiced" competency report on the result screen

- The end screen now includes a **🎓 Skills Practiced** panel that maps the run to real identity-governance competencies, each with an animated progress bar and a **Mastered / Practiced / Keep-practicing** pill:
  - **Dormant & orphaned account triage** (how many identities you judged)
  - **Load-bearing vs. truly-dead** (poltergeists = breaking a live account)
  - **Evidence-based decisioning** (how often you divined threads / summoned evidence first)
  - **Agent-assisted adjudication** (your agreement % with the council)
  - **Account-takeover response / ITDR** (threats banished)
- Kid-worded under the Student theme. Turns each result into a short learning report.

## [0.6.1] - 2026-06-02 — Achievements + best-rank board

- **Achievements** — medals pop mid-run as a sliding toast and persist across runs (`localStorage al_ach`): First Verdict, Natural 20, Flawless Floor, Guardian Slain, Steady Hand (no poltergeists), Perfect Read (100% agreement, 5+ calls), Hold Until Dawn, The Hollow Ends. Each plays a chime.
- **Best-rank board** — the end screen shows your best rank across runs (`al_best`) and calls out a new record ("🏆 New best rank — A").

## [0.6.0] - 2026-06-02 — Showpiece pass: finale, AI scoreboard, hit-stop, sound design

Four "wow" beats for the demo:
- **Cinematic victory finale** — reaching dawn triggers a warm **sunrise sweep** rising over the manor, every judged soul streaks up in a burst, the camera pulls back, the **rank stamp** slams in, and a **triumphant audio swell** plays.
- **AI scoreboard** — the end screen now shows an **Agent Performance** panel with animated count-ups: souls reasoned, correct calls, accuracy %, avg confidence %, poltergeists, critical hits (tracked live during the run). Proof the agents actually played.
- **Hit-stop** — natural-20 crits and boss banishes trigger a brief **slow-mo + zoom-punch + flash** (and a boom on a banish) for cinematic weight.
- **Sound design pass** — procedural **die clatter** on every roll, a bright **chime on a crit**, a layered **victory swell**, a **boss roar** on the intro card, an impact **boom**, and a soft **click** on every button.

## [0.5.8] - 2026-06-02 — Calmer roll (less dancing)

- Replaced the multi-bounce trajectory with a single clean **roll-in from the side that spins fast and decelerates (ease-out) to a stop**, landing upright at four turns — no vertical bouncing. Softened the impact ring to a gentle settle.

## [0.5.7] - 2026-06-02 — The d20 actually rolls

- The die now **rolls in from off-screen along a bouncing arc** (three ground contacts), **spinning exactly four turns** so it lands upright, with **motion blur** that clears as it settles and a squash-and-settle **bounce** on landing. Added a **ground shadow** that swells on impact and an **expanding impact ring**; the glow, crit sparkle burst and result label are retimed to fire right as it lands, and the number keeps flickering through the whole roll, locking as it hits. Slightly bigger for demo visibility.

## [0.5.6] - 2026-06-02 — Juicier d20 roll

- Replaced the flat hexagon die with a **faceted SVG d20** (triangle facets + a centre face for the number) that **tumbles in 3D** (multi-axis rotation), lands with an **overshoot/settle bounce**, and pulses a radial **glow**. Adds a result label ("rolled N"), a **gold critical** treatment with a 12-point **sparkle burst** on a natural 20, and a red **fumble** look on a natural 1. The label is kid-worded in Student mode ("SUPER HIT! ⭐" / "oopsie!").

## [0.5.5] - 2026-06-02 — Kid-friendly factory room view + image-leak guard + dice on bosses

- **Room view de-haunted for Student:** entering a room is now a bright daytime factory inspection bay (light backdrop, factory-floor grid, hazard stripe) instead of the dark haunted chamber; a **gold inspection ring** replaces the red "summoning circle"; the labels read as kid text ("🧹 N little helpers in here!", "click to take a look!", kid-worded clue + possessed lines); the duplicate in-room cursor is dropped (the real OS cursor shows).
- **Image-leak fix:** added a generation token (`_artGen`) bumped on every theme switch — a stale async image load from the *previous* theme is now ignored, so adult art can't bleed into Student (or vice-versa) after switching.
- **Dice on bosses:** the tumbling d20 now also animates on the Sentinel's strike and party attacks, so boss/threat combat rolls show the die.
- Kid-ified the omen/HUD pill names (Witching Hour→Bonus Time, Bound Lantern→Power-Up, Blood Moon→Big Mess Day, etc.).

## [0.5.4] - 2026-06-02 — Kid-friendly dossier/reasoning + boss-art image leak fix

- **Dossier & reasoning now read for kids** in the Student theme: the tabs become **What to do · Thinking · Clues**, and the technical vocabulary maps to friendly words — account→helper, service account→helper-bot, admin→boss helper, dormant→sleeping, privileged→special, orphaned→lost, sign-ins→visits, MFA→the extra lock, evidence→clues, Fabric/Foundry IQ→the helper-map/the proof, Entra/Purview/Defender→the office/the file room/the guard-room, etc. (Tags, `onclick`, and classes are still left untouched.)
- **Fixed an adult-art leak:** the boss-intro card hard-coded `assets/boss<tier>.png`, so it showed the dark adult boss even in Student mode. It's now theme-aware (`assets/helpers/boss<tier>.png`).

## [0.5.3] - 2026-06-02 — Fix the dossier tabs (unclosed col-left)

- **Root cause of "all data shows, not separated by tabs":** the 3-tab refactor left `.col-left` unclosed — only `.btns` was closed before `.col-reason`/`.col-right` — so the Reasoning and Dossier panes were nested *inside* `.col-left` instead of being siblings of it. The tab CSS (which targets direct children) then couldn't show/hide them independently. Closed `.col-left` properly; the case panel's div tree is now balanced (verified 62/62 in the smoke test) and the **Decision · Reasoning · Dossier** tabs switch correctly.

## [0.5.2] - 2026-06-02 — Factory look for the Student map + robustness + image isolation

- **The Student map now reads as a factory** — the building behind the plan is a sawtooth (north-light) roofed factory with corrugated walls, a hazard-striped floor, a roll-up door, and a smoking smokestack; corridors are **animated conveyor belts** (moving chevrons + side rails); each room's centrepiece is a little **machine station** (blinking control panel, dial, meshing rotating gears) instead of manor furniture; faint factory **gears turn in the background**.
- **Theme art isolation** — switching themes now wipes the loaded image cache first, so the adult (Spectral) build only ever shows adult art and the Student build only ever shows Student art (`assets/helpers/`), with no bleed-through.
- **Reasoning/Dossier tabs hardened** — the tabbed case panel now uses plain block panes (not a CSS grid) so the active pane always fills and shows; verified via the headless smoke test that the Reasoning and Dossier panes are populated in **both** themes. (If they ever appear blank, you're on a cached older build — hard-refresh; the new **build 0.5.2** stamp on the mode-select screen + console confirms you're current.)

## [0.5.1] - 2026-06-02 — Fix HiDPI click/cursor offset (the real "can't click" cause)

- **Root cause found:** a `<canvas>` is a replaced element; `resize()` set only the bitmap size (`cv.width = W*DPR`) and never the CSS display size, and the canvas CSS had no width/height. On scaled/HiDPI displays (Windows 125%/150% → DPR > 1) the canvas rendered at bitmap size instead of the viewport, so the visible map was zoomed and **clicks landed offset from the cursor** — you couldn't hit rooms, and therefore couldn't open the reasoning/dossier. Pro masked it (the WebGL canvas was what displayed); Student shows the raw 2D canvas, exposing it. Fix: `width/height:100%` in the canvas CSS + set `cv`/`#gl` style size in `resize()`.

## [0.5.0] - 2026-06-02 — Student theme: full cleanup, kid-friendly throughout, smoke-tested

- **Kid vocabulary everywhere** — the substitution now also rewrites the **narration, the scrying feed, the act/banner cards** (not just the dossier), and uses a more robust matcher that rewrites every visible text run while leaving tags/attributes/`onclick` untouched (verified). So ghost→helper, the Hollow/Hungry→the Gremlin, dawn→morning bell, etc. apply across the whole UI in Student mode.
- **Themed story beats** — entering a room and the opening narration now read as the factory ("Sunnyside Factory — before the morning shift", "A little helper is in here — click it to take a look!"), using the factory room names.
- **Hardened start/flow** — the profile screen is dismissed *before* the theme is applied so it can never strand on top and block clicks; the render loop is crash-proof (one bad frame can't freeze the game).
- **Smoke-tested headless** — a Node harness mocks the canvas/DOM and runs `setTheme → newGame → render → update → enterRoom → selectRoom → renderCase` in **both** themes; all green, confirming the Student path has no runtime errors. (If clicking ever seems dead, it's a cached older build — hard-refresh; responses are served `no-store`.)
- Removed the temporary on-screen debug/error overlays.

## [0.4.9] - 2026-06-02 — Student theme: bright, clean, not scary

A full de-spook pass so the factory reads as a friendly kids' game, not a dimmed horror game with bright cells:
- **Daytime backdrop** — replaced the night sky / moon / stars / gothic moonlit windows with a bright blue-to-warm sky and soft puffy clouds.
- **No fog of war** — the dark lantern darkness overlay is skipped entirely; the whole factory is lit. The lantern glow is a soft warm pool instead of spectral green, and the cursor is a normal pointer.
- **Removed the creepy layers** — drifting spirit wisps, the floating "tells" whispers, the film grain, the dark edge vignette, and the dread overlay are all off in the Student theme; the WebGL dark cinematic grade is disabled (plain bright 2D).
- **Gentle audio** — drops the wind/whisper bed, the haunting music-box melody and the heartbeat, and lowers the overall volume; only a faint soft pad remains.
- **Cheerful ambience** — the random scrying-feed lines are now friendly factory moments (humming helpers, beeping forklifts) instead of cold-breath whispers.

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
