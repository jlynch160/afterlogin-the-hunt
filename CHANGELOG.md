# Changelog

## [0.32.0] - 2026-06-14 — Live Architecture board, rebuilt as a categorized systems map

- **The architecture map is now a full systems board.** Six labelled lanes — THE AUDITOR (inputs) →
  a boxed REASONING CORE → TOOLS & GROUNDING → AZURE → THE STAGE → THE VERDICT — of ~33 type-tagged
  node cards (LLM / DET / RAG / MCP / IDX / FUNC / GFX / OUT…), each with a one-line role, a phase
  badge, and a green dot for live Azure services. A numbered "life of a turn" ribbon runs across the
  top (You choose → … → The night is remembered).
- **Interactive:** hover any node to light its phase (ribbon + phase-mates); click to pin its full
  detail in the sidebar; a Legend explains every tag. **⚡ Trace a turn** fires a real /api/reason
  call and walks the flow phase-by-phase through the board, reporting the live tier. Theme-aware.

## [0.31.0] - 2026-06-13 — Contest-compliance: real Foundry IQ grounding + precise claims

- **Real Foundry IQ integration, wired in.** Summon now calls /api/ground (permission-aware, cited
  grounded retrieval over Azure AI Search) and surfaces the citations in the council’s Foundry IQ
  evidence with a ● Grounded via Foundry IQ badge. Falls back to baked evidence until provisioned —
  see SETUP-IQ.md to activate (~10 min).
- **Corrected overclaims** to be precise/defensible: the in-game footer no longer says built with
  Copilot / Foundry IQ + Fabric IQ; it now states the actual stack (Foundry IQ grounded retrieval ·
  MCP · Azure AI Foundry · synthetic data). README gains a Required-criteria checklist (Foundry IQ
  real; Fabric IQ noted as thematic; a truthful GitHub Copilot placeholder) and a Copilot/Foundry-IQ
  architecture diagram. Added SETUP-IQ.md provisioning runbook.

## [0.30.0] - 2026-06-13 — Interactive architecture map + game-screen rail fix

- **Architecture map is now interactive.** Tap any node to open a detail popover explaining what it
  does — and for the agents/tools/MCP, the exact function tools it calls (Warden → get_signin_activity
  + get_dependencies; Skeptic → get_oauth_grants + get_group_memberships; etc.). Selecting a node
  highlights it and its connected data-edges. Nodes lift on hover; opens focused on /api/reason.
- **Fixed the game-screen objective rail** colliding with the top HUD — it now sits as a slim status
  pill just above the action console (where the loop actually happens), and the redundant static
  console plate was retired.

## [0.29.0] - 2026-06-13 — Live Architecture Map

- **A full-screen, animated map of the real system.** Game → /api/reason → Warden/Skeptic/Council
  → identity tools → store, with the MCP server and Azure AI Foundry tiers and the model provider —
  drawn as glowing glass nodes on a grid, connected by colored flowing data-edges (agents green,
  tools blue, MCP violet, model gold, Foundry dashed).
- **It actually runs the agents.** A ▶ Run a live investigation button fires a real /api/reason
  call and lights up the path from the returned trace — Warden → tool → Skeptic → tool → Council —
  then prints the tier, latency, tool-call count and confidence. The header probes and shows the
  live tier (Scripted / Live agents · model / Foundry). The clearest possible proof the agents are
  real. Open it from the menu dock (🗺 Live architecture) or inside Behind the Game.

## [0.28.0] - 2026-06-13 — Legibility pass: Pro view, objective rail, training debrief

- **Pro view (🎓).** A HUD toggle reveals the real Microsoft control behind every judgment — Lay to
  Rest → Deprovision/lifecycle workflow · Bind & Watch → Conditional Access + monitoring · Acknowledge
  → certify/access review. Persists across sessions. Makes the security depth legible to judges.
- **Objective + loop rail.** A slim always-on tracker shows the loop (Investigate → Verify → Judge)
  with your current step lit, plus the goal and souls-judged count — no more "what do I do now?".
- **Training debrief.** Dawn and defeat now list the real attack-response you practiced this run —
  stolen session token (≠ password reset), illicit OAuth grant, Tier-0 admin takeover, load-bearing
  account binding, evidence cross-examination — so the lesson lands and sticks.

## [0.27.0] - 2026-06-13 — Mission briefing: why this exists + how it trains real security skills

