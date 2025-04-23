"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Lightbulb, User, Sparkles, X, Maximize2, Minimize2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  analyzeEmotion,
  getRecommendations,
  generateAIResponse,
  generateFollowUpQuestion,
  generatePositiveReinforcement,
  type EmotionalAnalysis,
} from "@/services/ai-analysis-service"
import { getCurrentUser } from "@/services/auth-service"
import { getAllSessions } from "@/data/sessions-data"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatWidgetProps {
  className?: string
  variant?: "floating" | "embedded"
  size?: "small" | "medium" | "large"
  intentionId?: string
}

// Sugestões contextuais para o chat
const conversationSuggestions = [
  {
    id: "suggestion-1",
    text: "Como posso melhorar meu foco?",
    intention: "foco",
  },
  {
    id: "suggestion-2",
    text: "Estou me sentindo ansioso hoje",
    intention: "relaxamento",
  },
  {
    id: "suggestion-3",
    text: "Preciso de energia para o dia",
    intention: "energia",
  },
  {
    id: "suggestion-4",
    text: "Quero melhorar minha criatividade",
    intention: "inspiracao",
  },
]

export function ChatWidget({ className = "", variant = "floating", size = "medium", intentionId }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      content: intentionId
        ? `Como posso ajudar com sua intenção de ${intentionId}?`
        : "Como você está se sentindo hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatStage, setChatStage] = useState(1)
  const [analysis, setAnalysis] = useState<EmotionalAnalysis | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [isMinimized, setIsMinimized] = useState(variant === "floating")
  const [isExpanded, setIsExpanded] = useState(false)
  const [animationIntensity, setAnimationIntensity] = useState(0.3)
  const [recommendedSessions, setRecommendedSessions] = useState<{
    free: any | null
    premium: any | null
  }>({
    free: null,
    premium: null,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focar no input quando o chat é aberto
  useEffect(() => {
    if (!isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isMinimized])

  // Ajustar tamanho em dispositivos móveis
  useEffect(() => {
    if (isMobile && variant === "floating" && !isMinimized) {
      setIsExpanded(true)
    }
  }, [isMobile, variant, isMinimized])

  // Efeito de animação pulsante
  useEffect(() => {
    if (!isMinimized && !isTyping) {
      const interval = setInterval(() => {
        setAnimationIntensity((prev) => 0.3 + Math.sin(Date.now() * 0.001) * 0.2)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isMinimized, isTyping])

  // Processar a mensagem do usuário
  const processUserMessage = async (message: string) => {
    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: generateId(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setAnimationIntensity(0.6) // Aumentar intensidade durante a digitação

    // Analisar a mensagem
    const newAnalysis = analyzeEmotion(message)
    setAnalysis(newAnalysis)

    // Gerar resposta baseada no estágio atual do chat
    let aiResponse = ""

    if (chatStage === 1) {
      // Primeira interação - perguntar mais detalhes
      aiResponse = generateAIResponse(newAnalysis, intentionId || "foco")
      const followUpQuestion = generateFollowUpQuestion(newAnalysis, intentionId || "foco", 2)
      aiResponse += " " + followUpQuestion

      setChatStage(2)
    } else if (chatStage === 2) {
      // Segunda interação - oferecer reforço positivo e perguntar mais uma vez
      const reinforcement = generatePositiveReinforcement(newAnalysis, intentionId || "foco")
      const followUpQuestion = generateFollowUpQuestion(newAnalysis, intentionId || "foco", 3)
      aiResponse = `${reinforcement} ${followUpQuestion}`

      setChatStage(3)
    } else {
      // Terceira interação - apresentar recomendações
      aiResponse = generateAIResponse(newAnalysis, intentionId || "foco")

      // Obter recomendações
      const recommendations = getRecommendations(newAnalysis, intentionId || "foco")

      // Converter IDs de sessão em objetos Session completos
      if (recommendations.length > 0) {
        const allSessions = getAllSessions()
        const user = getCurrentUser()
        const isPremium = user?.premium || false

        // Encontrar uma sessão gratuita recomendada
        const freeSessionId = recommendations.find((rec) => {
          const session = allSessions.find((s) => s.id === rec.sessionId)
          return session && !session.isPremium
        })?.sessionId

        // Encontrar uma sessão premium recomendada
        const premiumSessionId = recommendations.find((rec) => {
          const session = allSessions.find((s) => s.id === rec.sessionId)
          return session && session.isPremium
        })?.sessionId

        setRecommendedSessions({
          free: freeSessionId ? allSessions.find((s) => s.id === freeSessionId) || null : null,
          premium: premiumSessionId ? allSessions.find((s) => s.id === premiumSessionId) || null : null,
        })

        setShowRecommendations(true)
      }

      setChatStage(4)
    }

    // Simular tempo de resposta da IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
      setAnimationIntensity(0.3) // Voltar à intensidade normal
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isTyping && chatStage < 4) {
      processUserMessage(inputValue.trim())
    }
  }

  const handleSuggestionClick = (suggestion: (typeof conversationSuggestions)[0]) => {
    if (!isTyping && chatStage < 4) {
      processUserMessage(suggestion.text)
    }
  }

  // Determinar altura do chat com base no tamanho e dispositivo
  const getChatHeight = () => {
    if (isExpanded) {
      return isMobile ? "h-[90vh] max-h-[600px]" : "h-[80vh] max-h-[600px]"
    }

    if (isMobile) {
      return "h-[70vh]"
    }

    switch (size) {
      case "small":
        return "h-[320px]"
      case "large":
        return "h-[520px]"
      default:
        return "h-[420px]"
    }
  }

  // Determinar largura do chat com base no tamanho, variante e dispositivo
  const getChatWidth = () => {
    if (isExpanded) {
      return isMobile ? "w-full max-w-full" : "w-full max-w-3xl"
    }

    if (isMobile && variant === "floating") {
      return "w-[90vw] max-w-[400px]"
    }

    if (variant === "embedded") {
      return "w-full"
    } else {
      switch (size) {
        case "small":
          return "w-72"
        case "large":
          return "w-96"
        default:
          return "w-80"
      }
    }
  }

  // Classes para o botão flutuante
  const getFloatingButtonPosition = () => {
    if (isMobile) {
      return "fixed bottom-4 right-4 z-50 shadow-lg"
    }
    return "fixed bottom-6 right-6 z-50 shadow-lg"
  }

  // Classes para o container do chat quando flutuante
  const getFloatingContainerPosition = () => {
    if (isMobile) {
      return isExpanded ? "fixed inset-0 z-50 m-2" : "fixed bottom-4 right-4 z-50"
    }
    return "fixed bottom-6 right-6 z-50"
  }

  return (
    <>
      {variant === "floating" && isMinimized && (
        <Button
          onClick={() => setIsMinimized(false)}
          className={`rounded-full h-14 w-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ${getFloatingButtonPosition()}`}
          aria-label="Abrir chat com Neureon"
        >
          <Lightbulb className="h-6 w-6" />
        </Button>
      )}

      <Card
        className={`${
          variant === "floating" && isMinimized ? "hidden" : "flex flex-col"
        } shadow-lg border-white/10 transition-all duration-300 overflow-hidden ${
          variant === "floating" ? getFloatingContainerPosition() : ""
        } ${getChatHeight()} ${getChatWidth()} ${className} backdrop-blur-md bg-gradient-to-br from-[#0a0a1a]/80 to-[#121228]/80`}
      >
        <CardHeader
          className="py-3 px-4 border-b border-white/10 flex flex-row items-center justify-between cursor-pointer relative z-10"
          onClick={() => variant === "floating" && setIsMinimized(true)}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-medium text-white">Neureon</CardTitle>
              {intentionId && <p className="text-xs text-white/60">Assistente para {intentionId}</p>}
            </div>
          </div>
          <div className="flex items-center">
            {!isMinimized && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
                className="text-white/70 hover:text-white mr-1"
                aria-label={isExpanded ? "Minimizar chat" : "Expandir chat"}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                if (variant === "floating") {
                  setIsMinimized(!isMinimized)
                }
              }}
              className="text-white/70 hover:text-white"
              aria-label="Fechar chat"
            >
              {variant === "floating" && <X className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
          {messages.length === 1 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-white/80 mb-3">Sugestões</h3>
              <div className="grid grid-cols-1 gap-2">
                {conversationSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    className="text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm transition-colors backdrop-blur-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-md text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === "ai" ? (
                    <Lightbulb className="h-4 w-4 text-blue-200" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                  <span className="text-xs opacity-70">{message.sender === "ai" ? "Neureon" : "Você"}</span>
                  <span className="text-[10px] text-white/40 ml-auto flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-md text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="h-4 w-4 text-blue-200" />
                  <span className="text-xs opacity-70">Neureon</span>
                </div>
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-blue-300 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-300 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-blue-300 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {showRecommendations && (
            <div className="flex justify-start w-full">
              <div className="max-w-full w-full rounded-2xl px-4 py-3 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-blue-300" />
                  <span className="text-sm font-medium text-white">Recomendação personalizada</span>
                </div>

                <div className="space-y-3">
                  {/* Sessão gratuita */}
                  {recommendedSessions.free && (
                    <div className="bg-white/5 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-white text-sm">{recommendedSessions.free.title}</h5>
                          <Badge className="bg-green-500/20 text-green-300 border-none">Gratuito</Badge>
                        </div>
                        <p className="text-xs text-[#a0a0b0] mt-1">
                          {recommendedSessions.free.subtitle} • {recommendedSessions.free.duration}
                        </p>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                      >
                        <Link href={`/sessoes/${recommendedSessions.free.id}`}>Iniciar Sessão</Link>
                      </Button>
                    </div>
                  )}

                  {/* Sessão premium */}
                  {recommendedSessions.premium && (
                    <div className="bg-white/5 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-sm">
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
                        <Link href="/premium">Desbloquear</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="p-4 border-t border-white/10 relative z-10">
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
              disabled={isTyping || chatStage >= 4}
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isTyping || chatStage >= 4}
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              aria-label="Enviar mensagem"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}

// Função auxiliar para gerar IDs únicos
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Função para formatar o horário da mensagem
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
