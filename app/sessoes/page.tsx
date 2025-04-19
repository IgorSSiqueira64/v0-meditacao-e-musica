import Link from "next/link"
import Image from "next/image"
import { ContentCard } from "@/components/content-card"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"

export default function SessionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 relative z-10">
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-2">Todas as Sessões</h1>
          <p className="text-[#a0a0b0] mb-12 max-w-2xl">
            Explore nossa biblioteca de sessões de áudio projetadas para melhorar seu foco, relaxamento e bem-estar
            mental.
          </p>

          <div className="space-y-16">
            <div>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                <span className="inline-block w-8 h-[1px] bg-blue-400 mr-3"></span>
                Foco e Concentração
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
                  title="Concentração Profunda"
                  subtitle="Gamma Waves"
                  duration="18 MIN"
                  frequency="528 Hz"
                  href="/sessoes/concentracao"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                <span className="inline-block w-8 h-[1px] bg-blue-400 mr-3"></span>
                Relaxamento
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContentCard
                  title="Relaxamento Profundo"
                  subtitle="Delta Waves"
                  duration="20 MIN"
                  frequency="396 Hz"
                  href="/sessoes/relaxamento"
                />
                <ContentCard
                  title="Alívio do Estresse"
                  subtitle="Theta Waves"
                  duration="25 MIN"
                  frequency="417 Hz"
                  href="/sessoes/estresse"
                />
                <ContentCard
                  title="Sono Reparador"
                  subtitle="Delta Profundo"
                  duration="30 MIN"
                  frequency="285 Hz"
                  href="/sessoes/sono"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-8">
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
