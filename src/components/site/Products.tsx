import { ArrowUpRight, BookOpen, GithubLogo, Images } from "@phosphor-icons/react"
import { products, type ProductId } from "@/lib/site-data"
import { ProductMark } from "./Logo"
import { Reveal } from "./Reveal"
import { SectionHead } from "./SectionHead"

interface ProductsProps {
  onOpenGallery: (product: ProductId, index?: number) => void
}

export function Products({ onOpenGallery }: ProductsProps) {
  return (
    <section className="section" id="tools">
      <div className="shell">
        <SectionHead
          eyebrow="The tools"
          title="Two halves of the same workflow"
          lede="3270Web is where you explore and record. 3270Connect is where you replay, scale and measure. They speak the same JSON and emit the same host profile."
        />

        <div className="mt-12 flex flex-col gap-8 md:gap-12">
          {products.map((product, productIndex) => (
            <Reveal key={product.id} delay={productIndex * 80}>
              <article className="panel">
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
                  {/* Copy column */}
                  <div className="order-2 p-6 md:p-9 lg:order-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <ProductMark product={product.id} size={38} className="flex-none" />
                      <h3 className="mono text-[1.5rem] font-bold tracking-tight text-[var(--text)] md:text-[1.75rem]">
                        {product.id}
                      </h3>
                      <span className="chip accent">{product.tagline}</span>
                    </div>

                    <p className="lede mt-4">{product.summary}</p>

                    <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {product.pillars.map((pillar) => (
                        <div key={pillar.title}>
                          <h4 className="eyebrow" style={{ color: "var(--accent)" }}>
                            {pillar.title}
                          </h4>
                          <ul className="mt-3 space-y-2.5">
                            {pillar.points.map((point) => (
                              <li
                                key={point}
                                className="flex gap-2 text-[0.86rem] leading-relaxed text-[var(--text-2)]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mono mt-[0.1rem] flex-none text-[var(--accent)]"
                                >
                                  ▸
                                </span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                      {product.meta.map((item) => (
                        <div key={item.label}>
                          <dt className="mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--text-3)]">
                            {item.label}
                          </dt>
                          <dd className="mono mt-0.5 text-[0.85rem] text-[var(--text)]">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={product.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn primary"
                      >
                        <BookOpen size={15} weight="bold" />
                        Documentation
                        <ArrowUpRight size={14} weight="bold" />
                      </a>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => onOpenGallery(product.id, 0)}
                      >
                        <Images size={15} weight="bold" />
                        {product.shots.length} screenshots
                      </button>
                      <a
                        href={product.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn ghost"
                        aria-label={`${product.id} on GitHub`}
                      >
                        <GithubLogo size={15} weight="bold" />
                        GitHub
                      </a>
                    </div>
                  </div>

                  {/* Screenshot column */}
                  <div
                    className="order-1 flex items-center p-6 md:p-9 lg:order-2"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <figure className="w-full">
                      <button
                        type="button"
                        className="shot clickable block w-full text-left"
                        onClick={() => onOpenGallery(product.id, 0)}
                        aria-label={`Open ${product.id} screenshot gallery`}
                      >
                        <span className="shot-bar">
                          <i />
                          <i />
                          <i />
                          <ProductMark product={product.id} size={13} className="ml-2 flex-none" />
                          <span className="mono truncate text-[0.65rem] tracking-[0.12em] uppercase text-[var(--text-3)]">
                            {product.id}
                          </span>
                        </span>
                        <img
                          src={product.hero.src}
                          alt={product.hero.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                      <figcaption className="mt-3 text-[0.78rem] leading-snug text-[var(--text-3)]">
                        {product.hero.caption}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
