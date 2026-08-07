import { useState } from "react"
import { products, type ProductId } from "@/lib/site-data"
import { Reveal } from "./Reveal"
import { SectionHead } from "./SectionHead"

interface ShowcaseProps {
  onOpen: (product: ProductId, index: number) => void
}

export function Showcase({ onOpen }: ShowcaseProps) {
  const [active, setActive] = useState<ProductId>("3270Connect")
  const entry = products.find((item) => item.id === active)!

  return (
    <section className="section" id="showcase">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Screenshots"
            title="Interfaces worth looking at"
            lede="Both products ship the same visual language — glass panels, tabular numbers, four themes and a keyboard-first console."
          />

          <Reveal delay={80}>
            <div className="segmented" role="group" aria-label="Choose a product">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActive(product.id)}
                  aria-pressed={active === product.id}
                >
                  {product.id}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entry.shots.map((shot, index) => (
            <Reveal key={shot.src} delay={(index % 3) * 60}>
              <figure className="h-full">
                <button
                  type="button"
                  className="shot clickable block w-full text-left"
                  onClick={() => onOpen(entry.id, index)}
                  aria-label={`Open screenshot: ${shot.caption}`}
                >
                  <span className="shot-bar">
                    <i />
                    <i />
                    <i />
                  </span>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </button>
                <figcaption className="mt-2.5 text-[0.78rem] leading-snug text-[var(--text-3)]">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
