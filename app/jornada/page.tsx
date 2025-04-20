"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CosmicBackground } from "@/components/cosmic-background"
import { DailyChallenge } from "@/components/daily-challenge"
import { MindsetQuote } from "@/components/mindset-quote"
import { FrequencySelectorPreview } from "@/components/frequency-selector-preview"
import { CheckIn } from "@/components/check-in"
import { PersonalGoals } from "@/components/personal-goals"
import { StarField } from "@/components/star-field"

export default function JourneyPage() {
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
        <CosmicBackground />
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
                Sua Jornada Consciente
              </h1>
              <p className="text-lg text-[#a0a0b0] max-w-2xl">
                Navegue pelo universo da sua mente. Defina seu caminho, enfrente desafios e transcenda seus limites.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <Tabs defaultValue="jornada" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-white/5 p-1 rounded-full">
                  <TabsTrigger
                    value="jornada"
                    className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Jornada
                  </TabsTrigger>
                  <TabsTrigger
                    value="desafios"
                    className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Desafios
                  </TabsTrigger>
                  <TabsTrigger
                    value="metas"
                    className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Metas
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="jornada" className="space-y-8">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                    <h2 className="text-2xl font-medium text-white mb-4">Seu Progresso Consciente</h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-[#a0a0b0]">Nível de Consciência</span>
                          <span className="text-sm font-medium text-white">67%</span>
                        </div>
                        <Progress
                          value={progress}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            12
                          </div>
                          <p className="text-xs text-[#a0a0b0]">Sessões Completadas</p>
                        </div>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            3
                          </div>
                          <p className="text-xs text-[#a0a0b0]">Desafios Vencidos</p>
                        </div>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            240
                          </div>
                          <p className="text-xs text-[#a0a0b0]">Minutos Meditados</p>
                        </div>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            5
                          </div>
                          <p className="text-xs text-[#a0a0b0]">Metas Alcançadas</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h2 className="text-2xl font-medium text-white mb-4">Próximos Passos</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-white">Complete o desafio diário</h3>
                          <p className="text-sm text-[#a0a0b0]">Meditação de foco por 11 minutos</p>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                        >
                          Iniciar
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-white">Defina sua intenção para amanhã</h3>
                          <p className="text-sm text-[#a0a0b0]">Prepare sua mente para o próximo dia</p>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                        >
                          Definir
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-white">Explore frequências para pensamentos</h3>
                          <p className="text-sm text-[#a0a0b0]">
                            Descubra novas frequências para potencializar sua mente
                          </p>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                        >
                          <Link href="/premium">Premium</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="desafios">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h2 className="text-2xl font-medium text-white mb-6">Desafios para Transcender Limites</h2>
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

                      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
                          <div className="text-center p-6">
                            <h3 className="text-lg font-medium text-white mb-2">Desafios Premium</h3>
                            <p className="text-sm text-[#a0a0b0] mb-4">
                              Desbloqueie desafios avançados com o plano premium
                            </p>
                            <Button
                              asChild
                              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                            >
                              <Link href="/premium">Ver Planos</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="opacity-20">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                            <span className="text-sm font-medium">?</span>
                          </div>
                          <h3 className="text-base font-medium text-white mb-1">Desafio Premium</h3>
                          <p className="text-sm text-[#a0a0b0]">Disponível apenas para assinantes premium</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metas">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h2 className="text-2xl font-medium text-white mb-6">Suas Metas Pessoais</h2>
                    <PersonalGoals />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col gap-8">
              <CheckIn onComplete={() => setStreak(streak + 1)} />

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-medium text-white mb-4">Recursos Premium</h3>

                <div className="space-y-6">
                  <FrequencySelectorPreview />

                  <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>

                    <h3 className="text-lg font-medium text-white mb-3">Modo Guerreiro</h3>
                    <p className="text-sm text-[#a0a0b0] mb-4">
                      Ative o modo inspirado em David Goggins para desafios mais intensos e uma abordagem mais
                      disciplinada.
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-[#a0a0b0]">Intensidade</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-6 h-2 rounded-full ${
                              level <= 3 ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                    >
                      <Link href="/premium">Desbloquear com Premium</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-medium text-white mb-4">Eleve sua Jornada com Premium</h2>
            <p className="text-[#a0a0b0] max-w-2xl mx-auto mb-6">
              Desbloqueie recursos exclusivos como Frequências para Pensamentos, Modo Guerreiro e Desafio Mental por
              apenas R$4,90/mês.
            </p>
            <Button
              asChild
              className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
            >
              <Link href="/premium">Ver Planos Premium</Link>
            </Button>
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
