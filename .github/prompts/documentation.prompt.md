# Update docs and product messaging for 3270.io

## When to use
- When changing setup/build instructions in `README.md`.
- When product highlights in `src/App.tsx` diverge from `README.md`.
- When documenting deployment workflow details from `.github/workflows/deploy-pages.yml`.

## Inputs
- `<goal>`
- `<scope>`
- `<files>`
- `<__filter_complete__></__filter_complete__>`

## Prompt
Update `<scope>` for `<goal>` using the current repo facts only. Keep wording concise, technically accurate, and consistent with the landing-page messaging for 3270Connect and 3270Web. Touch only `<files>` and honor `<__filter_complete__></__filter_complete__>` before finalizing.
