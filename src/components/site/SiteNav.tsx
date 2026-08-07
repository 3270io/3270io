import { GithubLogo, List, X } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { THEMES, useTheme } from "@/hooks/use-theme"
import { LogoMark, Wordmark } from "./Logo"

const LINKS = [
  { href: "#tools", label: "Tools" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#showcase", label: "Screenshots" },
  { href: "#start", label: "Get started" },
]

export function SiteNav() {
  const { theme, setTheme } = useTheme()
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  return (
    <header className="nav" data-stuck={stuck}>
      <div className="shell nav-inner">
        <a href="#top" className="flex items-center gap-2.5" aria-label="3270.io home">
          <LogoMark size={28} className="text-[var(--text-2)]" />
          <Wordmark className="text-[1.02rem]" />
        </a>

        <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div
            className="segmented hidden sm:inline-flex"
            role="group"
            aria-label="Colour theme"
          >
            {THEMES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setTheme(entry.id)}
                aria-pressed={theme === entry.id}
                title={entry.label}
              >
                {entry.short}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/3270io"
            target="_blank"
            rel="noopener noreferrer"
            className="btn sm"
          >
            <GithubLogo size={16} weight="bold" />
            <span className="hidden md:inline">GitHub</span>
          </a>

          <button
            type="button"
            className="btn sm icon lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="shell pb-4 lg:hidden"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <nav className="flex flex-col gap-1 pt-3" aria-label="Primary, mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="segmented mt-3 sm:hidden" role="group" aria-label="Colour theme">
            {THEMES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setTheme(entry.id)}
                aria-pressed={theme === entry.id}
                title={entry.label}
              >
                {entry.short}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
