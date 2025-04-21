import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Atom, ArrowLeft } from "lucide-react"

export default function NeurotransmittersPage() {
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
              <Atom className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Neurotransmissores e Cognição</h1>
            <p className="text-lg text-white max-w-2xl">
              Como os mensageiros químicos do cérebro influenciam nossos estados mentais e capacidades cognitivas
            </p>
          </div>

          <div className="space-y-12">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-medium text-white mb-6">Principais Neurotransmissores</h2>

              <div className="space-y-6">
                <p className="text-white">
                  Neurotransmissores são substâncias químicas que transmitem sinais entre neurônios. Cada um tem funções
                  específicas no cérebro:
                </p>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Dopamina</h3>
                    <p className="text-white mb-3">
                      Conhecida como o neurotransmissor da recompensa e motivação. Está envolvida na sensação de prazer,
                      formação de hábitos, foco e atenção. Níveis adequados de dopamina são essenciais para manter a
                      motivação e o interesse em atividades.
                    </p>
                    <p className="text-white mb-3">
                      <strong>Intenções relacionadas:</strong> Foco, Energia, Inspiração
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Serotonina</h3>
                    <p className="text-white mb-3">
                      Regula o humor, sono, apetite e digestão. Níveis adequados de serotonina estão associados a
                      sensações de bem-estar, calma e satisfação. A meditação regular pode aumentar os níveis de
                      serotonina no cérebro.
                    </p>
                    <p className="text-white mb-3">
                      <strong>Intenções relacionadas:</strong> Paz, Gratidão, Relaxamento
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">GABA</h3>
                    <p className="text-white mb-3">
                      Principal neurotransmissor inibitório do cérebro, responsável por reduzir a excitabilidade neural
                      e promover o relaxamento. Baixos níveis de GABA estão associados à ansiedade e insônia.
                    </p>
                    <p className="text-white mb-3">
                      <strong>Intenções relacionadas:</strong> Relaxamento, Paz, Cura
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Acetilcolina</h3>
                    <p className="text-white mb-3">
                      Crucial para aprendizado, memória e funções cognitivas. Também está envolvida na regulação do sono
                      REM e na formação de memórias durante o sono.
                    </p>
                    <p className="text-white mb-3">
                      <strong>Intenções relacionadas:</strong> Clareza, Foco, Intuição
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-medium text-white mb-6">Intenções e Neuroquímica</h2>

              <div className="space-y-6">
                <p className="text-white">
                  Nossas intenções e práticas mentais podem influenciar diretamente a produção e o equilíbrio de
                  neurotransmissores:
                </p>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Meditação e Serotonina</h3>
                    <p className="text-white mb-3">
                      Estudos mostram que a prática regular de meditação pode aumentar os níveis de serotonina,
                      melhorando o humor e reduzindo sintomas de depressão e ansiedade.
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Gratidão e Dopamina</h3>
                    <p className="text-white mb-3">
                      Práticas de gratidão ativam o sistema de recompensa do cérebro, liberando dopamina e criando um
                      ciclo positivo de bem-estar e motivação.
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Respiração Profunda e GABA</h3>
                    <p className="text-white mb-3">
                      Técnicas de respiração lenta e profunda ativam o sistema nervoso parassimpático, aumentando a
                      produção de GABA e induzindo estados de relaxamento profundo.
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
