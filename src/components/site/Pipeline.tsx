import { pipeline } from "@/lib/site-data"
import { DataIcon } from "./icons"
import { ProductMark } from "./Logo"
import { Reveal } from "./Reveal"
import { SectionHead } from "./SectionHead"

function Arrow() {
  return (
    <div className="pipe-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12h14m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function Pipeline() {
  return (
    <section className="section" id="pipeline">
      <div className="shell">
        <SectionHead
          eyebrow="Used together"
          title="Record once. Replay everywhere."
          lede="Neither product needs the other, but this is what they do as a pair: a session you click through — or that AI maps for you — becomes a file you can commit, review and run on every build, and the same file drives a thousand parallel sessions when you need a load profile."
        />

        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
          {pipeline.map((step, index) => (
            <div key={step.kicker} className="contents">
              <Reveal delay={index * 80} className="h-full">
                <article className="panel h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow">{step.kicker}</span>
                    <span
                      className="mono text-[0.62rem] tracking-[0.1em]"
                      style={{ color: "var(--accent)" }}
                    >
                      {step.tool}
                    </span>
                  </div>

                  {/* Step icon on the left, the owning product's mark on the
                      right. The mark lives here rather than beside the tool
                      name above, where it squeezed the kicker onto two lines
                      and knocked the card titles out of alignment. */}
                  <span className="mt-5 flex items-center justify-between">
                    <span
                      className="grid size-10 place-items-center rounded-[var(--r-sm)]"
                      style={{
                        background: "var(--accent-soft)",
                        border: "1px solid var(--line-strong)",
                        color: "var(--accent)",
                      }}
                    >
                      <DataIcon name={step.icon} size={20} />
                    </span>
                    <ProductMark product={step.tool} size={26} />
                  </span>

                  <h3 className="h3 mt-4">{step.title}</h3>
                  <p className="mt-2.5 text-[0.86rem] leading-relaxed text-[var(--text-2)]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
              {index < pipeline.length - 1 ? <Arrow /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
