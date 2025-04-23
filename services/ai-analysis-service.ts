// Tipos para o serviço de análise de IA
export interface EmotionalAnalysis {
  primaryEmotion: string
  secondaryEmotion?: string
  intensity: number // 1-10
  sentiment: "positive" | "neutral" | "negative"
  riskLevel: "none" | "low" | "medium" | "high"
  needsProfessionalHelp: boolean
}

export interface AIRecommendation {
  sessionId: string
  confidence: number // 0-1
  reason: string
}

// Função para analisar o texto e extrair informações emocionais
export function analyzeEmotion(text: string): EmotionalAnalysis {
  // Palavras-chave para emoções
  const emotionKeywords = {
    feliz: { emotion: "felicidade", sentiment: "positive", intensity: 7 },
    alegre: { emotion: "alegria", sentiment: "positive", intensity: 8 },
    contente: { emotion: "contentamento", sentiment: "positive", intensity: 6 },
    animado: { emotion: "animação", sentiment: "positive", intensity: 8 },
    triste: { emotion: "tristeza", sentiment: "negative", intensity: 7 },
    deprimido: { emotion: "depressão", sentiment: "negative", intensity: 9 },
    melancólico: { emotion: "melancolia", sentiment: "negative", intensity: 6 },
    ansioso: { emotion: "ansiedade", sentiment: "negative", intensity: 7 },
    preocupado: { emotion: "preocupação", sentiment: "negative", intensity: 6 },
    estressado: { emotion: "estresse", sentiment: "negative", intensity: 8 },
    calmo: { emotion: "calma", sentiment: "positive", intensity: 5 },
    tranquilo: { emotion: "tranquilidade", sentiment: "positive", intensity: 6 },
    sereno: { emotion: "serenidade", sentiment: "positive", intensity: 7 },
    irritado: { emotion: "irritação", sentiment: "negative", intensity: 7 },
    bravo: { emotion: "raiva", sentiment: "negative", intensity: 8 },
    furioso: { emotion: "fúria", sentiment: "negative", intensity: 9 },
    cansado: { emotion: "cansaço", sentiment: "negative", intensity: 6 },
    exausto: { emotion: "exaustão", sentiment: "negative", intensity: 8 },
    energizado: { emotion: "energia", sentiment: "positive", intensity: 8 },
    motivado: { emotion: "motivação", sentiment: "positive", intensity: 8 },
    inspirado: { emotion: "inspiração", sentiment: "positive", intensity: 9 },
    confuso: { emotion: "confusão", sentiment: "negative", intensity: 5 },
    perdido: { emotion: "desorientação", sentiment: "negative", intensity: 7 },
    focado: { emotion: "foco", sentiment: "positive", intensity: 7 },
    concentrado: { emotion: "concentração", sentiment: "positive", intensity: 8 },
    distraído: { emotion: "distração", sentiment: "negative", intensity: 6 },
    entediado: { emotion: "tédio", sentiment: "negative", intensity: 5 },
    esperançoso: { emotion: "esperança", sentiment: "positive", intensity: 7 },
    grato: { emotion: "gratidão", sentiment: "positive", intensity: 8 },
    amoroso: { emotion: "amor", sentiment: "positive", intensity: 9 },
    solitário: { emotion: "solidão", sentiment: "negative", intensity: 7 },
    vazio: { emotion: "vazio", sentiment: "negative", intensity: 8 },
    desesperado: { emotion: "desespero", sentiment: "negative", intensity: 9 },
    suicida: { emotion: "suicídio", sentiment: "negative", intensity: 10 },
    morrer: { emotion: "suicídio", sentiment: "negative", intensity: 10 },
    matar: { emotion: "violência", sentiment: "negative", intensity: 10 },
  }

  // Palavras-chave de alto risco que indicam necessidade de ajuda profissional
  const highRiskKeywords = [
    "suicida",
    "suicídio",
    "matar",
    "morrer",
    "acabar com tudo",
    "sem saída",
    "sem esperança",
    "não aguento mais",
    "desistir da vida",
  ]

  // Normalizar o texto para análise
  const normalizedText = text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")

  const words = normalizedText.split(" ")

  // Detectar emoções no texto
  const detectedEmotions: { emotion: string; sentiment: "positive" | "neutral" | "negative"; intensity: number }[] = []

  words.forEach((word) => {
    const matchedKeywords = Object.keys(emotionKeywords).filter(
      (keyword) => word.includes(keyword) || keyword.includes(word),
    )

    matchedKeywords.forEach((keyword) => {
      const emotionInfo = emotionKeywords[keyword as keyof typeof emotionKeywords]
      detectedEmotions.push({
        emotion: emotionInfo.emotion,
        sentiment: emotionInfo.sentiment as "positive" | "neutral" | "negative",
        intensity: emotionInfo.intensity,
      })
    })
  })

  // Se não detectou emoções específicas, definir como neutro
  if (detectedEmotions.length === 0) {
    detectedEmotions.push({
      emotion: "neutro",
      sentiment: "neutral",
      intensity: 5,
    })
  }

  // Ordenar emoções por intensidade
  detectedEmotions.sort((a, b) => b.intensity - a.intensity)

  // Verificar nível de risco
  let riskLevel: "none" | "low" | "medium" | "high" = "none"
  let needsProfessionalHelp = false

  // Verificar palavras de alto risco
  const containsHighRiskWords = highRiskKeywords.some((keyword) => normalizedText.includes(keyword))

  if (containsHighRiskWords) {
    riskLevel = "high"
    needsProfessionalHelp = true
  } else if (detectedEmotions[0]?.sentiment === "negative" && detectedEmotions[0]?.intensity >= 8) {
    riskLevel = "medium"
    needsProfessionalHelp = detectedEmotions[0]?.intensity >= 9
  } else if (detectedEmotions[0]?.sentiment === "negative" && detectedEmotions[0]?.intensity >= 6) {
    riskLevel = "low"
  }

  return {
    primaryEmotion: detectedEmotions[0]?.emotion || "neutro",
    secondaryEmotion: detectedEmotions[1]?.emotion,
    intensity: detectedEmotions[0]?.intensity || 5,
    sentiment: detectedEmotions[0]?.sentiment || "neutral",
    riskLevel,
    needsProfessionalHelp,
  }
}

