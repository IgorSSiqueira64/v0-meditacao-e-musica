"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface GooglePayButtonProps {
  amount: number
  planName: string
  className?: string
}

export function GooglePayButton({ amount, planName, className }: GooglePayButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGooglePay = async () => {
    setIsLoading(true)

    try {
      // Simulação de pagamento - em produção, isso seria substituído pela API real do Google Pay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirecionar após pagamento bem-sucedido
      router.push("/assinatura/sucesso")
    } catch (error) {
      console.error("Erro no pagamento:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGooglePay}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-2 rounded-full bg-black hover:bg-gray-900 text-white transition-all duration-300 ${className}`}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <Image src="/images/google-pay-logo.svg" alt="Google Pay" width={50} height={20} className="object-contain" />
      )}
      {!isLoading && <span className="sr-only">Pagar com Google Pay</span>}
    </Button>
  )
}
