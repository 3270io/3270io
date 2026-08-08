import { ArrowRight, BookOpen, GithubLogo } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { bootLines, heroStats } from "@/lib/site-data"
import { LogoMark } from "./Logo"
import { Reveal } from "./Reveal"

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
}

/** The old site gated the page behind a full-screen boot sequence. The
 *  sequence was the best part of it, so it lives here instead — running
 *  inside the hero while the rest of the page stays readable. */
function BootLog() {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? bootLines.length : 0))

  useEffect(() => {
    if (shown >= bootLines.length) return
    const timer = setTimeout(() => setShown((count) => count + 1), shown === 0 ? 260 : 420)
    return () => clearTimeout(timer)
  }, [shown])

  const done = shown >= bootLines.length

  return (
    <div className="term">
      <div className="panel-head" style={{ background: "var(--surface-2)" }}>
        <span className="dot live" />
        <span className="mono text-[0.7rem] tracking-[0.14em] uppercase text-[var(--text-3)]">
          session · discover → replay
        </span>
        <span className="num ml-auto text-[0.7rem] text-[var(--text-3)]">25 workers</span>
      </div>

      <div className="term-body" aria-live="polite">
        {bootLines.slice(0, shown).map((line, index) => (
          <div className="term-line" key={line.text}>
            <span className="sig">{line.cmd ? "$" : "›"}</span>
            <span className="txt flex-1">{line.text}</span>
            {line.tag ? (
              <span className={`tag ${line.tone === "info" ? "info" : ""}`}>[{line.tag}]</span>
            ) : null}
          </div>
        ))}
        {!done ? (
          <div className="term-line">
            <span className="sig">›</span>
            <span className="caret" />
          </div>
        ) : null}
      </div>

      <div
        className="grid grid-cols-3 gap-px"
        style={{ borderTop: "1px solid var(--line)", background: "var(--line)" }}
      >
        {[
          { label: "Screens mapped", value: "34" },
          { label: "Success", value: "97.1%" },
          { label: "Completed", value: "2,313" },
        ].map((cell) => (
          <div key={cell.label} className="px-4 py-3" style={{ background: "var(--surface-2)" }}>
            <div className="mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--text-3)]">
              {cell.label}
            </div>
            <div className="num mt-1 text-[1.05rem] font-semibold text-[var(--text)]">
              {cell.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="section pt-12 md:pt-16" id="top">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <LogoMark size={58} variant="3270io" title="3270.io" className="flex-none" />
                <span className="chip accent">
                  <span className="dot live" />
                  Open source · since 2023
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="display mt-6">
                Drive the mainframe like <span className="grad-text">modern infrastructure</span>.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="lede mt-6 max-w-xl">
                3270.io builds two open-source products for IBM 3270 systems.{" "}
                <strong className="font-semibold text-[var(--text)]">3270Web</strong> puts an
                enterprise terminal in a browser tab and uses AI to map the application behind
                the screens, so it can be driven in plain English.{" "}
                <strong className="font-semibold text-[var(--text)]">3270Connect</strong> replays
                workflows headless at any scale, onto a live operations console. Each is useful on
                its own; together they close the loop.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#tools" className="btn primary">
                  Explore the products
                  <ArrowRight size={15} weight="bold" />
                </a>
                <a
                  href="https://3270connect.3270.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <BookOpen size={15} weight="bold" />
                  Documentation
                </a>
                <a
                  href="https://github.com/3270io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost"
                >
                  <GithubLogo size={15} weight="bold" />
                  Source
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <BootLog />
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-14 md:mt-20">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {heroStats.map((stat) => (
              <div className="kpi" key={stat.label}>
                <div className="mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-3)]">
                  {stat.label}
                </div>
                <span className="kpi-value mt-1">{stat.value}</span>
                <div className="mt-1 text-[0.78rem] leading-snug text-[var(--text-3)]">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
