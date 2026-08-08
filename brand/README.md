# 3270 brand kit

The marks for 3270.io and its two products, and the script that generates them.

<img src="assets/3270io/3270io-mark-128.png" alt="3270.io" width="128">
<img src="assets/3270connect/3270connect-mark-128.png" alt="3270Connect" width="128">
<img src="assets/3270web/3270web-mark-128.png" alt="3270Web" width="128">

## The system

One idea, three variants: **the session stack** — terminal screens receding in
depth, one session recorded and replayed many times.

Everything is shared except two things. The plate, the three-plane stack and the
lighting model — a face lit from the top-left, planes falling away in scale and
opacity, a specular sweep, and an accent glow cast beneath — are identical
across the three. What differs is the **fan direction** and the **glyph knocked
out of the front face**:

| Mark | Fan | Glyph | Reads as |
|---|---|---|---|
| 3270.io | straight up | prompt (chevron + cursor) | the bare terminal |
| 3270Connect | right | doubled chevron | replay, fast-forward, scale |
| 3270Web | up and right | node ring | a screen discovered, and its graph |

The glyph is knocked *out* of the lit face rather than drawn on top, so whatever
sits behind the mark shows through it.

## Files

Each product directory carries the same set.

| File | Use |
|---|---|
| `*-mark.svg` | the mark on its own, fixed colour — the default choice |
| `*-mark-themed.svg` | same drawing, reading `--accent` / `--accent-2` from the host page so it re-tints with the active palette |
| `*-mark-mono.svg` | single colour via `currentColor`; for one-colour print, embroidery, or a favicon that must not carry a gradient |
| `*-icon.svg` | the mark in a square frame — favicons and app icons |
| `*-lockup.svg` | mark plus wordmark, for dark backgrounds |
| `*-lockup-light.svg` | the same lockup with dark ink, for light backgrounds |
| `*.ico` | multi-resolution favicon (16 → 256) |
| `*-mark-{32…512}.png`, `*-icon-{16…512}.png`, `*-lockup-{300,600,1200}.png` | rasters, transparent ground |

Prefer the SVG anywhere it will render. The PNGs exist for GitHub social
previews, package registries, slide decks, and anything that will not take a
vector.

## Colour

All three static marks are drawn in one green — the phosphor accent.

| | accent | accent-2 |
|---|---|---|
| every mark | `#4effb3` | `#7cf9d0` |

They deliberately do **not** track each product's own default palette. 3270Web's
terminal defaults to `#39ff14`, but a mark that differs from its siblings reads
as a different brand, most visibly in a row of browser tabs where the favicons
sit next to each other. The glyph and the fan tell the three apart; colour is
what says they are one family.

Inside the products it is the other way round. Both ship the same four palettes
— phosphor, amber, ice and daylight — and the in-app marks follow whichever is
active, which is what `*-mark-themed.svg` is for.

## Using the mark

- Give it clear space of at least half the plate's height on every side.
- Don't recolour the plate to something outside the palette, restack the planes,
  or swap one product's glyph onto another's fan — the pairing is what tells
  the three apart.
- Below about 24px, use `*-icon.svg` or the 16/24/32 rasters. The full mark's
  glow and specular sweep are wasted there.
- On a light background the coloured mark is fine, but the lockup needs
  `*-lockup-light.svg` — the wordmark ink is otherwise near-white.

## Rebuilding

The assets are generated, not hand-drawn. `build.mjs` is the single source of
truth for the geometry; it emits every SVG, rasterises the PNGs through headless
Chromium, and packs the `.ico` frames itself.

```bash
npm i -D playwright && npx playwright install chromium   # once
npm run brand                                            # rewrites brand/assets/
```

Playwright is deliberately *not* in `package.json` — it is a build-the-logos
dependency, not a build-the-site one, and the deploy job should not be paying to
download a browser. Install it when you need to regenerate, then drop it.

To change the family, edit `VARIANTS` in `build.mjs` and rerun — never retouch a
file under `assets/` by hand, it will be overwritten.

`src/components/site/Logo.tsx` is the same drawing hand-maintained as a React
component so the site's mark re-tints with the live palette. If you change the
geometry here, change it there too.
