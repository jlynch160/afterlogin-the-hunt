# Afterlogin — creature art (drop-in)

The game is wired to **auto-use AI-generated art** for the creatures. Drop transparent PNGs in this folder with the **exact filenames** below and they instantly replace the procedural shapes — no code changes. If a file is missing, the game falls back to the built-in procedural creature, so you can add them one at a time.

> ⚠️ **About "use Claude to generate images":** Claude (me) is a text/code model — I **can't generate images**. There's no image generation in this toolchain. So below are **ready-to-paste prompts** you run in an image generator, plus the exact drop-in naming. Good options: **ChatGPT/DALL·E 3, Adobe Firefly, Midjourney, Bing Image Creator (free), Leonardo.ai, Stable Diffusion**. Export each as a **transparent PNG** (remove the background if the tool doesn't do it natively — remove.bg works).

## Filenames (exact)

| File | Creature |
|---|---|
| `ghost_legacy.png` | adm-legacy-backup — dead F-grade domain-admin **wraith** |
| `ghost_billing.png` | svc-billing-reconcile — load-bearing **service-account** ghost |
| `ghost_breakglass.png` | adm-breakglass-02 — sealed **break-glass admin** spirit |
| `ghost_spooler.png` | svc-print-spooler — faded **print-service** ghost |
| `ghost_okafor.png` | usr-j.okafor — a calm **human** resident (later possessed) |
| `ghost_santos.png` | usr-m.santos — gentle, healthy **living resident** |
| `threat_possession.png` | The Hungry — the **shadow-demon** that hunts |

## Specs
- **Square, ~512×512 (or 1024).** Subject **centered, front-facing**, filling ~70% of the frame.
- **Transparent background** (PNG with alpha). The game adds its own glow, float, and bloom, so a clean cutout works best.
- Keep a consistent style across all 7 so they read as one set.

## Shared style suffix (append to every prompt)
> *…dark gothic video-game creature, semi-transparent spectral apparition, centered front view, soft inner glow and rim light, painterly digital art, eerie atmospheric, on a transparent background, cohesive matching set, high detail, 512x512.*

## Prompts

**ghost_legacy.png** — *A screaming wraith of a forgotten domain administrator: a tall, decayed regal ghost wearing a tarnished crown, hollow glowing red eyes, tattered robes dissolving into mist, an aura of dust and abandonment, menacing and high-privilege,* + style suffix.

**ghost_billing.png** — *A spectral service-account ghost still doing its job in death: a translucent figure made of faint ledgers and glowing gears, a single bright green thread tethering it to something alive, weary but persistent, eerie teal-green glow,* + style suffix.

**ghost_breakglass.png** — *A dormant emergency-admin spirit sealed behind cracked frosted glass, faint amber glow within, calm and contained, "break only in case of fire" motif, runic seal,* + style suffix.

**ghost_spooler.png** — *A small, faded service ghost wreathed in floating sheets of blank paper and cold printer light, neglected and harmless, dim grey-amber glow,* + style suffix.

**ghost_okafor.png** — *A calm translucent human office-worker ghost, a classic sheet-like apparition with gentle eyes, ordinary and unaware, faint unease beneath the surface, soft blue-white glow,* + style suffix.

**ghost_santos.png** — *A gentle, peaceful living-resident spirit, soft and luminous, serene closed-eyed expression, warm green halo, clearly benign,* + style suffix.

**threat_possession.png** — *A terrifying shadow-demon: a roiling mass of black smoke with multiple glowing red eyes, jagged horns, clawed tendrils, wearing the faint stolen silhouette of a human face, predatory and malevolent, blood-red rim light,* + style suffix.

## Animations
A single PNG already "animates" in-game — the engine floats, scales, pulses, and blooms it. For true frame animation, generate a **horizontal sprite sheet** (e.g. 4 frames in one PNG) and tell me the frame count; I'll add sprite-sheet playback to the loader.
