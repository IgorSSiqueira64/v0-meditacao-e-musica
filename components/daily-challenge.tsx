"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle2, AlertTriangle } from "lucide-react"

interface DailyChallengeProps {
  title: string
  description: string
  difficulty: "Fácil" | "Médio" | "Difícil" | "Extremo"
  reward: string
  completed: boolean
}

export function DailyChallenge({
  title,
  description,
  difficulty,
  reward,
  completed: initialCompleted,
}: DailyChallengeProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [expanded, setExpanded] = useState(false)

  const difficultyColor = {
    Fácil: "text-green-400",
    Médio: "text-yellow-400",
    Difícil: "text-orange-400",
    Extremo: "text-red-400",
  }

  return (
    <div
      className={`backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 ${
        completed
          ? "bg-blue-900/10 border-blue-500/30"
          : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
      }`}
    >
      <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            completed ? "bg-blue-500/20" : "bg-white/10"
          }`}
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-blue-400" />
          ) : (
            <Trophy className="h-5 w-5 text-yellow-400" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-base font-medium text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${difficultyColor[difficulty]}`}>{difficulty}</span>
            <span className="text-xs text-[#a0a0b0]">•</span>
            <span className="text-xs text-[#a0a0b0]">{reward}</span>
          </div>
        </div>

        {!completed && (
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            onClick={(e) => {
              e.stopPropagation()
              setCompleted(true)
            }}
          >
            Completar
          </Button>
        )}
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-white/10">
          <p className="text-sm text-[#a0a0b0] mb-4">{description}</p>

          {difficulty === "Extremo" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/10 border border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <p className="text-xs text-[#a0a0b0]">
                "Se você não está disposto a ir até o fim, por que começar?" - David Goggins
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
