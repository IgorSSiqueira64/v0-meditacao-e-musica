"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { getCurrentUser, getUnreadNotificationsCount, markNotificationAsRead } from "@/services/auth-service"

export function NotificationsPopover() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Carregar notificações do usuário
    const user = getCurrentUser()
    if (user) {
      setNotifications(user.notifications || [])
      setUnreadCount(getUnreadNotificationsCount())
    }

    // Atualizar a cada 30 segundos
    const interval = setInterval(() => {
      const user = getCurrentUser()
      if (user) {
        setNotifications(user.notifications || [])
        setUnreadCount(getUnreadNotificationsCount())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [mounted])

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id)

    // Atualizar estado local
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    setUnreadCount(getUnreadNotificationsCount())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="font-medium">Notificações</h3>
          <Link href="/notificacoes" className="text-xs text-blue-400 hover:text-blue-300">
            Ver todas
          </Link>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-white/10">
              {notifications
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-colors ${!notification.read ? "bg-blue-950/20" : ""}`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <span className="text-[10px] text-[#a0a0b0]">{formatDate(notification.date)}</span>
                    </div>
                    <p className="text-xs text-[#a0a0b0]">{notification.description}</p>
                    {notification.actionText && notification.actionLink && (
                      <Link
                        href={notification.actionLink}
                        className="mt-2 block text-xs text-blue-400 hover:text-blue-300"
                      >
                        {notification.actionText}
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex h-20 items-center justify-center">
              <p className="text-sm text-[#a0a0b0]">Nenhuma notificação</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "Agora"
  if (diffMins < 60) return `${diffMins}m atrás`
  if (diffHours < 24) return `${diffHours}h atrás`
  if (diffDays < 7) return `${diffDays}d atrás`

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
}
