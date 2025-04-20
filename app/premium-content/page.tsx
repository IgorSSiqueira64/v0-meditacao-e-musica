import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { StarField } from "@/components/star-field"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumCategory } from "@/components/premium/premium-category"
import { PremiumSessionCard } from "@/components/premium/premium-session-card"
import { ExpertProfile } from "@/components/premium/expert-profile"
import { PersonalizedProgramCard } from "@/components/premium/personalized-program-card"
import { AnalyticsCard } from "@/components/premium/analytics-card"
import {
  Brain,
  Headphones,
  Users,
  BookOpen,
  BarChart3,
  Download,
  Calendar,
  Sparkles,
  Clock,
  Activity,
  Moon,
  Zap,
  Heart,
  Lightbulb,
} from "lucide-react"

export default function PremiumContentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white overflow-hidden relative">
      <StarField />
      <NavBar />

      <main className="flex-1 relative z-10">
        <GlowEffect className="right-1/4 top-1/4" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="left-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <section className="container max-w-6xl py-16 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-20 h-20 relative mb-6 animate-pulse-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-4">
              Conteúdo Premium
            </h1>
            <p className="text-lg text-[#a0a0b0] max-w-2xl">
              Acesso exclusivo a sessões avançadas, programas personalizados e recursos especiais para potencializar sua
              jornada de desenvolvimento mental.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/5 p-1 rounded-full">
                <TabsTrigger
                  value="overview"
                  className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger
                  value="sessions"
                  className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Sessões Exclusivas
                </TabsTrigger>
                <TabsTrigger
                  value="programs"
                  className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Programas Personalizados
                </TabsTrigger>
                <TabsTrigger
                  value="experts"
                  className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Especialistas
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-full data-[state=active]:bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Análises Avançadas
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PremiumCategory
                  title="Sessões Avançadas"
                  description="Acesso a sessões de alta potência com frequências específicas para objetivos cognitivos avançados."
                  icon={Brain}
                  color="bg-blue-900/30 text-blue-400"
                  href="/premium-content?tab=sessions"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Ondas Gamma</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">
                      Frequências Solfeggio
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Binaural Beats</span>
                  </div>
                </PremiumCategory>

                <PremiumCategory
                  title="Programas Personalizados"
                  description="Programas de desenvolvimento mental adaptados ao seu perfil cognitivo e objetivos específicos."
                  icon={Sparkles}
                  color="bg-purple-900/30 text-purple-400"
                  href="/premium-content?tab=programs"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">21 Dias de Foco</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Resiliência Mental</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Sono Profundo</span>
                  </div>
                </PremiumCategory>

                <PremiumCategory
                  title="Sessões com Especialistas"
                  description="Acesso a sessões ao vivo e gravadas com neurocientistas, psicólogos e especialistas em meditação."
                  icon={Users}
                  color="bg-green-900/30 text-green-400"
                  href="/premium-content?tab=experts"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Masterclasses</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Q&A ao Vivo</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Workshops</span>
                  </div>
                </PremiumCategory>

                <PremiumCategory
                  title="Análises Avançadas"
                  description="Insights detalhados sobre seu progresso, padrões de sono, níveis de foco e bem-estar mental."
                  icon={BarChart3}
                  color="bg-orange-900/30 text-orange-400"
                  href="/premium-content?tab=analytics"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">
                      Relatórios Semanais
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Tendências</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Recomendações</span>
                  </div>
                </PremiumCategory>

                <PremiumCategory
                  title="Biblioteca de Recursos"
                  description="Acesso a e-books, guias de áudio, planilhas de acompanhamento e outros recursos para download."
                  icon={Download}
                  color="bg-red-900/30 text-red-400"
                  href="/recursos"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">E-books</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Áudios Offline</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Planilhas</span>
                  </div>
                </PremiumCategory>

                <PremiumCategory
                  title="Eventos Exclusivos"
                  description="Acesso a retiros virtuais, desafios em grupo e eventos especiais com a comunidade Neureon."
                  icon={Calendar}
                  color="bg-teal-900/30 text-teal-400"
                  href="/eventos"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Retiros Virtuais</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">Desafios em Grupo</span>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-[#a0a0b0]">
                      Meditações Coletivas
                    </span>
                  </div>
                </PremiumCategory>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">Integração com Dispositivos</h2>
                    <p className="text-[#a0a0b0] mb-6">
                      Conecte o Neureon com seus dispositivos de monitoramento para obter insights personalizados
                      baseados em seus dados biométricos. Compatível com diversos wearables e apps de saúde.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Frequência Cardíaca</h3>
                          <p className="text-xs text-[#a0a0b0]">Monitore durante sessões</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Moon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Qualidade do Sono</h3>
                          <p className="text-xs text-[#a0a0b0]">Análise de ciclos de sono</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Activity className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Nível de Estresse</h3>
                          <p className="text-xs text-[#a0a0b0]">Variabilidade cardíaca</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Atividade Física</h3>
                          <p className="text-xs text-[#a0a0b0]">Integração com treinos</p>
                        </div>
                      </div>
                    </div>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                      Conectar Dispositivos
                    </Button>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=200"
                          alt="Integração com dispositivos"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Sessões Premium Exclusivas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PremiumSessionCard
                    title="Expansão da Consciência"
                    instructor="Dr. Maria Silva"
                    category="Ondas Gamma"
                    duration="30 MIN"
                    level="Avançado"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/expansao-consciencia"
                  />
                  <PremiumSessionCard
                    title="Sincronização Hemisférica"
                    instructor="Dr. Carlos Mendes"
                    category="Binaural Beats"
                    duration="45 MIN"
                    level="Intermediário"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/sincronizacao-hemisferica"
                  />
                  <PremiumSessionCard
                    title="Frequência 528Hz - Transformação"
                    instructor="Ana Luz"
                    category="Solfeggio"
                    duration="20 MIN"
                    level="Iniciante"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/frequencia-528hz"
                  />
                  <PremiumSessionCard
                    title="Meditação Theta Profunda"
                    instructor="Pedro Costa"
                    category="Ondas Theta"
                    duration="40 MIN"
                    level="Avançado"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/theta-profunda"
                  />
                  <PremiumSessionCard
                    title="Ativação da Glândula Pineal"
                    instructor="Dra. Luísa Campos"
                    category="Frequências Especiais"
                    duration="35 MIN"
                    level="Avançado"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/ativacao-pineal"
                  />
                  <PremiumSessionCard
                    title="Coerência Cardíaca"
                    instructor="Dr. Roberto Alves"
                    category="Respiração"
                    duration="25 MIN"
                    level="Intermediário"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/coerencia-cardiaca"
                  />
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Sessões Guiadas Avançadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PremiumSessionCard
                    title="Visualização Quântica"
                    instructor="Dra. Helena Quantum"
                    category="Visualização"
                    duration="50 MIN"
                    level="Avançado"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/visualizacao-quantica"
                  />
                  <PremiumSessionCard
                    title="Reprogramação do Subconsciente"
                    instructor="Dr. Marcos Jung"
                    category="Hipnose"
                    duration="45 MIN"
                    level="Avançado"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/reprogramacao-subconsciente"
                  />
                  <PremiumSessionCard
                    title="Meditação Holotropica"
                    instructor="Sofia Grof"
                    category="Respiração"
                    duration="60 MIN"
                    level="Avançado"
                    coverUrl="/placeholder.svg?height=200&width=360"
                    href="/sessoes/meditacao-holotropica"
                  />
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-medium text-white mb-4">Sessões Personalizadas por IA</h2>
                    <p className="text-[#a0a0b0] mb-6">
                      Nossa tecnologia de IA analisa seu perfil cognitivo, histórico de sessões e feedback para criar
                      experiências de meditação totalmente personalizadas para suas necessidades específicas.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Lightbulb className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Adaptação Contínua</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            As sessões evoluem com você, ajustando-se ao seu progresso e necessidades em tempo real.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Brain className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Frequências Otimizadas</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Combinações precisas de frequências sonoras calibradas para seu perfil neurológico único.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Headphones className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Áudio 8D Imersivo</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Tecnologia de áudio espacial que cria uma experiência sonora tridimensional profunda.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                      Criar Minha Sessão Personalizada
                    </Button>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=200"
                          alt="IA Personalizada"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Programas Personalizados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PersonalizedProgramCard
                    title="21 Dias de Foco Intenso"
                    description="Um programa completo para desenvolver foco sustentado e concentração profunda através de práticas diárias progressivas."
                    duration="21 dias"
                    sessionsTotal={21}
                    sessionsCompleted={7}
                    coverUrl="/placeholder.svg?height=160&width=400"
                    href="/programas/foco-intenso"
                  />
                  <PersonalizedProgramCard
                    title="Resiliência Mental"
                    description="Desenvolva uma mente inabalável com técnicas inspiradas em David Goggins e outras práticas de fortalecimento mental."
                    duration="30 dias"
                    sessionsTotal={30}
                    sessionsCompleted={12}
                    coverUrl="/placeholder.svg?height=160&width=400"
                    href="/programas/resiliencia-mental"
                  />
                  <PersonalizedProgramCard
                    title="Sono Profundo e Recuperador"
                    description="Otimize seu sono com técnicas avançadas de relaxamento, frequências delta e práticas para melhorar a qualidade do descanso."
                    duration="14 dias"
                    sessionsTotal={14}
                    sessionsCompleted={3}
                    coverUrl="/placeholder.svg?height=160&width=400"
                    href="/programas/sono-profundo"
                  />
                  <PersonalizedProgramCard
                    title="Criatividade Expandida"
                    description="Desbloqueie seu potencial criativo com práticas que estimulam a conexão entre os hemisférios cerebrais e o pensamento divergente."
                    duration="28 dias"
                    sessionsTotal={28}
                    sessionsCompleted={0}
                    coverUrl="/placeholder.svg?height=160&width=400"
                    href="/programas/criatividade-expandida"
                  />
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Programas Intensivos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PersonalizedProgramCard
                    title="Transformação Cognitiva"
                    description="Um programa intensivo de 60 dias que combina múltiplas técnicas para uma completa transformação da sua capacidade mental."
                    duration="60 dias"
                    sessionsTotal={60}
                    sessionsCompleted={0}
                    coverUrl="/placeholder.svg?height=160&width=400"
                    href="/programas/transformacao-cognitiva"
                  />
                  <PersonalizedProgramCard
                    title="Maestria da Atenção"
                    description="Desenvolva controle absoluto sobre sua atenção com técnicas avançadas de meditação e práticas de foco."
                    duration="45 dias"
                    sessionsTotal={45}
                    sessionsCompleted={0}
                    coverUrl="/placeholder.svg?height=160&width=400"
                    href="/programas/maestria-atencao"
                  />
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-medium text-white mb-4">Crie Seu Programa Personalizado</h2>
                    <p className="text-[#a0a0b0] mb-6">
                      Trabalhe com nossa equipe de especialistas para criar um programa totalmente personalizado baseado
                      em seus objetivos específicos, desafios e estilo de vida.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Users className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Consulta Personalizada</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Sessão individual com um especialista para avaliar suas necessidades e objetivos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <BookOpen className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Plano Detalhado</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Receba um programa estruturado com sessões, práticas e recursos personalizados.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Clock className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Acompanhamento Contínuo</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Ajustes e orientações ao longo do programa para maximizar seus resultados.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                      Agendar Consulta
                    </Button>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=200"
                          alt="Programa Personalizado"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experts" className="space-y-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Nossos Especialistas</h2>
                <div className="grid grid-cols-1 gap-6">
                  <ExpertProfile
                    name="Dra. Maria Silva"
                    title="Neurocientista e Especialista em Meditação"
                    bio="Doutora em Neurociência Cognitiva com mais de 15 anos de experiência em pesquisa sobre os efeitos da meditação no cérebro. Desenvolveu protocolos inovadores de meditação baseados em evidências científicas."
                    imageUrl="/placeholder.svg?height=128&width=128"
                    specialties={["Neuroplasticidade", "Meditação Mindfulness", "Ondas Cerebrais", "Cognição"]}
                    upcomingSession={{
                      title: "Neurociência da Meditação Profunda",
                      date: "25 de Maio, 2025",
                      time: "19:00 - 20:30",
                    }}
                  />
                  <ExpertProfile
                    name="Dr. Carlos Mendes"
                    title="Psicólogo e Especialista em Binaural Beats"
                    bio="Pioneiro na aplicação de tecnologia de áudio binaural para estados alterados de consciência. Combina psicologia clínica com técnicas avançadas de som para criar experiências transformadoras."
                    imageUrl="/placeholder.svg?height=128&width=128"
                    specialties={["Binaural Beats", "Estados Alterados", "Psicologia Transpessoal", "Áudio 8D"]}
                    upcomingSession={{
                      title: "Sincronização Hemisférica Avançada",
                      date: "28 de Maio, 2025",
                      time: "20:00 - 21:30",
                    }}
                  />
                  <ExpertProfile
                    name="Ana Luz"
                    title="Terapeuta de Som e Especialista em Frequências Solfeggio"
                    bio="Dedicou mais de uma década ao estudo das frequências Solfeggio e seus efeitos terapêuticos. Desenvolveu metodologias únicas que combinam estas frequências antigas com técnicas modernas de meditação."
                    imageUrl="/placeholder.svg?height=128&width=128"
                    specialties={[
                      "Frequências Solfeggio",
                      "Terapia Sonora",
                      "Harmonização Energética",
                      "Cura Vibracional",
                    ]}
                  />
                  <ExpertProfile
                    name="Dr. Roberto Alves"
                    title="Médico e Pesquisador em Coerência Cardíaca"
                    bio="Médico com especialização em medicina integrativa e pesquisador dos efeitos da coerência cardíaca na saúde mental e física. Desenvolveu protocolos que integram respiração, frequência cardíaca e estados mentais."
                    imageUrl="/placeholder.svg?height=128&width=128"
                    specialties={["Coerência Cardíaca", "Medicina Integrativa", "Biofeedback", "Neurociência Aplicada"]}
                    upcomingSession={{
                      title: "Masterclass: Coerência Cardíaca e Resiliência",
                      date: "2 de Junho, 2025",
                      time: "18:00 - 19:30",
                    }}
                  />
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Próximos Eventos ao Vivo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="Workshop de Meditação Avançada"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Workshop de Meditação Avançada</h3>
                        <p className="text-sm text-[#a0a0b0] mb-3">Com Dra. Maria Silva e Dr. Carlos Mendes</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-[#a0a0b0]">30 de Maio, 2025 • 19:00 - 21:00</span>
                        </div>
                        <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-xs h-8 px-4">
                          Reservar Vaga
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="Sessão Q&A: Neurociência da Meditação"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Sessão Q&A: Neurociência da Meditação</h3>
                        <p className="text-sm text-[#a0a0b0] mb-3">Com Dra. Maria Silva</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-[#a0a0b0]">5 de Junho, 2025 • 20:00 - 21:00</span>
                        </div>
                        <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-xs h-8 px-4">
                          Reservar Vaga
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="Masterclass: Frequências Solfeggio"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Masterclass: Frequências Solfeggio</h3>
                        <p className="text-sm text-[#a0a0b0] mb-3">Com Ana Luz</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-[#a0a0b0]">12 de Junho, 2025 • 19:00 - 20:30</span>
                        </div>
                        <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-xs h-8 px-4">
                          Reservar Vaga
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt="Retiro Virtual: Imersão em Mindfulness"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Retiro Virtual: Imersão em Mindfulness</h3>
                        <p className="text-sm text-[#a0a0b0] mb-3">Com todos os especialistas</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-[#a0a0b0]">19-20 de Junho, 2025 • Fim de semana</span>
                        </div>
                        <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-xs h-8 px-4">
                          Saiba Mais
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Análises Avançadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <AnalyticsCard
                    title="Tempo Total de Meditação"
                    value="42h 30m"
                    change={{ value: "15%", positive: true }}
                    icon={Clock}
                    color="bg-blue-900/30 text-blue-400"
                  >
                    <div className="mt-2 h-10 bg-white/5 rounded-md overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-blue-500/20 to-blue-500/40"></div>
                    </div>
                  </AnalyticsCard>
                  <AnalyticsCard
                    title="Nível de Foco"
                    value="78/100"
                    change={{ value: "8%", positive: true }}
                    icon={Lightbulb}
                    color="bg-yellow-900/30 text-yellow-400"
                  >
                    <div className="mt-2 h-10 bg-white/5 rounded-md overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-yellow-500/20 to-yellow-500/40"></div>
                    </div>
                  </AnalyticsCard>
                  <AnalyticsCard
                    title="Qualidade do Sono"
                    value="85/100"
                    change={{ value: "12%", positive: true }}
                    icon={Moon}
                    color="bg-purple-900/30 text-purple-400"
                  >
                    <div className="mt-2 h-10 bg-white/5 rounded-md overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-purple-500/20 to-purple-500/40"></div>
                    </div>
                  </AnalyticsCard>
                  <AnalyticsCard
                    title="Nível de Estresse"
                    value="32/100"
                    change={{ value: "18%", positive: false }}
                    icon={Activity}
                    color="bg-green-900/30 text-green-400"
                  >
                    <div className="mt-2 h-10 bg-white/5 rounded-md overflow-hidden">
                      <div className="h-full w-1/3 bg-gradient-to-r from-green-500/20 to-green-500/40"></div>
                    </div>
                  </AnalyticsCard>
                </div>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Progresso Semanal</h3>
                  <div className="h-64 bg-white/5 rounded-lg p-4 flex items-end justify-between">
                    {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md"
                          style={{ height: `${Math.random() * 150 + 20}px` }}
                        ></div>
                        <span className="text-xs text-[#a0a0b0] mt-2">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Sessões Mais Eficazes</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">Foco Intenso</h4>
                            <p className="text-xs text-[#a0a0b0]">963 Hz</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-white">92%</span>
                          <p className="text-xs text-[#a0a0b0]">eficácia</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Moon className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">Sono Profundo</h4>
                            <p className="text-xs text-[#a0a0b0]">Delta Waves</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-white">87%</span>
                          <p className="text-xs text-[#a0a0b0]">eficácia</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Heart className="h-5 w-5 text-red-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">Coerência Cardíaca</h4>
                            <p className="text-xs text-[#a0a0b0]">Respiração</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-white">85%</span>
                          <p className="text-xs text-[#a0a0b0]">eficácia</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Recomendações Personalizadas</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Lightbulb className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Aumente sessões matinais</h4>
                          <p className="text-xs text-[#a0a0b0]">
                            Seus dados mostram 30% mais foco após sessões realizadas pela manhã.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Brain className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Experimente frequência 528Hz</h4>
                          <p className="text-xs text-[#a0a0b0]">
                            Baseado no seu perfil, esta frequência pode melhorar sua criatividade.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Moon className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Melhore seu sono</h4>
                          <p className="text-xs text-[#a0a0b0]">
                            Tente a sessão "Sono Delta Profundo" 30 minutos antes de dormir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-medium text-white mb-4">Relatórios Detalhados</h2>
                    <p className="text-[#a0a0b0] mb-6">
                      Receba relatórios semanais e mensais detalhados sobre seu progresso, padrões de meditação,
                      qualidade do sono e muito mais. Insights baseados em dados para otimizar sua jornada.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <BarChart3 className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Análise de Tendências</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Visualize seu progresso ao longo do tempo e identifique padrões importantes.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Download className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Exportação de Dados</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Exporte seus dados para PDF ou CSV para análises personalizadas.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                          <Calendar className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Comparações Mensais</h3>
                          <p className="text-xs text-[#a0a0b0]">
                            Compare seu desempenho mês a mês para acompanhar sua evolução.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                      Ver Meu Relatório
                    </Button>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=200"
                          alt="Relatórios Detalhados"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-medium text-white mb-4">Pronto para Elevar sua Experiência?</h2>
            <p className="text-[#a0a0b0] max-w-2xl mx-auto mb-6">
              Desbloqueie todo o potencial do Neureon com acesso ilimitado a conteúdo premium, sessões exclusivas,
              programas personalizados e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="rounded-full px-8 py-6 h-auto text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
              >
                <Link href="/premium">Ver Planos Premium</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 py-6 h-auto text-base border-white/10 hover:bg-white/5 hover:border-white/20"
              >
                <Link href="/sessoes">Explorar Sessões Gratuitas</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 relative z-10">
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
