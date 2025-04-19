import Link from "next/link"
import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 flex items-center justify-center relative">
        <GlowEffect className="left-1/2 top-1/3" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="right-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <div className="w-full max-w-md mx-auto px-6 py-16 relative z-10">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
                </div>
              </div>
              <h1 className="text-2xl font-medium text-white mb-2">Bem-vindo ao Neureon</h1>
              <p className="text-sm text-[#a0a0b0]">Entre para acessar suas sessões e conteúdos personalizados</p>
            </div>

            <div className="space-y-6">
              <GoogleAuthButton mode="signin" />

              <div className="flex items-center gap-3">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-[#a0a0b0]">ou</span>
                <Separator className="flex-1 bg-white/10" />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/50"
                    />
                    <label htmlFor="remember" className="ml-2 block text-xs text-[#a0a0b0]">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
                >
                  Entrar
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#a0a0b0]">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
