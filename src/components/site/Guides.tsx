import { practicalGuides } from "@/lib/site-data"
import { SectionHead } from "./SectionHead"
import { ProductMark } from "./Logo"

export function Guides() {
  return (
    <section className="section" id="guides">
      <div className="shell">
        <SectionHead eyebrow="Practical guides" title="From your first session to a repeatable test"
          lede="Choose a terminal, record a flow, or plan a test. Each guide lives with the product it uses." />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {practicalGuides.map(guide => (
            <a key={guide.href} href={guide.href} target="_blank" rel="noopener noreferrer"
              className="panel interactive flex h-full flex-col p-6">
              <span className="flex items-center gap-2 text-[0.75rem] text-[var(--accent)]">
                <ProductMark product={guide.product} size={18} /> {guide.product}
              </span>
              <h3 className="h3 mt-4">{guide.title}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--text-2)]">{guide.description}</p>
              <span className="mt-auto pt-5 text-[0.85rem] font-medium text-[var(--accent)]">
                Read the guide <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
