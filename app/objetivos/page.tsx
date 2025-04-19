import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Target, Brain, Zap, Shield, Clock } from "lucide-react"

export default function ObjectivesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-5xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
              <Target className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Nossos Objetivos</h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              O Neureon foi criado com propósitos claros e ambiciosos para transformar a maneira como as pessoas
              utilizam seu potencial mental.
            </p>
          </div>

          <div className="space-y-12">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white">
                <Brain className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-white mb-4">Potencializar a Cognição Humana</h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  Nosso objetivo principal é ajudar as pessoas a acessarem e desenvolverem seu pleno potencial
                  cognitivo. Através de técnicas específicas de meditação e estímulos sonoros, buscamos melhorar funções
                  como atenção, memória, criatividade e resolução de problemas.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white">
                <Zap className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-white mb-4">Democratizar o Acesso à Neurociência</h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  Queremos tornar as descobertas mais recentes da neurociência acessíveis a todos. Traduzimos pesquisas
                  complexas em aplicações práticas que qualquer pessoa pode utilizar para melhorar sua vida cotidiana,
                  independentemente de sua formação ou conhecimento prévio.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white">
                <Shield className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-white mb-4">Promover o Bem-estar Mental</h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  Além do desempenho cognitivo, buscamos contribuir para o bem-estar mental geral. Nossas sessões são
                  projetadas para reduzir o estresse, melhorar a qualidade do sono e promover um estado de equilíbrio
                  emocional, essencial para uma vida plena e saudável.
                </p>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0 flex items-center justify-center text-white">
                <Clock className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-2xl font-medium text-white mb-4">Otimizar o Tempo de Prática</h2>
                <p className="text-[#a0a0b0] leading-relaxed">
                  Reconhecemos que o tempo é um recurso valioso. Por isso, desenvolvemos sessões altamente eficientes
                  que proporcionam benefícios significativos em períodos relativamente curtos, permitindo que as pessoas
                  integrem facilmente a prática em suas rotinas diárias.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#a0a0b0] mb-6 max-w-2xl mx-auto">
              Estamos comprometidos com esses objetivos e trabalhamos continuamente para aprimorar nossas técnicas e
              expandir nosso impacto positivo.
            </p>
            <Button className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300">
              Comece Sua Jornada
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
