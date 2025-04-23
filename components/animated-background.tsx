"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  className?: string
  intensity?: number
  colorScheme?: "blue" | "purple" | "mixed"
  animated?: boolean
}

export function AnimatedBackground({
  className,
  intensity = 0.5,
  colorScheme = "mixed",
  animated = true,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar o tamanho do canvas para corresponder ao tamanho exibido
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Configurações iniciais
    const particles: Particle[] = []
    const particleCount = 50 + Math.floor(intensity * 100)

    // Definir cores com base no esquema de cores
    const getColors = () => {
      switch (colorScheme) {
        case "blue":
          return [
            "rgba(64, 162, 227, 0.6)",
            "rgba(63, 81, 181, 0.6)",
            "rgba(94, 114, 235, 0.6)",
            "rgba(100, 181, 246, 0.6)",
            "rgba(30, 136, 229, 0.6)",
          ]
        case "purple":
          return [
            "rgba(138, 43, 226, 0.6)",
            "rgba(156, 39, 176, 0.6)",
            "rgba(186, 104, 200, 0.6)",
            "rgba(171, 71, 188, 0.6)",
            "rgba(123, 31, 162, 0.6)",
          ]
        case "mixed":
        default:
          return [
            "rgba(64, 162, 227, 0.6)",
            "rgba(138, 43, 226, 0.6)",
            "rgba(94, 114, 235, 0.6)",
            "rgba(156, 39, 176, 0.6)",
            "rgba(63, 81, 181, 0.6)",
          ]
      }
    }

    const colors = getColors()

    // Criar partículas iniciais
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvas, colors))
    }

    // Função de animação
    const animate = () => {
      if (!ctx) return

      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenhar e atualizar partículas
      particles.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.vx * (animated ? 1 : 0.1) * intensity
        particle.y += particle.vy * (animated ? 1 : 0.1) * intensity

        // Verificar limites
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particles[index] = createParticle(canvas, colors)
        }

        // Desenhar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Diminuir opacidade gradualmente
        if (animated) {
          particle.opacity -= 0.002 * intensity
          if (particle.opacity <= 0) {
            particles[index] = createParticle(canvas, colors)
          }
        }
      })

      // Continuar animação
      animationRef.current = requestAnimationFrame(animate)
    }

    // Iniciar animação
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity, colorScheme, animated])

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/5 to-transparent" />
    </div>
  )
}

// Função para criar uma partícula
interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  opacity: number
}

function createParticle(canvas: HTMLCanvasElement, colors: string[]): Particle {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    opacity: Math.random() * 0.6 + 0.2,
  }
}
