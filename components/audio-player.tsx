"use client"

import { useState, useRef, useEffect } from "react"
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  title: string
  artist: string
  coverUrl: string
}

export function AudioPlayer({ title, artist, coverUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress)
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0)
      })

      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateProgress)
      }
    }
  }, [])

  const updateProgress = () => {
    setCurrentTime(audioRef.current?.currentTime || 0)
  }

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <img
        src={coverUrl || "/placeholder.svg"}
        alt={`${title} por ${artist}`}
        className="w-32 h-32 rounded-md object-cover"
      />
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SkipBack className="h-5 w-5" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            onClick={togglePlay}
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-purple-600 hover:bg-purple-700 text-white border-none"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span className="sr-only">{isPlaying ? "Pausar" : "Reproduzir"}</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <SkipForward className="h-5 w-5" />
            <span className="sr-only">Próximo</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 w-32">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
      </div>

      <audio ref={audioRef} src="/example-audio.mp3" />
    </div>
  )
}
