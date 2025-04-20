"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface AppleAuthButtonProps {
  mode: "signin" | "signup" | "subscribe"
  className?: string
}

export function AppleAuthButton({ mode, className }: AppleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAppleAuth = async () => {
    setIsLoading(true)

    try {
      // Simulação de autenticação - em produção, isso seria substituído pela API real da Apple
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar após autenticação bem-sucedida
      if (mode === "subscribe") {
        router.push("/assinatura/sucesso")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Erro na autenticação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText = {
    signin: "Entrar com Apple",
    signup: "Cadastrar com Apple",
    subscribe: "Assinar com Apple",
  }

  return (
    <Button
      onClick={handleAppleAuth}
      disabled={isLoading}
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 rounded-full border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
          <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
      )}
      <span>{buttonText[mode]}</span>
    </Button>
  )
}
