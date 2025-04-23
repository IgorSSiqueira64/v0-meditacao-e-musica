// Tipos para o sistema de autenticação
export interface User {
  id?: string
  name: string
  email: string
  provider: "email" | "google" | "apple" | "demo"
  premium: boolean
  lastSessionUsed: string | null
  sessionsUsedToday: number
  lastSessionDate: string | null
  experiences: UserExperience[]
  challenges: UserChallenge[]
  intentions: UserIntention[]
  notifications: UserNotification[]
  createdAt?: string
  updatedAt?: string
}

export interface UserExperience {
  id: string
  sessionId: string
  sessionName: string
  duration: number // em segundos
  completionRate: number // 0-100%
  rating: number | null // 1-5
  notes: string | null
  date: string
}

export interface UserChallenge {
  id: string
  challengeId: string
  challengeName: string
  completed: boolean
  progress: number // 0-100%
  startDate: string
  completionDate: string | null
}

export interface UserIntention {
  id: string
  intentionId: string
  intentionName: string
  date: string
  notes: string | null
}

export interface UserNotification {
  id: string
  type: "achievement" | "reminder" | "tip" | "update" | "streak"
  title: string
  description: string
  read: boolean
  date: string
  actionText?: string
  actionLink?: string
}

// Funções de autenticação
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem("user")
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch (error) {
    console.error("Erro ao obter usuário:", error)
    return null
  }
}

export function logout(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("user")
  localStorage.removeItem("rememberedEmail")
}

export function updateUser(userData: Partial<User>): void {
  if (typeof window === "undefined") return

  const currentUser = getCurrentUser()
  if (!currentUser) return

  const updatedUser = {
    ...currentUser,
    ...userData,
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem("user", JSON.stringify(updatedUser))
}

// Modificação na função getCurrentUser e atualização da função para salvar o nome do provedor

// Ao fazer login com Google, Apple ou e-mail, usar o nome real da conta
export function saveAuthenticatedUser(userData: {
  name: string
  email: string
  provider: "email" | "google" | "apple" | "demo"
}): void {
  if (typeof window === "undefined") return

  const userObject: User = {
    name: userData.name, // Nome real do usuário
    email: userData.email,
    provider: userData.provider,
    premium: false,
    lastSessionUsed: null,
    sessionsUsedToday: 0,
    lastSessionDate: null,
    experiences: [],
    challenges: [],
    intentions: [],
    notifications: [
      {
        id: `welcome-${Date.now()}`,
        type: "update",
        title: "Bem-vindo ao Neureon!",
        description: "Estamos felizes em tê-lo conosco. Explore nossas sessões e comece sua jornada de transformação.",
        read: false,
        date: new Date().toISOString(),
        actionText: "Explorar sessões",
        actionLink: "/sessoes",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("user", JSON.stringify(userObject))
}

// Funções de banco de dados
export function saveUserExperience(experience: Omit<UserExperience, "id" | "date">): void {
  const user = getCurrentUser()
  if (!user) return

  const newExperience: UserExperience = {
    ...experience,
    id: generateId(),
    date: new Date().toISOString(),
  }

  user.experiences = [...(user.experiences || []), newExperience]
  user.updatedAt = new Date().toISOString()

  localStorage.setItem("user", JSON.stringify(user))
}

export function saveUserIntention(intentionId: string, intentionName: string, notes?: string): void {
  const user = getCurrentUser()
  if (!user) return

  const newIntention: UserIntention = {
    id: generateId(),
    intentionId,
    intentionName,
    date: new Date().toISOString(),
    notes: notes || null,
  }

  user.intentions = [...(user.intentions || []), newIntention]
  user.updatedAt = new Date().toISOString()

  localStorage.setItem("user", JSON.stringify(user))
}

export function completeChallenge(challengeId: string, challengeName: string): void {
  const user = getCurrentUser()
  if (!user) return

  const existingChallenge = user.challenges?.find((c) => c.challengeId === challengeId && !c.completed)

  if (existingChallenge) {
    existingChallenge.completed = true
    existingChallenge.progress = 100
    existingChallenge.completionDate = new Date().toISOString()
  } else {
    const newChallenge: UserChallenge = {
      id: generateId(),
      challengeId,
      challengeName,
      completed: true,
      progress: 100,
      startDate: new Date().toISOString(),
      completionDate: new Date().toISOString(),
    }
    user.challenges = [...(user.challenges || []), newChallenge]
  }

  user.updatedAt = new Date().toISOString()
  localStorage.setItem("user", JSON.stringify(user))

  // Adicionar notificação de conquista
  addNotification({
    type: "achievement",
    title: "Desafio Concluído!",
    description: `Você completou o desafio: ${challengeName}`,
  })
}

export function addNotification(notification: Omit<UserNotification, "id" | "date" | "read">): void {
  const user = getCurrentUser()
  if (!user) return

  const newNotification: UserNotification = {
    ...notification,
    id: generateId(),
    date: new Date().toISOString(),
    read: false,
  }

  user.notifications = [...(user.notifications || []), newNotification]
  user.updatedAt = new Date().toISOString()

  localStorage.setItem("user", JSON.stringify(user))
}

export function markNotificationAsRead(notificationId: string): void {
  const user = getCurrentUser()
  if (!user) return

  const notification = user.notifications?.find((n) => n.id === notificationId)
  if (notification) {
    notification.read = true
    user.updatedAt = new Date().toISOString()
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function getUnreadNotificationsCount(): number {
  const user = getCurrentUser()
  if (!user) return 0

  return (user.notifications || []).filter((n) => !n.read).length
}

// Funções auxiliares
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
