# Validate changes in a repo with build/lint-only checks

## When to use
- When verifying edits to `src/App.tsx`, `src/lib/*`, or styling files.
- When confirming no regressions before pages deployment.
- When documenting validation in PRs for this repo (which currently has no test script).

## Inputs
- `<goal>`
- `<scope>`
- `<files>`
- `<__filter_complete__></__filter_complete__>`

## Prompt
Create a targeted validation plan for `<goal>` in `<scope>` for this repository. Use existing commands (`npm run build`, `npm run lint` when configured) and manual checks for UI behavior. Focus only on `<files>` and satisfy `<__filter_complete__></__filter_complete__>` before marking done.
