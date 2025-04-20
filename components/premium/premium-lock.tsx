import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PremiumLockProps {
  title: string
  description: string
  className?: string
}

export function PremiumLock({ title, description, className = "" }: PremiumLockProps) {
  return (
    <div className={`backdrop-blur-md bg-black/50 rounded-xl p-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
        <Lock className="h-8 w-8 text-blue-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-[#a0a0b0] mb-6">{description}</p>
      <Button
        asChild
        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
      >
        <Link href="/premium">Desbloquear com Premium</Link>
      </Button>
    </div>
  )
}
