import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, ExternalLink } from "lucide-react"

export default function ScientificLiteraturePage() {
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
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-4">Literatura Científica</h1>
            <p className="text-lg text-white max-w-2xl">
              Estudos e pesquisas que fundamentam as técnicas e abordagens utilizadas nas sessões do Neureon
            </p>
          </div>

          <div className="space-y-12">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-medium text-white mb-6">Estudos sobre Meditação e Cognição</h2>

              <div className="space-y-6">
                <p className="text-white">
                  Pesquisas científicas têm demonstrado os efeitos positivos da meditação regular na cognição e no
                  bem-estar mental:
                </p>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Meditação e Plasticidade Cerebral</h3>
                    <p className="text-white mb-3">
                      Um estudo longitudinal de 8 semanas sobre Mindfulness-Based Stress Reduction (MBSR) mostrou
                      aumento significativo na densidade de massa cinzenta em regiões cerebrais associadas à
                      aprendizagem, memória, regulação emocional e perspectiva.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Hölzel et al., 2011 - Psychiatry Research: Neuroimaging</span>
                      <a
                        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3004979/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                      >
                        Ver estudo <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Atenção e Foco</h3>
                    <p className="text-white mb-3">
                      Pesquisadores da Universidade da Califórnia descobriram que apenas 2 semanas de treinamento em
                      meditação (10-20 minutos por dia) melhoraram significativamente a capacidade de concentração e
                      reduziram a divagação mental em tarefas que exigiam atenção sustentada.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Mrazek et al., 2013 - Psychological Science</span>
                      <a
                        href="https://journals.sagepub.com/doi/abs/10.1177/0956797612459659"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                      >
                        Ver estudo <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Redução do Estresse e Ansiedade</h3>
                    <p className="text-white mb-3">
                      Uma meta-análise de 47 estudos com 3.515 participantes encontrou que programas de meditação
                      mindfulness resultaram em melhorias significativas nos níveis de ansiedade, depressão e dor. Os
                      efeitos foram comparáveis aos observados com o uso de antidepressivos, mas sem os efeitos
                      colaterais.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Goyal et al., 2014 - JAMA Internal Medicine</span>
                      <a
                        href="https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                      >
                        Ver estudo <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-medium text-white mb-6">Pesquisas sobre Frequências Sonoras</h2>

              <div className="space-y-6">
                <p className="text-white">
                  Estudos científicos têm investigado como diferentes frequências sonoras podem influenciar o cérebro e
                  estados mentais:
                </p>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Batimentos Binaurais e Estados Mentais</h3>
                    <p className="text-white mb-3">
                      Um estudo controlado mostrou que a exposição a batimentos binaurais na faixa theta (4-8 Hz) por 30
                      minutos resultou em aumento significativo da atividade theta no EEG e melhora no desempenho em
                      tarefas de memória, em comparação com grupos de controle.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Jirakittayakorn & Wongsawat, 2017 - Frontiers in Neuroscience</span>
                      <a
                        href="https://www.frontiersin.org/articles/10.3389/fnins.2017.00365/full"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                      >
                        Ver estudo <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-2">Música e Redução da Ansiedade</h3>
                    <p className="text-white mb-3">
                      Uma revisão sistemática de 400 estudos encontrou evidências consistentes de que a exposição a
                      música em frequências específicas pode reduzir os níveis de cortisol (hormônio do estresse),
                      diminuir a frequência cardíaca e a pressão arterial, e melhorar o humor em diversos contextos
                      clínicos.
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">Fancourt et al., 2014 - Trends in Cognitive Sciences</span>
                      <a
                        href="https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(14)00049-1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                      >
                        Ver estudo <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
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
