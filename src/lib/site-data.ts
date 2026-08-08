import consoleOverview from "@/assets/shots/connect/console-overview.webp"
import consoleCharts from "@/assets/shots/connect/charts.webp"
import consoleProcesses from "@/assets/shots/connect/process-table.webp"
import consolePalette from "@/assets/shots/connect/command-palette.webp"
import consoleLogs from "@/assets/shots/connect/console-logs.webp"
import consoleWorkflow from "@/assets/shots/connect/workflow-viewer.webp"
import themeAmber from "@/assets/shots/connect/theme-amber.webp"
import themeIce from "@/assets/shots/connect/theme-ice.webp"
import themeDaylight from "@/assets/shots/connect/theme-daylight.webp"

import webSession from "@/assets/shots/web/session.png"
import webAiChat from "@/assets/shots/web/ai-chat.png"
import webConnect from "@/assets/shots/web/connect.png"
import webSampleApp from "@/assets/shots/web/sample-app.png"

export type ProductId = "3270Connect" | "3270Web"

export interface Shot {
  src: string
  alt: string
  caption: string
}

export interface Product {
  id: ProductId
  tagline: string
  summary: string
  docsUrl: string
  githubUrl: string
  /** Grouped so the card reads as capabilities, not as a wall of bullets. */
  pillars: { title: string; points: string[] }[]
  hero: Shot
  shots: Shot[]
  meta: { label: string; value: string }[]
}

export const products: Product[] = [
  {
    id: "3270Connect",
    tagline: "Automation, load and observability",
    summary:
      "Scripted 3270 workflows that replay human online integration at unlimited scale — as a CLI, an API server, and a live operations console served straight from the binary.",
    docsUrl: "https://3270connect.3270.io",
    githubUrl: "https://github.com/3270io/3270Connect",
    pillars: [
      {
        title: "Run",
        points: [
          "Declarative workflow JSON — connect, fill, check, capture, disconnect",
          "Concurrent execution with runtime windows, grace periods and per-workflow timeouts",
          "Headless mode for CI/CD, plus verbose and failure-only diagnostics",
        ],
      },
      {
        title: "Observe",
        points: [
          "Operations console with live KPIs, latency percentiles and per-process control",
          "Prometheus metrics for connect and step timings, outcomes and live worker count",
          "ASCII screen capture at any step for documentation and triage",
        ],
      },
      {
        title: "Integrate",
        points: [
          "API server mode for orchestration and load generation",
          "Host compatibility profiler emitting the shared CompatibilityProfile JSON",
          "RSA token injection and per-host EBCDIC code page selection",
        ],
      },
    ],
    hero: {
      src: consoleOverview,
      alt: "3270Connect operations console showing KPI tiles, workflow duration chart and process table",
      caption: "Operations console — live KPIs, duration and resource charts, process intelligence",
    },
    shots: [
      {
        src: consoleOverview,
        alt: "3270Connect operations console overview",
        caption: "Operations console — live KPIs, duration and resource charts, process intelligence",
      },
      {
        src: consoleCharts,
        alt: "Workflow duration and system resource charts",
        caption: "Workflow duration per process and host resource utilisation, side by side",
      },
      {
        src: consoleProcesses,
        alt: "Process intelligence table listing running workflow processes",
        caption: "Process intelligence — progress, outcomes and per-PID controls",
      },
      {
        src: consolePalette,
        alt: "Command palette open over the dashboard",
        caption: "Command palette — export, chart capture and log streaming from the keyboard",
      },
      {
        src: consoleLogs,
        alt: "Streaming console log viewer",
        caption: "Console logs — streamed, filtered and exportable",
      },
      {
        src: consoleWorkflow,
        alt: "Workflow viewer showing workflow JSON",
        caption: "Workflow viewer — inspect the JSON a process is running",
      },
      {
        src: themeAmber,
        alt: "Operations console in the amber CRT theme",
        caption: "Amber CRT theme",
      },
      {
        src: themeIce,
        alt: "Operations console in the ice theme",
        caption: "Ice theme",
      },
      {
        src: themeDaylight,
        alt: "Operations console in the daylight light theme",
        caption: "Daylight theme — the console in full light mode",
      },
    ],
    meta: [
      { label: "Language", value: "Go" },
      { label: "Interfaces", value: "CLI · API · Console" },
      { label: "Runtime deps", value: "None" },
    ],
  },
  {
    id: "3270Web",
    tagline: "Enterprise 3270 terminal that maps your application",
    summary:
      "An enterprise-grade 3270 terminal in the browser — no emulator install, no thick client. AI auto-navigation explores the host and maps every screen, so the application becomes addressable in plain English and its full screen coverage becomes a load profile for 3270Connect.",
    docsUrl: "https://3270web.3270.io",
    githubUrl: "https://github.com/3270io/3270Web",
    pillars: [
      {
        title: "Terminal",
        points: [
          "Enterprise 3270 sessions in a browser tab — nothing to install on the desktop",
          "Virtual keyboard, print screen, detailed logging, and full model/size/TLS control",
          "Hardened by default: CSP, origin checks, CSRF and token-guarded REST",
        ],
      },
      {
        title: "Discover",
        points: [
          "AI auto-navigation drives the host itself and maps every screen and transition",
          "Each screen annotated with its business purpose, fields and named business functions",
          "Mind-map compare diffs host divergence across environments",
        ],
      },
      {
        title: "Operate & record",
        points: [
          "Run business functions by prompt — approval per action, or hands-free Auto Mode",
          "Full application screen coverage captured as it explores",
          "Exports 3270Connect workflow JSON for performance and volume testing",
        ],
      },
    ],
    hero: {
      src: webSession,
      alt: "3270Web browser terminal showing a connected 3270 session",
      caption: "A live 3270 session in the browser, with recording and chaos controls",
    },
    shots: [
      {
        src: webSession,
        alt: "3270Web browser terminal showing a connected 3270 session",
        caption: "A live 3270 session in the browser, with recording and chaos controls",
      },
      {
        src: webAiChat,
        alt: "3270Web AI Chat side panel with suggested prompts",
        caption: "AI Chat — explain a screen, run chaos discovery, or ask for a business overview",
      },
      {
        src: webConnect,
        alt: "3270Web connect screen with hostname field",
        caption: "Connect to any TN3270 host, or start a bundled sample app",
      },
      {
        src: webSampleApp,
        alt: "3270Web running the bundled sample 3270 application",
        caption: "Bundled sample applications for testing without a mainframe",
      },
    ],
    meta: [
      { label: "Language", value: "Go" },
      { label: "Ships as", value: "Docker · EXE · Binary" },
      { label: "Interfaces", value: "Browser · REST · AI Chat" },
    ],
  },
]

