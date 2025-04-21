"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { GooglePayButton } from "@/components/payment/google-pay-button"
import { Check, Shield, Star, CreditCard, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [errors, setErrors] = useState<{
    cardName?: string
    cardNumber?: string
    cardExpiry?: string
    cardCvc?: string
  }>({})
  const router = useRouter()

  const plans = {
    monthly: {
      name: "Plano Mensal",
      price: 4.9,
      discount: 0,
      period: "mês",
    },
    annual: {
      name: "Plano Anual",
      price: 49.9,
      originalPrice: 58.8,
      discount: 15,
      period: "ano",
    },
  }

  const validateForm = () => {
    const newErrors: {
      cardName?: string
      cardNumber?: string
      cardExpiry?: string
      cardCvc?: string
    } = {}

    if (!cardName) {
      newErrors.cardName = "Nome no cartão é obrigatório"
    }

    if (!cardNumber) {
      newErrors.cardNumber = "Número do cartão é obrigatório"
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Número do cartão inválido"
    }

    if (!cardExpiry) {
      newErrors.cardExpiry = "Data de expiração é obrigatória"
    } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      newErrors.cardExpiry = "Formato inválido (MM/AA)"
    }

    if (!cardCvc) {
      newErrors.cardCvc = "CVC é obrigatório"
    } else if (!/^\d{3,4}$/.test(cardCvc)) {
      newErrors.cardCvc = "CVC inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Atualizar status premium do usuário
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      user.premium = true
      localStorage.setItem("user", JSON.stringify(user))

      toast({
        title: "Pagamento processado com sucesso",
        description: "Sua assinatura premium foi ativada!",
        variant: "default",
      })

      router.push("/assinatura/sucesso")
    } catch (error) {
      console.error("Erro no pagamento:", error)
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar seu pagamento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-4xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-3xl font-medium text-white mb-2">Finalize sua assinatura</h1>
            <p className="text-[#a0a0b0] max-w-xl">
              Você está prestes a desbloquear acesso ilimitado a todas as sessões e recursos premium do Neureon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
              <h2 className="text-xl font-medium text-white mb-6">Detalhes do pagamento</h2>

              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <GooglePayButton
                    amount={selectedPlan === "monthly" ? plans.monthly.price : plans.annual.price}
                    planName={selectedPlan === "monthly" ? plans.monthly.name : plans.annual.name}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Separator className="flex-1 bg-white/10" />
                  <span className="text-xs text-[#a0a0b0]">ou</span>
                  <Separator className="flex-1 bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                      Nome no cartão
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={`w-full px-4 py-2 rounded-full bg-white/5 border ${
                        errors.cardName ? "border-red-500" : "border-white/10"
                      } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                      placeholder="Nome completo"
                      disabled={isLoading}
                    />
                    {errors.cardName && <p className="text-xs text-red-400 mt-1">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                      Número do cartão
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        className={`w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border ${
                          errors.cardNumber ? "border-red-500" : "border-white/10"
                        } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                        placeholder="1234 5678 9012 3456"
                        disabled={isLoading}
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    </div>
                    {errors.cardNumber && <p className="text-xs text-red-400 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                        Data de expiração
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        className={`w-full px-4 py-2 rounded-full bg-white/5 border ${
                          errors.cardExpiry ? "border-red-500" : "border-white/10"
                        } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                        placeholder="MM/AA"
                        disabled={isLoading}
                      />
                      {errors.cardExpiry && <p className="text-xs text-red-400 mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                        maxLength={4}
                        className={`w-full px-4 py-2 rounded-full bg-white/5 border ${
                          errors.cardCvc ? "border-red-500" : "border-white/10"
                        } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                        placeholder="123"
                        disabled={isLoading}
                      />
                      {errors.cardCvc && <p className="text-xs text-red-400 mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Finalizar Assinatura"}
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  onClick={() => setSelectedPlan("monthly")}
                  className={`flex-1 py-2 rounded-full transition-all duration-300 ${
                    selectedPlan === "monthly"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Mensal
                </Button>
                <Button
                  type="button"
                  onClick={() => setSelectedPlan("annual")}
                  className={`flex-1 py-2 rounded-full transition-all duration-300 ${
                    selectedPlan === "annual"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Anual
                </Button>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-b from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-blue-500/30">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {selectedPlan === "monthly" ? plans.monthly.name : plans.annual.name}
                  </h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold text-white">
                      R${selectedPlan === "monthly" ? plans.monthly.price.toFixed(2) : plans.annual.price.toFixed(2)}
                    </span>
                    <span className="text-[#a0a0b0] mb-1">/{selectedPlan === "monthly" ? "mês" : "ano"}</span>
                  </div>

                  {selectedPlan === "annual" && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-[#a0a0b0] line-through">
                        R${plans.annual.originalPrice.toFixed(2)}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                        Economize {plans.annual.discount}%
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-[#a0a0b0]">Renovação automática. Cancele a qualquer momento.</p>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-medium text-white mb-4">O que está incluído:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a0a0b0]">Acesso a todas as sessões premium</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a0a0b0]">Conteúdo exclusivo semanal</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a0a0b0]">Sem anúncios</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a0a0b0]">Cancele a qualquer momento</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 border-t border-blue-500/30 bg-blue-900/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#a0a0b0]">Subtotal</span>
                    <span className="text-sm text-white">
                      R${selectedPlan === "monthly" ? plans.monthly.price.toFixed(2) : plans.annual.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-[#a0a0b0]">Impostos</span>
                    <span className="text-sm text-white">R$0,00</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-white">Total hoje</span>
                    <span className="text-white">
                      R${selectedPlan === "monthly" ? plans.monthly.price.toFixed(2) : plans.annual.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-6 items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Pagamento Seguro</h3>
                <p className="text-xs text-[#a0a0b0]">Suas informações são protegidas com criptografia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Garantia de 30 dias</h3>
                <p className="text-xs text-[#a0a0b0]">Devolução integral se não estiver satisfeito</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="container max-w-5xl">
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
      <Toaster />
    </div>
  )
}
