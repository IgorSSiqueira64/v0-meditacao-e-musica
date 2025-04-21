import Link from "next/link"
import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BrainFrequenciesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 relative z-10">
          <div className="mb-8">
            <Link href="/conhecimento">
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Conhecimento
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">Frequências Cerebrais</h1>
          <p className="text-lg text-white mb-12 max-w-3xl">
            As ondas cerebrais são padrões de atividade elétrica produzidos pelo cérebro. Diferentes frequências estão
            associadas a diferentes estados mentais e podem influenciar diretamente nossa cognição, humor e bem-estar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                >
                  <path d="M2 12h20M2 18h20M2 6h20"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Ondas Delta (0.5-4 Hz)</h2>
              <p className="text-white">
                Associadas ao sono profundo e processos de cura. Estas ondas lentas são essenciais para a recuperação
                física e mental, permitindo que o corpo se regenere durante o descanso.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Ondas Theta (4-8 Hz)</h2>
              <p className="text-white">
                Presentes durante o sono leve e meditação profunda. Estas ondas estão ligadas à criatividade, intuição e
                processamento emocional, facilitando insights e conexões subconscientes.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-400"
                >
                  <path d="M4 12h8M4 18h16M4 6h16"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Ondas Alpha (8-13 Hz)</h2>
              <p className="text-white">
                Dominantes durante estados de relaxamento alerta. Estas ondas promovem calma mental, redução do estresse
                e são a ponte entre o pensamento consciente e subconsciente.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400"
                >
                  <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Ondas Beta (13-30 Hz)</h2>
              <p className="text-white">
                Presentes durante o estado de vigília normal e atividade mental. Estas ondas estão associadas ao
                pensamento ativo, foco, resolução de problemas e interações sociais.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-400"
                >
                  <path d="M12 2v20M2 12h20"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Ondas Gamma (30-100 Hz)</h2>
              <p className="text-white">
                As mais rápidas, associadas à cognição de alto nível. Estas ondas estão presentes durante o
                processamento de informações complexas, aprendizado intenso e estados de consciência expandida.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4M12 16h.01"></path>
                </svg>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Importância do Equilíbrio</h2>
              <p className="text-white">
                Um cérebro saudável produz todas estas ondas em equilíbrio. O treinamento cerebral através de áudio pode
                ajudar a regular estes padrões, melhorando diversos aspectos da saúde mental.
              </p>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-medium text-white mb-4">Como as Frequências Afetam Você</h2>
            <p className="text-white mb-6">
              As frequências cerebrais influenciam diretamente seu estado mental, emocional e físico. Através da
              estimulação auditiva, é possível induzir estados específicos que beneficiam diferentes aspectos da sua
              vida:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <path d="M12 20v-6M6 20V10M18 20V4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Desempenho Cognitivo</h3>
                  <p className="text-white">
                    Frequências beta e gamma podem melhorar a concentração, memória e capacidade de resolução de
                    problemas, otimizando seu desempenho em tarefas intelectuais.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Equilíbrio Emocional</h3>
                  <p className="text-white">
                    Frequências alpha e theta ajudam a regular emoções, reduzir ansiedade e promover uma sensação geral
                    de bem-estar e calma interior.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Criatividade</h3>
                  <p className="text-white">
                    Estados theta e alpha facilitam o fluxo criativo, permitindo conexões mentais inovadoras e acesso a
                    insights que normalmente estão abaixo do limiar da consciência.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Recuperação e Regeneração</h3>
                  <p className="text-white">
                    Frequências delta promovem processos de cura e regeneração celular, essenciais para a recuperação
                    física e mental após períodos de estresse ou doença.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-medium text-white mb-4">Experimente o Poder das Frequências</h2>
            <p className="text-white mb-6 max-w-3xl mx-auto">
              Nossas sessões de áudio são cuidadosamente projetadas para induzir estados cerebrais específicos, ajudando
              você a alcançar seus objetivos de bem-estar mental, foco e relaxamento.
            </p>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
            >
              <Link href="/sessoes">Explorar Sessões</Link>
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
