import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { StarField } from "@/components/star-field"
import { PremiumLock } from "@/components/premium/premium-lock"

export default function MentalChallengePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
      <StarField />
      <NavBar />

      <main className="flex-1 relative z-10">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-4xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-4">
              Desafio Mental
            </h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              Fortaleça sua mente através de práticas inspiradas na filosofia de David Goggins.
            </p>
          </div>

          <PremiumLock
            title="Recurso Premium Exclusivo"
            description="O Desafio Mental é um recurso exclusivo para assinantes premium. Desbloqueie para fortalecer sua mente com desafios avançados que testam seus limites e desenvolvem uma mentalidade inabalável."
          />

          <div className="mt-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-medium text-white mb-4">Por que assinar o Premium?</h2>
            <p className="text-[#a0a0b0] max-w-2xl mx-auto mb-6">
              Além do Desafio Mental, você terá acesso a recursos exclusivos como Frequências para Pensamentos, Modo
              Guerreiro, sessões avançadas e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
              >
                <Link href="/premium">Ver Planos Premium</Link>
              </Button>
              <Button
                asChild
                className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
              >
                <Link href="/">Voltar para Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 relative z-10">
        <div className="container max-w-6xl">
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
