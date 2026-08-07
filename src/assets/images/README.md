# Brand assets

- `logo.png`, `logo.ico` — 3270.io marks.
- `OGImage.png` — social preview card (1200×630 @2x). The copy of record is
  `public/OGImage.png`, which is what `index.html` links to; keep the two in
  sync when the card changes.

Product screenshots do **not** live here — they are in `src/assets/shots/`
(`connect/` and `web/`), and are wired up in `src/lib/site-data.ts`. They are
copied from each project's own docs so the site always shows the current UI:

- `3270Connect/docs/assets/dashboard/*.webp`
- `3270Web/docs/images/*.png`
