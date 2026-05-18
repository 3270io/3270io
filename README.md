# 3270.io

Mainframe 3270 automation and web tooling for modern engineering workflows.

## Flagship Projects

### 3270Connect
Repeatable scripted workflows to replicate human 3270 online integration at unlimited scale. Includes a web dashboard, API, and CLI for functional and non-functional testing of mainframe 3270 online applications.

<img src="src/assets/images/3270Connect/3270Connect_dashboard.png" alt="3270Connect Dashboard" width="900" />

- Docs: https://3270connect.3270.io
- GitHub: https://github.com/3270io/3270Connect
- Highlights:
  - Define and execute automated workflows via configuration files
  - Capture 3270 screen state for documentation and troubleshooting
  - Run workflows in parallel for faster validation
  - Headless mode for CI/CD automation
  - API server for load testing and advanced orchestration
  - Prometheus `/metrics` endpoint for connect/step timing and live worker counts
  - Host compatibility profiler producing 3270Web-compatible JSON for cross-environment diffs
  - Hardened input handling: injection, filename, and path-traversal prevention

### 3270Web
Web-based 3270 terminal interface in Go with AI Chat, session recording, and a 3270Connect-compatible workflow.

<img src="src/assets/images/3270Web/3270Web_sample.png" alt="3270Web Terminal" width="900" />

- Docs: https://3270web.3270.io
- GitHub: https://github.com/3270io/3270Web
- Highlights:
  - Browser UI for interactive 3270 sessions with detailed logging
  - Virtual keyboard support for full terminal interaction
  - AI Chat side panel for conversational screen reading, guided actions, and chaos exploration with explicit approval
  - AI Chat model selector — switch between Copilot models (default Claude Opus 4)
  - Chaos mode support for randomized session testing
  - Chaos Mind-Map Compare API for diffing host divergence across environments
  - Host compatibility profiler API producing 3270Connect-compatible JSON
  - IBM 3270 terminal fonts (Regular, Semi-Condensed, Condensed) bundled with the app
  - Export sessions as `workflow.json` compatible with 3270Connect
  - Load and replay `workflow.json` for repeatable flows
  - Docker image and GHCR publishing workflow

## How They Work Together

Use `3270Web` to interactively build and record terminal sessions, then run those same workflows at scale with `3270Connect` in local, CI/CD, or load-testing pipelines.

## Website Repo

This repository contains the public landing page for 3270.io.

- Stack: React, TypeScript, Vite, Tailwind CSS
- App entry: `src/App.tsx`
- Product image config: `src/lib/dashboard-image.ts`

## Local Development

```bash
npm install
npm run dev
```

## License

MIT. See `LICENSE`.
