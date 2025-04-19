import Link from "next/link"
import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { GooglePayButton } from "@/components/payment/google-pay-button"
import { Check, Shield, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SubscriptionPage() {
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
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                      Nome no cartão
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="Nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                      Número do cartão
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                        Data de expiração
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Ou pague com</h3>
                  <GooglePayButton amount={29} planName="Plano Mensal" />
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-b from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-blue-500/30">
                <h3 className="text-lg font-medium text-white mb-1">Plano Mensal</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">R$29</span>
                  <span className="text-[#a0a0b0] mb-1">/mês</span>
                </div>
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
                  <span className="text-sm text-white">R$29,00</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#a0a0b0]">Impostos</span>
                  <span className="text-sm text-white">R$0,00</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span className="text-white">Total hoje</span>
                  <span className="text-white">R$29,00</span>
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
    </div>
  )
}
