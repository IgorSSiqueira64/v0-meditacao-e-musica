"use client"

import { useEffect, useState } from "react"
import { Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRemainingSessionsToday, getTimeUntilNextFreeSession, isPremiumUser } from "@/services/session-limit"

export function SessionLimitStatus() {
  const [remainingSessions, setRemainingSessions] = useState<number>(0)
  const [timeUntilNext, setTimeUntilNext] = useState<string>("")
  const [isPremium, setIsPremium] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateStatus = () => {
      setRemainingSessions(getRemainingSessionsToday())
      setTimeUntilNext(getTimeUntilNextFreeSession())
      setIsPremium(isPremiumUser())
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000) // Atualizar a cada minuto

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  if (isPremium) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 text-blue-300">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
        <span className="text-sm">Acesso Premium Ilimitado</span>
      </div>
    )
  }

  if (remainingSessions <= 0) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3 px-4 py-3 rounded-xl bg-red-900/20 border border-red-500/30 text-white">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="text-sm">
            <span className="font-medium">Limite diário atingido.</span>{" "}
            {timeUntilNext && <span>Próxima sessão em {timeUntilNext}</span>}
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 whitespace-nowrap ml-auto"
        >
          <Link href="/premium">Obter Premium</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-blue-900/10 border border-blue-500/20 text-white">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-blue-400" />
        <span className="text-sm">
          <span className="font-medium">{remainingSessions} sessão gratuita</span> disponível hoje
        </span>
      </div>
      <Button
        asChild
        size="sm"
        variant="outline"
        className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
      >
        <Link href="/premium">Upgrade</Link>
      </Button>
    </div>
  )
}
