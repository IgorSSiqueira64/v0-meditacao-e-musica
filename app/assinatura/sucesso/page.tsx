import Link from "next/link"
import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function SubscriptionSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 flex items-center justify-center relative">
        <GlowEffect className="left-1/2 top-1/3" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="right-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <div className="w-full max-w-md mx-auto px-6 py-16 relative z-10">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>

              <h1 className="text-2xl font-medium text-white mb-2">Assinatura Confirmada!</h1>
              <p className="text-[#a0a0b0] mb-8">
                Seu pagamento foi processado com sucesso e sua assinatura está ativa.
              </p>

              <div className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#a0a0b0]">Plano</span>
                  <span className="text-sm font-medium text-white">Neureon Premium Mensal</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#a0a0b0]">Valor</span>
                  <span className="text-sm font-medium text-white">R$29,00/mês</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#a0a0b0]">Próxima cobrança</span>
                  <span className="text-sm font-medium text-white">19 de maio de 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#a0a0b0]">Método de pagamento</span>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/google-pay-logo.svg"
                      alt="Google Pay"
                      width={40}
                      height={16}
                      className="object-contain"
                    />
                    <span className="text-sm font-medium text-white">Google Pay</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full">
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
                >
                  <Link href="/sessoes">Explorar Sessões Premium</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <Link href="/dashboard">Ir para o Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
