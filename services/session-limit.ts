// Função para verificar se o usuário pode acessar uma sessão
export function canAccessSession(): { canAccess: boolean; message: string } {
  // Verificar se o usuário está autenticado
  const userJson = localStorage.getItem("user")
  if (!userJson) {
    return { canAccess: false, message: "Você precisa fazer login para acessar as sessões." }
  }

  const user = JSON.parse(userJson)

  // Se o usuário for premium, sempre pode acessar
  if (user.premium) {
    return { canAccess: true, message: "" }
  }

  // Verificar se o usuário já usou sua sessão diária
  if (user.sessionsUsedToday >= 1) {
    // Verificar se já se passaram 24 horas desde a última sessão
    const lastSessionDate = user.lastSessionDate ? new Date(user.lastSessionDate) : null
    const now = new Date()

    if (lastSessionDate) {
      const hoursSinceLastSession = (now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60)

      if (hoursSinceLastSession < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSinceLastSession)
        return {
          canAccess: false,
          message: `Você já usou sua sessão diária gratuita. Aguarde ${hoursRemaining} horas ou assine o Premium para acesso ilimitado.`,
        }
      } else {
        // Já se passaram 24 horas, resetar o contador
        user.sessionsUsedToday = 0
        user.lastSessionDate = null
        localStorage.setItem("user", JSON.stringify(user))
        return { canAccess: true, message: "" }
      }
    }
  }

  return { canAccess: true, message: "" }
}

// Função para registrar o uso de uma sessão
export function registerSessionUse(): void {
  const userJson = localStorage.getItem("user")
  if (!userJson) return

  const user = JSON.parse(userJson)

  // Se o usuário for premium, não registrar uso
  if (user.premium) return

  // Registrar uso da sessão
  user.sessionsUsedToday = (user.sessionsUsedToday || 0) + 1
  user.lastSessionDate = new Date().toISOString()
  localStorage.setItem("user", JSON.stringify(user))
}

// Função para verificar se uma sessão específica está bloqueada (apenas para premium)
export function isSessionLocked(sessionId: string): boolean {
  // Lista de sessões premium
  const premiumSessions = [
    "clareza",
    "concentracao",
    "estresse",
    "sono",
    "meditacao-profunda",
    "criatividade",
    "energia",
    "intuicao",
  ]

  // Verificar se a sessão é premium
  const isPremiumSession = premiumSessions.includes(sessionId)

  // Se não for premium, está disponível para todos
  if (!isPremiumSession) {
    return false
  }

  // Se for premium, verificar se o usuário é premium
  const userJson = localStorage.getItem("user")
  if (!userJson) return true

  const user = JSON.parse(userJson)
  return !user.premium
}

// Função para obter o número de sessões restantes hoje
export function getRemainingSessionsToday(): number {
  const userJson = localStorage.getItem("user")
  if (!userJson) return 0

  const user = JSON.parse(userJson)

  // Se o usuário for premium, retornar "ilimitado"
  if (user.premium) return Number.POSITIVE_INFINITY

  // Verificar se já se passaram 24 horas desde a última sessão
  const lastSessionDate = user.lastSessionDate ? new Date(user.lastSessionDate) : null
  const now = new Date()

  if (lastSessionDate) {
    const hoursSinceLastSession = (now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60)

    if (hoursSinceLastSession >= 24) {
      // Já se passaram 24 horas, resetar o contador
      user.sessionsUsedToday = 0
      user.lastSessionDate = null
      localStorage.setItem("user", JSON.stringify(user))
      return 1
    }
  }

  return Math.max(0, 1 - (user.sessionsUsedToday || 0))
}

// Função para obter o tempo restante até a próxima sessão gratuita
export function getTimeUntilNextFreeSession(): string {
  const userJson = localStorage.getItem("user")
  if (!userJson) return ""

  const user = JSON.parse(userJson)

  // Se o usuário for premium ou não tiver usado nenhuma sessão, retornar vazio
  if (user.premium || !user.lastSessionDate) return ""

  const lastSessionDate = new Date(user.lastSessionDate)
  const now = new Date()
  const hoursSinceLastSession = (now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60)

  if (hoursSinceLastSession < 24) {
    const hoursRemaining = Math.ceil(24 - hoursSinceLastSession)
    const minutesRemaining = Math.ceil((24 - hoursSinceLastSession) * 60) % 60

    if (hoursRemaining > 0) {
      return `${hoursRemaining}h ${minutesRemaining}min`
    } else {
      return `${minutesRemaining}min`
    }
  }

  return ""
}

// Função para verificar se o usuário é premium
export function isPremiumUser(): boolean {
  const userJson = localStorage.getItem("user")
  if (!userJson) return false

  const user = JSON.parse(userJson)
  return user.premium === true
}

// Função para atualizar o status premium do usuário
export function updatePremiumStatus(isPremium: boolean): void {
  const userJson = localStorage.getItem("user")
  if (!userJson) return

  const user = JSON.parse(userJson)
  user.premium = isPremium
  localStorage.setItem("user", JSON.stringify(user))
}
