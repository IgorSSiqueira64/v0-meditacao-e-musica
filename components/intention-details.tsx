"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { intentions } from "./daily-intention/intentions-data"
import type { Intention } from "./daily-intention/types"
import { GlowEffect } from "./glow-effect"
import Image from "next/image"

interface IntentionDetailsProps {
  intentionId?: string
}

export function IntentionDetails({ intentionId }: IntentionDetailsProps) {
  const [selectedIntention, setSelectedIntention] = useState<Intention | null>(null)

  useEffect(() => {
    if (intentionId) {
      const intention = intentions.find((i) => i.id === intentionId)
      if (intention) {
        setSelectedIntention(intention)
      }
    } else if (intentions.length > 0) {
      // Default to first intention if none specified
      setSelectedIntention(intentions[0])
    }
  }, [intentionId])

  if (!selectedIntention) {
    return <div>Carregando detalhes da intenção...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-black/40 border-purple-500/30 backdrop-blur-md">
      <CardHeader className="relative overflow-hidden">
        <GlowEffect className="absolute inset-0 opacity-30" color={selectedIntention.color} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-purple-500/30">
            <Image
              src={selectedIntention.geometryIcon || "/placeholder.svg"}
              alt={selectedIntention.name}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">{selectedIntention.name}</CardTitle>
            <CardDescription className="text-purple-200">{selectedIntention.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="beneficios" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
            <TabsTrigger value="ciencia">Ciência</TabsTrigger>
            <TabsTrigger value="pratica">Prática</TabsTrigger>
            <TabsTrigger value="recursos">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="beneficios" className="text-white space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">Benefícios de {selectedIntention.name}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {selectedIntention.benefits?.map((benefit, index) => <li key={index}>{benefit}</li>) || (
                <>
                  <li>Aumento da clareza mental e foco</li>
                  <li>Redução do estresse e ansiedade</li>
                  <li>Melhoria do bem-estar geral</li>
                  <li>Aumento da produtividade e criatividade</li>
                </>
              )}
            </ul>
          </TabsContent>

          <TabsContent value="ciencia" className="text-white space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">Base Científica</h3>
            <p>
              Estudos mostram que a prática de intenções conscientes como "{selectedIntention.name}" pode influenciar
              positivamente os padrões de ondas cerebrais, especialmente nas frequências alfa e teta, associadas ao
              relaxamento alerta e à criatividade.
            </p>
            <p>
              A neurociência moderna confirma que direcionar a atenção de forma intencional pode criar novos caminhos
              neurais e fortalecer conexões existentes, melhorando a plasticidade cerebral.
            </p>
          </TabsContent>

          <TabsContent value="pratica" className="text-white space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">Como Praticar</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Reserve 5-10 minutos pela manhã para definir sua intenção</li>
              <li>Visualize a geometria sagrada associada à intenção de {selectedIntention.name}</li>
              <li>Respire profundamente enquanto repete mentalmente sua intenção</li>
              <li>Retorne à sua intenção várias vezes ao longo do dia</li>
              <li>Antes de dormir, reflita sobre como a intenção influenciou seu dia</li>
            </ol>
          </TabsContent>

          <TabsContent value="recursos" className="text-white space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">Recursos Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black/30 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Meditações Guiadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Meditações específicas para fortalecer a intenção de {selectedIntention.name}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Áudios Binaurais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Frequências que amplificam os efeitos da intenção</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Leituras Recomendadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Artigos e livros sobre o poder de {selectedIntention.name}</p>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Práticas Diárias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Exercícios para integrar {selectedIntention.name} no cotidiano</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
