interface LogoProps {
  size?: number
  className?: string
}

/**
 * The 3270.io mark: a terminal bezel with a phosphor prompt inside.
 * Drawn with currentColor for the frame and the accent token for the prompt,
 * so it re-tints with the active theme.
 */
export function LogoMark({ size = 30, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1.25"
        y="3.25"
        width="29.5"
        height="25.5"
        rx="6"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <rect x="4.5" y="6.5" width="23" height="19" rx="3.5" fill="var(--accent-soft)" />
      <path
        d="M9.5 12.5 13.5 16 9.5 19.5"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.5 20h7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`mono ${className}`} style={{ letterSpacing: "0.02em" }}>
      <span style={{ fontWeight: 700, color: "var(--text)" }}>3270</span>
      <span style={{ fontWeight: 500, color: "var(--accent)" }}>.io</span>
    </span>
  )
}
