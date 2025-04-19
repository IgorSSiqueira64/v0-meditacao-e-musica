import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ContentCardProps {
  title: string
  subtitle: string
  duration: string
  frequency: string
  href: string
}

export function ContentCard({ title, subtitle, duration, frequency, href }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col h-full transition-all hover:bg-white/10 hover:shadow-[0_0_25px_rgba(66,153,225,0.2)] hover:border-blue-500/30 hover:scale-[1.02] duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transform -rotate-12 group-hover:animate-[pulse_4s_ease-in-out_infinite] transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex-1 space-y-4">
          <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center mb-4 overflow-hidden group-hover:from-blue-900/30 group-hover:to-purple-900/30 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(66,153,225,0.5)]">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#a0a0b0]">{subtitle}</p>
        </div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
          <span className="text-sm font-medium text-white">{duration}</span>
          <span className="text-sm text-[#a0a0b0]">{frequency}</span>
        </div>
      </div>
    </Link>
  )
}
