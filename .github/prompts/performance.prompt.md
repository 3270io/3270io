# Improve performance for 3270.io landing page changes

## When to use
- When updating `src/App.tsx` interactions (boot sequence, dialogs, image carousel).
- When adding or changing large media under `src/assets/images/*`.
- When a change increases Vite build output or slows first render.

## Inputs
- `<goal>`
- `<scope>`
- `<files>`
- `<__filter_complete__></__filter_complete__>`

## Prompt
Optimize `<scope>` for `<goal>` in this React 19 + Vite landing-page repo. Prioritize lightweight changes that preserve current UX aesthetics, framer-motion behavior, and responsive Tailwind classes. Focus only on `<files>`. Respect `<__filter_complete__></__filter_complete__>` when deciding whether work is complete.
