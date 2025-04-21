"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { StarField } from "@/components/star-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentCard } from "@/components/content-card"
import { sessions, getSessionsByCategory } from "@/data/sessions-data"
import { isAuthenticated, getCurrentUser } from "@/services/auth-service"
import { Lock, Star, Zap, Brain, Heart, Sparkles, Compass } from "lucide-react"

export default function SessionsPage() {
  const [isPremium, setIsPremium] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(isAuthenticated())

    const user = getCurrentUser()
    setIsPremium(user?.premium || false)
  }, [])

  const renderSessionCard = (session: (typeof sessions)[0]) => {
    const isLocked = session.isPremium && !isPremium

    return (
      <div key={session.id} className="relative group">
        <ContentCard
          title={session.title}
          subtitle={session.subtitle}
          duration={session.duration}
          frequency={session.frequency}
          href={isLocked ? "/premium" : `/sessoes/${session.id}`}
          className={isLocked ? "opacity-80 hover:opacity-100" : ""}
        />

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/80 rounded-full p-3 backdrop-blur-sm">
              <Lock className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        )}

        {session.isPremium && (
          <div className="absolute top-4 right-4 bg-purple-500/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 text-purple-300" />
            <span className="text-xs font-medium text-purple-300">Premium</span>
          </div>
        )}
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
      <StarField />
      <NavBar />

      <main className="flex-1 relative z-10">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center text-white mb-6 border border-white/10">
              <Sparkles className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-4">
              Sessões de Transformação
            </h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              Explore nossas sessões de áudio projetadas para expandir sua mente, aumentar seu foco e elevar sua
              consciência.
            </p>
          </div>

          {!isLoggedIn && (
            <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-6 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-white mb-2">Faça login para acessar todas as sessões</h2>
                  <p className="text-[#a0a0b0]">
                    Crie uma conta gratuita para acessar nossas sessões e acompanhar seu progresso.
                  </p>
                </div>
                <Button
                  asChild
                  className="rounded-full px-6 py-2 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                >
                  <Link href="/login?redirect=/sessoes">Fazer Login</Link>
                </Button>
              </div>
            </div>
          )}

          {isLoggedIn && !isPremium && (
            <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-3xl p-6 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-purple-400" />
                    <h2 className="text-xl font-medium text-white">Desbloqueie todas as sessões premium</h2>
                  </div>
                  <p className="text-[#a0a0b0]">
                    Assine o plano premium para acessar todas as sessões exclusivas e acelerar sua transformação mental.
                  </p>
                </div>
                <Button
                  asChild
                  className="rounded-full px-6 py-2 h-auto text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
                >
                  <Link href="/premium">Assinar Premium</Link>
                </Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="todas" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full">
                <TabsTrigger value="todas" className="rounded-full data-[state=active]:bg-white/10">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="meditacao" className="rounded-full data-[state=active]:bg-white/10">
                  Meditação
                </TabsTrigger>
                <TabsTrigger value="foco" className="rounded-full data-[state=active]:bg-white/10">
                  Foco
                </TabsTrigger>
                <TabsTrigger value="sono" className="rounded-full data-[state=active]:bg-white/10">
                  Sono
                </TabsTrigger>
                <TabsTrigger value="energia" className="rounded-full data-[state=active]:bg-white/10">
                  Energia
                </TabsTrigger>
                <TabsTrigger value="crescimento" className="rounded-full data-[state=active]:bg-white/10">
                  Crescimento
                </TabsTrigger>
                <TabsTrigger value="especial" className="rounded-full data-[state=active]:bg-white/10">
                  Especial
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="todas" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{sessions.map(renderSessionCard)}</div>
            </TabsContent>

            <TabsContent value="meditacao" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getSessionsByCategory("meditacao").map(renderSessionCard)}
              </div>
            </TabsContent>

            <TabsContent value="foco" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getSessionsByCategory("foco").map(renderSessionCard)}
              </div>
            </TabsContent>

            <TabsContent value="sono" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getSessionsByCategory("sono").map(renderSessionCard)}
              </div>
            </TabsContent>

            <TabsContent value="energia" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getSessionsByCategory("energia").map(renderSessionCard)}
              </div>
            </TabsContent>

            <TabsContent value="crescimento" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getSessionsByCategory("crescimento").map(renderSessionCard)}
              </div>
            </TabsContent>

            <TabsContent value="especial" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getSessionsByCategory("especial").map(renderSessionCard)}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-white/10">
                <Compass className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-medium text-white">Benefícios das Sessões</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Clareza Mental</h3>
                <p className="text-sm text-[#a0a0b0]">
                  Nossas sessões ajudam a dissipar a névoa mental, proporcionando clareza de pensamento e foco
                  aprimorado.
                </p>
              </div>

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Equilíbrio Emocional</h3>
                <p className="text-sm text-[#a0a0b0]">
                  Alcance maior estabilidade emocional e aprenda a processar sentimentos de forma saudável e
                  construtiva.
                </p>
              </div>

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Energia Renovada</h3>
                <p className="text-sm text-[#a0a0b0]">
                  Recarregue suas baterias mentais e físicas, aumentando sua vitalidade e disposição para o dia a dia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 relative z-10">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
              <span className="text-sm text-[#a0a0b0]">Neureon © {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
