import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Shield, Clock, Sparkles } from "lucide-react"

export default function PremiumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 relative">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 md:py-24 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-20 h-20 relative mb-6 animate-pulse-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-4">
              Neureon Premium
            </h1>
            <p className="text-lg md:text-xl text-[#a0a0b0] max-w-2xl">
              Desbloqueie todo o potencial do seu cérebro com acesso ilimitado a sessões exclusivas e recursos
              avançados.
            </p>

            <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-8"></div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Acesso Ilimitado</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Star className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Conteúdo Exclusivo</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Sem Anúncios</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Plano Mensal */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all hover:bg-white/8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(66,153,225,0.2)] group">
              <div className="p-8">
                <h3 className="text-xl font-medium text-white mb-2">Plano Mensal</h3>
                <p className="text-[#a0a0b0] mb-6">Acesso completo com flexibilidade</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">R$29</span>
                  <span className="text-[#a0a0b0] mb-1">/mês</span>
                </div>
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300">
                  Começar Agora
                </Button>
              </div>
              <div className="border-t border-white/10 p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Acesso a todas as sessões premium</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Conteúdo exclusivo semanal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Sem anúncios</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Cancele a qualquer momento</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Plano Anual (Destaque) */}
            <div className="backdrop-blur-md bg-gradient-to-b from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-3xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(66,153,225,0.4)] relative lg:scale-110 lg:-mt-4 lg:-mb-4 z-10">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-center py-1.5">
                <span className="text-xs font-medium flex items-center justify-center">
                  <Sparkles className="h-3 w-3 mr-1" /> MAIS POPULAR
                </span>
              </div>
              <div className="p-8 pt-12">
                <h3 className="text-xl font-medium text-white mb-2">Plano Anual</h3>
                <p className="text-[#a0a0b0] mb-6">Economize 40% com pagamento anual</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">R$199</span>
                  <span className="text-[#a0a0b0] mb-1">/ano</span>
                </div>
                <p className="text-sm text-blue-300 mb-6">Equivalente a R$16,58/mês</p>
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 shadow-[0_0_20px_rgba(66,153,225,0.4)] hover:shadow-[0_0_30px_rgba(66,153,225,0.6)] transition-all duration-300">
                  Obter Melhor Oferta
                </Button>
              </div>
              <div className="border-t border-blue-500/30 p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Tudo do plano mensal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">2 meses grátis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Acesso antecipado a novos recursos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Sessões personalizadas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Suporte prioritário</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Plano Vitalício */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all hover:bg-white/8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(66,153,225,0.2)] group">
              <div className="p-8">
                <h3 className="text-xl font-medium text-white mb-2">Plano Vitalício</h3>
                <p className="text-[#a0a0b0] mb-6">Acesso permanente, pagamento único</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">R$599</span>
                  <span className="text-[#a0a0b0] mb-1">/único</span>
                </div>
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300">
                  Adquirir Vitalício
                </Button>
              </div>
              <div className="border-t border-white/10 p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Acesso vitalício a todo conteúdo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Todas as atualizações futuras</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Sessões exclusivas para membros vitalícios</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a0a0b0]">Suporte VIP</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-medium text-white mb-8 text-center">Por que escolher o Neureon Premium?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Sessões Avançadas</h3>
                <p className="text-[#a0a0b0]">
                  Acesso a sessões de alta potência com frequências específicas para objetivos cognitivos avançados.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Star className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Conteúdo Exclusivo</h3>
                <p className="text-[#a0a0b0]">
                  Novas sessões semanais desenvolvidas por neurocientistas e especialistas em meditação.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Sem Limites</h3>
                <p className="text-[#a0a0b0]">
                  Utilize todas as sessões quantas vezes quiser, sem restrições de tempo ou número de reproduções.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-medium text-white mb-4">Ainda com dúvidas?</h2>
            <p className="text-[#a0a0b0] mb-8 max-w-2xl mx-auto">
              Experimente o Neureon Premium por 7 dias gratuitamente. Cancele a qualquer momento durante o período de
              teste e não será cobrado.
            </p>
            <Button className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300">
              Iniciar Teste Gratuito
            </Button>
          </div>

          <div className="mt-16 flex flex-col md:flex-row gap-8 items-center backdrop-blur-md bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="w-24 h-24 relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-md"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain p-2" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-medium text-white mb-2">Garantia de Satisfação</h3>
              <p className="text-[#a0a0b0]">
                Se você não estiver completamente satisfeito com o Neureon Premium nos primeiros 30 dias, devolveremos
                seu dinheiro integralmente. Sem perguntas, sem complicações.
              </p>
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
