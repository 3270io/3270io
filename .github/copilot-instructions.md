# 3270.io Copilot Instructions

This repository is the public landing page for 3270.io, built with React + TypeScript + Vite.

## Architecture boundaries
- Keep product/content logic in `src/App.tsx` and data-only assets/config in `src/lib/*` (for example `src/lib/dashboard-image.ts`).
- Reuse existing UI primitives from `src/components/ui/*` (shadcn/Radix-based components) instead of introducing parallel component patterns.
- Keep static assets under `src/assets/images/*` and import through TS modules (do not hardcode `dist` paths).
- Preserve path alias usage (`@/*` mapped in `tsconfig.json` and `vite.config.ts`).

## Code style and implementation
- Use TypeScript + React functional components and hooks (`useState`, `useEffect`) like existing code.
- Follow the current formatting style: semicolon-light TS/TSX, single quotes in config files where already used, and utility-first Tailwind classes in JSX.
- Prefer small, surgical edits; do not refactor unrelated sections.
- Keep external links safe with `target="_blank"` + `rel="noopener noreferrer"` (as used in `src/App.tsx`).

## Error handling and resilience
- Keep `react-error-boundary` integration in `src/main.tsx` and `src/ErrorFallback.tsx`.
- In `ErrorFallback`, preserve the dev-mode rethrow (`if (import.meta.env.DEV) throw error;`).
- Handle async failures with `try/catch` and user-safe fallback text patterns already present in `src/fetch-website.tsx`.

## Performance expectations
- Maintain lazy-loading and optimized asset behavior (for example `loading="lazy"` on images).
- Keep bundle-oriented constraints in mind for landing-page UX; avoid adding heavy dependencies for small UI tweaks.
- Preserve mobile-first responsive classes and existing animation approach (`framer-motion` + CSS effects).

## Security expectations
- Do not commit secrets, tokens, or `.env` values (`.env` is ignored).
- Do not remove safe-link attributes or broaden CSP/security-relevant behavior without clear need.
- Validate any new external URL usage and avoid interpolating untrusted HTML into the DOM.

## Build, lint, and test commands
- Install deps: `npm ci`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint` (currently depends on an ESLint flat config that is not present in this repo baseline)
- There is no configured automated test runner in `package.json` at this time; if adding tests, align with existing tooling first.

## CI and deployment
- GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- CI uses Node 20, `npm ci`, and `npm run build`, then deploys `dist/`.

## Documentation updates
- Keep `README.md` as the canonical contributor-facing setup summary.
- Product/feature messaging should stay consistent between `README.md` and landing-page content in `src/App.tsx`.