export interface Capability {
  icon: string
  title: string
  body: string
  tag: ProductId | "Both"
}

export const capabilities: Capability[] = [
  {
    icon: "robot",
    title: "Conversational session control",
    body: "Type an instruction in plain language. The assistant reads the screen, proposes the next action, and either waits for your approval or runs hands-free in Auto Mode.",
    tag: "3270Web",
  },
  {
    icon: "shuffle",
    title: "Chaos exploration",
    body: "Turn the explorer loose on an application. It walks the screen graph, persists each run, and exports a discovery report — plus workflow JSON for anything it finds.",
    tag: "3270Web",
  },
  {
    icon: "detective",
    title: "Business understanding",
    body: "Discovered screens get annotated with their purpose and field meanings, then catalogued as named business functions such as account inquiry.",
    tag: "3270Web",
  },
  {
    icon: "tree",
    title: "Mind-map compare",
    body: "Diff two exported chaos mind maps to see exactly where two hosts diverge — the migration-readiness check nobody wants to do by hand.",
    tag: "3270Web",
  },
  {
    icon: "gauge",
    title: "Prometheus metrics",
    body: "A load run shows up in your dashboards like any other service — connect and step timings, workflow outcomes and live worker count, on a listener of their own.",
    tag: "3270Connect",
  },
  {
    icon: "lightning",
    title: "Concurrency that ramps cleanly",
    body: "Run hundreds of workflows in parallel for a fixed runtime, with grace periods for in-flight work and latency percentiles on the console.",
    tag: "3270Connect",
  },
  {
    icon: "chart",
    title: "Operations console",
    body: "Live KPIs, duration and resource charts, a filterable process table, streaming logs and a command palette — served from the binary, no runtime dependencies.",
    tag: "3270Connect",
  },
  {
    icon: "shield",
    title: "Hardened by default",
    body: "Injection, filename and path-traversal prevention, CSRF and origin checks, token-gated APIs, and RSA token injection that keeps one-time passwords out of workflow files.",
    tag: "Both",
  },
  {
    icon: "package",
    title: "Same profile, both tools",
    body: "The host compatibility profiler emits an identical CompatibilityProfile document from either tool, so cross-environment comparison is a plain JSON diff.",
    tag: "Both",
  },
]

