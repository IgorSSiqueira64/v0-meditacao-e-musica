import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PremiumSessionCardProps {
  title: string
  instructor: string
  category: string
  duration: string
  level: "Iniciante" | "Intermediário" | "Avançado"
  coverUrl: string
  isLocked?: boolean
  href: string
}

export function PremiumSessionCard({
  title,
  instructor,
  category,
  duration,
  level,
  coverUrl,
  isLocked = false,
  href,
}: PremiumSessionCardProps) {
  const levelColor = {
    Iniciante: "bg-green-500/20 text-green-400",
    Intermediário: "bg-blue-500/20 text-blue-400",
    Avançado: "bg-purple-500/20 text-purple-400",
  }[level]

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all hover:bg-white/8 hover:border-white/20 hover:shadow-[0_0_25px_rgba(66,153,225,0.2)] group">
      <div className="relative aspect-video">
        <img
          src={coverUrl || "/placeholder.svg?height=200&width=360"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="bg-black/50 text-xs border-white/20">
              {category}
            </Badge>
            <Badge variant="outline" className={`${levelColor} text-xs border-transparent`}>
              {level}
            </Badge>
          </div>
          <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">{title}</h3>
          <p className="text-sm text-[#a0a0b0]">{instructor}</p>
        </div>
        {isLocked && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm text-[#a0a0b0]">{duration}</span>
        <Button
          asChild={!isLocked}
          variant="ghost"
          size="sm"
          className="rounded-full hover:bg-white/10"
          disabled={isLocked}
        >
          {isLocked ? <span>Premium</span> : <a href={href}>Assistir</a>}
        </Button>
      </div>
    </div>
  )
}
