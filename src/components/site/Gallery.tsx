import { CaretLeft, CaretRight, X } from "@phosphor-icons/react"
import { useCallback, useEffect } from "react"
import { products, type ProductId } from "@/lib/site-data"

interface GalleryProps {
  product: ProductId | null
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

/**
 * Screenshot lightbox. Hand-rolled rather than pulled from a dialog library:
 * it needs nothing but a backdrop, arrow keys and a focus trap of one button,
 * and staying dependency-free keeps the page weight honest.
 */
export function Gallery({ product, index, onIndexChange, onClose }: GalleryProps) {
  const entry = products.find((item) => item.id === product)
  const shots = entry?.shots ?? []
  const count = shots.length

  const step = useCallback(
    (delta: number) => {
      if (count === 0) return
      onIndexChange((index + delta + count) % count)
    },
    [count, index, onIndexChange],
  )

  useEffect(() => {
    if (!product) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [product, onClose, step])

  if (!product || !entry || count === 0) return null

  const shot = shots[Math.min(index, count - 1)]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.id} screenshots`}
      style={{ background: "color-mix(in srgb, var(--bg-deep) 88%, transparent)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 md:px-6"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <span className="mono text-[0.8rem] font-semibold text-[var(--text)]">{entry.id}</span>
        <span className="num text-[0.72rem] text-[var(--text-3)]">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          className="btn sm icon ml-auto"
          onClick={onClose}
          aria-label="Close gallery"
          autoFocus
        >
          <X size={16} weight="bold" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center p-3 md:p-8">
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          className="max-h-full max-w-full rounded-[var(--r-md)] object-contain"
          style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow-3)" }}
        />

        {count > 1 ? (
          <>
            <button
              type="button"
              className="btn icon absolute left-3 top-1/2 -translate-y-1/2 md:left-6"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              className="btn icon absolute right-3 top-1/2 -translate-y-1/2 md:right-6"
              onClick={() => step(1)}
              aria-label="Next screenshot"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </>
        ) : null}
      </div>

      <div className="px-4 pb-4 md:px-8 md:pb-6">
        <p className="text-center text-[0.85rem] text-[var(--text-2)]">{shot.caption}</p>
        {count > 1 ? (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {shots.map((thumb, thumbIndex) => (
              <button
                key={thumb.src}
                type="button"
                onClick={() => onIndexChange(thumbIndex)}
                aria-label={`Show screenshot ${thumbIndex + 1}: ${thumb.caption}`}
                aria-current={thumbIndex === index}
                className="h-11 w-16 overflow-hidden rounded-[var(--r-xs)] transition-[border-color,opacity]"
                style={{
                  border: `1px solid ${thumbIndex === index ? "var(--accent)" : "var(--line)"}`,
                  opacity: thumbIndex === index ? 1 : 0.55,
                }}
              >
                <img
                  src={thumb.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
