import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft } from "lucide-react"

export default function NeurosciencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-4xl py-16 relative z-10">
          <Link
            href="/conhecimento"
            className="inline-flex items-center text-white hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Conhecimento
          </Link>

          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center text-white mb-6 border border-white/10">
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Neurociência da Meditação</h1>
            <p className="text-lg text-white max-w-2xl">
              Como a meditação regular altera a estrutura e função do cérebro, melhorando a saúde mental e o bem-estar
            </p>
          </div>

          <div className="space-y-12">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-medium text-white mb-6">Alterações Cerebrais</h2>

              <div className="space-y-6">
                <p className="text-white">
                  Estudos de neuroimagem mostram que a meditação regular pode causar mudanças significativas no cérebro:
                </p>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Aumento da Massa Cinzenta</h3>
                    <p className="text-white mb-3">
                      Pesquisadores da Universidade de Harvard descobriram que apenas 8 semanas de meditação mindfulness
                      resultaram em aumento mensurável da densidade de massa cinzenta em áreas cerebrais associadas à
                      memória, empatia, e regulação do estresse.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Estudo: Harvard Medical School, 2011</span>
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Redução da Amígdala</h3>
                    <p className="text-white mb-3">
                      A meditação regular está associada à redução do tamanho da amígdala, o centro de processamento do
                      medo no cérebro. Isso resulta em menor reatividade ao estresse e melhor regulação emocional.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Estudo: Stanford University, 2015</span>
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Fortalecimento do Córtex Pré-frontal</h3>
                    <p className="text-white mb-3">
                      Meditadores de longo prazo mostram maior espessura cortical no córtex pré-frontal, área
                      responsável por funções executivas como tomada de decisão, atenção e autocontrole.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Estudo: UCLA Mindful Awareness Research Center, 2018</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-medium text-white mb-6">Benefícios Cognitivos</h2>

              <div className="space-y-6">
                <p className="text-white">
                  A prática regular de meditação está associada a diversos benefícios cognitivos:
                </p>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Melhora da Atenção</h3>
                    <p className="text-white mb-3">
                      Estudos mostram que apenas 10 minutos diários de meditação podem melhorar significativamente a
                      capacidade de manter a atenção focada e reduzir a divagação mental.
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Aumento da Memória de Trabalho</h3>
                    <p className="text-white mb-3">
                      A meditação regular está associada a melhorias na memória de trabalho, permitindo maior capacidade
                      de processamento de informações e multitarefa eficiente.
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Redução do Declínio Cognitivo</h3>
                    <p className="text-white mb-3">
                      Pesquisas sugerem que a meditação regular pode retardar o declínio cognitivo relacionado à idade e
                      potencialmente reduzir o risco de demência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
            >
              <Link href="/conhecimento">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar para Conhecimento
              </Link>
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
