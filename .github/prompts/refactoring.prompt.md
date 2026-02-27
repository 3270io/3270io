# Refactor safely within 3270.io frontend boundaries

## When to use
- When reducing duplication in `src/App.tsx` while preserving behavior.
- When moving static data into `src/lib/*` without changing public UX.
- When cleaning up Tailwind-heavy JSX while keeping terminal design intact.

## Inputs
- `<goal>`
- `<scope>`
- `<files>`
- `<__filter_complete__></__filter_complete__>`

## Prompt
Perform a minimal-risk refactor for `<goal>` in `<scope>`. Preserve React hook behavior, framer-motion sequencing, and existing shadcn/Radix component usage. Do not introduce new architecture. Limit edits to `<files>` and follow `<__filter_complete__></__filter_complete__>` to decide completion.