export interface PipelineStep {
  icon: string
  kicker: string
  title: string
  body: string
  tool: ProductId
}

export const pipeline: PipelineStep[] = [
  {
    icon: "terminal",
    kicker: "01 · Explore",
    title: "Open the host in a browser",
    body: "Connect 3270Web to a TN3270 host and click through the application — or let AI Chat and chaos mode map it for you.",
    tool: "3270Web",
  },
  {
    icon: "record",
    kicker: "02 · Record",
    title: "Capture the session",
    body: "Recording turns what you did into workflow.json: connect, field writes, AID keys, checks and disconnect.",
    tool: "3270Web",
  },
  {
    icon: "repeat",
    kicker: "03 · Replay",
    title: "Run it anywhere, at any scale",
    body: "3270Connect replays the same file from your laptop, a CI job, or a fleet of load generators — headless, concurrent, timed.",
    tool: "3270Connect",
  },
  {
    icon: "chart",
    kicker: "04 · Observe",
    title: "Watch it in the console",
    body: "Live KPIs and latency percentiles on the operations console, and Prometheus metrics for everything long-running.",
    tool: "3270Connect",
  },
]

export interface LaunchCard {
  id: ProductId
  startHere: string
  body: string
  links: { label: string; href: string; kind: "primary" | "line" | "ghost" }[]
}

/** The point of this site: get people into the right project quickly.
 *  Everything past these links lives in each project's own documentation. */
export const launchCards: LaunchCard[] = [
  {
    id: "3270Web",
    startHere: "Start here if you want to see a host",
    body: "Run it, open a browser, connect to a TN3270 host — or start a bundled sample app and explore with no mainframe at all.",
    links: [
      { label: "Documentation", href: "https://3270web.3270.io", kind: "primary" },
      { label: "GitHub", href: "https://github.com/3270io/3270Web", kind: "line" },
      {
        label: "Container image",
        href: "https://github.com/3270io/3270Web/pkgs/container/3270web",
        kind: "ghost",
      },
    ],
  },
  {
    id: "3270Connect",
    startHere: "Start here if you want to automate",
    body: "Point the binary at a workflow file to replay a session — then add concurrency when it needs to become a load test in CI.",
    links: [
      { label: "Documentation", href: "https://3270connect.3270.io", kind: "primary" },
      { label: "GitHub", href: "https://github.com/3270io/3270Connect", kind: "line" },
      {
        label: "Releases",
        href: "https://github.com/3270io/3270Connect/releases",
        kind: "ghost",
      },
    ],
  },
]

export const heroStats = [
  { value: "2", label: "Tools", note: "One shared workflow format" },
  { value: "MIT", label: "Licence", note: "Open source since 2023" },
  { value: "Go", label: "Built in", note: "Single static binary" },
  { value: "0", label: "Runtime deps", note: "Console served from the binary" },
]

export const bootLines: { text: string; tag?: string; tone?: "ok" | "info" }[] = [
  { text: "3270Connect -config workflow.json -concurrent 25" },
  { text: "resolving mvs.example.com:992", tag: "OK", tone: "ok" },
  { text: "TN3270E negotiated · model 4 · 43x80", tag: "OK", tone: "ok" },
  { text: "codepage cp037 · TLS 1.3", tag: "OK", tone: "ok" },
  { text: "workers ramping 0 → 25", tag: "LIVE", tone: "info" },
  { text: "step FillString  p95 0.21s", tag: "OK", tone: "ok" },
  { text: "step CheckValue  p95 0.34s", tag: "OK", tone: "ok" },
  { text: "2,313 workflows completed · 97.1% success", tag: "OK", tone: "ok" },
  { text: "metrics listening on :9091", tag: "LIVE", tone: "info" },
]
