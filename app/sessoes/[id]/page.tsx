"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { StarField } from "@/components/star-field"
import { DynamicSessionPlayer } from "@/components/session/dynamic-session-player"
import { getSessionById } from "@/data/sessions-data"
import { isAuthenticated, getCurrentUser, saveUserExperience } from "@/services/auth-service"
import { Clock, Zap, Star, Lock } from "lucide-react"

export default function SessionPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<ReturnType<typeof getSessionById>>(undefined)
  const [isPremium, setIsPremium] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(isAuthenticated())

    const user = getCurrentUser()
    setIsPremium(user?.premium || false)

    if (params.id) {
      const sessionData = getSessionById(params.id as string)
      setSession(sessionData)

      // Se a sessão for premium e o usuário não for premium, redirecionar para a página premium
      if (sessionData?.isPremium && !user?.premium) {
        router.push(`/premium?redirect=/sessoes/${params.id}`)
      }

      // Se o usuário não estiver logado, redirecionar para a página de login
      if (!isAuthenticated()) {
        router.push(`/login?redirect=/sessoes/${params.id}`)
      }
    }
  }, [params.id, router])

  const handleSessionComplete = () => {
    setSessionCompleted(true)

    // Simular o registro da experiência do usuário
    if (session) {
      saveUserExperience({
        sessionId: session.id,
        sessionName: session.title,
        duration: 0,
        completionRate: 100,
        rating: null,
        notes: null,
      })
    }
  }

  // Mapear os IDs das sessões para os URLs dos áudios fornecidos
  const getAudioUrl = (sessionId: string) => {
    const audioMap: Record<string, string> = {
      foco: "/audio/foco.mp3", // URL padrão
      relaxamento:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/O%20Lado%20Oculto%20da%20Luz-CMw2zsSKeaGQLpyBB5gF5BSwaCTbT5.mp3", // O Lado Oculto da Luz
      "silencio-interior":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Uma%20energia%20de%20despertar%20interior%20como%20uma%20semente...%20%286bc53eeb26b649e8acf0342375825844%29-336QJN3geRXXfSX9MR1Z7bbm21K95R.mp3", // Uma energia de despertar interior
      "sono-reparador":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cello%20532hz-EtlzI9f2O2l2pRVt5i8p7PW0Xb1eEd.mp3", // Cello 532hz
    }

    return audioMap[sessionId] || session?.audioUrl || "/audio/default.mp3"
  }

  if (!mounted || !session) {
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

        <section className="container max-w-5xl py-8 md:py-16 relative z-10 px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-full md:w-1/2 aspect-square relative rounded-3xl overflow-hidden">
              <DynamicSessionPlayer
                audioUrl={getAudioUrl(session.id)}
                title={session.title}
                subtitle={session.subtitle}
                onComplete={handleSessionComplete}
                className="w-full h-full"
              />

              {session.isPremium && (
                <div className="absolute top-4 right-4 bg-purple-500/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 z-30">
                  <Star className="h-4 w-4 text-purple-300" />
                  <span className="text-sm font-medium text-purple-300">Premium</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-2">
                {session.title}
              </h1>
              <p className="text-lg text-blue-300 mb-4">{session.subtitle}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4 text-[#a0a0b0]" />
                  <span className="text-sm text-[#a0a0b0]">{session.duration}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1">
                  <Zap className="h-4 w-4 text-[#a0a0b0]" />
                  <span className="text-sm text-[#a0a0b0]">{session.frequency}</span>
                </div>
              </div>

              <p className="text-[#a0a0b0] mb-8">{session.description}</p>

              <div className="space-y-6">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-3">Benefícios</h3>
                  <ul className="space-y-2">
                    {session.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-500/20 p-1 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        </div>
                        <span className="text-sm text-[#a0a0b0]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {sessionCompleted && (
                  <div className="backdrop-blur-md bg-green-900/20 border border-green-500/20 rounded-xl p-4">
                    <h3 className="text-white font-medium mb-2">Sessão Concluída!</h3>
                    <p className="text-sm text-[#a0a0b0]">
                      Parabéns por completar esta sessão. Como você se sente? Lembre-se que a prática regular traz os
                      melhores resultados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-medium text-white mb-4">Como usar esta sessão</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
                    1
                  </div>
                  <p className="text-[#a0a0b0]">
                    Encontre um local tranquilo onde você não será interrompido durante a sessão.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
                    2
                  </div>
                  <p className="text-[#a0a0b0]">
                    Use fones de ouvido para uma experiência mais imersiva e melhores resultados.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
                    3
                  </div>
                  <p className="text-[#a0a0b0]">Sente-se ou deite-se em uma posição confortável e feche os olhos.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
                    4
                  </div>
                  <p className="text-[#a0a0b0]">Respire profundamente algumas vezes antes de iniciar a sessão.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
                    5
                  </div>
                  <p className="text-[#a0a0b0]">Permita-se mergulhar na experiência sem expectativas ou julgamentos.</p>
                </li>
              </ol>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-medium text-white mb-4">Sobre a frequência {session.frequency}</h2>
              <p className="text-[#a0a0b0] mb-4">
                Esta sessão utiliza a frequência {session.frequency}, conhecida por seus efeitos de{" "}
                {session.subtitle.toLowerCase()}. As frequências sonoras específicas podem influenciar nossos padrões
                cerebrais, ajudando a induzir estados mentais específicos.
              </p>
              <p className="text-[#a0a0b0]">
                Recomendamos usar esta sessão regularmente para obter os melhores resultados. Com a prática consistente,
                você notará melhorias significativas em sua capacidade de{" "}
                {session.category === "foco"
                  ? "concentração e clareza mental"
                  : session.category === "relaxamento"
                    ? "relaxamento e redução do estresse"
                    : session.category === "sono"
                      ? "qualidade do sono e descanso"
                      : session.category === "energia"
                        ? "energia e vitalidade"
                        : session.category === "crescimento"
                          ? "crescimento pessoal e transformação"
                          : "bem-estar geral e equilíbrio"}
                .
              </p>
            </div>
          </div>

          {!isPremium && (
            <div className="mt-16 backdrop-blur-md bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-purple-400" />
                    <h2 className="text-xl font-medium text-white">Desbloqueie todas as sessões premium</h2>
                  </div>
                  <p className="text-[#a0a0b0] mb-4">
                    Assine o plano premium para acessar nossa biblioteca completa de sessões exclusivas, incluindo
                    "Reconexão com o Propósito", "Purificação do Campo Emocional", "A Chave da Alma", "Despertar
                    Quântico" e muito mais.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <span className="text-[#a0a0b0]">Acesso ilimitado a todas as sessões premium</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <span className="text-[#a0a0b0]">Novas sessões exclusivas todo mês</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <span className="text-[#a0a0b0]">Acompanhamento personalizado do seu progresso</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-3">
                  <Button
                    asChild
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-base"
                  >
                    <Link href="/premium">
                      <Lock className="h-5 w-5 mr-2" /> Assinar Premium
                    </Link>
                  </Button>
                  <p className="text-xs text-center text-[#a0a0b0]">
                    A partir de R$4,90/mês. Cancele a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 relative z-10">
        <div className="container max-w-6xl px-4 md:px-6">
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
