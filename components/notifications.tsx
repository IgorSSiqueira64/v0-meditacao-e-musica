"use client"

import { useState } from "react"
import { Bell, CheckCircle, Clock, Star, BookOpen, Award, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  type: "achievement" | "reminder" | "tip" | "update" | "streak"
  title: string
  description: string
  time: string
  read: boolean
  actionText?: string
  actionLink?: string
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Conquista Desbloqueada!",
      description: "Você completou 3 dias consecutivos de meditação. Continue assim!",
      time: "Há 2 horas",
      read: false,
    },
    {
      id: "2",
      type: "reminder",
      title: "Lembrete de Meditação",
      description: "Não se esqueça da sua sessão de foco de hoje.",
      time: "Há 5 horas",
      read: false,
      actionText: "Iniciar Sessão",
      actionLink: "/sessoes/foco",
    },
    {
      id: "3",
      type: "tip",
      title: "Dica de Frequência",
      description: "Experimente a frequência 528Hz para transformação e harmonia interior.",
      time: "Ontem",
      read: true,
    },
    {
      id: "4",
      type: "update",
      title: "Novo Conteúdo Disponível",
      description: "Novas sessões de meditação para foco foram adicionadas.",
      time: "Há 2 dias",
      read: true,
      actionText: "Explorar",
      actionLink: "/sessoes",
    },
    {
      id: "5",
      type: "streak",
      title: "Mantenha o Ritmo!",
      description: "Você está a caminho de completar uma semana de prática consistente.",
      time: "Há 3 dias",
      read: true,
    },
    {
      id: "6",
      type: "achievement",
      title: "Modo Guerreiro Ativado",
      description: "Você completou seu primeiro desafio no modo guerreiro!",
      time: "Há 4 dias",
      read: true,
    },
  ])

  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIconForType = (type: Notification["type"]) => {
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between border-b border-white/10 p-3">
            <h3 className="font-medium">Notificações</h3>
            <div className="flex items-center gap-2">
              <TabsList className="h-8 bg-white/5">
                <TabsTrigger value="all" className="text-xs h-7 px-3">
                  Todas
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-xs h-7 px-3">
                  Não lidas
                </TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onRemove={removeNotification}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <Bell className="h-10 w-10 text-[#a0a0b0] mb-2" />
                  <p className="text-sm text-[#a0a0b0]">Nenhuma notificação</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y divide-white/10">
                  {notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onRemove={removeNotification}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <CheckCircle className="h-10 w-10 text-[#a0a0b0] mb-2" />
                  <p className="text-sm text-[#a0a0b0]">Nenhuma notificação não lida</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="border-t border-white/10 p-2 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#a0a0b0] hover:text-white w-full"
            onClick={() => setOpen(false)}
          >
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
}

function NotificationItem({ notification, onMarkAsRead, onRemove }: NotificationItemProps) {
  const getIconForType = (type: Notification["type"]) => {
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

  return (
    <div
      className={`p-3 flex gap-3 ${notification.read ? "bg-transparent" : "bg-blue-900/10"}`}
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
        {getIconForType(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-medium text-white truncate">{notification.title}</h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full -mr-1 -mt-1 text-[#a0a0b0] hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(notification.id)
            }}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remover</span>
          </Button>
        </div>
        <p className="text-xs text-[#a0a0b0] mb-1">{notification.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#a0a0b0]">{notification.time}</span>
          {notification.actionText && notification.actionLink && (
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-400 hover:text-blue-300" asChild>
              <a href={notification.actionLink}>{notification.actionText}</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
