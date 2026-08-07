import { useCallback, useEffect, useState } from "react"

/** The same four palettes the 3270Connect operations console ships with. */
export const THEMES = [
  { id: "phosphor", short: "GRN", label: "Phosphor green" },
  { id: "amber", short: "AMB", label: "Amber CRT" },
  { id: "ice", short: "ICE", label: "Ice" },
  { id: "daylight", short: "DAY", label: "Daylight" },
] as const

export type ThemeId = (typeof THEMES)[number]["id"]

const STORAGE_KEY = "3270io:theme"
const COOKIE_KEY = "3270io_theme"

function isTheme(value: unknown): value is ThemeId {
  return THEMES.some((t) => t.id === value)
}

function apply(theme: ThemeId) {
  const root = document.documentElement
  // "phosphor" is the bare :root palette, so it carries no attribute.
  if (theme === "phosphor") root.removeAttribute("data-theme")
  else root.setAttribute("data-theme", theme)
}

/** The docs sites live on sibling subdomains (3270connect.3270.io,
 *  3270web.3270.io), so localStorage — which is per-origin — cannot carry the
 *  palette across. A cookie scoped to `.3270.io` can, and the two MkDocs
 *  themes read and write the same one. */
function cookieDomain() {
  return /(^|\.)3270\.io$/i.test(location.hostname) ? "; domain=.3270.io" : ""
}

function readCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)3270io_theme=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

function writeCookie(theme: ThemeId) {
  try {
    document.cookie =
      `${COOKIE_KEY}=${encodeURIComponent(theme)}` +
      `; path=/; max-age=31536000; samesite=lax${cookieDomain()}` +
      (location.protocol === "https:" ? "; secure" : "")
  } catch {
    // Cookies can be blocked; localStorage below still covers this origin.
  }
}

function readStored(): ThemeId {
  // Cookie first: it is the shared, cross-subdomain answer.
  const fromCookie = readCookie()
  if (isTheme(fromCookie)) return fromCookie
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isTheme(stored)) return stored
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — not fatal.
  }
  return "phosphor"
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(readStored)

  useEffect(() => {
    apply(theme)
  }, [theme])

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next)
    writeCookie(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Non-persistent is fine; the choice still applies for this visit.
    }
  }, [])

  return { theme, setTheme }
}
