"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { StarField } from "@/components/star-field"
import { DailyChallenge } from "@/components/daily-challenge"
import { MindsetQuote } from "@/components/mindset-quote"
import { FrequencySelector } from "@/components/frequency-selector"
import { CheckIn } from "@/components/check-in"
import { PersonalGoals } from "@/components/personal-goals"
import { DailyIntention } from "@/components/daily-intention/daily-intention"
import { AnalyticsCard } from "@/components/premium/analytics-card"
import { Brain, Clock, Activity, Heart } from "lucide-react"

export default function DashboardPage() {
  const [streak, setStreak] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showMotivation, setShowMotivation] = useState(false)

  useEffect(() => {
    // Simular carregamento do progresso
    const timer = setTimeout(() => setProgress(67), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
      <StarField />
      <NavBar />

      <main className="flex-1 relative z-10">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-4">
                Seu Dashboard
              </h1>
              <p className="text-lg text-[#a0a0b0] max-w-2xl">
                Bem-vindo de volta! Acompanhe seu progresso, defina suas intenções e continue sua jornada de
                desenvolvimento mental.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-center mb-2">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {streak}
                </div>
                <p className="text-sm text-[#a0a0b0]">Dias consecutivos</p>
              </div>
              <Button
                asChild
                className="rounded-full px-4 py-2 h-auto text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                <Link href="/premium">Modo Guerreiro (Premium)</Link>
              </Button>
            </div>
          </div>

          {showMotivation && (
            <MindsetQuote
              quote="Quando você pensa que já terminou, você está apenas a 40% do seu potencial."
              author="David Goggins"
              className="mb-8"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <AnalyticsCard
              title="Tempo Total de Meditação"
              value="42h 30m"
              change={{ value: "15%", positive: true }}
              icon={Clock}
              color="bg-blue-900/30 text-blue-400"
            />
            <AnalyticsCard
              title="Nível de Foco"
              value="78/100"
              change={{ value: "8%", positive: true }}
              icon={Brain}
              color="bg-yellow-900/30 text-yellow-400"
            />
            <AnalyticsCard
              title="Nível de Estresse"
              value="32/100"
              change={{ value: "18%", positive: false }}
              icon={Activity}
              color="bg-green-900/30 text-green-400"
            />
            <AnalyticsCard
              title="Bem-estar"
              value="85/100"
              change={{ value: "12%", positive: true }}
              icon={Heart}
              color="bg-purple-900/30 text-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <DailyIntention />
            </div>

            <div className="flex flex-col gap-8">
              <CheckIn onComplete={() => setStreak(streak + 1)} />

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Frequências</h3>
                <FrequencySelector />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Suas Metas Pessoais</h2>
                <PersonalGoals />
              </div>
            </div>

            <div className="space-y-6">
              <DailyChallenge
                title="Meditação da Madrugada"
                description="Acorde 20 minutos mais cedo e medite antes do nascer do sol. A disciplina começa quando ninguém está olhando."
                difficulty="Difícil"
                reward="3x pontos de experiência"
                completed={false}
              />

              <DailyChallenge
                title="Respiração Wim Hof"
                description="Complete 3 rodadas da técnica de respiração Wim Hof seguida por um banho frio de 30 segundos."
                difficulty="Médio"
                reward="Desbloqueie a sessão 'Resiliência Mental'"
                completed={true}
              />
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
