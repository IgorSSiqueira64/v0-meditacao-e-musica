"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavBar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Sessões", href: "/sessoes" },
    { name: "Conhecimento", href: "/conhecimento" },
    { name: "Sobre", href: "/sobre" },
    { name: "Objetivos", href: "/objetivos" },
    { name: "Premium", href: "/premium" },
  ]

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
            <Button variant="ghost" className="text-[#a0a0b0] hover:text-white hover:bg-white/5 rounded-full">
              Entrar
            </Button>
            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
              Começar
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10">
              <div className="flex flex-col gap-8 mt-8">
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
                  <Button variant="ghost" className="justify-start text-[#a0a0b0] hover:text-white hover:bg-white/5">
                    Entrar
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                    Começar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
