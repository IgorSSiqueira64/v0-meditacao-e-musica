import type { LucideIcon } from "lucide-react"

export interface Intention {
  id: string
  name: string
  description: string
  affirmation: string
  icon: LucideIcon
  fractalImage: string
  geometryImage: string
  videoUrl: string
  color: string
  benefits?: string[]
}
