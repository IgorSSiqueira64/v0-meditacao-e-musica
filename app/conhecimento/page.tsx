import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Brain, Lightbulb, BookOpen, Atom } from "lucide-react"

export default function KnowledgePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Base de Conhecimento</h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              Explore os fundamentos científicos e conceitos por trás das técnicas de meditação e frequências sonoras
              utilizadas no Neureon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                <Brain className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-medium text-white mb-3">Neurociência da Meditação</h2>
              <p className="text-[#a0a0b0] mb-6">
                A meditação regular pode alterar a estrutura e função do cérebro através da neuroplasticidade,
                melhorando a atenção, memória e regulação emocional.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Aumento da espessura cortical em regiões associadas à atenção</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Redução da atividade da amígdala em resposta ao estresse</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Melhoria na conectividade das redes neurais de atenção</span>
                </li>
              </ul>
              <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0">Saiba Mais</Button>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-medium text-white mb-3">Frequências Sonoras e o Cérebro</h2>
              <p className="text-[#a0a0b0] mb-6">
                As frequências sonoras específicas podem influenciar as ondas cerebrais através do processo de
                entrainment, ajudando a induzir estados mentais específicos.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Ondas Alfa (8-12 Hz): Estado relaxado e alerta</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Ondas Theta (4-8 Hz): Meditação profunda e criatividade</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Ondas Delta (0.5-4 Hz): Sono profundo e recuperação</span>
                </li>
              </ul>
              <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0">
                Explorar Frequências
              </Button>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-medium text-white mb-3">Literatura Científica</h2>
              <p className="text-[#a0a0b0] mb-6">
                Estudos e pesquisas que fundamentam as técnicas e abordagens utilizadas nas sessões do Neureon.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Efeitos da meditação na cognição e atenção</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Impacto das frequências sonoras no estado mental</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Neuroplasticidade e práticas contemplativas</span>
                </li>
              </ul>
              <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0">Ver Estudos</Button>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mb-6">
                <Atom className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-medium text-white mb-3">Neurotransmissores e Cognição</h2>
              <p className="text-[#a0a0b0] mb-6">
                Como os neurotransmissores como a acetilcolina, dopamina e serotonina afetam nossos estados mentais e
                capacidades cognitivas.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Acetilcolina: Atenção, aprendizado e memória</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Dopamina: Motivação, recompensa e foco</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1 h-1 rounded-full bg-blue-400 mt-2 mr-2"></span>
                  <span className="text-[#a0a0b0]">Serotonina: Humor, bem-estar e regulação do sono</span>
                </li>
              </ul>
              <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0">Aprofundar</Button>
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
