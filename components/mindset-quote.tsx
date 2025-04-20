interface MindsetQuoteProps {
  quote: string
  author: string
  className?: string
}

export function MindsetQuote({ quote, author, className = "" }: MindsetQuoteProps) {
  return (
    <div
      className={`backdrop-blur-md bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-white/10 rounded-3xl p-6 ${className}`}
    >
      <blockquote className="text-lg md:text-xl font-medium text-white italic mb-2 relative">
        <span className="absolute -left-2 -top-2 text-4xl text-blue-500/30">"</span>
        {quote}
        <span className="absolute -right-2 bottom-0 text-4xl text-blue-500/30">"</span>
      </blockquote>
      <p className="text-right text-sm text-[#a0a0b0]">— {author}</p>
    </div>
  )
}
