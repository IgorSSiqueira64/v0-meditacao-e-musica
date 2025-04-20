import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: string | number
  change?: {
    value: string | number
    positive: boolean
  }
  icon: LucideIcon
  color: string
  children?: ReactNode
}

export function AnalyticsCard({ title, value, change, icon: Icon, color, children }: AnalyticsCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:bg-white/8 hover:border-white/20">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-[#a0a0b0]">{title}</h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <div className={`text-xs ${change.positive ? "text-green-400" : "text-red-400"} mb-1`}>
            {change.positive ? "↑" : "↓"} {change.value}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
