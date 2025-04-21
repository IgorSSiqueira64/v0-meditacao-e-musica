"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { AppleAuthButton } from "@/components/auth/apple-auth-button"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { isAuthenticated } from "@/services/auth-service"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/dashboard"

  // Verificar se já está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirectPath)
    }
  }, [router, redirectPath])

  // Carregar email salvo
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "O email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulação de autenticação - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Salvar email se "lembrar-me" estiver marcado
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      // Armazenar informações do usuário no localStorage para simular autenticação
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: email.split("@")[0], // Usar parte do email como nome do usuário
          email: email,
          provider: "email",
          premium: false,
          lastSessionUsed: null,
          sessionsUsedToday: 0,
          lastSessionDate: null,
          experiences: [],
          challenges: [],
          intentions: [],
          notifications: [
            {
              id: "welcome",
              type: "update",
              title: "Bem-vindo ao Neureon!",
              description:
                "Estamos felizes em tê-lo conosco. Explore nossas sessões e comece sua jornada de transformação.",
              read: false,
              date: new Date().toISOString(),
              actionText: "Explorar sessões",
              actionLink: "/sessoes",
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      )

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
        variant: "default",
      })

      router.push(redirectPath)
    } catch (error) {
      console.error("Erro no login:", error)
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Usuário Demo",
          email: "demo@neureon.com",
          provider: "demo",
          premium: false,
          lastSessionUsed: null,
          sessionsUsedToday: 0,
          lastSessionDate: null,
          experiences: [],
          challenges: [],
          intentions: [],
          notifications: [
            {
              id: "welcome-demo",
              type: "update",
              title: "Modo demonstração ativado",
              description: "Você está usando uma conta de demonstração com acesso limitado.",
              read: false,
              date: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      )

      toast({
        title: "Modo demonstração ativado",
        description: "Você está usando uma conta de demonstração com acesso limitado.",
        variant: "default",
      })

      router.push(redirectPath)
    } catch (error) {
      console.error("Erro no login demo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 flex items-center justify-center relative py-16">
        <GlowEffect className="left-1/2 top-1/3" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="right-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <div className="w-full max-w-md mx-auto px-6 relative z-10">
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
              <div className="flex flex-col gap-3">
                <GoogleAuthButton mode="signin" />
                <AppleAuthButton mode="signin" />
              </div>

              <div className="flex items-center gap-3">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-[#a0a0b0]">ou</span>
                <Separator className="flex-1 bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 rounded-full bg-white/5 border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                    placeholder="seu@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#a0a0b0] mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-2 rounded-full bg-white/5 border ${
                        errors.password ? "border-red-500" : "border-white/10"
                      } text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Entrar"}
                </Button>
              </form>

              <Button
                onClick={handleDemoLogin}
                disabled={isLoading}
                variant="outline"
                className="w-full py-2 px-4 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-medium transition-all duration-300"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Acessar Demonstração"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#a0a0b0]">
                Não tem uma conta?{" "}
                <Link
                  href={`/cadastro${redirectPath !== "/dashboard" ? `?redirect=${redirectPath}` : ""}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-white/10 py-8">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
              </div>
              <span className="text-sm text-[#a0a0b0]">Neureon © {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="text-sm text-[#a0a0b0] hover:text-white transition-colors">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
