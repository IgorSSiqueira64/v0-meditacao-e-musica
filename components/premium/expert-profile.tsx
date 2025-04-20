import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface ExpertProfileProps {
  name: string
  title: string
  bio: string
  imageUrl: string
  specialties: string[]
  upcomingSession?: {
    title: string
    date: string
    time: string
  }
}

export function ExpertProfile({ name, title, bio, imageUrl, specialties, upcomingSession }: ExpertProfileProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-white/8 hover:border-white/20 hover:shadow-[0_0_25px_rgba(66,153,225,0.2)]">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 mx-auto md:mx-0">
            <Image src={imageUrl || "/placeholder.svg?height=128&width=128"} alt={name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-white mb-1 text-center md:text-left">{name}</h3>
            <p className="text-blue-400 mb-3 text-center md:text-left">{title}</p>
            <p className="text-[#a0a0b0] mb-4">{bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#a0a0b0]"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {upcomingSession && (
              <div className="mt-4 p-4 rounded-xl bg-blue-900/20 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Próxima Sessão ao Vivo</h4>
                    <p className="text-sm text-blue-300">{upcomingSession.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#a0a0b0]">{upcomingSession.date}</span>
                      <span className="text-xs text-[#a0a0b0]">•</span>
                      <span className="text-xs text-[#a0a0b0]">{upcomingSession.time}</span>
                    </div>
                    <Button className="mt-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-xs h-8 px-4">
                      Reservar Vaga
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
