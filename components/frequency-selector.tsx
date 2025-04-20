"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

const FREQUENCIES = [
  { value: 396, name: "Libertação", description: "Liberta culpa e medo" },
  { value: 417, name: "Mudança", description: "Facilita mudanças" },
  { value: 528, name: "Transformação", description: "Reparação e harmonia" },
  { value: 639, name: "Conexão", description: "Relacionamentos" },
  { value: 741, name: "Expressão", description: "Expressão e soluções" },
  { value: 852, name: "Intuição", description: "Retorno ao estado espiritual" },
  { value: 963, name: "Transcendência", description: "Conexão com o universo" },
]

export function FrequencySelector() {
  const [selectedFrequency, setSelectedFrequency] = useState(528)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)

  const currentFrequency = FREQUENCIES.find((f) => f.value === selectedFrequency) || FREQUENCIES[2]

  const handleFrequencyChange = (value: number[]) => {
    setSelectedFrequency(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium text-white">{currentFrequency.name}</h4>
          <p className="text-xs text-[#a0a0b0]">{currentFrequency.description}</p>
        </div>
        <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {selectedFrequency} Hz
        </div>
      </div>

      <div className="pt-2">
        <Slider
          value={[selectedFrequency]}
          min={396}
          max={963}
          step={1}
          onValueChange={handleFrequencyChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-[#a0a0b0] mt-1">
          <span>396 Hz</span>
          <span>963 Hz</span>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button
          onClick={togglePlay}
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 bg-white/10 hover:bg-white/20 text-white border-none"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          <span className="sr-only">{isPlaying ? "Pausar" : "Reproduzir"}</span>
        </Button>

        <div className="flex-1">
          <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2">
        {FREQUENCIES.map((freq) => (
          <Button
            key={freq.value}
            variant="outline"
            size="sm"
            className={`rounded-full text-xs px-2 py-1 h-auto ${
              selectedFrequency === freq.value
                ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 text-white"
                : "bg-white/5 border-white/10 text-[#a0a0b0] hover:bg-white/10"
            }`}
            onClick={() => setSelectedFrequency(freq.value)}
          >
            {freq.value} Hz
          </Button>
        ))}
      </div>
    </div>
  )
}
