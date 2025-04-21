import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neureon - Expanda sua mente. Encontre seu foco.",
  description: "Áudios de meditação e conteúdos para potencializar sua cognição, autodisciplina e bem-estar mental.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthGuard>{children}</AuthGuard>
        <Toaster />
      </body>
    </html>
  )
}
