"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface AppleAuthButtonProps {
  mode: "signin" | "signup"
}

export function AppleAuthButton({ mode }: AppleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/dashboard"

  const handleAppleAuth = async () => {
    setIsLoading(true)

    try {
      // Simulação de autenticação com Apple - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Gerar um nome de usuário aleatório para simular
      const randomName = `Usuário${Math.floor(Math.random() * 10000)}`

      // Armazenar informações do usuário no localStorage para simular autenticação
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: randomName,
          email: `${randomName.toLowerCase()}@icloud.com`,
          provider: "apple",
          premium: false,
          lastSessionUsed: null,
          sessionsUsedToday: 0,
          lastSessionDate: null,
          experiences: [],
          challenges: [],
          intentions: [],
          notifications: [
            {
              id: "welcome-apple",
              type: "update",
              title: "Conta Apple conectada",
              description: "Sua conta Apple foi conectada com sucesso. Aproveite a plataforma!",
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
      console.error("Erro na autenticação com Apple:", error)
      toast({
        title: "Erro na autenticação",
        description: "Não foi possível autenticar com a Apple. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleAppleAuth}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 rounded-full bg-black text-white hover:bg-gray-900 border-gray-700 h-11"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.125 1c.057 2.277-1.635 4.16-3.72 4.16-2.088 0-3.72-1.883-3.72-4.16 0 0-2.467.16-4.795 2.528-1.023 1.035-1.89 2.435-1.89 4.16 0 3.47 2.468 6.276 5.5 6.276 1.5 0 2.5-.5 3.5-.5s2 .5 3.5.5c3.032 0 5.5-2.806 5.5-6.276 0-1.725-.867-3.125-1.89-4.16-2.328-2.368-4.795-2.528-4.795-2.528M12.845 5.16c-.057 0-.115-.008-.172-.008-.23-.008-.457.008-.675.023.008-.023.008-.046.016-.069.675-1.636 2.59-2.368 4.217-2.368.057 2.046-1.667 3.789-3.386 4.422z" />
        </svg>
      )}
      <span>
        {isLoading
          ? mode === "signin"
            ? "Entrando..."
            : "Cadastrando..."
          : mode === "signin"
            ? "Entrar com Apple"
            : "Cadastrar com Apple"}
      </span>
    </Button>
  )
}
