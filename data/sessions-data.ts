export interface Session {
  id: string
  title: string
  subtitle: string
  description: string
  duration: string // formato: "10 MIN"
  frequency: string // formato: "432 Hz"
  category: "meditacao" | "foco" | "relaxamento" | "sono" | "energia" | "crescimento" | "especial"
  isPremium: boolean
  imageUrl: string
  audioUrl: string
  relatedIntentions: string[] // IDs das intenções relacionadas
  benefits: string[]
  tags: string[]
}

export const sessions: Session[] = [
  {
    id: "foco",
    title: "Sintonizando o Campo do Foco",
    subtitle: "Ativando Acetilcolina",
    description: "Uma sessão projetada para aumentar a concentração e foco mental, ideal para estudos e trabalho.",
    duration: "11 MIN",
    frequency: "963 Hz",
    category: "foco",
    isPremium: true, // Alterado para premium
    imageUrl: "/images/sessions/foco.jpg",
    audioUrl: "/audio/foco.mp3",
    relatedIntentions: ["foco", "clareza"],
    benefits: ["Aumento da concentração", "Clareza mental", "Produtividade aprimorada"],
    tags: ["foco", "concentração", "produtividade", "estudo"],
  },
  {
    id: "clareza",
    title: "Clareza Mental",
    subtitle: "Ondas Alfa",
    description: "Alcance clareza de pensamento e tome decisões mais conscientes com esta sessão de ondas alfa.",
    duration: "15 MIN",
    frequency: "432 Hz",
    category: "foco",
    isPremium: true,
    imageUrl: "/images/sessions/clareza.jpg",
    audioUrl: "/audio/clareza.mp3",
    relatedIntentions: ["clareza", "foco", "intuicao"],
    benefits: ["Pensamento mais claro", "Melhor tomada de decisão", "Redução da confusão mental"],
    tags: ["clareza", "decisão", "pensamento", "alfa"],
  },
  {
    id: "relaxamento",
    title: "Relaxamento Profundo",
    subtitle: "Delta Waves",
    description: "Relaxe profundamente e libere o estresse acumulado com esta sessão de ondas delta.",
    duration: "20 MIN",
    frequency: "396 Hz",
    category: "relaxamento",
    isPremium: false, // Mantido como gratuito (tem áudio)
    imageUrl: "/images/sessions/relaxamento.jpg",
    audioUrl: "/audio/relaxamento.mp3", // Áudio "O Lado Oculto da Luz"
    relatedIntentions: ["relaxamento", "paz"],
    benefits: ["Alívio do estresse", "Relaxamento muscular", "Tranquilidade mental"],
    tags: ["relaxamento", "estresse", "tranquilidade", "delta"],
  },
  {
    id: "reconexao-proposito",
    title: "Reconexão com o Propósito",
    subtitle: "Frequência Theta",
    description: "Reconecte-se com seu propósito de vida e encontre clareza sobre sua missão pessoal.",
    duration: "25 MIN",
    frequency: "528 Hz",
    category: "crescimento",
    isPremium: true,
    imageUrl: "/images/sessions/proposito.jpg",
    audioUrl: "/audio/proposito.mp3",
    relatedIntentions: ["clareza", "transformacao", "intuicao"],
    benefits: ["Clareza de propósito", "Alinhamento com valores pessoais", "Motivação renovada"],
    tags: ["propósito", "missão", "valores", "theta"],
  },
  {
    id: "purificacao-emocional",
    title: "Purificação do Campo Emocional",
    subtitle: "Frequência Solfeggio",
    description: "Liberte-se de emoções estagnadas e purifique seu campo emocional com esta poderosa sessão.",
    duration: "30 MIN",
    frequency: "639 Hz",
    category: "crescimento",
    isPremium: true,
    imageUrl: "/images/sessions/purificacao.jpg",
    audioUrl: "/audio/purificacao.mp3",
    relatedIntentions: ["cura", "transformacao", "paz"],
    benefits: ["Liberação emocional", "Equilíbrio dos sentimentos", "Purificação energética"],
    tags: ["emoções", "purificação", "cura", "solfeggio"],
  },
  {
    id: "silencio-interior",
    title: "Silêncio Interior",
    subtitle: "Meditação Profunda",
    description: "Encontre o silêncio interior e conecte-se com sua essência através desta meditação profunda.",
    duration: "22 MIN",
    frequency: "174 Hz",
    category: "meditacao",
    isPremium: false, // Mantido como gratuito (tem áudio)
    imageUrl: "/images/sessions/silencio.jpg",
    audioUrl: "/audio/silencio.mp3", // Áudio "Uma energia de despertar interior"
    relatedIntentions: ["paz", "intuicao", "clareza"],
    benefits: ["Quietude mental", "Conexão interior", "Presença aumentada"],
    tags: ["silêncio", "meditação", "presença", "quietude"],
  },
  {
    id: "chave-alma",
    title: "A Chave da Alma",
    subtitle: "Frequência Sagrada",
    description: "Desbloqueie os segredos da sua alma e acesse níveis mais profundos de autoconhecimento.",
    duration: "35 MIN",
    frequency: "852 Hz",
    category: "especial",
    isPremium: true,
    imageUrl: "/images/sessions/chave-alma.jpg",
    audioUrl: "/audio/chave-alma.mp3",
    relatedIntentions: ["intuicao", "transformacao", "clareza"],
    benefits: ["Autoconhecimento profundo", "Conexão com a alma", "Insights transformadores"],
    tags: ["alma", "autoconhecimento", "espiritual", "sagrado"],
  },
  {
    id: "despertar-quantico",
    title: "Despertar Quântico",
    subtitle: "Frequências Multidimensionais",
    description: "Expanda sua consciência para realidades quânticas e desperte para possibilidades infinitas.",
    duration: "40 MIN",
    frequency: "963 Hz",
    category: "especial",
    isPremium: true,
    imageUrl: "/images/sessions/quantico.jpg",
    audioUrl: "/audio/quantico.mp3",
    relatedIntentions: ["transformacao", "inspiracao", "energia"],
    benefits: ["Expansão da consciência", "Percepção multidimensional", "Despertar espiritual"],
    tags: ["quântico", "consciência", "multidimensional", "despertar"],
  },
  {
    id: "sono-reparador",
    title: "Sono Reparador",
    subtitle: "Ondas Delta Profundas",
    description: "Alcance um sono profundo e reparador com esta sessão de ondas delta especialmente projetada.",
    duration: "45 MIN",
    frequency: "396 Hz",
    category: "sono",
    isPremium: false, // Mantido como gratuito (tem áudio)
    imageUrl: "/images/sessions/sono.jpg",
    audioUrl: "/audio/sono.mp3", // Áudio "Cello 532hz"
    relatedIntentions: ["relaxamento", "cura"],
    benefits: ["Sono profundo", "Recuperação física", "Descanso mental"],
    tags: ["sono", "descanso", "delta", "noite"],
  },
  {
    id: "energia-vital",
    title: "Energia Vital",
    subtitle: "Ativação Energética",
    description: "Recarregue suas energias e sinta-se revigorado com esta poderosa sessão de ativação vital.",
    duration: "15 MIN",
    frequency: "528 Hz",
    category: "energia",
    isPremium: true,
    imageUrl: "/images/sessions/energia.jpg",
    audioUrl: "/audio/energia.mp3",
    relatedIntentions: ["energia", "cura"],
    benefits: ["Aumento da vitalidade", "Disposição renovada", "Equilíbrio energético"],
    tags: ["energia", "vitalidade", "disposição", "manhã"],
  },
  {
    id: "criatividade-expandida",
    title: "Criatividade Expandida",
    subtitle: "Ondas Theta Criativas",
    description: "Liberte seu potencial criativo e acesse novas ideias com esta sessão de ondas theta.",
    duration: "20 MIN",
    frequency: "741 Hz",
    category: "foco",
    isPremium: true,
    imageUrl: "/images/sessions/criatividade.jpg",
    audioUrl: "/audio/criatividade.mp3",
    relatedIntentions: ["inspiracao", "clareza"],
    benefits: ["Fluxo criativo aumentado", "Novas ideias e insights", "Superação de bloqueios criativos"],
    tags: ["criatividade", "inspiração", "ideias", "theta"],
  },
  {
    id: "cura-interior",
    title: "Cura Interior",
    subtitle: "Frequência de Cura",
    description: "Inicie um processo de cura interior profunda com esta sessão terapêutica.",
    duration: "30 MIN",
    frequency: "528 Hz",
    category: "crescimento",
    isPremium: true,
    imageUrl: "/images/sessions/cura.jpg",
    audioUrl: "/audio/cura.mp3",
    relatedIntentions: ["cura", "transformacao"],
    benefits: ["Cura emocional", "Liberação de traumas", "Regeneração energética"],
    tags: ["cura", "terapia", "emocional", "trauma"],
  },
]

