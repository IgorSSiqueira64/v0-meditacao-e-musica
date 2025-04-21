"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Play, Lock } from "lucide-react"
import type { Intention } from "./types"
import type { Session } from "@/data/sessions-data"

interface IntentionDisplayProps {
  intention: Intention
  onChangeIntention: () => void
  recommendedSessions: {
    free: Session | null
    premium: Session | null
  }
  isLoggedIn: boolean
}

export function IntentionDisplay({
  intention,
  onChangeIntention,
  recommendedSessions,
  isLoggedIn,
}: IntentionDisplayProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Minha Intenção Diária",
          text: `Minha intenção para hoje é: ${intention.name} - ${intention.description}`,
        })
        setShareMessage("Compartilhado com sucesso!")
      } else {
        await navigator.clipboard.writeText(`Minha intenção para hoje é: ${intention.name} - ${intention.description}`)
        setShareMessage("Copiado para a área de transferência!")
      }
    } catch (error) {
      setShareMessage("Erro ao compartilhar")
    }

    setTimeout(() => {
      setIsSharing(false)
      setShareMessage("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
        <div className="absolute inset-0">
          <img
            src={intention.fractalImage || "/placeholder.svg"}
            alt={`Fractal para ${intention.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
            <div className="text-3xl">{intention.icon}</div>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white">{intention.name}</h3>
          <p className="text-sm max-w-md text-white/80">{intention.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-white">Afirmação para hoje:</h4>
        <blockquote className="p-4 border-l-4 bg-white/5 border-blue-500/50 text-white/90 italic rounded-r-lg">
          "{intention.affirmation}"
        </blockquote>
      </div>

      {/* Sessões recomendadas */}
      <div className="space-y-4">
        <h4 className="font-medium text-white">Sessões recomendadas para esta intenção:</h4>

        {/* Sessão gratuita */}
        {recommendedSessions.free && (
          <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-white">{recommendedSessions.free.title}</h5>
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300">Gratuito</span>
              </div>
              <p className="text-xs text-[#a0a0b0] mt-1">
                {recommendedSessions.free.subtitle} • {recommendedSessions.free.duration} •{" "}
                {recommendedSessions.free.frequency}
              </p>
            </div>

            {isLoggedIn ? (
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                <Link href={`/sessoes/${recommendedSessions.free.id}`}>
                  <Play className="h-4 w-4 mr-1" /> Iniciar Sessão
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                <Link href={`/login?redirect=/sessoes/${recommendedSessions.free.id}`}>
                  <Play className="h-4 w-4 mr-1" /> Fazer Login para Acessar
                </Link>
              </Button>
            )}
          </div>
        )}

        {/* Sessão premium */}
        {recommendedSessions.premium && (
          <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-white">{recommendedSessions.premium.title}</h5>
                <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300">Premium</span>
              </div>
              <p className="text-xs text-[#a0a0b0] mt-1">
                {recommendedSessions.premium.subtitle} • {recommendedSessions.premium.duration} •{" "}
                {recommendedSessions.premium.frequency}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                Sessão otimizada para potencializar sua intenção de {intention.name.toLowerCase()}
              </p>
            </div>

            <Button
              asChild
              size="sm"
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
            >
              <Link href="/premium">
                <Lock className="h-4 w-4 mr-1" /> Desbloquear com Premium
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onChangeIntention}
          variant="outline"
          className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Mudar Intenção
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
          disabled={isSharing}
        >
          {isSharing ? (
            shareMessage
          ) : (
            <>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
