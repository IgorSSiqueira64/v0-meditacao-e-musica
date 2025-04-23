"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Play, Lock, Lightbulb, X, Clock, Sparkles, Info } from "lucide-react"
import type { Intention } from "./types"
import type { Session } from "@/data/sessions-data"
import { ChatWidget } from "@/components/in-page-chat/chat-widget"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface IntentionDisplayProps {
  intention: Intention
  onChangeIntention: () => void
  recommendedSessions: {
    free: Session | null
    premium: Session | null
  }
  isLoggedIn: boolean
}

// Dados de insights baseados em IA para cada intenção
const intentionInsights: Record<string, string[]> = {
  cura: [
    "A cura é um processo natural do corpo e da mente que pode ser potencializado através da meditação.",
    "Estudos mostram que práticas de mindfulness podem reduzir inflamação e acelerar a recuperação física.",
    "A neuroplasticidade permite que o cérebro se reconfigure, facilitando a cura emocional e mental.",
    "Respiração profunda ativa o sistema nervoso parassimpático, promovendo relaxamento e cura.",
    "A visualização guiada pode estimular o sistema imunológico e acelerar processos de cura.",
  ],
  foco: [
    "O foco é uma habilidade que pode ser treinada como um músculo mental através da prática regular.",
    "A meditação de atenção plena pode aumentar a densidade da matéria cinzenta em áreas do cérebro associadas à concentração.",
    "Estudos mostram que apenas 10 minutos de meditação diária podem melhorar significativamente o foco.",
    "A técnica Pomodoro (25 minutos de foco seguidos de 5 minutos de descanso) pode aumentar a produtividade.",
    "Eliminar distrações digitais pode melhorar sua capacidade de concentração em até 40%.",
  ],
  clareza: [
    "A clareza mental surge quando reduzimos o ruído interno e externo que distrai nossa mente.",
    "Pesquisas indicam que a meditação regular pode melhorar a tomada de decisões e a resolução de problemas.",
    "O sono adequado é fundamental para a clareza mental - durante o sono profundo, o cérebro processa informações e elimina toxinas.",
    "A prática de journaling pode ajudar a organizar pensamentos e trazer maior clareza sobre questões complexas.",
    "Exercícios de respiração consciente podem oxigenar o cérebro e melhorar a clareza de pensamento em minutos.",
  ],
  inspiracao: [
    "A inspiração muitas vezes surge nos momentos de silêncio e contemplação, quando a mente está relaxada.",
    "Estudos mostram que a meditação pode aumentar a atividade nas áreas do cérebro associadas à criatividade.",
    "A exposição a novas experiências, arte e natureza pode estimular conexões neurais que levam à inspiração.",
    "O estado de 'fluxo' (flow) - quando estamos completamente imersos em uma atividade - é ideal para insights criativos.",
    "Alternar entre foco intenso e relaxamento permite que o cérebro faça conexões inesperadas, gerando inspiração.",
  ],
  protecao: [
    "A proteção energética começa com limites saudáveis e autocuidado consistente.",
    "Técnicas de visualização de luz ou escudos energéticos podem criar uma sensação de segurança psicológica.",
    "A meditação regular fortalece o sistema imunológico, oferecendo proteção física.",
    "Práticas de enraizamento podem ajudar a manter sua energia centrada e protegida de influências externas.",
    "O autocuidado não é egoísmo - é uma forma essencial de proteção para seu bem-estar geral.",
  ],
  energia: [
    "A energia vital (prana) pode ser cultivada através de práticas respiratórias específicas.",
    "Estudos mostram que a meditação pode aumentar os níveis de energia mais efetivamente que uma soneca.",
    "Movimentos conscientes como yoga ou tai chi podem desbloquear e equilibrar o fluxo de energia no corpo.",
    "A exposição à luz natural pela manhã ajuda a regular o ritmo circadiano e aumentar os níveis de energia.",
    "Hidratar-se adequadamente é fundamental para manter bons níveis de energia ao longo do dia.",
  ],
  paz: [
    "A paz interior não depende das circunstâncias externas, mas da nossa relação com nossos pensamentos.",
    "A prática regular de meditação pode reduzir a atividade na amígdala, o centro de 'luta ou fuga' do cérebro.",
    "Estudos mostram que a gratidão consciente pode aumentar significativamente a sensação de paz e bem-estar.",
    "O perdão - de si mesmo e dos outros - é um caminho poderoso para a paz interior.",
    "A aceitação do momento presente, sem julgamento, é a base para uma paz duradoura.",
  ],
  abundancia: [
    "A abundância começa com uma mentalidade de suficiência e gratidão pelo que já temos.",
    "Visualizações positivas podem reprogramar o cérebro para reconhecer e atrair mais oportunidades.",
    "Estudos mostram que pessoas com uma mentalidade de abundância tendem a ser mais generosas e colaborativas.",
    "A abundância vai além do material - inclui relacionamentos, experiências, saúde e crescimento pessoal.",
    "Práticas de gratidão diária podem transformar sua percepção de escassez em consciência de abundância.",
  ],
  relaxamento: [
    "O relaxamento profundo ativa o sistema nervoso parassimpático, responsável pela recuperação e regeneração.",
    "Técnicas de relaxamento progressivo podem reduzir a tensão muscular e aliviar dores crônicas.",
    "Estudos mostram que a meditação regular pode reduzir os níveis de cortisol (hormônio do estresse) em até 20%.",
    "A respiração diafragmática (abdominal) é uma das formas mais rápidas de induzir o relaxamento.",
    "Apenas 10 minutos de relaxamento consciente podem melhorar a função cognitiva e a criatividade.",
  ],
  transformacao: [
    "A transformação verdadeira começa com a aceitação do que é, antes de buscar o que pode ser.",
    "A neuroplasticidade permite que o cérebro se reconfigure em qualquer idade, possibilitando mudanças profundas.",
    "Pequenas mudanças consistentes são mais eficazes para a transformação duradoura do que grandes mudanças esporádicas.",
    "A transformação muitas vezes ocorre em espiral, revisitando lições antigas em níveis mais profundos.",
    "O desconforto é um sinal de crescimento - a transformação raramente ocorre na zona de conforto.",
  ],
  intuicao: [
    "A intuição é o conhecimento que surge sem o processo analítico consciente - uma forma de cognição não-linear.",
    "Estudos mostram que a meditação regular pode fortalecer a conexão entre os hemisférios cerebrais, melhorando a intuição.",
    "O silêncio mental é essencial para ouvir a voz intuitiva que muitas vezes é abafada pelo ruído mental.",
    "A intuição pode ser treinada através da atenção consciente às sensações corporais e 'palpites'.",
    "Decisões intuitivas muitas vezes integram mais informações do que o pensamento puramente racional.",
  ],
  gratidao: [
    "A gratidão ativa áreas do cérebro associadas ao prazer, formando novos caminhos neurais positivos.",
    "Estudos mostram que a prática regular de gratidão pode aumentar a felicidade em até 25%.",
    "A gratidão reduz hormônios do estresse e aumenta hormônios do bem-estar como a dopamina e serotonina.",
    "Manter um diário de gratidão pode melhorar a qualidade do sono e reduzir sintomas de ansiedade.",
    "A gratidão consciente transforma desafios em oportunidades de crescimento e aprendizado.",
  ],
}