// Função para obter sessões por categoria
export function getSessionsByCategory(category: Session["category"]): Session[] {
  return sessions.filter((session) => session.category === category)
}

// Função para obter sessões relacionadas a uma intenção
export function getSessionsByIntention(intentionId: string): Session[] {
  return sessions.filter((session) => session.relatedIntentions.includes(intentionId))
}

// Função para obter sessões premium
export function getPremiumSessions(): Session[] {
  return sessions.filter((session) => session.isPremium)
}

// Função para obter sessões gratuitas
export function getFreeSessions(): Session[] {
  return sessions.filter((session) => !session.isPremium)
}

// Função para obter uma sessão por ID
export function getSessionById(id: string): Session | undefined {
  return sessions.find((session) => session.id === id)
}

// Função para obter uma sessão gratuita relacionada a uma intenção
export function getFreeSessionForIntention(intentionId: string): Session | undefined {
  const relatedSessions = getSessionsByIntention(intentionId)
  return relatedSessions.find((session) => !session.isPremium) || getFreeSessions()[0]
}

// Função para obter a melhor sessão premium para uma intenção
export function getBestPremiumSessionForIntention(intentionId: string): Session | undefined {
  const relatedSessions = getSessionsByIntention(intentionId)
  return relatedSessions.find((session) => session.isPremium) || getPremiumSessions()[0]
}

// Função para obter todas as sessões
export function getAllSessions(): Session[] {
  return sessions
}
