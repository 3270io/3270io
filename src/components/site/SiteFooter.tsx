import { GithubLogo } from "@phosphor-icons/react"
import { LogoMark, Wordmark } from "./Logo"

const COLUMNS = [
  {
    title: "3270Connect",
    links: [
      { label: "Documentation", href: "https://3270connect.3270.io" },
      { label: "GitHub", href: "https://github.com/3270io/3270Connect" },
      { label: "Releases", href: "https://github.com/3270io/3270Connect/releases" },
    ],
  },
  {
    title: "3270Web",
    links: [
      { label: "Documentation", href: "https://3270web.3270.io" },
      { label: "GitHub", href: "https://github.com/3270io/3270Web" },
      {
        label: "Container image",
        href: "https://github.com/3270io/3270Web/pkgs/container/3270web",
      },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Organisation", href: "https://github.com/3270io" },
      { label: "Website source", href: "https://github.com/3270io/3270io" },
      { label: "Security policy", href: "https://github.com/3270io/3270io/blob/main/SECURITY.md" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div className="shell py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
              <LogoMark size={26} className="text-[var(--text-2)]" />
              <Wordmark className="text-[1rem]" />
            </a>
            <p className="mt-4 max-w-xs text-[0.85rem] leading-relaxed text-[var(--text-3)]">
              Open-source tooling for IBM 3270 mainframe systems. Hammering and connecting to 3270
              terminals since 2023.
            </p>
            <a
              href="https://github.com/3270io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn sm mt-5"
            >
              <GithubLogo size={15} weight="bold" />
              github.com/3270io
            </a>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="eyebrow">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.86rem] text-[var(--text-2)] transition-colors hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="mono text-[0.7rem] tracking-[0.1em] uppercase text-[var(--text-3)]">
            © {new Date().getFullYear()} 3270.io · MIT licensed
          </p>
          <p className="mono text-[0.7rem] tracking-[0.1em] text-[var(--text-3)]">
            “Where there’s legacy code, there’s opportunity.”
          </p>
        </div>
      </div>
    </footer>
  )
}
