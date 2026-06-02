# Student theme ("The Little Helpers") — art prompt sheet

All files go in **`assets/helpers/`** using the **exact same filenames** as the Pro art in `assets/`.
As you generate each one, tell me the filename and I'll add it to the `HELPER_OK` list in `index.html` so it loads (kept empty until then to avoid 404s).

## Shared style DNA — paste this into EVERY prompt
> 3D cartoon render in the style of a bright modern animated family comedy. **A small, round, capsule/pill-shaped YELLOW creature** with smooth glossy skin, **big round goggles (silver metal rim, black rubber strap around the head)** over one or two large cartoon eyes, a wide goofy grin with little square teeth, **blue denim overalls with a chest pocket**, tiny stubby arms in little gloves, short legs in small boots, a few sprigs of black hair on top. Cheerful daylight studio lighting, bold saturated colors (sunny yellow #FFCE2B, denim blue, silver), thick soft shadows, wholesome and silly, no scary elements. **Centered subject, isolated on a transparent background, square composition, no text, no logo.**

This nails the **Minions look** without the trademarked name (which generators block and which we keep off the public build). In-game these are called **"the Little Helpers."** Each one below is the SAME yellow goggled overall-wearing creature, just holding a different prop / styled for its job — so the whole cast looks like one family.

---

## Priority 1 — the biggest visual payoff (do these first)

**`house.png`** — homepage hero
> …a cheerful sunny cartoon OFFICE BUILDING on a grassy hill at golden hour, big glowing windows, a welcome mat, several little yellow goggled overall-wearing creatures peeking out of the windows and waving, balloons, warm and inviting. Wide landscape composition (not transparent — full scene with a soft blue sky background).

**`threat_possession.png`** — the threat ("the Gremlin")
> …a small mischievous cartoon GREMLIN — like a naughty purple-and-teal cousin of the yellow creatures — made of tangled charging cables, sticky notes and loose keys, sharp little grin, crossed googly eyes, devil-ish but cute and goofy, not scary. Transparent background.

**The six Little Helpers** (the yellow goggled creatures you judge — one per room; keep them all the SAME character family):

| File | Who it is | Prompt addition (append to the style DNA) |
|---|---|---|
| `ghost_billing.png` | the billing helper | …hugging a big calculator and a roll of receipt paper, a green accountant's visor over the goggles, tiny gold coins floating around it. |
| `ghost_legacy.png` | the old backup helper | …a slightly dusty, older version with a big wind-up key sticking out of its back and an old floppy-disk badge on the overalls, sleepy half-closed eyes, one cobweb on its hair — cute and tired, not creepy. |
| `ghost_okafor.png` | the healthy worker (the "alive / leave it alone" one) | …wide awake and beaming, holding a coffee cup and a name badge, a little superhero cape on the overalls — clearly busy, active and happy. |
| `ghost_spooler.png` | the printer helper | …with sheets of paper fanning out of the top of its head like a tiny printer, ink-smudge on one cheek, eager helpful expression, pressing a big green PRINT button. |
| `ghost_breakglass.png` | the emergency-key helper | …standing inside a little red "break glass in emergency" case, proudly holding up one big golden key, a tiny red fire-helmet on top of its goggles — heroic. |
| `ghost_santos.png` | the healthy plant helper | …happily watering a small potted plant with a watering can, a straw sun-hat, a green leaf sprouting from its hair, glowing with health. |

---

## Priority 2 — the three bosses

| File | Boss name | Prompt addition |
|---|---|---|
| `boss1.png` | **The Key-Hoarder** (Act I) | …a BIG fat version of the yellow goggled overall creature, completely draped in dozens of jingling keys and lanyards, greedy googly eyes, sitting on a pile of keys, holding more keys in both hands — silly and greedy, not menacing. |
| `boss2.png` | **The Copy Machine** (Act II) | …a chunky cartoon photocopier MONSTER with a yellow goggled creature's face on its screen, overflowing with paper, spitting duplicate sheets everywhere, stacks of folders for arms, flustered expression. |
| `boss3.png` | **The Big Mix-Up** (Act III, the Gremlin grown huge) | …a large boss version of the purple-teal gremlin: a swirling ball of tangled cables, keys and paper with a big grinning gremlin face in the middle and little arms, a few captured yellow goggled creatures stuck to it looking dizzy — chaotic but goofy, confetti. |

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
