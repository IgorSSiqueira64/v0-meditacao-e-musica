"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { DynamicSessionPlayer } from "@/components/session/dynamic-session-player"
import { SessionLimitModal } from "@/components/session-limit-modal"
import { canAccessSession, registerSessionUse } from "@/services/session-limit"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function FocoSessionPage() {
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [canAccess, setCanAccess] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Verificar se o usuário pode acessar a sessão
    const accessStatus = canAccessSession()
    setCanAccess(accessStatus.canAccess)

    if (!accessStatus.canAccess) {
      setShowLimitModal(true)
    } else {
      // Registrar o uso da sessão
      registerSessionUse()

      toast({
        title: "Sessão iniciada",
        description: "Aproveite sua experiência de foco.",
        variant: "default",
      })
    }
  }, [router])

  if (!mounted) {
    return null
  }

  if (!canAccess) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
        <NavBar />
        <SessionLimitModal
          open={showLimitModal}
          onClose={() => {
            setShowLimitModal(false)
            router.push("/sessoes")
          }}
        />
        <Toaster />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-8 relative z-10">
          <DynamicSessionPlayer
            title="Sintonizando o Campo do Foco"
            description="Ative a produção de acetilcolina e entre em um estado de foco intenso e clareza mental."
            duration={660} // 11 minutos em segundos
            frequency="963 Hz"
            audioSrc="/audio/focus-session.mp3" // Placeholder
            visualEffects={{
              backgroundVideos: [
                "/videos/focus-visual-1.mp4", // Placeholders
                "/videos/focus-visual-2.mp4",
                "/videos/focus-visual-3.mp4",
              ],
              transitionPoints: [0, 220, 440], // Pontos de transição em segundos
            }}
          />
        </section>
      </main>
      <Toaster />
    </div>
  )
}
