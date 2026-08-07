import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  /** Stagger within a group, in milliseconds. */
  delay?: number
  className?: string
  as?: ElementType
}

/**
 * Fades content in the first time it scrolls into view. Purely additive —
 * the content is in the DOM from the start, and `prefers-reduced-motion`
 * flattens the transition in CSS.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
