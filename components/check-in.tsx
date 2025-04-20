"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar } from "lucide-react"

interface CheckInProps {
  onComplete: () => void
}

export function CheckIn({ onComplete }: CheckInProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [mood, setMood] = useState<string | null>(null)

  const handleCheckIn = () => {
    setIsCheckedIn(true)
    onComplete()
  }

  const moods = [
    { emoji: "😌", label: "Calmo" },
    { emoji: "😊", label: "Feliz" },
    { emoji: "😤", label: "Determinado" },
    { emoji: "😔", label: "Reflexivo" },
    { emoji: "😓", label: "Cansado" },
    { emoji: "😠", label: "Desafiado" },
  ]

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-medium text-white">Check-in Diário</h3>
      </div>

      {!isCheckedIn ? (
        <div className="space-y-4">
          <p className="text-sm text-[#a0a0b0]">Como você está se sentindo hoje? Escolha seu estado mental atual.</p>

          <div className="grid grid-cols-3 gap-2">
            {moods.map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className={`flex flex-col items-center gap-1 h-auto py-2 rounded-xl ${
                  mood === item.label
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
                onClick={() => setMood(item.label)}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>

          <Button
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            disabled={!mood}
            onClick={handleCheckIn}
          >
            Registrar Check-in
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-white font-medium">Check-in Completo!</p>
            <p className="text-sm text-[#a0a0b0]">Você está se sentindo {mood} hoje</p>
          </div>
          <p className="text-xs text-[#a0a0b0] pt-2">
            "Permaneça fiel ao processo. Os resultados virão." - David Goggins
          </p>
        </div>
      )}
    </div>
  )
}
