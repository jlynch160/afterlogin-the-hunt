# Student theme ("The Little Helpers") — art prompt sheet

All files go in **`assets/helpers/`** using the **exact same filenames** as the Pro art in `assets/`.
As you generate each one, tell me the filename and I'll add it to the `HELPER_OK` list in `index.html` so it loads (kept empty until then to avoid 404s).

## Shared style DNA — paste this into EVERY prompt
> Cute 3D cartoon illustration. **A small, round, egg-shaped friendly HELPER-ROBOT** with a smooth glossy sunny-yellow body, **one big glowing screen-face showing a happy smiley expression**, a little antenna with a glowing tip on top, **tiny stubby arms in soft gloves** and short little legs. Cheerful bright daylight, bold saturated colors (sunny yellow #FFCE2B with teal and coral accents), thick soft shadows, wholesome, playful, no scary elements. **Centered subject, isolated on a transparent background, square composition, no text, no logo.**

> ⚠️ **Filter-safe design.** This is an *original* round screen-faced helper-bot — keep it cheerful and yellow, but do **not** add goggles + blue overalls + a pill body (that combo gets refused as a movie character), and never name a movie or studio. In-game these are **"the Little Helpers."** Every character below is the SAME helper-bot, just holding a different prop / styled for its job, so the whole cast looks like one family.

---

## Priority 1 — the biggest visual payoff (do these first)

**`house.png`** — homepage hero
> …a cheerful sunny cartoon OFFICE BUILDING on a grassy hill at golden hour, clean white-and-glass architecture, big glowing windows, a welcome mat, several little round screen-faced yellow helper-robots peeking out of the windows and waving, balloons, warm and inviting. Wide 16:9 landscape composition, building in the upper-middle with open soft-blue sky across the lower-center as clean negative space (not transparent — full scene with a sky background).

**`threat_possession.png`** — the threat ("the Gremlin")
> …a small mischievous cartoon GREMLIN-ROBOT made of tangled charging cables, sticky notes and loose keys, a glowing screen-face with a cheeky crooked grin and crossed eyes, purple-and-teal, naughty but cute and goofy, not scary. Transparent background.

**The six Little Helpers** (the round screen-faced helper-robots you judge — one per room; keep them all the SAME character family):

| File | Who it is | Prompt addition (append to the style DNA) |
|---|---|---|
| `ghost_billing.png` | the billing helper | …hugging a big calculator and a roll of receipt paper, a little green accountant's visor, tiny gold coins floating around it. |
| `ghost_legacy.png` | the old backup helper | …a slightly dusty, older version with a big wind-up key sticking out of its back and a small floppy-disk badge, a sleepy expression on its screen-face, one cobweb on its antenna — cute and tired, not creepy. |
| `ghost_okafor.png` | the healthy worker (the "alive / leave it alone" one) | …wide awake and beaming, holding a coffee cup and a name badge, a little superhero cape — clearly busy, active and happy. |
| `ghost_spooler.png` | the printer helper | …with sheets of paper fanning out of the top of its body like a tiny printer, an ink-smudge on its screen-face, eager helpful expression, pressing a big green PRINT button. |
| `ghost_breakglass.png` | the emergency-key helper | …standing inside a little red "break glass in emergency" case, proudly holding up one big golden key, a tiny red fire-helmet on top of its body — heroic. |
| `ghost_santos.png` | the healthy plant helper | …happily watering a small potted plant with a watering can, a straw sun-hat, a green leaf sprouting from its antenna, glowing with health. |

---

## Priority 2 — the three bosses

| File | Boss name | Prompt addition |
|---|---|---|
| `boss1.png` | **The Key-Hoarder** (Act I) | …a BIG round chunky yellow helper-robot completely draped in dozens of jingling keys and lanyards, a greedy wide-eyed screen-face, sitting on a tall pile of keys and holding more keys in both stubby arms — silly and greedy, not menacing. |
| `boss2.png` | **The Copy Machine** (Act II) | …a chunky cartoon photocopier MONSTER with a glowing flustered smiley screen-face on its front panel, overflowing with paper, spitting duplicate sheets everywhere, stacks of folders for arms — goofy, not scary. |
| `boss3.png` | **The Big Mix-Up** (Act III, the Gremlin grown huge) | …a large boss version of the purple-and-teal gremlin-robot: a swirling ball of tangled cables, keys and paper with one big grinning screen-face in the middle and little arms, a few dizzy round yellow helper-robots stuck to it — chaotic but goofy, confetti. |

---

## Priority 3 — environment (optional; procedural fallback already recolors)

**Floor tiles** — seamless, square, tileable, NOT transparent (flat top-down texture):
`floor_wood.png` (warm honey-wood playroom floor) · `floor_stone.png` (light pastel stone) · `floor_marble.png` (bright white-and-gold lobby marble) · `floor_tile.png` (cheerful checkerboard).

**Room scenes** — top-down square cartoon view of a tidy, colorful room, soft daylight (used as the room backdrop). Files: `room_billing.png` (accounts office with coin jars), `room_okafor.png` (sunny desk with coffee), `room_santos.png` (greenhouse corner), `room_spooler.png` (print/copy nook), `room_legacy.png` (cozy storage closet of old boxes), `room_breakglass.png` (little emergency-supply room), `room_gatehouse.png` (welcoming front lobby), plus `room_etl`, `room_vendor`, `room_contractor`, `room_intern`, `room_kiosk`, `room_guestwifi`, `room_steward`.

**Props** — top-down single object, transparent: `prop_ledger_desk`, `prop_filing_cabinets`, `prop_exec_desk`, `prop_glass_orrery`, `prop_printer`, `prop_server_rack`, `prop_sealed_safe`, `prop_reception_desk`, etc. (Whatever you skip just renders procedurally.)

---

### Tips
- Generate each helper-bot from the **same base prompt** + the row-specific line, so the cast looks like one family.
- Square 1:1, transparent PNG for characters/props; landscape for `house.png`; seamless square for floors.
- Save into `~/Downloads/haunt/`, then copy into `assets/helpers/` with the exact filename above.
