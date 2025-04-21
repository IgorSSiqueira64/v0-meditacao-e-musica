"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/services/auth-service"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Lista de rotas públicas que não precisam de autenticação
    const publicRoutes = ["/", "/login", "/cadastro", "/sobre", "/contato"]

    // Verificar se a rota atual é pública
    const isPublicRoute =
      publicRoutes.includes(pathname) || pathname.startsWith("/conhecimento") || pathname === "/premium"

    if (!isAuthenticated() && !isPublicRoute) {
      // Redirecionar para login se não estiver autenticado e a rota não for pública
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }

    setIsChecking(false)
  }, [pathname, router, mounted])

  if (!mounted || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
          <p className="text-lg text-[#a0a0b0]">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
