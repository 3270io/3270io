# Security review for landing-page and config changes

## When to use
- When adding external links, fetch calls, or third-party integrations in `src/*`.
- When changing CI/deployment workflow or environment-related configuration.
- When touching error handling (`src/ErrorFallback.tsx`) or runtime boundary behavior.

## Inputs
- `<goal>`
- `<scope>`
- `<files>`
- `<__filter_complete__></__filter_complete__>`

## Prompt
Assess and implement `<goal>` in `<scope>` with a security-first approach for this static React/Vite site. Prevent XSS, unsafe URL handling, secret exposure, and insecure link behavior. Limit work to `<files>` and use `<__filter_complete__></__filter_complete__>` as completion criteria.
