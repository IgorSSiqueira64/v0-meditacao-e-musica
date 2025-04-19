"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Play, Pause, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { NavBar } from "@/components/nav-bar"
import { GlowEffect } from "@/components/glow-effect"

export default function FocusSessionPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(660) // 11 minutes in seconds
  const [volume, setVolume] = useState(80)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a0a] to-[#121218] text-white">
      <NavBar />
      <main className="flex-1 flex items-center justify-center relative">
        <GlowEffect className="left-1/2 top-1/3" color="rgba(64, 162, 227, 0.3)" />
        <GlowEffect className="right-1/3 bottom-1/3" color="rgba(138, 43, 226, 0.2)" />

        <div className="w-full max-w-md mx-auto px-4 py-16 flex flex-col items-center text-center relative z-10">
          <div className="w-32 h-32 relative mb-12 animate-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20"></div>
            <div className="absolute inset-4 rounded-full overflow-hidden">
              <Image src="/images/neureon-logo.png" alt="Neureon" fill className="object-contain" />
            </div>
          </div>

          <h1 className="text-3xl font-medium text-white mb-2">Sintonizando o Campo do Foco</h1>
          <p className="text-lg text-[#a0a0b0] mb-8">Ativando Acetilcolina</p>

          <div className="flex justify-center gap-12 mb-8">
            <div className="text-center">
              <p className="text-sm text-[#a0a0b0] mb-1">Duração</p>
              <p className="text-xl font-medium text-white">11 MIN</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#a0a0b0] mb-1">Frequência</p>
              <p className="text-xl font-medium text-white">963 Hz</p>
            </div>
          </div>

          <div className="w-full space-y-6 mb-8">
            <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleProgressChange}
                className="absolute inset-0 opacity-0"
              />
            </div>
            <div className="flex justify-between text-sm text-[#a0a0b0]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <Button
            onClick={togglePlay}
            className="rounded-full h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.5)] hover:shadow-[0_0_25px_rgba(66,153,225,0.7)] transition-all duration-300"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            <span className="sr-only">{isPlaying ? "Pausar" : "Reproduzir"}</span>
          </Button>

          <div className="flex items-center gap-2 mt-8 w-full max-w-xs mx-auto">
            <Volume2 className="h-4 w-4 text-[#a0a0b0]" />
            <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${volume}%` }}
              />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="absolute inset-0 opacity-0"
              />
            </div>
          </div>

          <audio ref={audioRef} src="/example-audio.mp3" />
        </div>
      </main>
    </div>
  )
}
