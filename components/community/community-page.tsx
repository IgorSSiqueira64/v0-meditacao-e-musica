"use client"

import { useState, useRef, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { StarField } from "@/components/star-field"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  Send,
  MessageSquare,
  Heart,
  Flag,
  Shield,
  Sparkles,
  Search,
  RefreshCw,
  Globe,
  MapPin,
  Menu,
  Clock,
  Lightbulb,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { getCurrentUser } from "@/services/auth-service"
import { useMediaQuery } from "@/hooks/use-media-query"

// Tipos
interface ChatMessage {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    role: "user" | "moderator" | "ai"
  }
  timestamp: Date
  likes: number
  liked?: boolean
  flagged?: boolean
  replyTo?: string
}

// Regiões disponíveis
const regions = [
  { id: "global", name: "Global", icon: <Globe className="h-4 w-4" /> },
  { id: "brasil", name: "Brasil", icon: <MapPin className="h-4 w-4" /> },
  { id: "portugal", name: "Portugal", icon: <MapPin className="h-4 w-4" /> },
  { id: "eua", name: "Estados Unidos", icon: <MapPin className="h-4 w-4" /> },
  { id: "europa", name: "Europa", icon: <MapPin className="h-4 w-4" /> },
  { id: "asia", name: "Ásia", icon: <MapPin className="h-4 w-4" /> },
]

