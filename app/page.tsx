import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ContentCard } from "@/components/content-card"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1">
        <section className="container max-w-5xl py-24 md:py-32 relative">
          <GlowEffect className="left-1/2 top-1/4" color="rgba(64, 162, 227, 0.4)" />
          <GlowEffect className="right-1/4 bottom-1/4" color="rgba(138, 43, 226, 0.3)" />

          <div className="flex flex-col items-center text-center space-y-8 relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 relative mb-4 animate-pulse-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" priority />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
              Expanda sua mente.
              <br />
              Encontre seu foco.
            </h1>
            <p className="text-lg md:text-xl text-[#a0a0b0] max-w-2xl">
              Áudios de meditação e conteúdos para potencializar sua cognição e bem-estar mental.
            </p>
            <div className="pt-4">
              <Button
                asChild
                className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
              >
                <Link href="/sessoes">
                  Explorar Sessões <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container max-w-6xl py-16">
          <h2 className="text-2xl font-medium text-white mb-8 flex items-center">
            <span className="inline-block w-8 h-[1px] bg-blue-400 mr-3"></span>
            Sessões em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContentCard
              title="Sintonizando o Campo do Foco"
              subtitle="Ativando Acetilcolina"
              duration="11 MIN"
              frequency="963 Hz"
              href="/sessoes/foco"
            />
            <ContentCard
              title="Clareza Mental"
              subtitle="Ondas Alfa"
              duration="15 MIN"
              frequency="432 Hz"
              href="/sessoes/clareza"
            />
            <ContentCard
              title="Relaxamento Profundo"
              subtitle="Delta Waves"
              duration="20 MIN"
              frequency="396 Hz"
              href="/sessoes/relaxamento"
            />
          </div>
        </section>

        <section className="container max-w-5xl py-16 md:py-24">
          <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-[0_0_25px_rgba(66,153,225,0.3)] relative overflow-hidden group hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(66,153,225,0.4)] transition-all duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 blur-sm transform -rotate-12 group-hover:animate-[pulse_4s_ease-in-out_infinite] transition-opacity duration-300"></div>

            <div className="flex-1 space-y-5 relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-2">
                ACESSO EXCLUSIVO
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Neureon Premium
              </h2>
              <p className="text-[#a0a0b0]">
                Desbloqueie todo o potencial do seu cérebro com acesso ilimitado a sessões exclusivas, frequências
                avançadas e recursos personalizados.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  className="rounded-full px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
                >
                  <Link href="/premium">Explorar Planos</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-blue-500/30 text-white hover:bg-white/5 hover:border-blue-500/50 transition-all duration-300"
                >
                  Teste Grátis
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/3 aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-28 md:h-28 relative animate-float">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
                  <div className="absolute inset-2 rounded-full overflow-hidden">
                    <Image src="/images/neureon-logo.png" alt="Neureon Premium" fill className="object-contain" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-sm">
                  <span className="text-blue-300 font-medium">A partir de R$16,58/mês</span>
                </div>
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
