# 3270.io Website

Landing page for 3270.io showcasing:
- `3270Connect`
- `3270Web`

Built with React, TypeScript, Vite, and Tailwind.

## Development

Prerequisites:
- Node.js 20+
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Image Modal Content

Product modal images are configured in `src/lib/dashboard-image.ts`.

- `3270Connect` modal images come from `src/assets/images/3270Connect/`
- `3270Web` modal images come from `src/assets/images/3270Web/`

To update modal screenshots, replace files in those folders and adjust `src/lib/dashboard-image.ts` if filenames change.

## Key Files

- `src/App.tsx`: Main landing page and modal UI
- `src/lib/dashboard-image.ts`: Image list definitions for each product modal
- `src/assets/images/`: Product screenshot assets

## License

MIT. See `LICENSE`.
