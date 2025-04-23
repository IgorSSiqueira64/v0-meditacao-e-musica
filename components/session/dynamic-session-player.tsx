"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface DynamicSessionPlayerProps {
  audioUrl: string
  title: string
  subtitle?: string
  onComplete?: () => void
  className?: string
  autoPlay?: boolean
}

export function DynamicSessionPlayer({
  audioUrl,
  title,
  subtitle,
  onComplete,
  className,
  autoPlay = false,
}: DynamicSessionPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationIntensity, setAnimationIntensity] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Inicializar o áudio
  useEffect(() => {
    const audio = new Audio(audioUrl)
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setIsLoaded(true)
      if (autoPlay) {
        handlePlay()
      }
    })

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime)
    })

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
    })

    // Configurar volume inicial
    audio.volume = volume / 100

    return () => {
      audio.pause()
      audio.src = ""
      audio.removeEventListener("loadedmetadata", () => {})
      audio.removeEventListener("timeupdate", () => {})
      audio.removeEventListener("ended", () => {})
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioUrl, autoPlay, onComplete, volume])

  // Função para tocar/pausar o áudio
  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  }

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      setShowAnimation(true)

      // Iniciar vibração no dispositivo (se suportado)
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }

      // Iniciar animação
      startAnimation()
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      setShowAnimation(false)

      // Parar animação
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }

  // Função para buscar uma posição específica no áudio
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0]
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Função para ajustar o volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // Função para alternar mudo/som
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Função para formatar o tempo em minutos:segundos
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Função para iniciar a animação
  const startAnimation = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar o tamanho do canvas para corresponder ao tamanho exibido
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio

    // Configurações iniciais
    const particles: Particle[] = []
    const particleCount = 100

    // Criar partículas iniciais
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvas))
    }

    // Função de animação
    const animate = () => {
      if (!ctx || !audioRef.current) return

      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calcular a intensidade com base no tempo atual do áudio
      // Isso cria um efeito pulsante que acompanha o ritmo da música
      const currentTimePercent = (currentTime / duration) * 100
      const baseIntensity = 0.5 + Math.sin(currentTime * 0.5) * 0.5
      setAnimationIntensity(baseIntensity)

      // Desenhar e atualizar partículas
      particles.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.vx * baseIntensity
        particle.y += particle.vy * baseIntensity

        // Verificar limites
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particles[index] = createParticle(canvas)
        }

        // Desenhar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * baseIntensity, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Diminuir opacidade gradualmente
        particle.opacity -= 0.005
        if (particle.opacity <= 0) {
          particles[index] = createParticle(canvas)
        }
      })

      // Continuar animação
      animationRef.current = requestAnimationFrame(animate)
    }

    // Iniciar animação
    animate()
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

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const colors = [
      "rgba(64, 162, 227, 0.8)",
      "rgba(138, 43, 226, 0.8)",
      "rgba(94, 114, 235, 0.8)",
      "rgba(156, 39, 176, 0.8)",
      "rgba(63, 81, 181, 0.8)",
    ]

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.8 + 0.2,
    }
  }

  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)}>
      {/* Camada de animação */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className={cn("w-full h-full transition-opacity duration-1000", showAnimation ? "opacity-100" : "opacity-0")}
        />
      </div>

      {/* Gradiente de fundo */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm z-10",
          showAnimation && "animate-pulse",
        )}
        style={{
          animationDuration: showAnimation ? `${2 + animationIntensity * 3}s` : "0s",
        }}
      />

      <div className="relative z-20 p-4 md:p-6">
        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-medium text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-blue-300">{subtitle}</p>}
        </div>

        <div className="space-y-4">
          {/* Controles de reprodução */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, currentTime - 10)
                  setCurrentTime(Math.max(0, currentTime - 10))
                }
              }}
              disabled={!isLoaded}
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              className={cn(
                "h-14 w-14 rounded-full flex items-center justify-center transition-all",
                isPlaying
                  ? "bg-white text-blue-900 hover:bg-white/90"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
              )}
              onClick={handlePlayPause}
              disabled={!isLoaded}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, currentTime + 10)
                  setCurrentTime(Math.min(duration, currentTime + 10))
                }
              }}
              disabled={!isLoaded}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Barra de progresso */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              disabled={!isLoaded}
              className="cursor-pointer"
            />

            <div className="flex justify-between text-xs text-[#a0a0b0]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controle de volume */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white transition-colors h-8 w-8"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
