"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface GoogleAuthButtonProps {
  mode: "signin" | "signup"
}

export function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/dashboard"

  const handleGoogleAuth = async () => {
    setIsLoading(true)

    try {
      // Simulação de autenticação com Google - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Gerar um nome de usuário aleatório para simular
      const randomName = `Usuário${Math.floor(Math.random() * 10000)}`

      // Armazenar informações do usuário no localStorage para simular autenticação
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: randomName,
          email: `${randomName.toLowerCase()}@gmail.com`,
          provider: "google",
          premium: false,
          lastSessionUsed: null,
          sessionsUsedToday: 0,
          lastSessionDate: null,
          experiences: [],
          challenges: [],
          intentions: [],
          notifications: [
            {
              id: "welcome-google",
              type: "update",
              title: "Conta Google conectada",
              description: "Sua conta Google foi conectada com sucesso. Aproveite a plataforma!",
              read: false,
              date: new Date().toISOString(),
              actionText: "Explorar sessões",
              actionLink: "/sessoes",
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      )

      toast({
        title: mode === "signin" ? "Login realizado com sucesso" : "Cadastro realizado com sucesso",
        description: "Bem-vindo à plataforma Neureon!",
      })

      router.push(redirectPath)
    } catch (error) {
      console.error("Erro na autenticação com Google:", error)
      toast({
        title: "Erro na autenticação",
        description: "Não foi possível autenticar com o Google. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-11"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      )}
      <span>
        {isLoading
          ? mode === "signin"
            ? "Entrando..."
            : "Cadastrando..."
          : mode === "signin"
            ? "Entrar com Google"
            : "Cadastrar com Google"}
      </span>
    </Button>
  )
}
