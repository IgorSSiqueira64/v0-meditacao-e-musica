import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-5xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-20 h-20 relative mb-6 animate-pulse-slow">
              <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Sobre o Neureon</h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              Uma plataforma inovadora que combina neurociência, tecnologia e práticas contemplativas para potencializar
              o cérebro humano.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-medium text-white mb-4 flex items-center">
                  <span className="inline-block w-8 h-[1px] bg-blue-400 mr-3"></span>
                  Nossa Visão
                </h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  O Neureon nasceu da visão de criar uma ponte entre a ciência moderna e práticas ancestrais de
                  desenvolvimento mental. Acreditamos que cada pessoa tem um potencial cognitivo inexplorado que pode
                  ser acessado através de técnicas específicas e fundamentadas cientificamente.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-white mb-4 flex items-center">
                  <span className="inline-block w-8 h-[1px] bg-blue-400 mr-3"></span>
                  Abordagem Científica
                </h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  Todas as sessões e conteúdos do Neureon são desenvolvidos com base em pesquisas científicas rigorosas
                  nas áreas de neurociência, psicologia cognitiva e neuroacústica. Trabalhamos em colaboração com
                  pesquisadores e especialistas para garantir que nossas técnicas sejam eficazes e seguras.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-medium text-white mb-4 flex items-center">
                  <span className="inline-block w-8 h-[1px] bg-blue-400 mr-3"></span>
                  Tecnologia de Ponta
                </h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  Utilizamos algoritmos avançados para criar padrões sonoros precisamente calibrados que podem
                  influenciar positivamente as ondas cerebrais. Nossa plataforma adapta-se continuamente às necessidades
                  individuais de cada usuário, oferecendo uma experiência personalizada para maximizar os benefícios.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                50+
              </div>
              <p className="text-[#a0a0b0]">Sessões de áudio especializadas</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                15+
              </div>
              <p className="text-[#a0a0b0]">Especialistas e pesquisadores</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                30k+
              </div>
              <p className="text-[#a0a0b0]">Usuários ativos mensais</p>
            </div>
          </div>

          <div className="text-center">
            <Button className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300">
              Conheça Nossa Equipe
            </Button>
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
              <a href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Termos
              </a>
              <a href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Suporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
