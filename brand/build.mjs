/**
 * Generates the 3270 brand mark family.
 *
 * One vector, three products. The plate, the three-plane stack and the lighting
 * model are shared; the fan direction and the glyph knocked out of the front
 * face are what differ. This mirrors LogoMark in
 * 3270io/src/components/site/Logo.tsx so the static assets and the live
 * components stay the same drawing.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const OUT = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "assets")

/* The front face, in the shared 128x128 drawing space. Receding planes shrink
   by 8 units of width per step and offset along the variant's fan vector. */
const FACE = { x: 30, y: 46, w: 70, h: 46, r: 11 }

const VARIANTS = {
  "3270io": {
    label: "3270.io",
    /* Straight up: the +4 recentres the narrower plane, -10 lifts it. */
    fan: { dx: 4, dy: -10 },
    accent: "#4effb3",
    accent2: "#7cf9d0",
    /* The bare prompt: chevron and cursor. */
    glyph: `
      <path d="M44 58 56 68 44 78" fill="none" stroke="#000" stroke-width="7.5"
            stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="64" y="72" width="22" height="7" rx="3.5"/>`,
  },
  "3270connect": {
    label: "3270Connect",
    /* Right, with a slight rise: one session fanning out into many runs. */
    fan: { dx: 12, dy: -3.5 },
    accent: "#4effb3",
    accent2: "#7cf9d0",
    /* Doubled chevron: replay, fast-forward. */
    glyph: `
      <path d="M52 59 62 69 52 79" fill="none" stroke="#000" stroke-width="7"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M67 59 77 69 67 79" fill="none" stroke="#000" stroke-width="7"
            stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  "3270web": {
    label: "3270Web",
    /* Up and right. */
    fan: { dx: 11, dy: -7 },
    /* The family green. 3270Web's own terminal default is #39ff14, but a mark
       that differs from its siblings reads as a different brand — most visibly
       in a row of browser tabs, where the favicons sit side by side. The in-app
       mark still re-tints from the live theme; only the static kit is fixed. */
    accent: "#4effb3",
    accent2: "#7cf9d0",
    /* Mouse pointer: the 3270 screen, driven from a browser. A ring or globe
       would say "internet"; the cursor says "you click this one". */
    glyph: `
      <path d="M57 55.5 57 79.1 62.7 73.9 66.5 82 70.3 80.3 66.6 72.5 73.7 72Z"
            stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`,
  },
}

/** Tight bounding box of the three planes, before the glow. */
function bounds({ dx, dy }) {
  const planes = [0, 1, 2].map((i) => ({
    x: FACE.x + dx * i,
    y: FACE.y + dy * i,
    w: FACE.w - 8 * i,
    h: FACE.h,
  }))
  return {
    x0: Math.min(...planes.map((p) => p.x)),
    x1: Math.max(...planes.map((p) => p.x + p.w)),
    y0: Math.min(...planes.map((p) => p.y)),
    y1: Math.max(...planes.map((p) => p.y + p.h)),
  }
}

/**
 * A 96x88 window over the drawing, centred on the plate horizontally and
 * biased upward vertically to leave room for the glow cast beneath. The 37 is
 * lifted from the 3270.io mark's original viewBox so every variant frames the
 * same way.
 */
function viewBox(fan) {
  const b = bounds(fan)
  const cx = (b.x0 + b.x1) / 2
  const cy = (b.y0 + b.y1) / 2
  const round = (n) => Math.round(n * 100) / 100
  return `${round(cx - 48)} ${round(cy - 37)} 96 88`
}

/**
 * @param key      variant key
 * @param opts.id  prefix for every def id, so several marks can share a document
 * @param opts.accent/accent2  colour expressions; pass CSS vars for a mark that
 *                 re-tints with the host page's palette
 * @param opts.size  width/height attributes; omitted for a fluid mark
 */
function mark(key, opts = {}) {
  const v = VARIANTS[key]
  const id = opts.id ?? key
  const accent = opts.accent ?? v.accent
  const accent2 = opts.accent2 ?? v.accent2
  const { dx, dy } = v.fan
  const dim = opts.size ? ` width="${opts.size}" height="${opts.size}"` : ""
  const cls = opts.className ? ` class="${opts.className}"` : ""

  const plane = (i, opacity) =>
    `<rect x="${FACE.x + dx * i}" y="${FACE.y + dy * i}" width="${FACE.w - 8 * i}" ` +
    `height="${FACE.h}" rx="${FACE.r - i}" fill="${accent}" fill-opacity="${opacity}"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(v.fan)}"${dim} fill="none" role="img" aria-label="${v.label}"${cls}>
  <defs>
    <linearGradient id="${id}-face" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${accent2}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <linearGradient id="${id}-spec" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.26"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.03"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="${id}-glow" x="-50%" y="-50%" width="200%" height="200%">
      <!-- flood-color ignores var() as an attribute but honours it as CSS. -->
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-opacity="0.45" style="flood-color:${accent}"/>
    </filter>
    <mask id="${id}-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
      <rect width="128" height="128" fill="#fff"/>
      <g fill="#000">${v.glyph}
      </g>
    </mask>
    <clipPath id="${id}-face-clip">
      <rect x="${FACE.x}" y="${FACE.y}" width="${FACE.w}" height="${FACE.h}" rx="${FACE.r}"/>
    </clipPath>
  </defs>

  <!-- Receding planes: the sessions behind the one in front. -->
  ${plane(2, 0.2)}
  ${plane(1, 0.38)}

  <g filter="url(#${id}-glow)">
    <rect x="${FACE.x}" y="${FACE.y}" width="${FACE.w}" height="${FACE.h}" rx="${FACE.r}"
          fill="url(#${id}-face)" mask="url(#${id}-cut)"/>
  </g>

  <!-- Specular sweep, clipped to the front face. -->
  <g clip-path="url(#${id}-face-clip)">
    <path d="M${FACE.x} ${FACE.y}h${FACE.w}v20L${FACE.x} ${FACE.y + 38}Z" fill="url(#${id}-spec)"/>
  </g>
</svg>
`
}

/** Single-colour mark: inherits currentColor, no gradient, no glow. */
function monoMark(key) {
  const v = VARIANTS[key]
  const { dx, dy } = v.fan
  const plane = (i, opacity) =>
    `<rect x="${FACE.x + dx * i}" y="${FACE.y + dy * i}" width="${FACE.w - 8 * i}" ` +
    `height="${FACE.h}" rx="${FACE.r - i}" fill="currentColor" fill-opacity="${opacity}"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(v.fan)}" fill="none" role="img" aria-label="${v.label}">
  <defs>
    <mask id="${key}-mono-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="128" height="128">
      <rect width="128" height="128" fill="#fff"/>
      <g fill="#000">${v.glyph}
      </g>
    </mask>
  </defs>
  ${plane(2, 0.3)}
  ${plane(1, 0.55)}
  <rect x="${FACE.x}" y="${FACE.y}" width="${FACE.w}" height="${FACE.h}" rx="${FACE.r}"
        fill="currentColor" mask="url(#${key}-mono-cut)"/>