// Dados simulados de mensagens
const mockMessages: Record<string, ChatMessage[]> = {
  global: [
    {
      id: "msg-1",
      content: "Olá a todos! Como estão se sentindo hoje?",
      author: {
        id: "user-1",
        name: "Anônimo",
        role: "user",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
      likes: 5,
    },
    {
      id: "msg-2",
      content: "Estou bem! Acabei de fazer uma meditação de 10 minutos e me sinto renovado.",
      author: {
        id: "user-2",
        name: "Anônimo",
        role: "user",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
      likes: 7,
    },
    {
      id: "msg-3",
      content:
        "Que bom ver pessoas compartilhando suas experiências positivas! Lembrem-se que a consistência é chave para resultados duradouros.",
      author: {
        id: "moderator-1",
        name: "Moderador",
        role: "moderator",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hora atrás
      likes: 8,
    },
    {
      id: "msg-4",
      content:
        "Estudos mostram que apenas 5 minutos de meditação diária podem reduzir significativamente os níveis de estresse. Continuem com o bom trabalho!",
      author: {
        id: "ai-1",
        name: "Neureon AI",
        role: "ai",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      likes: 12,
    },
  ],
  brasil: [
    {
      id: "msg-5",
      content: "Bom dia pessoal! Alguém aqui de São Paulo?",
      author: {
        id: "user-3",
        name: "Anônimo",
        role: "user",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      likes: 3,
    },
    {
      id: "msg-6",
      content: "Eu sou do Rio! Comecei a usar o app essa semana e estou adorando as meditações guiadas.",
      author: {
        id: "user-4",
        name: "Anônimo",
        role: "user",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likes: 5,
    },
  ],
  portugal: [
    {
      id: "msg-7",
      content: "Olá de Lisboa! Alguém aqui pratica meditação há mais de um ano?",
      author: {
        id: "user-5",
        name: "Anônimo",
        role: "user",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      likes: 2,
    },
  ],
  eua: [],
  europa: [],
  asia: [],
}

export default function CommunityPage() {
  const [activeRegion, setActiveRegion] = useState("global")
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages.global)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const user = getCurrentUser()
  const [showAIHelp, setShowAIHelp] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Carregar mensagens da região selecionada
  useEffect(() => {
    setMessages(mockMessages[activeRegion] || [])
  }, [activeRegion])

  // Rolagem automática para o final das mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Filtragem de mensagens
  const filteredMessages = messages.filter((message) => {
    // Filtro por pesquisa
    if (searchQuery && !message.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      author: {
        id: user?.id || "anonymous",
        name: "Anônimo",
        role: "user",
      },
      timestamp: new Date(),
      likes: 0,
    }

    // Adicionar mensagem à lista
    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Atualizar o mock para manter a consistência entre mudanças de região
    mockMessages[activeRegion] = [...(mockMessages[activeRegion] || []), message]

    // Verificar se a mensagem contém conteúdo que pode precisar de moderação
    const potentiallyProblematic = containsProblematicContent(newMessage)

    // Simular resposta da IA se necessário
    if (potentiallyProblematic) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          content:
            "Olá! Notei que sua mensagem pode conter conteúdo sensível. Lembre-se que nossa comunidade valoriza o respeito e a positividade. Se precisar de ajuda com algo específico, estou aqui para auxiliar.",
          author: {
            id: "ai-moderator",
            name: "Moderador IA",
            role: "ai",
          },
          timestamp: new Date(),
          likes: 0,
        }

        setMessages((prev) => [...prev, aiResponse])
        mockMessages[activeRegion] = [...mockMessages[activeRegion], aiResponse]
      }, 1500)
    }

    // Simular resposta ocasional da IA para manter a conversa ativa
    else if (Math.random() < 0.3) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          content: generateRandomAIResponse(),
          author: {
            id: "ai-1",
            name: "Neureon AI",
            role: "ai",
          },
          timestamp: new Date(),
          likes: 0,
        }

        setMessages((prev) => [...prev, aiResponse])
        mockMessages[activeRegion] = [...mockMessages[activeRegion], aiResponse]
      }, 3000)
    }
  }

  const handleLikeMessage = (messageId: string) => {
    setMessages(
      messages.map((message) => {
        if (message.id !== messageId) return message

        return {
          ...message,
          likes: message.liked ? message.likes - 1 : message.likes + 1,
          liked: !message.liked,
        }
      }),
    )

    // Atualizar o mock
    mockMessages[activeRegion] = mockMessages[activeRegion].map((message) => {
      if (message.id !== messageId) return message

      return {
        ...message,
        likes: message.liked ? message.likes - 1 : message.likes + 1,
        liked: !message.liked,
      }
    })
  }

  const handleFlagMessage = (messageId: string) => {
    setMessages(
      messages.map((message) => {
        if (message.id !== messageId) return message

        return {
          ...message,
          flagged: !message.flagged,
        }
      }),
    )

    // Atualizar o mock
    mockMessages[activeRegion] = mockMessages[activeRegion].map((message) => {
      if (message.id !== messageId) return message

      return {
        ...message,
        flagged: !message.flagged,
      }
    })

    // Simular resposta do moderador
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        content:
          "Obrigado por reportar. Nossa equipe de moderação irá analisar esta mensagem em breve. Valorizamos sua contribuição para manter nossa comunidade segura.",
        author: {
          id: "ai-moderator",
          name: "Moderador IA",
          role: "moderator",
        },
        timestamp: new Date(),
        likes: 0,
      }

      setMessages((prev) => [...prev, aiResponse])
      mockMessages[activeRegion] = [...mockMessages[activeRegion], aiResponse]
    }, 1000)
  }

  const toggleAIHelp = () => {
    setShowAIHelp(!showAIHelp)

    if (!showAIHelp) {
      // Adicionar mensagem de ajuda da IA quando ativada
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          content:
            "Olá! Estou aqui para ajudar. Como posso auxiliar você hoje? Posso oferecer dicas de meditação, sugerir práticas para bem-estar mental ou responder perguntas sobre mindfulness.",
          author: {
            id: "ai-helper",
            name: "Neureon Assistente",
            role: "ai",
          },
          timestamp: new Date(),
          likes: 0,
        }

        setMessages((prev) => [...prev, aiResponse])
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }

  // Componente de seleção de região para dispositivos móveis
  const RegionSelector = () => (
    <div className="space-y-1 pt-0">
      {regions.map((region) => (
        <Button
          key={region.id}
          variant={activeRegion === region.id ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveRegion(region.id)
          }}
        >
          <span className="mr-2">{region.icon}</span>
          {region.name}
          {region.id !== "global" && mockMessages[region.id]?.length > 0 && (
            <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-none">{mockMessages[region.id].length}</Badge>
          )}
        </Button>
      ))}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
      <StarField />
      <NavBar />

      <main className="flex-1 container max-w-7xl py-4 md:py-8 lg:py-12 relative z-10 px-4 md:px-6">
        <GlowEffect className="left-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="right-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <div className="flex flex-col space-y-4 md:space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200">
                Comunidade Neureon
              </h1>
              <p className="text-[#a0a0b0] mt-2 text-sm md:text-base">
                Conecte-se com pessoas de todo o mundo e compartilhe sua jornada de bem-estar mental
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Buscar nas mensagens..."
                  className="pl-9 bg-white/5 border-white/10 rounded-full w-full sm:w-60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button
                className={`rounded-full ${
                  showAIHelp
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
                onClick={toggleAIHelp}
              >
                {showAIHelp ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Assistente Ativo</span>
                    <span className="sm:hidden">Ativo</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Pedir Ajuda ao Neureon</span>
                    <span className="sm:hidden">Ajuda</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Sidebar com regiões - versão desktop */}
            {!isMobile && (
              <div className="col-span-1 hidden lg:block">
                <Card className="bg-gradient-to-br from-[#0a0a1a]/80 to-[#121228]/80 border-white/10 backdrop-blur-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Regiões</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1 pt-0">
                    {regions.map((region) => (
                      <Button
                        key={region.id}
                        variant={activeRegion === region.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveRegion(region.id)}
                      >
                        <span className="mr-2">{region.icon}</span>
                        {region.name}
                        {region.id !== "global" && mockMessages[region.id]?.length > 0 && (
                          <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-none">
                            {mockMessages[region.id].length}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </CardContent>

                  <CardFooter className="border-t border-white/10 pt-4">
                    <div className="space-y-2 w-full">
                      <h4 className="text-sm font-medium">Precisa de ajuda?</h4>
                      <Button variant="outline" size="sm" className="w-full">
                        <Shield className="h-3 w-3 mr-2" />
                        Diretrizes da comunidade
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Seletor de região para dispositivos móveis */}
            {isMobile && (
              <div className="w-full mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between items-center">
                      <div className="flex items-center">
                        {regions.find((r) => r.id === activeRegion)?.icon}
                        <span className="ml-2">{regions.find((r) => r.id === activeRegion)?.name}</span>
                      </div>
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-[#0c0c18] border-white/10 rounded-t-xl">
                    <div className="py-4">
                      <h3 className="text-lg font-medium mb-4">Escolha uma região</h3>
                      <RegionSelector />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}

            {/* Chat principal */}
            <div className="col-span-1 lg:col-span-3">
              <Card className="bg-gradient-to-br from-[#0a0a1a]/80 to-[#121228]/80 border-white/10 backdrop-blur-md h-full flex flex-col">
                <CardHeader className="border-b border-white/10 pb-3 flex flex-row items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white/10">
                        {regions.find((r) => r.id === activeRegion)?.name || "Global"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-xl">
                      Chat {regions.find((r) => r.id === activeRegion)?.name || "Global"}
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs md:text-sm">
                      {filteredMessages.length} mensagens • Última atualização{" "}
                      {filteredMessages.length > 0
                        ? formatDate(filteredMessages[filteredMessages.length - 1].timestamp)
                        : "nunca"}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow overflow-y-auto p-2 md:p-4 space-y-4 min-h-[350px] md:min-h-[400px] lg:min-h-[500px]">
                  {filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="h-12 w-12 text-white/30 mb-4" />
                      <h3 className="text-lg font-medium text-white">Nenhuma mensagem ainda</h3>
                      <p className="text-white/50 mt-1 max-w-md text-sm md:text-base">
                        Seja o primeiro a iniciar uma conversa nesta região. Compartilhe suas experiências ou faça uma
                        pergunta!
                      </p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div key={message.id} className="relative group">
                        <div className="flex gap-2 md:gap-3">
                          <Avatar className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0">
                            {message.author.role === "ai" ? (
                              <div className="bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center w-full h-full">
                                <Lightbulb className="h-3 w-3 md:h-4 md:w-4 text-white" />
                              </div>
                            ) : message.author.role === "moderator" ? (
                              <div className="bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center w-full h-full">
                                <Shield className="h-3 w-3 md:h-4 md:w-4 text-white" />
                              </div>
                            ) : (
                              <>
                                <AvatarFallback className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-white text-xs md:text-sm">
                                  {message.author.name.charAt(0)}
                                </AvatarFallback>
                                {message.author.avatar && (
                                  <AvatarImage
                                    src={message.author.avatar || "/placeholder.svg"}
                                    alt={message.author.name}
                                  />
                                )}
                              </>
                            )}
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 md:gap-2">
                              <span className="font-medium text-xs md:text-sm">{message.author.name}</span>

                              {message.author.role === "moderator" && (
                                <Badge className="bg-purple-500/20 text-purple-300 border-none text-[8px] md:text-[10px] py-0 h-3 md:h-4">
                                  Moderador
                                </Badge>
                              )}

                              {message.author.role === "ai" && (
                                <Badge className="bg-blue-500/20 text-blue-300 border-none text-[8px] md:text-[10px] py-0 h-3 md:h-4">
                                  IA
                                </Badge>
                              )}

                              <span className="text-[10px] md:text-xs text-white/50 ml-auto flex items-center">
                                <Clock className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />
                                {formatDate(message.timestamp)}
                              </span>
                            </div>

                            <div className="mt-1 text-xs md:text-sm bg-gradient-to-r from-white/5 to-white/10 p-2 md:p-3 rounded-lg border border-white/10">
                              {message.content}
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 md:h-7 px-1 md:px-2 ${message.liked ? "text-red-400" : "text-white/50"}`}
                                onClick={() => handleLikeMessage(message.id)}
                              >
                                <Heart
                                  className={`h-3 w-3 md:h-3.5 md:w-3.5 mr-1 ${message.liked ? "fill-red-400" : ""}`}
                                />
                                {message.likes}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {message.author.role !== "ai" && message.author.role !== "moderator" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`absolute right-0 top-0 h-6 md:h-7 opacity-0 group-hover:opacity-100 ${
                              message.flagged ? "text-amber-400" : "text-white/50"
                            }`}
                            onClick={() => handleFlagMessage(message.id)}
                          >
                            <Flag className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                <CardFooter className="border-t border-white/10 p-2 md:p-4">
                  <div className="flex gap-2 md:gap-3 w-full">
                    <Avatar className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 text-white text-xs md:text-sm">
                        A
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Escrever uma mensagem..."
                        className="flex-1 bg-white/5 border-white/10 text-xs md:text-sm h-9 md:h-10"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-9 md:h-10 px-2 md:px-4"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-4 md:py-8 relative z-10">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 relative">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
              <span className="text-xs md:text-sm text-[#a0a0b0]">Neureon © {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Link href="#" className="text-xs md:text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="#" className="text-xs md:text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="text-xs md:text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Função auxiliar para formatar datas relativas
function formatDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) {
    return "agora mesmo"
  } else if (diffMins < 60) {
    return `${diffMins} min atrás`
  } else if (diffHours < 24) {
    return `${diffHours}h atrás`
  } else if (diffDays < 7) {
    return `${diffDays}d atrás`
  } else {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  }
}

// Função para verificar conteúdo potencialmente problemático
function containsProblematicContent(text: string): boolean {
  const problematicTerms = [
    "idiota",
    "burro",
    "estúpido",
    "ódio",
    "matar",
    "violência",
    "suicídio",
    "morrer",
    "depressão",
    "ansiedade",
    "pânico",
    "trauma",
    "abuso",
  ]

  return problematicTerms.some((term) => text.toLowerCase().includes(term))
}

// Função para gerar respostas aleatórias da IA
function generateRandomAIResponse(): string {
  const responses = [
    "Obrigado por compartilhar! Lembre-se que a prática regular de mindfulness pode trazer benefícios significativos para sua saúde mental.",
    "Que interessante! Estudos mostram que a meditação regular pode aumentar a densidade da matéria cinzenta em áreas do cérebro associadas à memória e empatia.",
    "Ótima observação! Você sabia que apenas 5 minutos de meditação por dia já podem trazer benefícios mensuráveis para sua saúde mental?",
    "Adorei sua contribuição! Lembre-se que o bem-estar mental é uma jornada, não um destino. Cada pequeno passo importa.",
    "Excelente ponto! A neuroplasticidade do cérebro permite que ele se reconfigure através de práticas como a meditação e mindfulness.",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