// Função para obter insights aleatórios para uma intenção
function getRandomInsights(intentionId: string, count = 3): string[] {
  const insights = intentionInsights[intentionId] || []
  if (insights.length <= count) return insights

  const shuffled = [...insights].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function IntentionDisplay({
  intention,
  onChangeIntention,
  recommendedSessions,
  isLoggedIn,
}: IntentionDisplayProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [shareMessage, setShareMessage] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [insights, setInsights] = useState<string[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Obter insights baseados na intenção selecionada
  useEffect(() => {
    setInsights(getRandomInsights(intention.id))
    setLastUpdated(new Date())

    // Atualizar insights periodicamente
    const interval = setInterval(() => {
      setInsights(getRandomInsights(intention.id))
      setLastUpdated(new Date())
    }, 60000 * 15) // Atualizar a cada 15 minutos

    return () => clearInterval(interval)
  }, [intention.id])

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
    <div className="space-y-4">
      {showChat ? (
        <div className="h-[350px] flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">Conversa com Neureon</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[#0a0a1a]/80 to-[#121228]/80 border border-white/10 rounded-xl p-4 overflow-hidden">
            <ChatWidget variant="embedded" size="large" intentionId={intention.id} />
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {/* Cabeçalho da intenção */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm">
                  <div className="text-2xl">{intention.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{intention.name}</h3>
                  <p className="text-xs text-white/60 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Atualizado {formatTimeAgo(lastUpdated)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(true)}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                <Lightbulb className="h-5 w-5" />
                <span className="text-sm">Fale com Neureon</span>
              </Button>
            </div>

            {/* Descrição e afirmação */}
            <div className="space-y-3">
              <div className="p-3 border-l-4 bg-white/5 border-blue-500/50 text-white/90 rounded-r-lg text-sm">
                <p className="mb-2">{intention.description}</p>
                <p className="italic">"{intention.affirmation}"</p>
              </div>
            </div>

            {/* Insights baseados em IA */}
            <Card className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <h4 className="text-sm font-medium text-white">Insights baseados em IA</h4>
              </div>
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="flex gap-2 text-sm text-white/80">
                    <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Sessões recomendadas */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">Sessões recomendadas:</h4>

              {/* Sessão gratuita */}
              {recommendedSessions.free && (
                <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-white text-sm">{recommendedSessions.free.title}</h5>
                      <Badge className="bg-green-500/20 text-green-300 border-none">Gratuito</Badge>
                    </div>
                    <p className="text-xs text-[#a0a0b0] mt-1">
                      {recommendedSessions.free.subtitle} • {recommendedSessions.free.duration}
                    </p>
                  </div>

                  {isLoggedIn ? (
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                    >
                      <Link href={`/sessoes/${recommendedSessions.free.id}`}>
                        <Play className="h-4 w-4 mr-1" /> Iniciar
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                    >
                      <Link href={`/login?redirect=/sessoes/${recommendedSessions.free.id}`}>
                        <Play className="h-4 w-4 mr-1" /> Login
                      </Link>
                    </Button>
                  )}
                </div>
              )}

              {/* Sessão premium */}
              {recommendedSessions.premium && (
                <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-white text-sm">{recommendedSessions.premium.title}</h5>
                      <Badge className="bg-purple-500/20 text-purple-300 border-none">Premium</Badge>
                    </div>
                    <p className="text-xs text-[#a0a0b0] mt-1">
                      {recommendedSessions.premium.subtitle} • {recommendedSessions.premium.duration}
                    </p>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
                  >
                    <Link href="/premium">
                      <Lock className="h-4 w-4 mr-1" /> Premium
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={onChangeIntention}
              variant="outline"
              size="sm"
              className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Mudar Intenção
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
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
        </>
      )}
    </div>
  )
}

// Função para formatar o tempo decorrido
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return "agora"
  if (diffMins < 60) return `há ${diffMins} min`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `há ${diffHours}h`

  const diffDays = Math.floor(diffHours / 24)
  return `há ${diffDays}d`
}
