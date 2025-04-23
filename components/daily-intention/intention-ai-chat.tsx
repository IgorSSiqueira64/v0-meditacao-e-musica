"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Lightbulb, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Intention } from "./types"
import type { Session } from "@/data/sessions-data"
import {
  analyzeEmotion,
  generateAIResponse,
  generateFollowUpQuestion,
  generatePositiveReinforcement,
} from "@/services/ai-analysis-service"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
}

interface IntentionAIChatProps {
  intention: Intention
  recommendedSessions: {
    free: Session | null
    premium: Session | null
  }
  onSessionRecommended: (sessionId: string) => void
}

export function IntentionAIChat({ intention, recommendedSessions, onSessionRecommended }: IntentionAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatStage, setChatStage] = useState(1)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Iniciar o chat com uma mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: generateId(),
        content: `Como você está se sentindo hoje? Estou aqui para ajudar com sua intenção de ${intention.name.toLowerCase()}.`,
        sender: "ai",
      }

      // Simular digitação da IA
      setIsTyping(true)
      setTimeout(() => {
        setMessages([initialMessage])
        setIsTyping(false)
      }, 1000)
    }
  }, [messages.length, intention.name])

  // Rolar para o final da conversa quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isTyping) {
      // Adicionar mensagem do usuário
      const userMessage: Message = {
        id: generateId(),
        content: inputValue.trim(),
        sender: "user",
      }
      setMessages((prev) => [...prev, userMessage])
      setInputValue("")
      setIsTyping(true)

      // Analisar a mensagem
      const analysis = analyzeEmotion(inputValue.trim())

      // Gerar resposta baseada no estágio atual do chat
      let aiResponse = ""

      if (chatStage === 1) {
        // Primeira interação - perguntar mais detalhes
        aiResponse = generateAIResponse(analysis, intention.id)
        const followUpQuestion = generateFollowUpQuestion(analysis, intention.id, 2)
        aiResponse += " " + followUpQuestion

        setChatStage(2)
      } else if (chatStage === 2) {
        // Segunda interação - oferecer reforço positivo e perguntar mais uma vez
        const reinforcement = generatePositiveReinforcement(analysis, intention.id)
        const followUpQuestion = generateFollowUpQuestion(analysis, intention.id, 3)
        aiResponse = `${reinforcement} ${followUpQuestion}`

        setChatStage(3)
      } else {
        // Terceira interação - apresentar recomendações
        aiResponse = generateAIResponse(analysis, intention.id)
        aiResponse += ` Baseado no que você compartilhou, recomendo a sessão "${
          recommendedSessions.free?.title || "Meditação Guiada"
        }" para ajudar com sua intenção de ${intention.name.toLowerCase()}.`

        setChatStage(4)
      }

      // Simular tempo de resposta da IA
      setTimeout(() => {
        const aiMessage: Message = {
          id: generateId(),
          content: aiResponse,
          sender: "ai",
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.sender === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-white/90"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === "ai" ? (
                  <Lightbulb className="h-4 w-4 text-blue-400" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
                <span className="text-xs opacity-70">{message.sender === "ai" ? "Neureon" : "Você"}</span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/10 text-white/90">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-xs opacity-70">Neureon</span>
              </div>
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
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

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          disabled={isTyping || chatStage >= 4}
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || isTyping || chatStage >= 4}
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  )
}

// Função auxiliar para gerar IDs únicos
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
