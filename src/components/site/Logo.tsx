import type { ProductId } from "@/lib/site-data"

/**
 * The 3270 mark family: the session stack — three terminal screens receding in
 * depth, one session recorded and replayed many times.
 *
 * The plate, the stack and the lighting model are shared across all three; the
 * fan direction and the glyph knocked out of the front face are what differ.
 * 3270.io fans straight up and carries the bare prompt; 3270Connect fans right
 * with a doubled chevron; 3270Web fans up-right with a mouse pointer, for a
 * 3270 screen driven from a browser.
 *
 * This is the same drawing as `brand/build.mjs`, which generates the static
 * SVG/PNG/ICO kit — change the geometry in both or they drift apart.
 *
 * Everything colour-bearing reads the accent tokens, so the mark re-tints with
 * the active palette. The glyph is knocked *out* of the lit face rather than
 * drawn on top, so the page shows through it.
 */

type MarkId = "3270io" | ProductId

interface Variant {
  viewBox: string
  /** Per-plane offset as the stack recedes; +4 of the dx recentres the narrower plane. */
  fan: { dx: number; dy: number }
  glyph: React.ReactNode
}

const VARIANTS: Record<MarkId, Variant> = {
  "3270io": {
    viewBox: "17 22 96 88",
    fan: { dx: 4, dy: -10 },
    glyph: (
      <>
        <path
          d="M44 58 56 68 44 78"
          fill="none"
          stroke="#000"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="64" y="72" width="22" height="7" rx="3.5" />
      </>
    ),
  },
  "3270Connect": {
    viewBox: "21 28.5 96 88",
    fan: { dx: 12, dy: -3.5 },
    glyph: (
      <>
        <path
          d="M52 59 62 69 52 79"
          fill="none"
          stroke="#000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M67 59 77 69 67 79"
          fill="none"
          stroke="#000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  "3270Web": {
    viewBox: "20 25 96 88",
    fan: { dx: 11, dy: -7 },
    glyph: (
      <path
        d="M57 55.5 57 79.1 62.7 73.9 66.5 82 70.3 80.3 66.6 72.5 73.7 72Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
}

const FACE = { x: 30, y: 46, w: 70, h: 46, r: 11 }

interface LogoProps {
  size?: number
  className?: string
  /** Which mark to draw. Defaults to the umbrella 3270.io mark. */
  variant?: MarkId
  /** Announced name; omit for a decorative mark sitting beside its own wordmark. */
  title?: string
}

export function LogoMark({ size = 30, className = "", variant = "3270io", title }: LogoProps) {
  const v = VARIANTS[variant]
  /* Ids are namespaced per variant: several marks share one document on the
     landing page, and duplicate ids would point every mask at the first one. */
  const uid = variant.toLowerCase()
  const plane = (i: number, opacity: number) => (
    <rect
      x={FACE.x + v.fan.dx * i}
      y={FACE.y + v.fan.dy * i}
      width={FACE.w - 8 * i}
      height={FACE.h}
      rx={FACE.r - i}
      fill="var(--accent)"
      fillOpacity={opacity}
    />
  )

  return (
    <svg
      width={size}
      height={size}
      viewBox={v.viewBox}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      <defs>
        <linearGradient id={`${uid}-face`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id={`${uid}-spec`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.26" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          {/* flood-color ignores var() as an attribute but honours it as CSS. */}
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="6"
            floodOpacity="0.45"
            style={{ floodColor: "var(--accent)" }}
          />
        </filter>
        <mask id={`${uid}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
          <rect width="128" height="128" fill="#fff" />
          <g fill="#000">{v.glyph}</g>
        </mask>
        <clipPath id={`${uid}-face-clip`}>
          <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} rx={FACE.r} />
        </clipPath>
      </defs>

      {/* Receding planes: the sessions behind the one in front. */}
      {plane(2, 0.2)}
      {plane(1, 0.38)}

      <g filter={`url(#${uid}-glow)`}>
        <rect
          x={FACE.x}
          y={FACE.y}
          width={FACE.w}
          height={FACE.h}
          rx={FACE.r}
          fill={`url(#${uid}-face)`}
          mask={`url(#${uid}-cut)`}
        />
      </g>

      {/* Specular sweep, clipped to the front face. */}
      <g clipPath={`url(#${uid}-face-clip)`}>
        <path d={`M${FACE.x} ${FACE.y}h${FACE.w}v20L${FACE.x} ${FACE.y + 38}Z`} fill={`url(#${uid}-spec)`} />
      </g>
    </svg>
  )
}

/** The mark for a given product, for use beside that product's name. */
export function ProductMark({
  product,
  size = 28,
  className = "",
}: {
  product: ProductId
  size?: number
  className?: string
}) {
  return <LogoMark variant={product} size={size} className={className} />
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`mono ${className}`} style={{ letterSpacing: "0.02em" }}>
      <span style={{ fontWeight: 700, color: "var(--text)" }}>3270</span>
      <span style={{ fontWeight: 500, color: "var(--accent)" }}>.io</span>
    </span>
  )
}
