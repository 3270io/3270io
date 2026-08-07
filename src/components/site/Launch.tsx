import { ArrowUpRight } from "@phosphor-icons/react"
import { launchCards } from "@/lib/site-data"
import { Reveal } from "./Reveal"
import { SectionHead } from "./SectionHead"

export function Launch() {
  return (
    <section className="section" id="start">
      <div className="shell">
        <SectionHead
          eyebrow="Get started"
          title="Pick a door"
          lede="Both projects are MIT-licensed and self-hosted. Each one carries its own documentation — this is just the way in."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {launchCards.map((card, index) => (
            <Reveal key={card.id} delay={index * 90}>
              <article className="panel interactive flex h-full flex-col p-7 md:p-9">
                <span className="eyebrow">{card.startHere}</span>
                <h3 className="mono mt-4 text-[1.4rem] font-bold tracking-tight text-[var(--text)]">
                  {card.id}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--text-2)]">
                  {card.body}
                </p>

                <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
                  {card.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${link.kind === "primary" ? "primary" : link.kind === "ghost" ? "ghost" : ""}`}
                    >
                      {link.label}
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