</svg>
`
}

/**
 * Mark plus wordmark, on one baseline.
 *
 * Each tspan carries an explicit textLength, so the lockup occupies the same
 * width whatever monospace face the renderer resolves — the SVG can be dropped
 * into a README, a slide or a doc site without the wordmark reflowing out of
 * its own viewBox.
 */
function lockup(key, opts = {}) {
  const v = VARIANTS[key]
  const [head, tail] =
    key === "3270io" ? ["3270", ".io"] : ["3270", key === "3270web" ? "Web" : "Connect"]
  const inner = mark(key, { id: `${key}-lk` })
    .replace(/^<svg[^>]*>\n/, "")
    .replace(/<\/svg>\n?$/, "")
  const vb = viewBox(v.fan).split(" ").map(Number)
  const markW = 120
  const textX = markW + 16
  /* 0.6em advance is the monospace convention; letter-spacing adds 1 per glyph. */
  const adv = (s) => s.length * (54 * 0.6 + 1)
  const width = Math.round(textX + adv(head) + adv(tail) + 6)
  const ink = opts.onLight ? "#0b1a12" : "#e8f5ee"

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 120" width="${width}" height="120" fill="none" role="img" aria-label="${v.label}">
  <g transform="translate(0 ${(120 - (markW * vb[3]) / vb[2]) / 2}) scale(${markW / vb[2]}) translate(${-vb[0]} ${-vb[1]})">
${inner}
  </g>
  <text y="76" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, 'DejaVu Sans Mono', monospace"
        font-size="54" text-rendering="geometricPrecision">
    <tspan x="${textX}" textLength="${adv(head)}" lengthAdjust="spacing" fill="${ink}" font-weight="700">${head}</tspan><tspan textLength="${adv(tail)}" lengthAdjust="spacing" fill="${v.accent}" font-weight="500">${tail}</tspan>
  </text>
</svg>
`
}

