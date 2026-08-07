import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

interface SectionHeadProps {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: "left" | "center"
}

export function SectionHead({ eyebrow, title, lede, align = "left" }: SectionHeadProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">
        <span className="dot" />
        {eyebrow}
      </p>
      <h2 className="h2 mt-4">{title}</h2>
      {lede ? <p className="lede mt-4">{lede}</p> : null}
    </Reveal>
  )
}
