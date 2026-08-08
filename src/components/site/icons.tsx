import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import {
  ChartLineUp,
  Detective,
  Gauge,
  Lightning,
  Package,
  Plugs,
  PuzzlePiece,
  Record,
  Repeat,
  Robot,
  ShieldCheck,
  Shuffle,
  Terminal,
  TreeStructure,
} from "@phosphor-icons/react"

/** Keeps the content model free of component imports. */
const REGISTRY: Record<string, PhosphorIcon> = {
  chart: ChartLineUp,
  detective: Detective,
  gauge: Gauge,
  lightning: Lightning,
  package: Package,
  plug: Plugs,
  puzzle: PuzzlePiece,
  record: Record,
  repeat: Repeat,
  robot: Robot,
  shield: ShieldCheck,
  shuffle: Shuffle,
  terminal: Terminal,
  tree: TreeStructure,
}

export function DataIcon({
  name,
  size = 20,
  className = "",
}: {
  name: string
  size?: number
  className?: string
}) {
  const Component = REGISTRY[name] ?? Terminal
  return <Component size={size} weight="duotone" className={className} aria-hidden="true" />
}
