"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { StarField } from "@/components/star-field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Clock, BookOpen, Star, Calendar, CheckCircle, Bell, X } from "lucide-react"
import { isAuthenticated, getCurrentUser, markNotificationAsRead } from "@/services/auth-service"
import type { UserNotification } from "@/services/auth-service"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<UserNotification[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(isAuthenticated())

    // Carregar notificações do usuário
    const user = getCurrentUser()
    if (user) {
      setNotifications(user.notifications || [])
    }
  }, [])

  const markAllAsRead = () => {
    const user = getCurrentUser()
    if (!user) return

    // Marcar todas as notificações como lidas
    const updatedNotifications = notifications.map((n) => {
      markNotificationAsRead(n.id)
      return { ...n, read: true }
    })

    setNotifications(updatedNotifications)
  }

  const markAsRead = (id: string) => {
    markNotificationAsRead(id)

    // Atualizar o estado local
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    // Remover notificação do estado local
    setNotifications(notifications.filter((n) => n.id !== id))

    // Remover notificação do "banco de dados"
    const user = getCurrentUser()
    if (user) {
      user.notifications = user.notifications.filter((n) => n.id !== id)
      localStorage.setItem("user", JSON.stringify(user))
    }
  }

  const getIconForType = (type: UserNotification["type"]) => {
    switch (type) {
      case "achievement":
        return <Award className="h-5 w-5 text-yellow-400" />
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-400" />
      case "tip":
        return <BookOpen className="h-5 w-5 text-purple-400" />
      case "update":
        return <Star className="h-5 w-5 text-green-400" />
      case "streak":
        return <Calendar className="h-5 w-5 text-orange-400" />
    }
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

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
        <StarField />
        <NavBar />

        <main className="flex-1 relative z-10 flex items-center justify-center">
          <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
          <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full text-center">
            <Bell className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-white mb-2">Acesso Restrito</h1>
            <p className="text-[#a0a0b0] mb-6">Faça login para acessar suas notificações e acompanhar seu progresso.</p>
            <Button
              asChild
              className="rounded-full px-6 py-2 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            >
              <Link href="/login?redirect=/notificacoes">Fazer Login</Link>
            </Button>
          </div>
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
      <StarField />
      <NavBar />

      <main className="flex-1 relative z-10">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-4xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center text-white mb-6 border border-white/10">
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-4">
              Suas Notificações
            </h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              Acompanhe seu progresso e mantenha-se atualizado com as últimas novidades do Neureon.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-xl font-medium text-white">Centro de Notificações</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-[#a0a0b0] hover:text-white" onClick={markAllAsRead}>
                  Marcar todas como lidas
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="border-b border-white/10 px-4">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-white/10 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-blue-400"
                  >
                    Todas
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="data-[state=active]:bg-white/10 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-blue-400"
                  >
                    Não lidas
                  </TabsTrigger>
                  <TabsTrigger
                    value="achievements"
                    className="data-[state=active]:bg-white/10 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-blue-400"
                  >
                    Conquistas
                  </TabsTrigger>
                  <TabsTrigger
                    value="tips"
                    className="data-[state=active]:bg-white/10 rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-blue-400"
                  >
                    Dicas
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="m-0">
                <div className="divide-y divide-white/10">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 flex gap-4 ${notification.read ? "bg-transparent" : "bg-blue-900/10"}`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                          {getIconForType(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-base font-medium text-white">{notification.title}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full -mr-2 -mt-1 text-[#a0a0b0] hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </div>
                          <p className="text-sm text-[#a0a0b0] mb-2">{notification.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#a0a0b0]">
                                {new Date(notification.date).toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })}
                              </span>
                              <span className="text-xs text-[#a0a0b0]">•</span>
                              <span className="text-xs text-[#a0a0b0]">
                                {new Date(notification.date).toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            {notification.actionText && notification.actionLink && (
                              <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-sm text-blue-400 hover:text-blue-300"
                                asChild
                              >
                                <Link href={notification.actionLink}>{notification.actionText}</Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Bell className="h-12 w-12 text-[#a0a0b0] mb-4" />
                      <p className="text-lg font-medium text-white mb-2">Nenhuma notificação</p>
                      <p className="text-sm text-[#a0a0b0]">Você não tem notificações no momento.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <div className="divide-y divide-white/10">
                  {notifications.filter((n) => !n.read).length > 0 ? (
                    notifications
                      .filter((n) => !n.read)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 flex gap-4 bg-blue-900/10"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            {getIconForType(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-base font-medium text-white">{notification.title}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full -mr-2 -mt-1 text-[#a0a0b0] hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remover</span>
                              </Button>
                            </div>
                            <p className="text-sm text-[#a0a0b0] mb-2">{notification.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#a0a0b0]">
                                  {new Date(notification.date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })}
                                </span>
                                <span className="text-xs text-[#a0a0b0]">•</span>
                                <span className="text-xs text-[#a0a0b0]">
                                  {new Date(notification.date).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              {notification.actionText && notification.actionLink && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-sm text-blue-400 hover:text-blue-300"
                                  asChild
                                >
                                  <Link href={notification.actionLink}>{notification.actionText}</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <CheckCircle className="h-12 w-12 text-[#a0a0b0] mb-4" />
                      <p className="text-lg font-medium text-white mb-2">Tudo em dia!</p>
                      <p className="text-sm text-[#a0a0b0]">Você não tem notificações não lidas.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="m-0">
                <div className="divide-y divide-white/10">
                  {notifications.filter((n) => n.type === "achievement").length > 0 ? (
                    notifications
                      .filter((n) => n.type === "achievement")
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 flex gap-4 ${notification.read ? "bg-transparent" : "bg-blue-900/10"}`}
                          onClick={() => !notification.read && markAsRead(notification.id)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <Award className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-base font-medium text-white">{notification.title}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full -mr-2 -mt-1 text-[#a0a0b0] hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remover</span>
                              </Button>
                            </div>
                            <p className="text-sm text-[#a0a0b0] mb-2">{notification.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#a0a0b0]">
                                  {new Date(notification.date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })}
                                </span>
                                <span className="text-xs text-[#a0a0b0]">•</span>
                                <span className="text-xs text-[#a0a0b0]">
                                  {new Date(notification.date).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              {notification.actionText && notification.actionLink && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-sm text-blue-400 hover:text-blue-300"
                                  asChild
                                >
                                  <Link href={notification.actionLink}>{notification.actionText}</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <Award className="h-12 w-12 text-[#a0a0b0] mb-4" />
                      <p className="text-lg font-medium text-white mb-2">Sem conquistas ainda</p>
                      <p className="text-sm text-[#a0a0b0]">Continue sua jornada para desbloquear conquistas.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tips" className="m-0">
                <div className="divide-y divide-white/10">
                  {notifications.filter((n) => n.type === "tip").length > 0 ? (
                    notifications
                      .filter((n) => n.type === "tip")
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 flex gap-4 ${notification.read ? "bg-transparent" : "bg-blue-900/10"}`}
                          onClick={() => !notification.read && markAsRead(notification.id)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-base font-medium text-white">{notification.title}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full -mr-2 -mt-1 text-[#a0a0b0] hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remover</span>
                              </Button>
                            </div>
                            <p className="text-sm text-[#a0a0b0] mb-2">{notification.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#a0a0b0]">
                                  {new Date(notification.date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })}
                                </span>
                                <span className="text-xs text-[#a0a0b0]">•</span>
                                <span className="text-xs text-[#a0a0b0]">
                                  {new Date(notification.date).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              {notification.actionText && notification.actionLink && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-sm text-blue-400 hover:text-blue-300"
                                  asChild
                                >
                                  <Link href={notification.actionLink}>{notification.actionText}</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <BookOpen className="h-12 w-12 text-[#a0a0b0] mb-4" />
                      <p className="text-lg font-medium text-white mb-2">Sem dicas no momento</p>
                      <p className="text-sm text-[#a0a0b0]">Volte mais tarde para novas dicas e sugestões.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8 text-center">
            <Button
              asChild
              className="rounded-full px-6 py-2 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            >
              <Link href="/jornada">Voltar para Jornada Consciente</Link>
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
