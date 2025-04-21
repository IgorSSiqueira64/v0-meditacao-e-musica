"use client"

import { intentions } from "./intentions-data"
import { Button } from "@/components/ui/button"
import type { Intention } from "./types"

interface IntentionSelectorProps {
  onSelectIntention: (intention: Intention) => void
}

export function IntentionSelector({ onSelectIntention }: IntentionSelectorProps) {
  return (
    <div className="space-y-6">
      <p className="text-[#a0a0b0]">
        Escolha uma intenção para guiar seu dia. Cada intenção está associada a uma energia específica que pode ajudar a
        manifestar seus objetivos.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {intentions.map((intention) => (
          <Button
            key={intention.id}
            onClick={() => onSelectIntention(intention)}
            className="flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              {intention.icon}
            </div>
            <span className="text-sm font-medium text-white">{intention.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
