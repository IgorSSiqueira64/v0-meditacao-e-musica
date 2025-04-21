"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface DynamicSessionPlayerProps {
  title: string
  description: string
  duration: number // em segundos
  frequency: string
  audioSrc: string
  visualEffects: {
    backgroundVideos: string[]
    transitionPoints: number[] // pontos em segundos onde a transição deve ocorrer
  }
}

export function DynamicSessionPlayer({
  title,
  description,
  duration,
  frequency,
  audioSrc,
  visualEffects,
}: DynamicSessionPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [activeVisualIndex, setActiveVisualIndex] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number>()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Formatar tempo em MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Atualizar o tempo atual
  const updateTimeDisplay = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)

      // Verificar se é hora de mudar o visual
      const currentTimeInSeconds = audioRef.current.currentTime
      for (let i = 0; i < visualEffects.transitionPoints.length; i++) {
        if (
          currentTimeInSeconds >= visualEffects.transitionPoints[i] &&
          i !== activeVisualIndex &&
          (i === visualEffects.transitionPoints.length - 1 ||
            currentTimeInSeconds < visualEffects.transitionPoints[i + 1])
        ) {
          setActiveVisualIndex(i)
          break
        }
      }

      animationRef.current = requestAnimationFrame(updateTimeDisplay)
    }
  }

  // Controles de reprodução
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        cancelAnimationFrame(animationRef.current as number)
      } else {
        audioRef.current.play()
        animationRef.current = requestAnimationFrame(updateTimeDisplay)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restartSession = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setActiveVisualIndex(0)

      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Efeito para inicializar os vídeos
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, visualEffects.backgroundVideos.length)

    // Pausar todos os vídeos exceto o ativo
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeVisualIndex) {
          video.play().catch((err) => console.error("Erro ao reproduzir vídeo:", err))
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [activeVisualIndex, visualEffects.backgroundVideos])

  // Limpar animação quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-black">
      {/* Camada de vídeos */}
      <div className="absolute inset-0 z-0">
        {visualEffects.backgroundVideos.map((videoSrc, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            src={videoSrc}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              index === activeVisualIndex ? "opacity-100" : "opacity-0",
            )}
            loop
            muted
            playsInline
          />
        ))}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 p-8 flex flex-col h-[80vh] md:h-[70vh]">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
            <p className="text-lg text-white/80 mb-4">{description}</p>
            <div className="flex items-center justify-center gap-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">{formatTime(duration)}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm">{frequency}</span>
            </div>
          </div>

          <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-10 w-10 text-white" /> : <Play className="h-10 w-10 text-white ml-1" />}
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-white/80 text-sm w-12">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration}
              step={1}
              onValueChange={handleTimeChange}
              className="flex-1"
            />
            <span className="text-white/80 text-sm w-12">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
                onClick={restartSession}
              >
                <SkipBack className="h-5 w-5" />
                <span className="sr-only">Reiniciar</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                <span className="sr-only">Mudo</span>
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>

            <div className="text-white/60 text-sm">Frequência: {frequency}</div>
          </div>
        </div>
      </div>

      {/* Elemento de áudio oculto */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  )
}