/**
 * The mark in a square frame, for favicons and app icons — the plate window is
 * 96x88, so the extra 8 goes above to keep the glow's headroom below.
 */
function icon(key) {
  const vb = viewBox(VARIANTS[key].fan).split(" ").map(Number)
  return mark(key, { id: `${key}-icon` }).replace(
    /viewBox="[^"]+"/,
    `viewBox="${vb[0]} ${vb[1] - 8} 96 96"`,
  )
}

/* ------------------------------------------------------------------------ */

/**
 * Packs PNG frames into an .ico. Every frame is stored as a PNG payload, which
 * every target that matters has understood since Windows Vista, and which
 * keeps the file a fraction of the size of BMP-encoded frames.
 */
function ico(frames) {
  const dir = Buffer.alloc(6 + frames.length * 16)
  dir.writeUInt16LE(0, 0) // reserved
  dir.writeUInt16LE(1, 2) // type: icon
  dir.writeUInt16LE(frames.length, 4)

  let offset = dir.length
  frames.forEach(({ size, png }, i) => {
    const e = 6 + i * 16
    dir.writeUInt8(size >= 256 ? 0 : size, e) // 0 means 256
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1)
    dir.writeUInt8(0, e + 2) // palette size: not paletted
    dir.writeUInt8(0, e + 3) // reserved
    dir.writeUInt16LE(1, e + 4) // colour planes
    dir.writeUInt16LE(32, e + 6) // bits per pixel
    dir.writeUInt32LE(png.length, e + 8)
    dir.writeUInt32LE(offset, e + 12)
    offset += png.length
  })
  return Buffer.concat([dir, ...frames.map((f) => f.png)])
}

const MARK_PNG = [512, 256, 128, 64, 32]
const ICON_PNG = [512, 256, 128, 64, 48, 32, 16]
const ICO_SIZES = [256, 128, 64, 48, 32, 16]
const LOCKUP_PNG = [1200, 600, 300]

rmSync(OUT, { recursive: true, force: true })

const browser = await chromium.launch()
const page = await browser.newPage()

/** Rasterises an SVG string at an exact pixel box, on a transparent ground. */
async function raster(svg, w, h) {
  await page.setViewportSize({ width: Math.ceil(w), height: Math.ceil(h) })
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}
     svg{display:block;width:${w}px;height:${h}px}</style>${svg}`,
  )
  return page.screenshot({ omitBackground: true })
}

const ratioOf = (svg) => {
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number)
  return vb[3] / vb[2]
}

for (const key of Object.keys(VARIANTS)) {
  const dir = join(OUT, key)
  mkdirSync(dir, { recursive: true })
  const put = (name, data) => writeFileSync(join(dir, name), data)

  const svgs = {
    [`${key}-mark.svg`]: mark(key, { size: 512 }),
    [`${key}-mark-mono.svg`]: monoMark(key),
    /* Themable: for embedding in a page that owns --accent / --accent-2. */
    [`${key}-mark-themed.svg`]: mark(key, {
      accent: "var(--accent)",
      accent2: "var(--accent-2)",
    }),
    [`${key}-icon.svg`]: icon(key),
    [`${key}-lockup.svg`]: lockup(key),
    [`${key}-lockup-light.svg`]: lockup(key, { onLight: true }),
  }
  for (const [name, svg] of Object.entries(svgs)) put(name, svg)

  const markRatio = ratioOf(svgs[`${key}-mark.svg`])
  for (const s of MARK_PNG) {
    put(`${key}-mark-${s}.png`, await raster(svgs[`${key}-mark.svg`], s, s * markRatio))
  }
  for (const s of ICON_PNG) {
    put(`${key}-icon-${s}.png`, await raster(svgs[`${key}-icon.svg`], s, s))
  }
  const lockRatio = ratioOf(svgs[`${key}-lockup.svg`])
  for (const w of LOCKUP_PNG) {
    put(`${key}-lockup-${w}.png`, await raster(svgs[`${key}-lockup.svg`], w, w * lockRatio))
    put(
      `${key}-lockup-light-${w}.png`,
      await raster(svgs[`${key}-lockup-light.svg`], w, w * lockRatio),
    )
  }

  const frames = []
  for (const size of ICO_SIZES) {
    frames.push({ size, png: await raster(svgs[`${key}-icon.svg`], size, size) })
  }
  put(`${key}.ico`, ico(frames))

  console.log(`  ${key}: ${Object.keys(svgs).length} svg, ${MARK_PNG.length + ICON_PNG.length + LOCKUP_PNG.length * 2} png, 1 ico`)
}

await browser.close()
console.log("wrote", OUT)
