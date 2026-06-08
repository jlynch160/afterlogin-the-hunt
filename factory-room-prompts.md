# Sunnyside Factory — Room Background Prompts

Cheery, student-friendly, impressive backgrounds for the **factory (Student/Sunnyside) theme**.
Each maps 1:1 to a manor room. Target files go in `assets/helpers/` so the game can load them
(e.g. `assets/helpers/room_santos.png`). Backgrounds are shown full-bleed (`center/cover`).

## How to use
1. **Prepend the STYLE BLOCK** to each scene prompt below (keeps every room visually consistent).
2. Generate at **16:9** (1920×1080 or larger). The bg is center-cropped, so keep the **center
   clear-ish** — a character sprite + UI panels sit in the middle.
3. **No text, letters, numbers, logos or signage** in any image.
4. **No people/characters** — the helper is composited separately as a sprite.

---

## STYLE BLOCK  (prepend to every prompt)
```
Cheerful storybook factory interior, polished stylized 3D game art in a warm, wholesome Pixar / "Sunnyside" style. Bright morning sunlight streaming through tall windows, candy-colored rounded machinery, spotless and friendly, soft global illumination with gentle bloom. Sunny palette: buttercup yellow, sky blue, mint green, tangerine accents. Optimistic, welcoming, full of wonder. Wide cinematic background plate, depth and atmosphere, empty of characters, NO text / letters / numbers / logos / signage. Ultra-clean, high detail, 16:9. Scene:
```

---

## FLOOR 1 — The Factory Floor  (public · greeters & everyday helpers)

**The Front Desk** · entrance hub → `room_gatehouse.png`
```
a sunny welcome reception at the factory's grand entrance — a curved honey-wood desk with a little brass bell and a jar of lollipops, pots of sunflowers, a tall arched doorway glowing with golden morning light, polished cream-and-teal checkerboard floor, cheerful bunting and balloons strung overhead.
```

**Records Bay** · santos (active helper) → `room_santos.png`
```
a tidy, happy records room — rows of rounded filing cabinets and stacked organizer bins all sorted by color, a rolling library ladder, neat cork pinboards with ribbons, warm wooden shelving, a desk lamp, dust-free and cheerfully organized.
```

**Visitor Bay** · contractor (expired guest) → `room_contractor.png`
```
a friendly visitor check-in nook — a rack of empty lanyard badges, a self-serve sign-in counter with a feather pen, comfy round waiting chairs, a coat stand, leafy plants, sunlight pooling warmly across the floor.
```

**Seasonal Crew** · intern (seasonal worker) → `room_intern.png`
```
a bright seasonal-worker station — open cubbies of folded aprons and little hard-hats in cheery colors, rounded lockers, a chalk rota board (blank), a bubbling watercooler, summer light through high clerestory windows.
```

**The Lobby** · kiosk (retired kiosk) → `room_kiosk.png`
```
a welcoming lobby with a round self-service kiosk pillar (blank glowing screen), a soft star-patterned rug, a glass terrarium, comfy benches, a curved wall of porthole windows letting in blue sky, balloons drifting near the ceiling.
```

**Machine Room** · spooler (print server) → `room_spooler.png`
```
a happy little machine and print room — chunky candy-colored printing presses and conveyor rollers, spools of rainbow ribbon, friendly pipes puffing tiny clouds, round gauges with cheerful dials, a tidy pegboard of tools.
```

**Loading Dock** · guestwifi (guest network) → `room_guestwifi.png`
```
a sunny loading dock with a rolled-up bay door open to bright blue sky, neatly stacked rounded crates and pallets, a friendly little forklift, gentle ramps, pennant flags, a window-box garden beside the doorway.
```

---

## FLOOR 2 — The Mezzanine  (trusted helpers & automation)

**The Pay Station** · billing (load-bearing service) → `room_billing.png`
```
a cheerful payroll booth on a sunlit mezzanine — a brass counter with neat stacks of golden tokens and ticket rolls, an old-timey adding machine with round keys, coin tubes, a warm green desk lamp, tidy ledgers, important and trustworthy.
```

**Conveyor Control** · etl (nightly job) → `room_etl.png`
```
a fun conveyor control room overlooking winding candy-colored conveyor belts that loop into the distance, a big friendly control panel with chunky levers and round glowing buttons, pipes ferrying colorful parcels, light from a sunny skylight.
```

**The Delivery Bay** · vendor (partner connector) → `room_vendor.png`
```
a bright partner delivery bay — a cheerful rounded delivery truck nosed up to an open roller shutter, parcels gliding on rollers, a clipboard stand, a blank route-map board, potted plants, clear sky-blue morning light flooding in.
```

**The Manager's Office** · okafor (active manager) → `room_okafor.png`
```
a warm, friendly manager's office on the mezzanine — a tidy honey-wood desk with a small plant and a steaming mug, a comfy swivel chair, a big picture window overlooking the sunlit factory floor, shelves of colorful binders, a soft rug.
```

---

## FLOOR 3 — The Top Floor  (the most important rooms)

**The Control Room** · the Vault / Tier-0 → `room_vault.png`
```
the impressive master control room crowning the factory — a grand panoramic window over the whole sunlit factory below, a central console of big friendly dials and a giant glowing "master" lever, soft blue-and-gold light, awe-inspiring yet warm, clearly the most important room of all.
```

**The Forgotten Storeroom** · legacy (long-dormant) → `room_legacy.png`
```
a cozy old storeroom that hasn't been opened in years — golden dust motes drifting in a single sunbeam, sheet-draped shelves, vintage crates and an old hand-truck, faded but charming, gently nostalgic, still warm and cheerful rather than spooky.
```

**The Supply Cage** · breakglass (emergency access) → `room_breakglass.png`
```
a secure but friendly supply cage — a sturdy rounded chain-link enclosure, neatly shelved emergency kits, a big cheerful red "in-case-of" box, one special golden key glinting on a hook under a warm spotlight, safe and reassuring.
```

**The Old Office** · steward (head keeper / master key) → `room_steward.png`
```
a grand old head-caretaker's office at the very top of the factory — an antique desk holding a ring of keys, a tall wall of tidy numbered key-hooks, a big window pouring in warm afternoon light, dignified and slightly old-fashioned but spotless: the keeper of every door.
```

---

## Hubs / connectors (optional, nice-to-have)

**The Catwalk / Upper Catwalk** · stair hubs → `room_catwalk.png`
```
a sunlit steel catwalk walkway high above the factory floor, friendly rounded railings, strings of warm bulb-lights and pennant flags overhead, candy-colored machinery glowing far below, a cheerful sense of height and adventure.
```

---

### Tip
Keep the palette and lighting identical across all rooms (the STYLE BLOCK does this) so the
whole factory reads as one happy place. Once generated, drop them in `assets/helpers/` and I'll
wire `roomSrc()` to load them for the Student theme.
