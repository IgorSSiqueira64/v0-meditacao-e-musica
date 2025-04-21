"use client"

import { useState, useEffect } from "react"
import { IntentionSelector } from "./intention-selector"
import { IntentionDisplay } from "./intention-display"
import { intentions } from "./intentions-data"
import { isAuthenticated, saveUserIntention } from "@/services/auth-service"
import { getFreeSessionForIntention, getBestPremiumSessionForIntention } from "@/data/sessions-data"
import type { Intention } from "./types"
import { useRouter } from "next/navigation"

export function DailyIntention() {
  const [selectedIntention, setSelectedIntention] = useState<Intention | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Carregar a intenção salva ao iniciar
  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(isAuthenticated())

    const savedIntention = localStorage.getItem("dailyIntention")
    const lastUpdated = localStorage.getItem("intentionLastUpdated")

    // Verificar se a intenção foi definida hoje
    const today = new Date().toDateString()
    const isToday = lastUpdated === today

    if (savedIntention && isToday) {
      const intention = intentions.find((i) => i.id === savedIntention)
      if (intention) setSelectedIntention(intention)
    }
  }, [])

  // Salvar a intenção selecionada
  const saveIntention = (intention: Intention) => {
    setSelectedIntention(intention)
    localStorage.setItem("dailyIntention", intention.id)
    localStorage.setItem("intentionLastUpdated", new Date().toDateString())

    // Se o usuário estiver logado, salvar a intenção no "banco de dados"
    if (isLoggedIn) {
      saveUserIntention(intention.id, intention.name)
    }
  }

  // Obter sessões recomendadas para a intenção selecionada
  const getRecommendedSessions = () => {
    if (!selectedIntention) return { free: null, premium: null }

    const freeSession = getFreeSessionForIntention(selectedIntention.id)
    const premiumSession = getBestPremiumSessionForIntention(selectedIntention.id)

    return { free: freeSession, premium: premiumSession }
  }

  // Redirecionar para login se tentar selecionar intenção sem estar logado
  const handleSelectIntention = (intention: Intention) => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    saveIntention(intention)
  }

  if (!mounted) {
    return (
      <div className="backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500 bg-gradient-to-br from-[#0a0a1a]/80 to-[#121228]/80 border border-white/10">
        <div className="p-6 relative">
          <div className="h-64 bg-white/5 rounded-xl animate-pulse"></div>
        </div>
      </div>
    )
  }

  const recommendedSessions = getRecommendedSessions()

  return (
    <div className="backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500 bg-gradient-to-br from-[#0a0a1a]/80 to-[#121228]/80 border border-white/10">
      <div className="p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medium text-white transition-colors">Intenção Diária</h2>
        </div>

        {selectedIntention ? (
          <IntentionDisplay
            intention={selectedIntention}
            onChangeIntention={() => setSelectedIntention(null)}
            recommendedSessions={recommendedSessions}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <IntentionSelector onSelectIntention={handleSelectIntention} />
        )}
      </div>
    </div>
  )
}
