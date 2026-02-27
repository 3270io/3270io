# Maintain Copilot instructions and prompt library for this repo

## When to use
- When stack/tooling commands in `package.json` or workflows change.
- When repository structure changes under `src/` or `.github/`.
- When Copilot guidance drifts from current conventions in this landing-page codebase.

## Inputs
- `<goal>`
- `<scope>`
- `<files>`
- `<__filter_complete__></__filter_complete__>`

## Prompt
Update Copilot guidance for `<goal>` in `<scope>` so it matches the current 3270.io repository conventions. Prefer modifying existing files (`.github/copilot-instructions.md`, `.github/prompts/*.prompt.md`) over creating new scoped instruction files unless conventions clearly differ by path. Restrict changes to `<files>` and gate completion with `<__filter_complete__></__filter_complete__>`.
