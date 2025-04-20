"use client"

import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Coleção de citações inspiradoras
export const inspirationalQuotes = [
  {
    quote:
      "A imaginação é mais importante que o conhecimento. O conhecimento é limitado. A imaginação envolve o mundo.",
    author: "Albert Einstein",
  },
  {
    quote: "Quem olha para fora, sonha; quem olha para dentro, acorda.",
    author: "Carl Jung",
  },
  {
    quote: "Se você quer descobrir os segredos do universo, pense em termos de energia, frequência e vibração.",
    author: "Nikola Tesla",
  },
  {
    quote: "Não empreenda um experimento a menos que ele lhe dê uma resposta não importa qual seja o resultado.",
    author: "Edwin Land",
  },
  {
    quote: "O homem que move uma montanha começa carregando pequenas pedras.",
    author: "Confúcio",
  },
  {
    quote: "Conhece-te a ti mesmo.",
    author: "Sócrates",
  },
  {
    quote: "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Sua visão se tornará clara apenas quando você olhar para dentro do seu coração. Quem olha para fora, sonha. Quem olha para dentro, desperta.",
    author: "Carl Jung",
  },
  {
    quote: "O presente é o único tempo que temos. É o único tempo sobre o qual temos algum controle.",
    author: "Thich Nhat Hanh",
  },
  {
    quote: "Você não é uma gota no oceano. Você é o oceano inteiro em uma gota.",
    author: "Rumi",
  },
  {
    quote: "A maior glória em viver não está em nunca cair, mas em nos levantarmos cada vez que caímos.",
    author: "Nelson Mandela",
  },
  {
    quote: "Torne-se a mudança que você deseja ver no mundo.",
    author: "Mahatma Gandhi",
  },
  {
    quote:
      "A verdadeira medida de um homem não é como ele se comporta em momentos de conforto e conveniência, mas como ele se mantém em tempos de controvérsia e desafio.",
    author: "Martin Luther King Jr.",
  },
  {
    quote: "Não é o que você olha que importa, é o que você vê.",
    author: "Henry David Thoreau",
  },
  {
    quote: "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
    author: "Dalai Lama",
  },
  {
    quote: "O que você pensa, você se torna. O que você sente, você atrai. O que você imagina, você cria.",
    author: "Buda",
  },
  {
    quote: "Não há caminho para a paz. A paz é o caminho.",
    author: "Thich Nhat Hanh",
  },
  {
    quote: "Aquele que tem um porquê para viver pode suportar quase qualquer como.",
    author: "Friedrich Nietzsche",
  },
  {
    quote: "A vida não é medida pelo número de respirações que damos, mas pelos momentos que nos tiram a respiração.",
    author: "Maya Angelou",
  },
  {
    quote: "Quando você chega ao fim do que deveria saber, você estará no início do que deveria sentir.",
    author: "Khalil Gibran",
  },
  {
    quote: "O segredo da mudança é focar toda sua energia não em lutar contra o velho, mas em construir o novo.",
    author: "Sócrates",
  },
  {
    quote: "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.",
    author: "Charles Darwin",
  },
  {
    quote: "A mente é tudo. Você se torna aquilo que você pensa.",
    author: "Buda",
  },
  {
    quote: "Quanto mais silenciosa se torna a mente, mais você consegue ouvir.",
    author: "Rumi",
  },
  {
    quote:
      "O maior bem que podemos fazer aos outros não é compartilhar nossas riquezas com eles, mas revelar as deles próprias.",
    author: "Benjamin Disraeli",
  },
  {
    quote: "Não é o que acontece com você, mas como você reage ao que acontece que importa.",
    author: "Epicteto",
  },
  {
    quote: "A jornada de mil milhas começa com um único passo.",
    author: "Lao Tzu",
  },
  {
    quote: "Você deve ser a mudança que deseja ver no mundo.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "A verdadeira descoberta não consiste em procurar novas paisagens, mas em ter novos olhos.",
    author: "Marcel Proust",
  },
  {
    quote: "Conhecimento não é aquilo que você sabe, mas o que você faz com aquilo que você sabe.",
    author: "Aldous Huxley",
  },
]

