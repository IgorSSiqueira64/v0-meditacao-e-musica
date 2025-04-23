"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Lightbulb, User, Sparkles, X, Globe, MessageSquare, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  analyzeEmotion,
  getRecommendations,
  generateAIResponse,
  generateFollowUpQuestion,
  generatePositiveReinforcement,
  type EmotionalAnalysis,
} from "@/services/ai-analysis-service"
import { supportedLanguages, type SupportedLanguage, translate, translateText } from "@/services/translation-service"
import { getCurrentUser } from "@/services/auth-service"
import { getAllSessions } from "@/data/sessions-data"

interface Message {
  id: string
  content: string
  originalContent?: string
  originalLanguage?: SupportedLanguage
  sender: "user" | "ai"
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  lastUpdated: Date
}

// Sugestões de conversa
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
  {
    id: "suggestion-5",
    text: "Estou com dificuldade para dormir",
    intention: "paz",
  },
]

export function NeureonChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatStage, setChatStage] = useState(1)
  const [analysis, setAnalysis] = useState<EmotionalAnalysis | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>("pt-BR")
  const [activeTab, setActiveTab] = useState("chat")
  const [recommendedSessions, setRecommendedSessions] = useState<{
    free: any | null
    premium: any | null
  }>({
    free: null,
    premium: null,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Carregar idioma preferido e conversas do usuário
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("preferredLanguage") as SupportedLanguage
      if (savedLanguage && supportedLanguages.some((lang) => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage)
      }

      // Carregar conversas salvas
      const savedConversations = localStorage.getItem("neureonConversations")
      if (savedConversations) {
        try {
          const parsedConversations = JSON.parse(savedConversations) as Conversation[]
          // Converter strings de data para objetos Date
          parsedConversations.forEach((conv) => {
            conv.lastUpdated = new Date(conv.lastUpdated)
            conv.messages.forEach((msg) => {
              msg.timestamp = new Date(msg.timestamp)
            })
          })
          setConversations(parsedConversations)
        } catch (error) {
          console.error("Erro ao carregar conversas:", error)
        }
      }
    }
  }, [])

  // Salvar conversas quando houver mudanças
  useEffect(() => {
    if (conversations.length > 0 && typeof window !== "undefined") {
      localStorage.setItem("neureonConversations", JSON.stringify(conversations))
    }
  }, [conversations])

  // Iniciar uma nova conversa quando o chat é aberto sem conversa ativa
  useEffect(() => {
    if (isOpen && !activeConversation) {
      createNewConversation()
    }
  }, [isOpen, activeConversation])

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation?.messages])

  // Focar no input quando o chat é aberto
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, activeTab])

  // Criar uma nova conversa
  const createNewConversation = () => {
    const welcomeMessage: Message = {
      id: generateId(),
      content: translate("welcomeMessage", currentLanguage),
      originalContent: translate("welcomeMessage", "pt-BR"),
      originalLanguage: "pt-BR",
      sender: "ai",
      timestamp: new Date(),
    }

    const newConversation: Conversation = {
      id: generateId(),
      title: translate("newConversation", currentLanguage),
      messages: [welcomeMessage],
      lastUpdated: new Date(),
    }

    setActiveConversation(newConversation)
    setConversations((prev) => [newConversation, ...prev])
    setChatStage(1)
    setAnalysis(null)
    setShowRecommendations(false)
    setRecommendedSessions({
      free: null,
      premium: null,
    })
  }

  // Processar a mensagem do usuário
  const processUserMessage = async (message: string) => {
    if (!activeConversation) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: generateId(),
      content: message,
      originalContent: message,
      originalLanguage: currentLanguage,
      sender: "user",
      timestamp: new Date(),
    }

    const updatedMessages = [...activeConversation.messages, userMessage]
    const updatedConversation = {
      ...activeConversation,
      messages: updatedMessages,
      lastUpdated: new Date(),
    }

    // Atualizar título da conversa com base na primeira mensagem do usuário
    if (updatedMessages.filter((m) => m.sender === "user").length === 1) {
      updatedConversation.title = message.length > 30 ? message.substring(0, 30) + "..." : message
    }

    setActiveConversation(updatedConversation)
    updateConversationInList(updatedConversation)
    setInputValue("")
    setIsTyping(true)

    // Analisar a mensagem
    const newAnalysis = analyzeEmotion(message)
    setAnalysis(newAnalysis)

    // Gerar resposta baseada no estágio atual do chat
    let aiResponse = ""

    if (chatStage === 1) {
      // Primeira interação - perguntar mais detalhes
      aiResponse = generateAIResponse(newAnalysis, "foco") // Usando "foco" como intenção padrão
      const followUpQuestion = generateFollowUpQuestion(newAnalysis, "foco", 2)
      aiResponse += " " + followUpQuestion

      setChatStage(2)
    } else if (chatStage === 2) {
      // Segunda interação - oferecer reforço positivo e perguntar mais uma vez
      const reinforcement = generatePositiveReinforcement(newAnalysis, "foco")
      const followUpQuestion = generateFollowUpQuestion(newAnalysis, "foco", 3)
      aiResponse = `${reinforcement} ${followUpQuestion}`

      setChatStage(3)
    } else {
      // Terceira interação - apresentar recomendações
      aiResponse = generateAIResponse(newAnalysis, "foco")

      // Obter recomendações
      const recommendations = getRecommendations(newAnalysis, "foco")

      // Converter IDs de sessão em objetos Session completos
      if (recommendations.length > 0) {
        const allSessions = getAllSessions()
        const user = getCurrentUser()
        const isPremium = user?.premium || false

        // Encontrar uma sessão gratuita recomendada
        const freeSessionId = recommendations.find((rec) => {
          const session = allSessions.find((s) => s.id === rec.sessionId)
          return session && !session.premium
        })?.sessionId

        // Encontrar uma sessão premium recomendada
        const premiumSessionId = recommendations.find((rec) => {
          const session = allSessions.find((s) => s.id === rec.sessionId)
          return session && session.premium
        })?.sessionId

        setRecommendedSessions({
          free: freeSessionId ? allSessions.find((s) => s.id === freeSessionId) || null : null,
          premium: premiumSessionId ? allSessions.find((s) => s.id === premiumSessionId) || null : null,
        })

        setShowRecommendations(true)
      }

      setChatStage(4)
    }

    // Traduzir a resposta da IA para o idioma atual, se necessário
    let translatedResponse = aiResponse
    if (currentLanguage !== "pt-BR") {
      translatedResponse = await translateText(aiResponse, "pt-BR", currentLanguage)
    }

    // Simular tempo de resposta da IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        content: translatedResponse,
        originalContent: aiResponse,
        originalLanguage: "pt-BR",
        sender: "ai",
        timestamp: new Date(),
      }

      const finalUpdatedConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        lastUpdated: new Date(),
      }

      setActiveConversation(finalUpdatedConversation)
      updateConversationInList(finalUpdatedConversation)
      setIsTyping(false)
    }, 1500)
  }

  // Atualizar uma conversa na lista de conversas
  const updateConversationInList = (conversation: Conversation) => {
    setConversations((prev) =>
      prev
        .map((conv) => (conv.id === conversation.id ? conversation : conv))
        .sort((a, b) => {
          return b.lastUpdated.getTime() - a.lastUpdated.getTime()
        }),
    )
  }

  // Excluir uma conversa
  const deleteConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== conversationId))
    if (activeConversation?.id === conversationId) {
      createNewConversation()
    }
  }

  // Selecionar uma conversa
  const selectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation)
    setChatStage(4) // Assumir que é uma conversa em andamento
    setActiveTab("chat")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isTyping) {
      processUserMessage(inputValue.trim())
    }
  }

  const handleSuggestionClick = (suggestion: (typeof conversationSuggestions)[0]) => {
    if (!isTyping) {
      processUserMessage(suggestion.text)
    }
  }

  const changeLanguage = async (language: SupportedLanguage) => {
    if (language === currentLanguage) return

    setCurrentLanguage(language)
    localStorage.setItem("preferredLanguage", language)

    // Traduzir mensagens da conversa ativa para o novo idioma
    if (activeConversation && activeConversation.messages.length > 0) {
      const translatedMessages = await Promise.all(
        activeConversation.messages.map(async (message) => {
          if (message.originalLanguage && message.originalLanguage !== language && message.originalContent) {
            const translatedContent = await translateText(message.originalContent, message.originalLanguage, language)
            return {
              ...message,
              content: translatedContent,
            }
          }
          return message
        }),
      )

      const updatedConversation = {
        ...activeConversation,
        messages: translatedMessages,
      }

      setActiveConversation(updatedConversation)
      updateConversationInList(updatedConversation)
    }
  }

  return (
    <>
      {/* Botão de chat flutuante para mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
            >
              <Lightbulb className="h-6 w-6" />
              <span className="sr-only">{translate("speakWithNeureon", currentLanguage)}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-xl bg-[#0a0a0a] border-t border-white/10 p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="px-4 py-3 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Lightbulb className="h-4 w-4 text-blue-400" />
                    </div>
                    <SheetTitle className="text-lg font-medium text-white">
                      {translate("speakWithNeureon", currentLanguage)}
                    </SheetTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <LanguageSelector currentLanguage={currentLanguage} onChangeLanguage={changeLanguage} />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                        <X className="h-4 w-4" />
                        <span className="sr-only">{translate("close", currentLanguage)}</span>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="bg-transparent border-b border-white/10 px-4 py-2">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                    {translate("chat", currentLanguage)}
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                  >
                    {translate("history", currentLanguage)}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
                  <ChatContent
                    messages={activeConversation?.messages || []}
                    isTyping={isTyping}
                    showRecommendations={showRecommendations}
                    recommendedSessions={recommendedSessions}
                    currentLanguage={currentLanguage}
                    messagesEndRef={messagesEndRef}
                    suggestions={conversationSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />

                  <div className="p-4 border-t border-white/10 flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={translate("placeholder", currentLanguage)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        disabled={isTyping || chatStage >= 4}
                      />
                      <Button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping || chatStage >= 4}
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">{translate("send", currentLanguage)}</span>
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-white/70">{translate("conversations", currentLanguage)}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={createNewConversation}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {translate("newChat", currentLanguage)}
                    </Button>
                  </div>

                  {conversations.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/50 text-sm">{translate("noConversations", currentLanguage)}</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                          activeConversation?.id === conversation.id
                            ? "bg-white/10 border border-white/20"
                            : "bg-white/5 hover:bg-white/10 border border-transparent"
                        }`}
                        onClick={() => selectConversation(conversation)}
                      >
                        <div className="flex items-start gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                            <Lightbulb className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-medium text-white text-sm truncate">{conversation.title}</h4>
                            <p className="text-xs text-white/50 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(conversation.lastUpdated, currentLanguage)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-white/30 hover:text-white/70 hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteConversation(conversation.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{translate("delete", currentLanguage)}</span>
                        </Button>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Barra de chat para desktop - mais integrada e fluida */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="container max-w-6xl py-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl mx-auto">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white/70 hover:text-white transition-all">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">{translate("speakWithNeureon", currentLanguage)}</span>
                    <span className="text-xs text-white/50 underline ml-2">
                      {translate("welcomeMessage", currentLanguage)}
                    </span>
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[450px] h-screen bg-[#0a0a0a] border-l border-white/10 p-0">
                  <div className="flex flex-col h-full">
                    <SheetHeader className="px-4 py-3 border-b border-white/10 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Lightbulb className="h-4 w-4 text-blue-400" />
                          </div>
                          <SheetTitle className="text-lg font-medium text-white">
                            {translate("speakWithNeureon", currentLanguage)}
                          </SheetTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={createNewConversation}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {translate("newChat", currentLanguage)}
                          </Button>
                          <LanguageSelector currentLanguage={currentLanguage} onChangeLanguage={changeLanguage} />
                          <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                              <X className="h-4 w-4" />
                              <span className="sr-only">{translate("close", currentLanguage)}</span>
                            </Button>
                          </SheetClose>
                        </div>
                      </div>
                    </SheetHeader>

                    <div className="flex flex-1 overflow-hidden">
                      {/* Histórico de conversas */}
                      <div className="w-1/3 border-r border-white/10 overflow-y-auto p-3 space-y-2">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xs font-medium text-white/70">
                            {translate("conversations", currentLanguage)}
                          </h3>
                        </div>

                        {conversations.length === 0 ? (
                          <div className="text-center py-4">
                            <p className="text-white/50 text-xs">{translate("noConversations", currentLanguage)}</p>
                          </div>
                        ) : (
                          conversations.map((conversation) => (
                            <div
                              key={conversation.id}
                              className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${
                                activeConversation?.id === conversation.id
                                  ? "bg-white/10 border border-white/20"
                                  : "bg-white/5 hover:bg-white/10 border border-transparent"
                              }`}
                              onClick={() => selectConversation(conversation)}
                            >
                              <div className="flex items-start gap-2 overflow-hidden">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                                  <Lightbulb className="h-3 w-3 text-blue-400" />
                                </div>
                                <div className="overflow-hidden">
                                  <h4 className="font-medium text-white text-xs truncate">{conversation.title}</h4>
                                  <p className="text-[10px] text-white/50 flex items-center gap-1">
                                    <Clock className="h-2 w-2" />
                                    {formatDate(conversation.lastUpdated, currentLanguage)}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-white/30 hover:text-white/70 hover:bg-white/10"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteConversation(conversation.id)
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="sr-only">{translate("delete", currentLanguage)}</span>
                              </Button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Conteúdo do chat */}
                      <div className="w-2/3 flex flex-col">
                        <ChatContent
                          messages={activeConversation?.messages || []}
                          isTyping={isTyping}
                          showRecommendations={showRecommendations}
                          recommendedSessions={recommendedSessions}
                          currentLanguage={currentLanguage}
                          messagesEndRef={messagesEndRef}
                          suggestions={conversationSuggestions}
                          onSuggestionClick={handleSuggestionClick}
                        />

                        <div className="p-4 border-t border-white/10 flex-shrink-0">
                          <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                              ref={inputRef}
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder={translate("placeholder", currentLanguage)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              disabled={isTyping || chatStage >= 4}
                            />
                            <Button
                              type="submit"
                              disabled={!inputValue.trim() || isTyping || chatStage >= 4}
                              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Send className="h-4 w-4" />
                              <span className="sr-only">{translate("send", currentLanguage)}</span>
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Componente para o conteúdo do chat
function ChatContent({
  messages,
  isTyping,
  showRecommendations,
  recommendedSessions,
  currentLanguage,
  messagesEndRef,
  suggestions,
  onSuggestionClick,
}: {
  messages: Message[]
  isTyping: boolean
  showRecommendations: boolean
  recommendedSessions: { free: any | null; premium: any | null }
  currentLanguage: SupportedLanguage
  messagesEndRef: React.RefObject<HTMLDivElement>
  suggestions: typeof conversationSuggestions
  onSuggestionClick: (suggestion: (typeof conversationSuggestions)[0]) => void
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 1 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-white/80 mb-3">{translate("suggestions", currentLanguage)}</h3>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                className="text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm transition-colors"
                onClick={() => onSuggestionClick(suggestion)}
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
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.sender === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-white/90"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {message.sender === "ai" ? (
                <Lightbulb className="h-4 w-4 text-blue-400" />
              ) : (
                <User className="h-4 w-4 text-white" />
              )}
              <span className="text-xs opacity-70">
                {message.sender === "ai" ? "Neureon" : translate("you", currentLanguage) || "Você"}
              </span>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white/10 text-white/90">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="h-4 w-4 text-blue-400" />
              <span className="text-xs opacity-70">Neureon</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {showRecommendations && (
        <div className="flex justify-start w-full">
          <div className="max-w-full w-full rounded-2xl px-4 py-3 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">
                {translate("sessionRecommendation", currentLanguage)}
              </span>
            </div>

            <div className="space-y-3">
              {/* Sessão gratuita */}
              {recommendedSessions.free && (
                <div className="bg-white/5 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-white text-sm">{recommendedSessions.free.title}</h5>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300">
                        {translate("free", currentLanguage)}
                      </span>
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
                    <Link href={`/sessoes/${recommendedSessions.free.id}`}>
                      {translate("startSession", currentLanguage)}
                    </Link>
                  </Button>
                </div>
              )}

              {/* Sessão premium */}
              {recommendedSessions.premium && (
                <div className="bg-white/5 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-white text-sm">{recommendedSessions.premium.title}</h5>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300">
                        {translate("premium", currentLanguage)}
                      </span>
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
                    <Link href="/premium">{translate("unlock", currentLanguage)}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

// Componente para o seletor de idiomas
function LanguageSelector({
  currentLanguage,
  onChangeLanguage,
}: {
  currentLanguage: SupportedLanguage
  onChangeLanguage: (language: SupportedLanguage) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{translate("languageSelector", currentLanguage)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0a0a0a] border border-white/10">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onChangeLanguage(language.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLanguage === language.code ? "bg-white/10" : ""
            }`}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Função auxiliar para gerar IDs únicos
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Função para formatar datas
function formatDate(date: Date, language: SupportedLanguage): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) {
    return translate("justNow", language)
  } else if (diffMins < 60) {
    return `${diffMins} ${translate("minutesAgo", language)}`
  } else if (diffHours < 24) {
    return `${diffHours} ${translate("hoursAgo", language)}`
  } else if (diffDays < 7) {
    return `${diffDays} ${translate("daysAgo", language)}`
  } else {
    return date.toLocaleDateString(language.split("-")[0], {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}
