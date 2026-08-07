interface LogoProps {
  size?: number
  className?: string
}

/**
 * The 3270.io mark: the session stack — three terminal screens receding in
 * depth, one session recorded and replayed many times.
 *
 * The plate, the stack and the lighting model are shared with 3270Connect and
 * 3270Web (see each repo's `overrides/partials/logo.html`); the fan direction
 * and the glyph on the front screen are what differ. 3270.io fans straight up
 * and carries the bare prompt.
 *
 * Everything colour-bearing reads the accent tokens, so the mark re-tints with
 * the active palette. The prompt is knocked *out* of the lit face rather than
 * drawn on top, so the page shows through it.
 */
export function LogoMark({ size = 30, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="16 22 96 88"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="logo-face" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="logo-spec" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.26" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          {/* flood-color ignores var() as an attribute but honours it as CSS. */}
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="6"
            floodOpacity="0.45"
            style={{ floodColor: "var(--accent)" }}
          />
        </filter>
        <mask id="logo-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
          <rect width="128" height="128" fill="#fff" />
          <g fill="#000">
            <path
              d="M44 58 56 68 44 78"
              fill="none"
              stroke="#000"
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="64" y="72" width="22" height="7" rx="3.5" />
          </g>
        </mask>
        <clipPath id="logo-face-clip">
          <rect x="30" y="46" width="70" height="46" rx="11" />
        </clipPath>
      </defs>

      {/* Receding planes: the sessions behind the one in front. */}
      <rect x="38" y="26" width="54" height="46" rx="9" fill="var(--accent)" fillOpacity="0.2" />
      <rect x="34" y="36" width="62" height="46" rx="10" fill="var(--accent)" fillOpacity="0.38" />

      <g filter="url(#logo-glow)">
        <rect
          x="30"
          y="46"
          width="70"
          height="46"
          rx="11"
          fill="url(#logo-face)"
          mask="url(#logo-cut)"
        />
      </g>

      {/* Specular sweep, clipped to the front face. */}
      <g clipPath="url(#logo-face-clip)">
        <path d="M30 46h70v20L30 84Z" fill="url(#logo-spec)" />
      </g>
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
