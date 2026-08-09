import type { ReactNode } from "react"
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
      { label: "Built on x3270", href: "https://x3270.miraheze.org/wiki/Main_Page" },
    ],
  },
]

function FootnoteLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent)] underline underline-offset-2 transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  )
}

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

        <section className="panel p-5 md:p-6" aria-labelledby="built-on-x3270">
          <h2 id="built-on-x3270" className="eyebrow">
            Built on x3270
          </h2>
          <p className="mt-3 max-w-3xl text-[0.86rem] leading-relaxed text-[var(--text-2)]">
            Neither 3270Connect nor 3270Web speaks TN3270 itself. Both drive{" "}
            <FootnoteLink href="https://x3270.miraheze.org/wiki/Main_Page">s3270</FootnoteLink>, the
            scripting member of the x3270 family of 3270 terminal emulators. Three decades of
            faithful protocol work — EBCDIC code pages, field attributes, structured fields — by
            Paul Mattes and the x3270 contributors, given away for anyone to build on. Neither of
            our tools would exist without it, and our thanks go to them.
          </p>
          <p className="mt-3 max-w-3xl text-[0.8rem] leading-relaxed text-[var(--text-3)]">
            s3270 is distributed under a{" "}
            <FootnoteLink href="https://github.com/pmattes/x3270/blob/master/LICENSE.md">
              BSD 3-Clause licence
            </FootnoteLink>
            ; its full text is reproduced in the third-party notices for{" "}
            <FootnoteLink href="https://github.com/3270io/3270Connect/blob/main/THIRD-PARTY-NOTICES.md">
              3270Connect
            </FootnoteLink>{" "}
            and{" "}
            <FootnoteLink href="https://github.com/3270io/3270Web/blob/main/THIRD-PARTY-NOTICES.md">
              3270Web
            </FootnoteLink>
            . The x3270 authors do not endorse these projects — this is attribution, and gratitude.
          </p>
        </section>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
