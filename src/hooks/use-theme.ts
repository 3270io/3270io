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

function apply(theme: ThemeId) {
  const root = document.documentElement
  // "phosphor" is the bare :root palette, so it carries no attribute.
  if (theme === "phosphor") root.removeAttribute("data-theme")
  else root.setAttribute("data-theme", theme)
}

function readStored(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && THEMES.some((t) => t.id === stored)) return stored as ThemeId
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
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Non-persistent is fine; the choice still applies for this visit.
    }
  }, [])

  return { theme, setTheme }
}
