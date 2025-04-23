export type SupportedLanguage = "pt-BR" | "en-US" | "es-ES" | "fr-FR" | "de-DE" | "it-IT" | "ja-JP" | "zh-CN"

export const supportedLanguages = [
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)", flag: "🇧🇷" },
  { code: "en-US", name: "English (US)", nativeName: "English (US)", flag: "🇺🇸" },
  { code: "es-ES", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de-DE", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it-IT", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "ja-JP", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳" },
]

// Dicionário de traduções
const translations: Record<string, Record<SupportedLanguage, string>> = {
  welcomeMessage: {
    "pt-BR": "Como você está se sentindo hoje?",
    "en-US": "How are you feeling today?",
    "es-ES": "¿Cómo te sientes hoy?",
    "fr-FR": "Comment vous sentez-vous aujourd'hui ?",
    "de-DE": "Wie fühlen Sie sich heute?",
    "it-IT": "Come ti senti oggi?",
    "ja-JP": "今日の気分はどうですか？",
    "zh-CN": "今天感觉如何？",
  },
  speakWithNeureon: {
    "pt-BR": "Fale com Neureon",
    "en-US": "Speak with Neureon",
    "es-ES": "Habla con Neureon",
    "fr-FR": "Parlez avec Neureon",
    "de-DE": "Sprechen Sie mit Neureon",
    "it-IT": "Parla con Neureon",
    "ja-JP": "Neureonと話す",
    "zh-CN": "与Neureon交谈",
  },
  placeholder: {
    "pt-BR": "Digite sua mensagem...",
    "en-US": "Type your message...",
    "es-ES": "Escribe tu mensaje...",
    "fr-FR": "Tapez votre message...",
    "de-DE": "Geben Sie Ihre Nachricht ein...",
    "it-IT": "Scrivi il tuo messaggio...",
    "ja-JP": "メッセージを入力...",
    "zh-CN": "输入您的消息...",
  },
  send: {
    "pt-BR": "Enviar",
    "en-US": "Send",
    "es-ES": "Enviar",
    "fr-FR": "Envoyer",
    "de-DE": "Senden",
    "it-IT": "Invia",
    "ja-JP": "送信",
    "zh-CN": "发送",
  },
  close: {
    "pt-BR": "Fechar",
    "en-US": "Close",
    "es-ES": "Cerrar",
    "fr-FR": "Fermer",
    "de-DE": "Schließen",
    "it-IT": "Chiudi",
    "ja-JP": "閉じる",
    "zh-CN": "关闭",
  },
  languageSelector: {
    "pt-BR": "Selecionar idioma",
    "en-US": "Select language",
    "es-ES": "Seleccionar idioma",
    "fr-FR": "Sélectionner la langue",
    "de-DE": "Sprache auswählen",
    "it-IT": "Seleziona lingua",
    "ja-JP": "言語を選択",
    "zh-CN": "选择语言",
  },
  sessionRecommendation: {
    "pt-BR": "Sessões recomendadas para você",
    "en-US": "Sessions recommended for you",
    "es-ES": "Sesiones recomendadas para ti",
    "fr-FR": "Séances recommandées pour vous",
    "de-DE": "Empfohlene Sitzungen für Sie",
    "it-IT": "Sessioni consigliate per te",
    "ja-JP": "あなたにおすすめのセッション",
    "zh-CN": "为您推荐的课程",
  },
  free: {
    "pt-BR": "Gratuito",
    "en-US": "Free",
    "es-ES": "Gratis",
    "fr-FR": "Gratuit",
    "de-DE": "Kostenlos",
    "it-IT": "Gratuito",
    "ja-JP": "無料",
    "zh-CN": "免费",
  },
  premium: {
    "pt-BR": "Premium",
    "en-US": "Premium",
    "es-ES": "Premium",
    "fr-FR": "Premium",
    "de-DE": "Premium",
    "it-IT": "Premium",
    "ja-JP": "プレミアム",
    "zh-CN": "高级版",
  },
  startSession: {
    "pt-BR": "Iniciar Sessão",
    "en-US": "Start Session",
    "es-ES": "Iniciar Sesión",
    "fr-FR": "Démarrer la séance",
    "de-DE": "Sitzung starten",
    "it-IT": "Inizia sessione",
    "ja-JP": "セッションを開始",
    "zh-CN": "开始课程",
  },
  unlock: {
    "pt-BR": "Desbloquear",
    "en-US": "Unlock",
    "es-ES": "Desbloquear",
    "fr-FR": "Débloquer",
    "de-DE": "Freischalten",
    "it-IT": "Sblocca",
    "ja-JP": "ロック解除",
    "zh-CN": "解锁",
  },
  you: {
    "pt-BR": "Você",
    "en-US": "You",
    "es-ES": "Tú",
    "fr-FR": "Vous",
    "de-DE": "Sie",
    "it-IT": "Tu",
    "ja-JP": "あなた",
    "zh-CN": "您",
  },
  chat: {
    "pt-BR": "Chat",
    "en-US": "Chat",
    "es-ES": "Chat",
    "fr-FR": "Chat",
    "de-DE": "Chat",
    "it-IT": "Chat",
    "ja-JP": "チャット",
    "zh-CN": "聊天",
  },
  history: {
    "pt-BR": "Histórico",
    "en-US": "History",
    "es-ES": "Historial",
    "fr-FR": "Historique",
    "de-DE": "Verlauf",
    "it-IT": "Cronologia",
    "ja-JP": "履歴",
    "zh-CN": "历史",
  },
  conversations: {
    "pt-BR": "Conversas",
    "en-US": "Conversations",
    "es-ES": "Conversaciones",
    "fr-FR": "Conversations",
    "de-DE": "Gespräche",
    "it-IT": "Conversazioni",
    "ja-JP": "会話",
    "zh-CN": "对话",
  },
  newChat: {
    "pt-BR": "Nova conversa",
    "en-US": "New chat",
    "es-ES": "Nueva conversación",
    "fr-FR": "Nouvelle conversation",
    "de-DE": "Neuer Chat",
    "it-IT": "Nuova chat",
    "ja-JP": "新しいチャット",
    "zh-CN": "新对话",
  },
  noConversations: {
    "pt-BR": "Nenhuma conversa encontrada",
    "en-US": "No conversations found",
    "es-ES": "No se encontraron conversaciones",
    "fr-FR": "Aucune conversation trouvée",
    "de-DE": "Keine Gespräche gefunden",
    "it-IT": "Nessuna conversazione trovata",
    "ja-JP": "会話が見つかりません",
    "zh-CN": "未找到对话",
  },
  delete: {
    "pt-BR": "Excluir",
    "en-US": "Delete",
    "es-ES": "Eliminar",
    "fr-FR": "Supprimer",
    "de-DE": "Löschen",
    "it-IT": "Elimina",
    "ja-JP": "削除",
    "zh-CN": "删除",
  },
  justNow: {
    "pt-BR": "Agora mesmo",
    "en-US": "Just now",
    "es-ES": "Ahora mismo",
    "fr-FR": "À l'instant",
    "de-DE": "Gerade eben",
    "it-IT": "Proprio ora",
    "ja-JP": "たった今",
    "zh-CN": "刚刚",
  },
  minutesAgo: {
    "pt-BR": "minutos atrás",
    "en-US": "minutes ago",
    "es-ES": "minutos atrás",
    "fr-FR": "minutes",
    "de-DE": "Minuten",
    "it-IT": "minuti fa",
    "ja-JP": "分前",
    "zh-CN": "分钟前",
  },
  hoursAgo: {
    "pt-BR": "horas atrás",
    "en-US": "hours ago",
    "es-ES": "horas atrás",
    "fr-FR": "heures",
    "de-DE": "Stunden",
    "it-IT": "ore fa",
    "ja-JP": "時間前",
    "zh-CN": "小时前",
  },
  daysAgo: {
    "pt-BR": "dias atrás",
    "en-US": "days ago",
    "es-ES": "días atrás",
    "fr-FR": "jours",
    "de-DE": "Tage",
    "it-IT": "giorni fa",
    "ja-JP": "日前",
    "zh-CN": "天前",
  },
  newConversation: {
    "pt-BR": "Nova conversa",
    "en-US": "New conversation",
    "es-ES": "Nueva conversación",
    "fr-FR": "Nouvelle conversation",
    "de-DE": "Neues Gespräch",
    "it-IT": "Nuova conversazione",
    "ja-JP": "新しい会話",
    "zh-CN": "新对话",
  },
  suggestions: {
    "pt-BR": "Sugestões",
    "en-US": "Suggestions",
    "es-ES": "Sugerencias",
    "fr-FR": "Suggestions",
    "de-DE": "Vorschläge",
    "it-IT": "Suggerimenti",
    "ja-JP": "提案",
    "zh-CN": "建议",
  },
}

// Função para obter uma tradução
export function translate(key: string, language: SupportedLanguage): string {
  if (!translations[key]) {
    return key
  }

  return translations[key][language] || translations[key]["en-US"] || key
}

// Função para traduzir um texto de um idioma para outro
export async function translateText(
  text: string,
  fromLanguage: SupportedLanguage,
  toLanguage: SupportedLanguage,
): Promise<string> {
  if (fromLanguage === toLanguage) {
    return text
  }

  // Simulação de tradução - em um ambiente real, usaríamos uma API de tradução
  // como Google Translate, DeepL, etc.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Aqui apenas retornamos o texto original com um prefixo para simular a tradução
      // Em um ambiente real, este seria o texto traduzido
      resolve(`${text} [traduzido para ${toLanguage}]`)
    }, 500)
  })
}
