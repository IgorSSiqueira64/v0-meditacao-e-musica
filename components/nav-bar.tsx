"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NotificationsPopover } from "@/components/notifications"
import { QuoteNotification } from "@/components/quote-system"
import { isAuthenticated, getCurrentUser, logout } from "@/services/auth-service"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mounted) {
      const authenticated = isAuthenticated()
      setIsLoggedIn(authenticated)

      if (authenticated) {
        const user = getCurrentUser()
        if (user) {
          setUserName(user.name)
        }
      }
    }
  }, [mounted, pathname])

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Sessões", href: "/sessoes" },
    { name: "Jornada Consciente", href: "/jornada" },
    { name: "Desafio Mental", href: "/desafio-mental" },
    { name: "Conhecimento", href: "/conhecimento" },
    { name: "Premium", href: "/premium" },
  ]

  const handleStartClick = () => {
    router.push("/login")
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUserName("")
    router.push("/")
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full p-0.5 border border-white/20 shadow-[0_0_10px_rgba(66,153,225,0.5)]">
              <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-sm">
                <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain p-1" />
              </div>
            </div>
            <span className="font-medium text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              NEUREON
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-white/10 text-white font-medium"
                    : "text-[#a0a0b0] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <QuoteNotification />
            <NotificationsPopover />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-white/10 p-0">
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-medium text-sm">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{getCurrentUser()?.email || ""}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Meu Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleStartClick}
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
              >
                Começar
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <QuoteNotification />
            <NotificationsPopover />

            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/10 p-0"
                onClick={() => router.push("/dashboard")}
              >
                <span className="font-medium text-sm">{userName.charAt(0).toUpperCase()}</span>
              </Button>
            ) : null}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10">
                <div className="flex flex-col gap-8 mt-8">
                  {isLoggedIn && (
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="font-medium">{userName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-[#a0a0b0]">{getCurrentUser()?.email || ""}</p>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-4 py-3 rounded-lg text-base transition-all ${
                          pathname === item.href
                            ? "bg-white/10 text-white font-medium"
                            : "text-[#a0a0b0] hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-3 mt-4">
                    {isLoggedIn ? (
                      <>
                        <Link href="/dashboard" className="px-4 py-3 rounded-lg text-[#a0a0b0] hover:text-white">
                          Meu Dashboard
                        </Link>
                        <Link href="/perfil" className="px-4 py-3 rounded-lg text-[#a0a0b0] hover:text-white">
                          Configurações
                        </Link>
                        <Button onClick={handleLogout} className="mt-2 bg-white/10 hover:bg-white/20 text-white">
                          Sair
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleStartClick}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
                      >
                        Começar
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
