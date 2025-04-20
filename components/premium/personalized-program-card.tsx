import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PersonalizedProgramCardProps {
  title: string
  description: string
  duration: string
  sessionsTotal: number
  sessionsCompleted: number
  coverUrl: string
  href: string
}

export function PersonalizedProgramCard({
  title,
  description,
  duration,
  sessionsTotal,
  sessionsCompleted,
  coverUrl,
  href,
}: PersonalizedProgramCardProps) {
  const progress = (sessionsCompleted / sessionsTotal) * 100

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/8 hover:border-white/20 hover:shadow-[0_0_25px_rgba(66,153,225,0.2)] group">
      <div className="relative h-40">
        <img
          src={coverUrl || "/placeholder.svg?height=160&width=400"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-medium text-white group-hover:text-blue-300 transition-colors">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[#a0a0b0]">{duration}</span>
            <span className="text-xs text-[#a0a0b0]">•</span>
            <span className="text-xs text-[#a0a0b0]">{sessionsTotal} sessões</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-[#a0a0b0] mb-4">{description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#a0a0b0]">Progresso</span>
            <span className="text-white">
              {sessionsCompleted}/{sessionsTotal} sessões
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-white/10"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>

        <Button
          asChild
          className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
        >
          <a href={href}>
            Continuar <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}
