import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface PremiumCategoryProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  href: string
  children?: ReactNode
}

export function PremiumCategory({ title, description, icon: Icon, color, href, children }: PremiumCategoryProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/8 hover:border-white/20 hover:shadow-[0_0_25px_rgba(66,153,225,0.2)] group">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>
            <p className="text-[#a0a0b0] mb-4">{description}</p>
            {children}
            <Button
              asChild
              className="mt-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            >
              <Link href={href}>Explorar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
