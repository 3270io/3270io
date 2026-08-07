import { capabilities } from "@/lib/site-data"
import { DataIcon } from "./icons"
import { Reveal } from "./Reveal"
import { SectionHead } from "./SectionHead"

export function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <SectionHead
          eyebrow="Capabilities"
          title="Everything a 3270 estate needs, without a licence server"
          lede="Conversational control, automated discovery, load generation and first-class telemetry — all of it open source, all of it self-hosted."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={(index % 3) * 70}>
              <article className="panel interactive h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="grid size-10 flex-none place-items-center rounded-[var(--r-sm)]"
                    style={{
                      background: "var(--accent-soft)",
                      border: "1px solid var(--line-strong)",
                      color: "var(--accent)",
                    }}
                  >
                    <DataIcon name={capability.icon} size={20} />
                  </span>
                  <span className="chip">{capability.tag}</span>
                </div>

                <h3 className="h3 mt-5">{capability.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-[var(--text-2)]">
                  {capability.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