// Função para recomendar sessões com base na análise emocional e intenção
export function getRecommendations(analysis: EmotionalAnalysis, intentionId: string): AIRecommendation[] {
  // Mapeamento de emoções para sessões recomendadas
  const emotionToSessionMap: Record<string, string[]> = {
    // Emoções positivas
    felicidade: ["energia-vital", "criatividade-expandida"],
    alegria: ["energia-vital", "criatividade-expandida"],
    contentamento: ["silencio-interior", "relaxamento"],
    animação: ["energia-vital", "criatividade-expandida"],
    calma: ["silencio-interior", "sono-reparador"],
    tranquilidade: ["silencio-interior", "sono-reparador"],
    serenidade: ["silencio-interior", "relaxamento"],
    energia: ["energia-vital", "foco"],
    motivação: ["foco", "criatividade-expandida"],
    inspiração: ["criatividade-expandida", "chave-alma"],
    foco: ["foco", "clareza"],
    concentração: ["foco", "clareza"],
    esperança: ["reconexao-proposito", "chave-alma"],
    gratidão: ["silencio-interior", "cura-interior"],
    amor: ["cura-interior", "purificacao-emocional"],

    // Emoções negativas
    tristeza: ["cura-interior", "silencio-interior"],
    depressão: ["cura-interior", "energia-vital"],
    melancolia: ["cura-interior", "silencio-interior"],
    ansiedade: ["relaxamento", "silencio-interior"],
    preocupação: ["relaxamento", "clareza"],
    estresse: ["relaxamento", "sono-reparador"],
    irritação: ["relaxamento", "purificacao-emocional"],
    raiva: ["purificacao-emocional", "relaxamento"],
    fúria: ["purificacao-emocional", "relaxamento"],
    cansaço: ["sono-reparador", "energia-vital"],
    exaustão: ["sono-reparador", "energia-vital"],
    confusão: ["clareza", "silencio-interior"],
    desorientação: ["clareza", "foco"],
    distração: ["foco", "clareza"],
    tédio: ["criatividade-expandida", "energia-vital"],
    solidão: ["cura-interior", "reconexao-proposito"],
    vazio: ["reconexao-proposito", "chave-alma"],
    desespero: ["cura-interior", "silencio-interior"],

    // Neutro
    neutro: ["silencio-interior", "foco", "relaxamento"],
  }

  // Mapeamento de intenções para sessões recomendadas
  const intentionToSessionMap: Record<string, string[]> = {
    foco: ["foco", "clareza", "criatividade-expandida"],
    clareza: ["clareza", "silencio-interior", "foco"],
    relaxamento: ["relaxamento", "sono-reparador", "silencio-interior"],
    energia: ["energia-vital", "despertar-quantico", "foco"],
    cura: ["cura-interior", "purificacao-emocional", "silencio-interior"],
    inspiracao: ["criatividade-expandida", "despertar-quantico", "chave-alma"],
    paz: ["silencio-interior", "relaxamento", "sono-reparador"],
    transformacao: ["purificacao-emocional", "despertar-quantico", "reconexao-proposito"],
    intuicao: ["chave-alma", "silencio-interior", "clareza"],
    gratidao: ["silencio-interior", "cura-interior", "reconexao-proposito"],
    protecao: ["purificacao-emocional", "silencio-interior", "energia-vital"],
    abundancia: ["reconexao-proposito", "despertar-quantico", "energia-vital"],
  }

  // Obter recomendações baseadas na emoção
  const emotionBasedSessions = emotionToSessionMap[analysis.primaryEmotion] || emotionToSessionMap["neutro"]

  // Obter recomendações baseadas na intenção
  const intentionBasedSessions = intentionToSessionMap[intentionId] || ["silencio-interior", "foco", "relaxamento"]

  // Combinar recomendações e calcular confiança
  const allRecommendations = [...emotionBasedSessions, ...intentionBasedSessions]
  const sessionCounts: Record<string, number> = {}

  allRecommendations.forEach((sessionId) => {
    sessionCounts[sessionId] = (sessionCounts[sessionId] || 0) + 1
  })

  // Converter para o formato de recomendação
  const recommendations: AIRecommendation[] = Object.entries(sessionCounts)
    .map(([sessionId, count]) => {
      // Calcular confiança baseada na frequência e na intensidade da emoção
      const confidence = Math.min((count / allRecommendations.length) * (analysis.intensity / 10) + 0.3, 0.95)

      // Gerar razão para a recomendação
      let reason = ""
      if (emotionBasedSessions.includes(sessionId) && intentionBasedSessions.includes(sessionId)) {
        reason = `Altamente recomendado para seu estado emocional atual e sua intenção de ${intentionId}`
      } else if (emotionBasedSessions.includes(sessionId)) {
        reason = `Recomendado para ajudar com seu estado emocional atual`
      } else {
        reason = `Alinhado com sua intenção de ${intentionId}`
      }

      return {
        sessionId,
        confidence,
        reason,
      }
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3) // Retornar apenas as 3 melhores recomendações

  return recommendations
}

// Função para gerar respostas da IA com base na análise
export function generateAIResponse(analysis: EmotionalAnalysis, intentionId: string): string {
  // Respostas para diferentes níveis de risco
  if (analysis.needsProfessionalHelp) {
    return `Percebo que você está passando por um momento difícil. É importante lembrar que o Neureon é uma ferramenta de apoio, mas não substitui a ajuda profissional. Recomendo fortemente que você converse com um profissional de saúde mental. Enquanto isso, posso sugerir algumas sessões que podem ajudar a acalmar sua mente.`
  }

  if (analysis.riskLevel === "medium") {
    return `Parece que você está enfrentando alguns desafios emocionais significativos. Embora o Neureon possa oferecer ferramentas para ajudar no seu bem-estar, considere também buscar apoio de um profissional de saúde mental. Baseado no que você compartilhou, tenho algumas recomendações de sessões que podem ser benéficas neste momento.`
  }

  // Respostas baseadas no sentimento
  if (analysis.sentiment === "positive") {
    const responses = [
      `Que bom que você está se sentindo ${analysis.primaryEmotion}! Vamos aproveitar essa energia positiva com algumas sessões que podem potencializar ainda mais seu bem-estar.`,
      `É ótimo ver que você está em um bom momento emocional! Baseado na sua intenção de ${intentionId} e seu estado atual, tenho algumas recomendações perfeitas para você.`,
      `Sua energia positiva é contagiante! Vamos canalizá-la com algumas sessões especialmente selecionadas para complementar sua intenção diária.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (analysis.sentiment === "negative") {
    const responses = [
      `Entendo que você está se sentindo ${analysis.primaryEmotion}. O Neureon tem algumas sessões que podem ajudar a transformar esse estado emocional e apoiar sua intenção diária.`,
      `Obrigado por compartilhar como está se sentindo. Tenho algumas recomendações que podem ajudar a aliviar esse sentimento de ${analysis.primaryEmotion} e apoiar sua jornada.`,
      `Às vezes, nos sentimos ${analysis.primaryEmotion}, e está tudo bem. Baseado no que você compartilhou, selecionei algumas sessões que podem trazer mais equilíbrio para seu dia.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Resposta neutra
  const neutralResponses = [
    `Baseado na sua intenção de ${intentionId} e no que você compartilhou, selecionei algumas sessões que podem ser benéficas para você hoje.`,
    `Obrigado por compartilhar. Considerando sua intenção diária, tenho algumas recomendações personalizadas que podem enriquecer sua experiência no Neureon.`,
    `Entendi. Levando em conta sua intenção de ${intentionId}, preparei algumas sugestões de sessões que podem ser particularmente úteis para você hoje.`,
  ]
  return neutralResponses[Math.floor(Math.random() * neutralResponses.length)]
}

// Função para gerar perguntas de acompanhamento
export function generateFollowUpQuestion(analysis: EmotionalAnalysis, intentionId: string, stage: number): string {
  // Perguntas iniciais (estágio 1)
  if (stage === 1) {
    const questions = [
      "Como você está se sentindo hoje?",
      "Como tem sido seu dia até agora?",
      "Qual é o seu estado emocional neste momento?",
    ]
    return questions[Math.floor(Math.random() * questions.length)]
  }

  // Perguntas de aprofundamento (estágio 2)
  if (stage === 2) {
    if (analysis.sentiment === "positive") {
      const questions = [
        `O que contribuiu para você se sentir ${analysis.primaryEmotion} hoje?`,
        `Há quanto tempo você vem se sentindo ${analysis.primaryEmotion}?`,
        `Como essa sensação de ${analysis.primaryEmotion} se relaciona com sua intenção de ${intentionId}?`,
      ]
      return questions[Math.floor(Math.random() * questions.length)]
    }

    if (analysis.sentiment === "negative") {
      const questions = [
        `Há quanto tempo você vem se sentindo ${analysis.primaryEmotion}?`,
        `Existe algo específico que desencadeou esse sentimento de ${analysis.primaryEmotion}?`,
        `Como você acha que sua intenção de ${intentionId} pode ajudar com esse sentimento?`,
      ]
      return questions[Math.floor(Math.random() * questions.length)]
    }

    const neutralQuestions = [
      `Como você espera que sua intenção de ${intentionId} influencie seu dia hoje?`,
      `Quais aspectos da sua vida você gostaria de focar hoje?`,
      `O que te motivou a escolher a intenção de ${intentionId} hoje?`,
    ]
    return neutralQuestions[Math.floor(Math.random() * neutralQuestions.length)]
  }

  // Perguntas finais (estágio 3)
  if (stage === 3) {
    const questions = [
      "Há algo mais que você gostaria de compartilhar antes de vermos as sessões recomendadas para você?",
      "Além do que conversamos, existe alguma área específica em que você gostaria de focar hoje?",
      "Baseado no que você compartilhou, posso fazer algumas recomendações. Há algo mais que devo considerar?",
    ]
    return questions[Math.floor(Math.random() * questions.length)]
  }

  // Fallback
  return "Como você está se sentindo em relação à sua intenção diária?"
}

// Função para gerar reforço positivo
export function generatePositiveReinforcement(analysis: EmotionalAnalysis, intentionId: string): string {
  // Reforços para diferentes sentimentos
  if (analysis.sentiment === "positive") {
    const reinforcements = [
      `Sua atitude positiva é inspiradora! Manter esse estado de ${analysis.primaryEmotion} vai potencializar os benefícios da sua intenção de ${intentionId}.`,
      `Você está no caminho certo! Esse sentimento de ${analysis.primaryEmotion} cria o ambiente perfeito para manifestar sua intenção.`,
      `Excelente! Sua energia positiva combinada com a intenção de ${intentionId} pode trazer transformações significativas para seu dia.`,
    ]
    return reinforcements[Math.floor(Math.random() * reinforcements.length)]
  }

  if (analysis.sentiment === "negative") {
    const reinforcements = [
      `Reconhecer como nos sentimos é o primeiro passo para a transformação. Sua intenção de ${intentionId} pode ser uma poderosa aliada nesse processo.`,
      `Obrigado por sua honestidade. Mesmo nos momentos desafiadores, sua intenção de ${intentionId} pode ser uma âncora de estabilidade.`,
      `Lembre-se que todos os estados emocionais são temporários. Sua prática consciente com a intenção de ${intentionId} pode ajudar a trazer mais equilíbrio.`,
    ]
    return reinforcements[Math.floor(Math.random() * reinforcements.length)]
  }

  // Reforços neutros
  const neutralReinforcements = [
    `Sua dedicação à prática consciente é admirável. Continuar com sua intenção de ${intentionId} trará benefícios cumulativos ao longo do tempo.`,
    `Cada momento de consciência é valioso. Sua intenção de ${intentionId} está criando ondas positivas em sua vida, mesmo que sutis.`,
    `Você está investindo em seu bem-estar, e isso é algo para se orgulhar. Sua intenção de ${intentionId} é um presente para si mesmo.`,
  ]
  return neutralReinforcements[Math.floor(Math.random() * neutralReinforcements.length)]
}