// Função para obter uma citação aleatória
export function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length)
  return inspirationalQuotes[randomIndex]
}

// Componente de notificação de citação
export function QuoteNotification() {
  const [quote, setQuote] = useState(getRandomQuote())
  const [showNotification, setShowNotification] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Atualiza a citação a cada 24 horas
  useEffect(() => {
    // Verificar se já existe uma citação armazenada e quando foi definida
    const storedQuoteData = localStorage.getItem("dailyQuote")

    if (storedQuoteData) {
      const { quote, timestamp } = JSON.parse(storedQuoteData)
      const currentTime = new Date().getTime()
      const twentyFourHours = 24 * 60 * 60 * 1000

      // Se passaram menos de 24 horas, use a citação armazenada
      if (currentTime - timestamp < twentyFourHours) {
        setQuote(quote)
      } else {
        // Se passaram mais de 24 horas, obtenha uma nova citação
        const newQuote = getRandomQuote()
        setQuote(newQuote)
        localStorage.setItem(
          "dailyQuote",
          JSON.stringify({
            quote: newQuote,
            timestamp: currentTime,
          }),
        )

        // Mostrar notificação para a nova citação
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 5000)
      }
    } else {
      // Se não houver citação armazenada, armazene a atual
      localStorage.setItem(
        "dailyQuote",
        JSON.stringify({
          quote,
          timestamp: new Date().getTime(),
        }),
      )
    }

    // Configurar o intervalo para verificar a cada hora se é hora de atualizar
    const interval = setInterval(
      () => {
        const storedData = localStorage.getItem("dailyQuote")
        if (storedData) {
          const { timestamp } = JSON.parse(storedData)
          const currentTime = new Date().getTime()
          const twentyFourHours = 24 * 60 * 60 * 1000

          if (currentTime - timestamp >= twentyFourHours) {
            const newQuote = getRandomQuote()
            setQuote(newQuote)
            localStorage.setItem(
              "dailyQuote",
              JSON.stringify({
                quote: newQuote,
                timestamp: currentTime,
              }),
            )

            // Mostrar notificação para a nova citação
            setShowNotification(true)
            setTimeout(() => setShowNotification(false), 5000)
          }
        }
      },
      60 * 60 * 1000,
    ) // Verificar a cada hora

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Notificação flutuante */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 max-w-md p-4 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-md border border-blue-500/30 rounded-xl shadow-lg z-50 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Pensamento do Dia</h4>
              <p className="text-sm text-white/90 italic mb-1">"{quote.quote}"</p>
              <p className="text-xs text-blue-300">— {quote.author}</p>
            </div>
          </div>
        </div>
      )}

      {/* Botão de citação no cabeçalho */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span className="sr-only">Pensamento do Dia</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-4 bg-gradient-to-b from-blue-900/90 to-purple-900/90 backdrop-blur-md border border-blue-500/30"
          align="end"
        >
          <div className="space-y-2">
            <h3 className="font-medium text-white">Pensamento do Dia</h3>
            <p className="text-sm text-white/90 italic">"{quote.quote}"</p>
            <p className="text-xs text-blue-300 text-right">— {quote.author}</p>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

// Componente para exibir uma citação em um bloco
export function QuoteBlock() {
  const [quote, setQuote] = useState(getRandomQuote())

  return (
    <div className="backdrop-blur-md bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-white/10 rounded-3xl p-6">
      <blockquote className="text-lg md:text-xl font-medium text-white italic mb-2 relative">
        <span className="absolute -left-2 -top-2 text-4xl text-blue-500/30">"</span>
        {quote.quote}
        <span className="absolute -right-2 bottom-0 text-4xl text-blue-500/30">"</span>
      </blockquote>
      <p className="text-right text-sm text-[#a0a0b0]">— {quote.author}</p>
    </div>
  )
}