- **A guided briefing now plays when you Begin.** Choosing The Hunt or Helper Patrol opens a
  cinematic 5-beat walkthrough (Risk → Investigate → Verify → Real skills → Survive) that explains
  WHY the game exists (forgotten/over-privileged identities are the #1 breach vector), HOW you play
  (investigate with the AI council, but verify before you judge — human-in-the-loop), and HOW every
  move maps to a real Microsoft control (Lay to Rest = deprovision, Bind & Watch = Conditional
  Access + monitoring, Acknowledge = access review; the right control stops the right attack). Skippable,
  theme-aware, with a progress map + dots. Makes the training purpose unmistakable from the first click.

## [0.26.1] - 2026-06-12 — Recorded 2¼-minute directed demo video

- **`afterlogin-demo.webm`** — a directed ~135s tour recorded at 1600×900: boot unlock → both
  worlds (hover-expand) → the **agent architecture explorer** → Divine/Summon with the **council
  deliberating + cited evidence** → verdict cinematic → the **Token Thief kill-chain** (stage
  tracker, attack telegraph, control hover-card, d20 over the crypt arena) → the living map →
  the Dawn Breaks finale report. Ready for the submission portal or a voiceover.

## [0.26.0] - 2026-06-11 — Living mini-map + agent architecture explorer

- **Living mini-map.** A corner mini-map shows the current floor at a glance: every room as a
  grade-colored dot, your position ringed in accent, possessed rooms pulsing red, and **the Hungry
  as a larger pulsing red eye** moving in real time. Click it to open the full map. The strategic
  layer is now always visible.
- **Agent architecture explorer.** Behind the Game now opens with a live diagram of the real
  system — game → /api/reason → Warden/Skeptic/Council → identity tools, with animated data-flow
  connectors, the MCP + Foundry tiers, and **the currently-running agent tier** read live from the
  probe. The codex is proof now, not prose — a built-in judge tour of the agentic core.

## [0.25.1] - 2026-06-11 — Factory console color fix + bottom-stack collisions

- **Helper Patrol console buttons fixed** — Divine/Summon and the three rites were still manor-dark
  (unreadable blobs) on the light factory console; they now use light surfaces with slate text,
  amber rite icons, and mint hovers. Locked rites are less washed out.
- **Collision fixes** — the nemesis taunt no longer overlaps the Divine/Summon row (raised above the
  console, with a readable dark-red helpers variant), and the contextual hint no longer collides
  with the INVESTIGATE · THEN JUDGE plate; toast raised accordingly.

## [0.25.0] - 2026-06-11 — Living ghosts, essence pickup, the Hungry on-screen, floor atmospheres

- **Living ghosts.** The spirit portrait breathes (slow scale/brightness pulse), its halo swells,
  and a spectral light occasionally flickers across the frame — the center of the screen is alive.
- **Essence fly-to-HUD.** Correct judgments burst glowing essence orbs that arc into the 🔮 counter,
  popping it as each lands.
- **The Hungry has a presence.** Every time the predator moves, a dark shadow sweeps across the
  screen and red eyes blink at the edge of the dark — dread you can see, not just a bar.
- **Floor atmospheres.** Each floor carries its own ambient grade — warm candlelight on the ground
  floor, cold blue moonlight on the upper floor, a red-tinged closing vignette in the attic
  (softened to warm orange in Helper Patrol). Ascending visibly raises the stakes.

## [0.24.0] - 2026-06-11 — Combat + judging: telegraphs, kill-chain tracker, verdict cinematics, control cards

- **Attack telegraphs.** The boss now winds up visibly (⚠ forging a golden key / hollowing your
  hand / a direct strike) so you counter BEFORE the hit — proactive defense, like real SOC work.
  Shields now blunt a telegraphed strike with credit in the log.
- **Kill-chain stage tracker.** Multi-stage bosses show their chain as pills across the combat panel
  — current stage glowing amber, defeated stages struck through green. The MITRE mental model, at a
  glance.
- **Verdict cinematics.** Each judgment plays its rite: Lay to Rest — the soul ascends a light
  shaft; Bind & Watch — golden chains slam across the frame; Acknowledge — a green seal stamps. Each
  with a banner naming the real control executed (lifecycle workflow / scoped credential + Sentinel
  watch / access review certified).
- **Control hover-cards.** Hover any remediation mid-fight for a card: the real control name and
  what it does (or does NOT do) at this stage — the game becomes a flashcard deck in combat.

## [0.23.2] - 2026-06-11 — Generated combat arena paintings (PNG upgrade)

- **Two new generated arena plates** replace the vector stand-ins (the loader auto-prefers PNG):
  the **manor crypt arena** — carved gothic arch alcoves, a moonbeam, candles, and a glowing
  two-ring ritual circle with rune lights on the floor; and the **factory dusk arena** — three
  glowing arched windows, a light shaft, machine silhouettes with pipes, and a spotlight ring
  center-stage. Rendered with the in-house pixel painter (stone/floor noise texture, additive
  glows, fog, vignette, grain).

## [0.23.1] - 2026-06-11 — Four new generated scene plates (procedurally painted PNGs)

- **Generated four original images in-house** with a custom pixel renderer (gradients, additive
  glows, value-noise fog, silhouettes, film grain → real PNGs): the **Reliquary** backdrop (manor:
  glowing vials on dark shelves, warm counter light · factory: sunny supply nook), and the **Dawn
  finale** plates (manor: god-rays sunrise behind the manor silhouette with lit windows · factory:
  bright morning windows). Wired in behind the store and the dawn screen, theme-aware.

## [0.23.0] - 2026-06-11 — Unified design language + combat arena art (new images)

- **One design language on every surface.** The case file, agent panel, coach, dawn/defeat cards and
  combat all now speak the command-console aesthetic — gold-trimmed glass, accent top edges — and
  every button has press feedback.
- **Combat is an arena.** The fight screen now sits in a framed KILL-CHAIN ENGAGED panel over a
  painted arena backdrop — **two new original artworks shipped** (hand-authored SVG: a candlelit
  crypt-hall with grand arches + ritual circle for the manor; a dusk factory floor with glowing
  windows + spotlight for Helper Patrol). The loader prefers `arena.png` if you generate one
  (prompts included) and falls back to the SVG art.
- **Art Pack v2** (`art-prompts-v2.md`): ready-to-run prompts for arena/store/dawn/vault plates —
  drop the PNGs in and they appear with zero code changes.

## [0.22.0] - 2026-06-11 — Game-screen presentation: command console + HUD chips + stage light

- **Command console.** Divine/Summon and the three judgment rites now sit in a framed, gold-edged
  glass console at the bottom center (with an INVESTIGATE · THEN JUDGE plate and an accent top
  line) — a real game command bar instead of floating buttons. The toast no longer covers the
  Divine/Summon row (it slides in above the console), and the contextual hint docks over the console.
- **HUD chips.** Every top-bar stat (clock, score, wards, discernment, the Hungry tracker) is now a
  uniform glass chip with a stat-colored border; floor tabs styled as serif segments with a glowing
  active state; per-rite icon colors (rest/bind/acknowledge).
- **Stage light.** A soft spotlight cone falls on the spirit from above and an accent floor-glow
  pools beneath the portrait; roster tiles gained grade-colored edge bars; testimony width tightened.

## [0.21.0] - 2026-06-11 — New loading screen: The Unlock

- **The loader is now a door-opening sequence.** An ornate keyhole sigil draws itself in light inside
  the arcane ring while the progress arc completes; the lock *turns* with a golden light-burst —
  and then the screen **splits open down the middle** (purple half left, gold half right), revealing
  the two-world landing beneath. The loading screen literally unlocks the door into the game.
- Key-flavored status lines (forging the night key… → unlocking the door…); the emoji crossfade and
  halo are retired in favor of the drawn keyhole; halves carry per-world color accents; still
  skippable on click/key and fast-tracked in ?demo mode.

## [0.20.2] - 2026-06-11 — Landing layout fixes: slim one-row dock, no more overlap

- **Fixed the dock covering Helper Patrol.** The bottom dock lost its centering to the same
  animation-transform bug as the old menu (fadeup ended on transform:none) — it sat right-of-center
  on top of the patrol nameplate. It now centers with margin auto (no transform) and is a **single
  slim row** (difficulty · rank · daily · relics · links) instead of a tall card.
- World nameplates raised clear of the dock; the agent strip is now readable glass chips; the seam
  line fades out beneath the title instead of running through it; reduced the purple cast on the
  factory side; footer whisper moved to the corner.

## [0.20.1] - 2026-06-11 — Landing polish pass: title sequence, parallax, living seam

- **Title-sequence entrance.** The two worlds slide in from their edges, the seam draws itself down
  the screen, the × medallion pops in, and the crown/dock fade up — every load opens like a cinematic.
- **Mouse parallax.** The two paintings drift subtly against the cursor (opposite directions) and the
  AFTERLOGIN crown counter-drifts — the page feels dimensional. (Fine-pointer only, headless-safe.)
- **Living seam.** Energy now visibly flows along the dividing line; hovering a world tints the
  title glow green (Hunt) or gold (Patrol) via :has().
- **Better patrol hero.** Swapped the factory side to the painterly sunny factory interior — a true
  stylistic partner to the manor painting (no baked-in text).
- **Craft details.** Per-side shift labels (Night shift / Day shift), poster corner brackets, film
  grain, a crown glow halo, ✦ flourishes, and a compacted dock with a green→gold accent line.

## [0.20.0] - 2026-06-11 — All-new landing: the split-world diptych

- **A completely new title screen.** The landing is now a cinematic split-screen diptych — the
  moonlit manor (The Hunt) on the left, the sunny helper factory (Helper Patrol) on the right —
  divided by a glowing seam with a pulsing × medallion. Hover a world and it expands while the other
  dims; click it to enter that world directly (the old Manor/Factory toggle is gone — the worlds ARE
  the choice). AFTERLOGIN crowns the seam in a purple-to-gold gradient that bridges both identities.
- Each side is alive: stars, lightning, wisps and embers haunt the manor; golden sun-motes drift
  through the factory. Per-side painted art with slow Ken Burns, cinematic color-grade veils, and
  world-styled CTAs (Begin the Hunt / Start the Patrol) that fill on hover.
- Difficulty, career/relics, Behind the Game, and the showcase link live in a slim glass dock at the
  bottom. Fully responsive — the diptych stacks vertically on phones with a horizontal seam.

## [0.19.0] - 2026-06-11 — Painted landing page + professional UX pass

- **The landing page is now the artwork.** The menu backdrop is a full-bleed painted hero — the
  moonlit manor (The Hunt) / the robot-helpers welcome office (Helper Patrol) — with a slow Ken
  Burns drift and cinematic scrims; the procedural SVG silhouettes, moon/sun, stars and bats are
  retired. Tighter content rhythm (title glow refined, slimmer agent cards, compact badges) and the
  column scrolls instead of clipping on short screens.
- **Professional foundations.** Custom thin scrollbars everywhere (no more OS scrollbars in the case
  file/store/codex), keyboard focus rings, brand selection color, font smoothing, and
  prefers-reduced-motion support.
- **Real fixes.** The judgment result text + flash were off-center (left:40%) — now centered. The
  frozen ⏱ 04:12 HUD clock is now a real narrative clock that advances toward 6:00 dawn as souls
  are judged. The HUD gets a legibility scrim in both themes; chips gained hover states; combat
  scrolls instead of clipping on short screens; orphaned CSS removed.

## [0.18.0] - 2026-06-11 — Cinematic boss intros + Dawn victory sequence

- **Boss-intro splash cards.** When a guardian (or the final boss) rises, a cinematic card slams in:
  a red slash sweep, the boss portrait pulsing in a ring, its name, and the kill-chain tease — a beat
  of anticipation before the fight. (Generic takeovers keep the POSSESSED veins.)
- **Dawn victory sequence.** The win screen is now a payoff: the sun rises while a golden light-wash
  sweeps up the scene, sun rays fan out and slowly turn, and the Dawn Breaks title flourishes in.

## [0.17.0] - 2026-06-11 — New mechanic: Cross-examine (deduction)

- **Cross-examine.** After Divine, you commit a hypothesis *before* verifying — is this spirit safe
  to retire, or load-bearing? Read the dependency graph + evidence and call it. A correct read (then
  Summon to confirm) banks +8 ✦ and raises Discernment; a misread nudges you to check the live
  bindings. Turns the games signature gotcha (dormant ≠ safe) into an active deduction.

## [0.16.0] - 2026-06-11 — New mechanic: Relics (roguelite meta-progression)

- **Relics.** Five persistent boons unlock as your lifetime ✦ grows (Tithe, Bulwark, Analyst’s Eye,
  Oracle’s Favor, Whetstone). Equip one on the menu and it applies at the start of every run —
  giving a reason to come back and a sense of growth across nights. Locked relics show what lifetime
  total unlocks them. (Skipped in Daily Challenge, which stays a fixed test.)

## [0.15.0] - 2026-06-11 — New mechanic: the Discernment meter (human-in-the-loop, as a system)

- **Discernment vs Hubris.** A new HUD meter (🧠) makes the games thesis a mechanic: judging a soul
  *after* verifying it with Summon raises Discernment; judging on the surface read alone (or breaking
  a load-bearing account) breeds Hubris. **Clear-eyed (≥75) multiplies your score ×1.25; Hubris (≤25)
  taxes it ×0.8.** Threshold crossings toast, and the Dawn summary reports your Discernment + awards a
  Verify-first discipline skill. Turns dont blindly trust the AI into something you can feel.

## [0.14.0] - 2026-06-11 — Combat juice + factory-theme polish + floor transitions

- **Combat juice.** Hits now land: the boss portrait flashes + staggers, crits punch a golden
  full-screen flash, big hits and boss attacks shake the screen, and a red vignette pulses when
  your Resolve takes damage (on top of the existing floating numbers + 3D d20 roll).
- **Factory-theme pass.** Fixed elements stuck manor-purple in Helper Patrol mode — the IQ pills and
  the HUD chips now adopt the light factory palette.
- **Floor transition.** Changing floors now plays a quick cinematic wipe instead of an instant cut.

## [0.13.2] - 2026-06-11 — Moon/sun no longer overlaps the title

- **Moved the moon (manor) / sun (factory) disc into the top-right corner and tamed its glow** so it
  clears the now-centered AFTERLOGIN title instead of washing over the text.

## [0.13.1] - 2026-06-11 — Fix menu centering (root-cause)

- **Re-centered the entire main menu.** The shared `fadeup` intro animation ended on
  `transform:translateX(-50%)`, which permanently shifted every menu element left by half its own
  width (wider elements like the title shifted more) — the left-skewed look. `fadeup` now animates
  vertically only; the one genuinely centered element (`.testimony`) uses a new `fadeupC` variant.

## [0.13.0] - 2026-06-11 — Factory theme gets its room art

- **Helper Patrol (factory) room art is in.** Added all 15 `assets/helpers/room_*.png` backgrounds
  (Front Desk, Records Bay, Pay Station, Machine Room, Conveyor Control, Control Room, Forgotten
  Storeroom, Supply Cage, etc.) so every room in the factory theme now has its painted background
  instead of a flat gradient.
- **Roster tiles use the art too.** `roomSrc` now returns the helpers room art in factory theme, so
  the room list thumbnails show the painted rooms (were blank gradients before).

## [0.12.6] - 2026-06-11 — "Behind the Game" moved inline into the menu

- **Relocated the "Behind the Game" entry point** from a floating top-right chip to an inline button
  in the menu column, directly under the Start button — part of the flow, less cluttered, and it
  keeps its factory-theme variant so it reads correctly in both worlds.

## [0.12.5] - 2026-06-11 — Boot screen: explicit "Hunt × Helper Patrol" dual identity

- **Both modes, named.** The boot center icon now crossfades between 🕯️ (The Hunt) and 🏭 (Helper
  Patrol), and the subtitle is two clearly-styled mode badges — **🕯️ The Hunt × Helper Patrol ☀️**
  (manor-purple vs. factory-gold) — so it reads instantly as one game with two worlds.

## [0.12.4] - 2026-06-11 — Boot screen: arcane summoning ring + both-worlds palette

- **Summoning ring.** The candle now sits inside a rotating arcane sigil ring (two counter-spinning
  tick rings + a progress arc that *draws itself* as the game loads) with a rotating conic aura.
- **Both worlds in one.** The boot now blends the haunted manor and the sunny factory: a purple↔gold
  conic aura, mixed warm/cool rising embers, a purple→gold shimmer across the wordmark, a warm glow
  in the corner, and loading text that nods to both ("booting the helper factory…", "waking the
  sunnyside crew…"). Wordmark also wipes in left-to-right.

## [0.12.3] - 2026-06-11 — Cinematic boot screen

- **Richer loading screen.** The boot card is now a small cinematic: drifting ember particles, a
  pulsing glow halo behind the candle, a moving shimmer-sweep across the AFTERLOGIN wordmark,
  vignette + slow-drifting fog, and **cycling status text** ("lighting the candles… → reading the
  ledgers… → summoning the council… → the hunt begins…"). Still skippable and `?demo`-aware.

## [0.12.2] - 2026-06-11 — Boot splash + cursor glow (shipped-product sheen)

- **Boot splash.** A branded title-card boot screen (candle sigil, AFTERLOGIN wordmark, fill bar)
  on load, fading to the menu after ~1.7s; skippable on click/key, and shortened automatically in
  `?demo` showcase mode so it never covers the attract loop.
- **Cursor glow.** A soft accent-colored glow trails the pointer (screen-blended), enabled only on
  fine-pointer devices and hidden on touch. Both are fully guarded for headless safety.

## [0.12.1] - 2026-06-11 — Agent-tier status chip + mobile pass

- **Agent-tier chip.** A HUD chip shows which tier is running — **◈ scripted** by default, lighting
  up to **◈ live agents · gpt-4o** or **◈ Foundry agents** (accent glow) when detected via a new
  lightweight `/api/reason` probe (no agent run). Credibility at a glance.
- **Mobile/responsive pass.** A desktop-safe reflow at ≤760px: the roster collapses, the case file
  becomes a full-width bottom sheet above the judge buttons, the portrait shrinks, the HUD wraps,
  and the agent panel moves up so nothing collides — playable on a phone.

## [0.12.0] - 2026-06-09 — Showcase the agents: live trace panel, sound, attract mode + polish

- **Live agent-activity panel.** A mission-control panel streams the real agents' tool calls in
  real time (`🛡 Warden → get_signin_activity ↳ …`, `🔍 Skeptic → get_dependencies ↳ 1 live binding`),
  with model · source · latency and the cited sources. Appears when the live agents run.
- **Self-running showcase mode.** A hands-free attract loop ("▶ Watch the 90-second showcase" /
  `?demo`) auto-plays investigate → overrule the AI → boss kill-chain → dawn with captions; loops,
  exits on click/Esc.
- **Sound & music.** Theme-aware ambient bed (eerie minor manor / warm major factory) with a gentle
  melodic layer; respects the mute toggle.
- **Factory room art wired.** `setBg` now uses `assets/helpers/room_<account>.png` if present, else
  the muted gradient — drop in generated art and it appears.
- **Visual polish.** Centered, bounded main-menu column (was left-shifted); muted the blinding
  factory backgrounds; relocated "Behind the Game" to a floating top-right badge.
- **Submission artifacts.** Judge-facing `README.md` (architecture diagram + agentic story) and a
  `SUBMISSION.md` pitch mapped to the judging criteria.

## [0.11.0] - 2026-06-09 — A real multi-agent council: tool-calling Warden + Skeptic

The Agent Council is no longer scripted prose — `/api/reason` is now a genuine **multi-agent, tool-calling** endpoint.

- **Two autonomous agents investigate, then debate.** The **Warden** and **Skeptic** each call function **tools** (`get_signin_activity`, `get_dependencies`, `get_oauth_grants`, `get_group_memberships`) over a server-side **synthetic identity store**, form independent reads, and the Skeptic hunts the contradicting signal the Warden may have missed.
- **A Council agent synthesises** a cited advisory + a confidence — and still **never names the verdict** (human decides).
- **Returns the reasoning trace + citations.** The game shows a **"● live agents · N tools"** badge, an *"agents investigating…"* state, the synthesised line, and a toast of the **tool calls + cited sources** (Entra sign-in logs, Purview runbook index, CMDB, OAuth consent audit…).
- Falls back to the scripted council when no model is configured. Works with **Azure OpenAI / GitHub Models / OpenAI** (function calling).
- **MCP server (`/mcp`).** The same identity-governance tools are also exposed over the **Model Context Protocol** (real, protocol-validated server) so any agent — Copilot, VS Code, Claude, or an **Azure AI Foundry** agent — can call them. Includes a Dockerfile (Azure Container Apps) and the Foundry agent setup guide.
- **Azure AI Foundry path.** `/api/reason` now has an optional **Foundry agent** tier: when `FOUNDRY_*` settings are present it routes the council to real **Azure AI Foundry agents** (threads/runs + function-tool execution), and falls back to the inline agents otherwise. Ships a one-command provisioning script (`foundry/setup.mjs`) that creates the Warden/Skeptic/Council agents, and a runbook. Layered: **Foundry → inline agents → scripted.**

## [0.10.0] - 2026-06-08 — Boss-gated floors, multi-stage fights, and real attack-response training

**Progression**
- **Boss-gated floors.** Each floor's **guardian must be defeated to ascend** — higher floors are locked (🔒), and a guardian can't be judged, only *confronted*. Beat the Ground guardian → unlock the Upper, etc. The Attic boss (**The Hollow**) is the finale.

**Combat is now real attack-response training**
- **Multiple-choice remediations.** Each round you pick a control from a rotating set; **choosing it rolls the d20** for execution. The choices **refresh after every boss attack**.
- **The right control is decisive, the wrong one whiffs — with a "why."** Each attack maps to its correct remediation and the *gotchas* (e.g., a password reset does NOT kill a stolen session token; revoking user sessions doesn't remove an OAuth grant; MFA won't strip standing Global Admin). Verified: ideal control ≈ 100% win; wrong control ≈ 7%.
- **Multi-stage bosses.** Each guardian is a **kill-chain** of 2–3 stages, each a distinct attack step with its own ideal control (Token Thief: revoke token → lock re-entry; Consent Daemon: revoke grant → pull the forwarding rule; The Hollow: strip PIM → rotate the krbtgt → run a SOAR playbook). Generic takeovers now teach the basics too.

**Power-ups (Reliquary)**
- New: 🧠 **The Analyst** (marks the ★ ideal control), 🧘 **Steady Hand** (no fumbles), 🧱 **Fortified Resolve** (+10 max Resolve), 🌬️ **Second Wind** (survive your last ward breaking once). Fixed **Mark of Precision** (it had gone inert).

**Investigation**
- **Divine vs Summon are now distinct.** Divine maps bindings but leaves them *unverified* + a preliminary council read; **Summon** (essence) reveals which bindings are **live**, the cited evidence, the Skeptic's full read, and the confidence %.

**Polish + fixes**
- Theme (Manor/Factory) is now chosen **only at the title screen** and locked for the run.
- Sunnyside factory visual pass — warm title, readable text, distinct agent cards.
- Removed an unreachable store item, cleaned dead combat code, and guarded the tutorial's Summon so a Frugal-daily start can't soft-lock.

## [0.9.0] - 2026-06-07 — A real game: honest AI, a living hunt, combat, and a roguelite meta

A large content + systems pass turning the encounter into a genuine, replayable game.

**Judgment — the AI advises, you decide (and it never lies)**
- The Agent Council is now **honest but humble**: it gives an accurate surface read, **surfaces its own doubt** (the real counter-signal), shows **calibrated confidence**, and **defers the verdict to you**. It never states a wrong recommendation — you fail by ignoring the flag it raised.
- **Divine vs Summon are now distinct.** Divine (free) maps the dependency graph but leaves bindings **unverified** and gives only a **preliminary** council read. **Summon** (costs essence) reveals **which bindings are live**, pulls the cited evidence, unlocks the **Skeptic's full read + live-AI**, and reveals the **confidence %** — judging unverified is a real gamble.

**Difficulty**
- **Difficulty tiers** — Casual / Auditor / Nightmare — scale AI confidence visibility, Summon cost, and Hungry speed.
- **Floor escalation** — deeper floors cost more to investigate and the Hungry moves faster.
- **Blind trust has teeth** — a poltergeist now haunts the room and **surges the Hungry two steps toward the Vault**.

**The hunt — a named, living antagonist**
- The threat is now **The Hollow** (the **Tangle** in the factory), and it **taunts you by name**.
- **Proximity dread** — when it's one room from striking, the screen flickers, a red vignette pulses, and it growls.
- **Active counter-play** — a **Seal the Door** (Conditional Access) prompt holds it for 3 steps.

**Combat — a real round-based fight**
- Bosses now **fight back** each round: drain your **Resolve**, heal, or weaken your next strike.
- New **Resolve bar** — break it and you **lose a ward**; lose them all and the manor falls.
- **Four remediations per round**, each a real control: ⚔ **Strike** (d20) · ⚡ **Revoke** (CAE) · 🛡 **Harden** (MFA) · 💥 **Disrupt** (Defender XDR).
- **Per-floor / per-act bosses restored** with their original names + art: **The Token Thief** (Ground · boss1), **The Consent Daemon** (Upper · boss2), **The Hollow** (Attic · boss3).

**Addiction loops + meta-progression (saved locally)**
- **Streak combo** — chain correct verdicts for a ×2→×5 score & essence multiplier; a miss resets it.
- **Roguelite ranks** — lifetime score climbs an Auditor ladder (Novice → Grandmaster) shown on the title + debrief.
- **Daily Challenge** — one seeded manor per day with a rotating modifier and your daily best.
- **Achievements + leaderboard** — six unlockable badges and a top-5 high-score table.

**Showcase + polish**
- **"Behind the Game" codex** — maps every element to its real Microsoft control.
- **Shareable audit report** — a branded "Manor Audit Report" PNG at the finale.
- **Cinematic title screen** — shimmering wordmark, moonbeam god-rays, drifting wisps, rolling fog, a shooting star, vignette.
- **Cleaner Dawn/Loss debrief** — the summary now sits in a readable card instead of overlapping the sunrise.

## [0.8.2] - 2026-06-05 — Live AI agents (that can still be wrong) + push-to-deploy

- **Live LLM reasoning, on a leash.** The Agent Council now generates its Warden/Skeptic arguments from a live model via `/api/reason`, but the game **assigns each agent the stance to argue** — so the council can still be deterministically wrong (the load-bearing traps) or split, and it **never names the verdict**. A **● live AI** badge appears when a model is configured (`GITHUB_MODELS_TOKEN` etc.); otherwise it falls back to the scripted reasoning.
- **Push-to-deploy CI/CD.** Added a GitHub Actions workflow so every push to `master` builds the Node Functions API and deploys the whole solution to the Static Web App automatically — no more manual CLI, and it fixes the local api-build failure.

## [0.8.1] - 2026-06-05 — Harder by design: the AI advises, you decide

Turns "click what the AI said" into a real judgment game — the human is the final authority.

- **Advisory, not authoritative.** The council argues the case and shows its **confidence %**, but **never names the verdict** — *"the verdict is yours."*
- **A fallible AI.** On the load-bearing traps (`svc-billing-reconcile`, `svc-etl-nightly`) the council confidently recommends *lay to rest* — but they're load-bearing; following blindly triggers a **poltergeist**. The tells live in the Fabric IQ graph (live thread) and the cited evidence. **Overruling the AI is the win.**
- **Split councils.** On governed/ambiguous accounts (`adm-breakglass-02`, `app-orchard-connector`) the Warden and Skeptic **openly disagree** and confidence drops — you break the tie. Clear-cut spirits stay high-confidence, so the skill is knowing *which* to trust.
- **Triage under pressure.** Divine is free; **Summon now costs 4 essence** (the cited evidence) — the same currency as the Reliquary — so you choose whether to verify a fishy case or judge on partial info at your own risk.

## [0.8.0] - 2026-06-05 — A new manor experience: the Encounter UX is now the site

A ground-up front-end redesign, built around the original idea and plot. The classic build is preserved at **/index-classic.html**.

- **Cinematic title** — a moonlit Gothic-manor silhouette (lit windows, drifting clouds, bats, stars, rising embers) with a **Manor / Factory switch** to the daylit Sunnyside variant, introducing the three AI agents.
- **Encounter view** — face one spirit at a time over real painted room art: read its testimony, **Divine** the Fabric IQ dependency graph, **Summon** the cited Foundry IQ evidence, watch the **AI Agent Council** (Warden / Skeptic / Council — live-LLM hookup with scripted fallback) reason to a verdict, then pass the rite.
- **The manor map** — a real 3-floor node-graph floor plan (rooms at their true coordinates, wired by the real corridors), with walls, a compass, a threat legend, hover popups, room-to-room zoom transitions, floor navigation and mouse-parallax.
- **The Hungry** — a shadow-wraith that paths the corridors toward the nearest high-risk room, possesses it (full-screen red-vein takeover) and forces a real **d20 dice fight**; leave the master key and it becomes a boss. Reach the Vault and the manor falls.
- **The Reliquary** — spend essence (gathered from laid-to-rest spirits) on 13 **Wardens / Rites / Charms**, each a real Microsoft security control (Security Copilot, Sentinel SOAR, CAE, PIM, Conditional Access, Defender XDR, ISPM…).
- **Cinematic dawn finale**, a guided first-room **tutorial**, a **scorecard debrief**, **sound** (synth ambience + SFX), and a unifying **film-grain / vignette / grade** layer across every screen.

## [0.7.18] - 2026-06-03 — Performance: the Pro theme is much lighter on the machine

- The spectral (Pro) theme ran the full WebGL post pipeline every frame at up to 2× device pixel ratio, which pegged weaker GPUs. Fixes:
  - **DPR capped 2 → 1.4** (on HiDPI displays that's roughly half the pixels to render *and* upload to the GPU each frame).
  - **Quarter-resolution bloom** (4× cheaper blur passes) and **god-ray samples 10 → 6**.
  - The **breathing vignette** no longer allocates a gradient per frame and is skipped when the shader is active (the shader already vignettes).
  - **Adaptive auto-degrade**: if frame time stays high, the GPU post-pass first drops to half-rate, then disables entirely (plain 2D) with a "Performance mode" note — so it self-heals on slow machines instead of dragging the whole system down.

## [0.7.17] - 2026-06-03 — Stairwell gates the next level · also published on the jefflynch107 tenant

- **The next level no longer starts until the stairwell cinematic finishes.** Clearing a floor now *holds* the whole game for the ~3.5s climb (threats, dice, clicks, auto-step all frozen, like the Graph-panel freeze), then **automatically carries the agents up to the next floor** — so the ascent and the new level begin only when the animation is over.
- **The third boss stays gated behind the Master Key.** The auto-advance routes through `floorLocked`, so the Top Floor (and its boss) won't open until a random ground-floor helper has dropped the key (with the existing safety drop guaranteeing it by ground-floor clear).
- Also stood up a second production deployment on the **jefflynch107@gmail** tenant (new Static Web App).

## [0.7.16] - 2026-06-03 — Cinematic post-processing: per-act color grade + hit-punch

- The existing WebGL post pass (bloom · god-rays · chromatic aberration · grain, Pro theme) now **color-grades per act**: Act I (Entra) leans **violet**, Act II (Purview) **teal**, Act III (Defender) **red** — applied as a shadow tint + a highlight multiply so each layer of the saga has its own filmic look. Added a **"punch"** that briefly **intensifies chromatic aberration + brightness on hits/crits** (driven by screen shake). Degrades gracefully to the plain 2D canvas if the shader can't compile.

## [0.7.15] - 2026-06-03 — Replace the Student homepage art (IP-safe original)

- Swapped the Student homepage hero (`assets/helpers/house.png`) for an **original, screen-faced yellow helper-robot** scene — the previous art read as a well-known studio's characters and was an IP risk (now in a public repo). New design is a distinct robot cast (single glowing rectangular screen-face + antenna + egg body), no goggles/overalls. Added a `?v=2` cache-buster on the background so the swap shows immediately. Updated `ART-PROMPTS-STUDENT.md` with a stronger, negative-constrained prompt to keep future art clear of the same problem.

## [0.7.14] - 2026-06-03 — Scrying Pool feed, premium treatment

- The event feed (Scrying Pool / "Helper News" under Student) got a glow-up: a **pulsing, rotating scrying-orb** in the header, a **live blinking indicator**, a soft header glow + a shimmering gradient underline, and **glowing accent bars** on each line (green for good, red for bad). Header copy follows the theme.

## [0.7.13] - 2026-06-03 — Visual pass: living map · cinematic homepage · living characters + grand finale

- **Living map atmosphere.** A new `drawSkyLife` layer brings the sky alive with subtle camera parallax: drifting clouds, a glowing **sun with rotating rays** (factory) / occasional **shooting stars** (manor), fireflies near the ground in the factory, and a **gently breathing cinematic vignette** over everything. The map no longer feels static.
- **Cinematic homepage.** The cold-open got depth and motion: **pointer parallax** across the sky/manor/fog/title layers, floating **bokeh** orbs for depth, a periodic **light-sheen sweep** across the “Afterlogin” title, and a richer ember/star field. (Plays nicely with the existing idle Ken-Burns attract.)
- **Living characters.** Every ghost/helper now sits in a **soft breathing presence aura** keyed to its grade colour (on top of the existing float bob), so they feel alive instead of pasted-on.
- **Grand dawn/win finale.** The sunrise sweep is now a real **rising sun disc + volumetric god-rays**, every laid-to-rest soul **streaks up into the sky as a star**, and a **fireworks volley** bursts across the scene — extra colourful for the kid version. Lengthened so it lands as the “hold on it” closing shot.

## [0.7.12] - 2026-06-03 — Hard freeze on the Graph panel · the boss is gated behind the Master Key

- **The game now truly FREEZES while a Microsoft Graph remediation panel is on screen.** `update()` halts the entire world the moment `G.remed` is set — threats, agents, dice, particles, the camera, even the lantern all hold still; only the panel's own clock + scheduled timers keep ticking so it animates and completes. Canvas clicks are ignored across the whole panel (only its **Continue ▶** button responds), and Watch Mode's auto-stepper waits it out (with a quicker ~2.4s auto-resume in Watch Mode vs. the generous 9s when a human is reading).
- **The boss won't appear until you find the Master Key and open the boss door.** The Top Floor (Control Room / Tier-0) is now sealed **only the Master Key opens it** — clearing the floors below is no longer enough. Since the boss only spawns when you step onto that floor, **no key ⇒ no boss.** A safety net guarantees the key drops by the time the ground floor is cleared (even if its key-holding spirit was lost to a poltergeist), so the boss floor can never soft-lock. Locked-door messaging now points you to the key.

## [0.7.11] - 2026-06-03 — Floor-clear stairwell, dramatically upgraded

- The ascend cinematic is now a proper showpiece:
  - **Dimensional staircase** — solid steps with glowing tread edges and 3D side-shading that cascade up in sequence (instead of flat bars).
  - **Volumetric god-rays** stream from the portal (masked, slowly rotating), and the **portal bursts** with a brightness flare + a radial light shock the moment the agents arrive.
  - **Polished agents** — glowing orbs with bobbing icons and soft contact shadows that climb a clean staircase path in a staggered procession, fading into the doorway light.
  - **Confetti burst** (multi-color) rains at the top, plus rising sparkles throughout.
  - **Cinematic push-in** (the whole scene eases from a slight scale), a **shimmering light-sweep "FLOOR CLEARED / LEVEL DONE!"** title, and a **second "victory" sting** when they reach the portal. Runtime lengthened to ~3.7s so it lands.

## [0.7.10] - 2026-06-03 — Control Room is now a wing *inside* the building (truly attached)

- **Root cause fixed:** the Control Room read as "floating" because **neither the camera nor the building walls included it** — on the lower floors it was drawn off to the right, unframed and outside the walls. Now:
  - A shared **`floorBounds()`** encloses the Control Room with the current floor, so **`drawManorFrame` / `drawFactoryShell` wrap their walls + roof around it** — it's literally inside the building.
  - **The camera frames it too** — `framecam` and `introCamera` now fit the whole floor *plus* the vault wing (adaptive `fitZoom`), so the Control Room is always on screen instead of hanging off the edge.
  - The connector was reworked from a floating annex into a **grand interior vault wing**: a distinct secured-floor inlay, a **partition wall with a glowing gateway arch + doorposts**, a **runner** (ornate carpet in Pro / guide-stripes in Student) leading to the door, a **floor medallion ring** under the vault, soft uplight, and a **"▸ TIER-0 WING / ▸ CONTROL ROOM"** plate. It now reads as a secured chamber that's part of the building on every floor.

## [0.7.9] - 2026-06-03 — Control Room as a built-on annex · animated floor-clear stairwell · Student act-title legibility

- **Animated floor-clear stairwell.** Finishing a level now plays a cinematic: a glowing staircase builds in, **your agents climb it step-by-step** (bobbing, staggered, with rising sparkles) up to a brightening doorway, over a dark dramatic backdrop, with a **"▲ FLOOR CLEARED → Ascending to <next floor>"** caption. Themed — spectral 🛡⚔🔍 in the manor, 🤖 helper-bots in the factory ("▲ LEVEL DONE! → Up to The Mezzanine"). Replaces the small "Floor Cleared" toast.
- **The Control Room is now a built-on annex, not a floating platform.** Reworked the attachment into a **roofed, walled chamber wrapped around the vault door**, joined to the building's right wall by an **enclosed, floored vestibule** (solid floor + side walls, no support-legs-over-a-void look). Pro gets a gabled stone wing with corner bolts and an arched doorway; Student gets a sawtooth-roof steel room with hazard trim and a roll-up door. It now reads as a secure room bolted onto the building on every floor.
- **Student act-title legibility.** The big act title (e.g. **"Day 1"**) used a white→mint gradient that washed out on the bright factory background — under Student it's now a bold high-contrast indigo with a white halo + sunny glow, and the subtitle a vivid purple. Pro is unchanged.

## [0.7.8] - 2026-06-03 — Control Room attached + a thorough Student kid-friendly pass

- **The Control Room no longer floats.** On the lower floors the Vault was drawn outside the building's walls with no corridor, so it looked like it was hanging in space. It now runs a **bridge from the building's right wall out to it** — a glowing stone **skybridge** (Pro) / yellow-and-black **steel gangway** (Student) with support legs — so it always reads as attached. The Vault was also pulled in from the far edge (nx .93 → .86).
- **Store is now genuinely kid-friendly.** Every purchasable item has clean Student copy (no regex-mangled jargon): *Robo-Guard, Eagle-Eye Helper, Know-It-All Helper, Power Zap, Bullseye, Royal Lock, Gold-Star Light, Big Flashlight, Stop Sign, Super Shoo* — with friendly rarities (Super Rare / Rare / One-Use) and a **"🛒 The Helper Shop"** header. Pro keeps the real Microsoft product names (CAE, PIM, Conditional Access, Defender XDR…) for the SC-300/SC-200 alignment.
- **Workshop power-ups (the permanent boons) get Student copy too** — *Add the Doubter/Librarian/Mapper/Fortune-Teller, Head Start, Star Jar, Sneak Peek, Stronger Chaser, Star Bonus, Extra Shield.*
- **Loadout → "🎒 Backpack"** under Student, with kid section names (Today's Luck / Power-ups / Shields / Your Team) and kid empty-states.
- **Party panel kid-worded** — "👥 Your Team · helpers", *Checker — thinks it through* / *Chaser — shoos the Gremlin*, and the bought-power-up line reads *⚡ Power Zap · 👑 Royal Lock · 🚫 Stop Sign · ⭐ Gold Stars* instead of CAE/PIM/CA.
- **"Hunt Night" → "👀 Watch Mode"** under Student, and the button is restyled solid sunny-yellow with dark bold text so it's actually readable on the bright factory background (the faint spectral pill was nearly invisible).
- **Topbar mini-labels themed** — *tidied / stars / to Control Room / GREMLIN / Shop / Backpack* under Student. All Pro wording is unchanged.

## [0.7.7] - 2026-06-03 — Three showcase features + Student-version fixes + the Master Key

**Showcase features (both themes):**
- **Agents-at-work lower-third** — a cinematic **◈ Agent Council** bar (Retriever → Warden → Skeptic → Council, kid-named Finder → Checker → Doubter → Team) lights up chip-by-chip as each agent reasons, then fades out. Driven live off the reasoning trace; shows only while the agents are actually thinking.
- **Threat-containment gate** — banishing a boss/guardian now runs the full Microsoft Graph containment path behind the **Continue ▶** gate, then drives the finale only after you advance it (no more dice/finale firing under the panel).
- **Attract cold-open** — after ~7s idle on the homepage, a slow Ken Burns push-in + title glow + "▶ begin the hunt" prompt kicks in for a hands-free demo/booth loop; any input cancels it.

**Student-version fixes (the labels in the screenshots):**
- Floor cards now use the **factory vocabulary** ("The Top Floor / the Control Room · the top", "The Mezzanine / the busy machines") instead of leaking the Pro labels (Attic / Tier-0 · the source).
- The status HUD label follows the theme (**Cleanup Score** for Student, Ledger of the Dead for Pro); the round clock reads "**N/N tidied**"; the coach now kid-words its hints (and uses the 🤖 helper icon) so "meet the ghost inside" reads "meet the helper inside."

**The Master Key (both themes):**
- One **random ground-floor spirit** is now hiding a **Master Key**. Judging it drops the key (golden sparkle + banner + sting) and **unseals the Control Room / Top Floor** — you can take the stairs straight up without clearing your way there.
- The **Control Room door shows a gold "SEALED" padlock** that swings to a green "OPEN" when the key is found; the top-floor card flips 🔒 → 🔑.
- **The Control Room is now a hub** — the Vault was pulled in from the right edge and every attic room (Legacy Crypt, Strongroom, Old Study) now opens onto it, so it reads as connected instead of a lone room.

## [0.7.6] - 2026-06-02 — Continue button on the Graph-API panel (freezes the turn)

- The judgment remediation panel now **gates the turn**: it plays the full Microsoft Graph path (~3–5s), then a green **"Continue ▶"** button appears beneath it; the Sentinel's turn (dice/attacks) and the threat advance are **held until you click it** (with an auto-resume fallback if you never do). Map clicks are ignored while the panel is up. In Training Mode the coached card stays the gate (the remediation panel is un-gated there to avoid a double prompt).

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
