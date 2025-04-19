"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface GoogleAuthButtonProps {
  mode: "signin" | "signup"
  className?: string
}

export function GoogleAuthButton({ mode, className }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleAuth = async () => {
    setIsLoading(true)

    try {
      // Simulação de autenticação - em produção, isso seria substituído pela API real do Google
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar após autenticação bem-sucedida
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro na autenticação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 rounded-full border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <Image src="/images/google-logo.svg" alt="Google" width={18} height={18} className="object-contain" />
      )}
      <span>{mode === "signin" ? "Entrar com Google" : "Cadastrar com Google"}</span>
    </Button>
  )
}
