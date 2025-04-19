import { Heart, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface MeditationCardProps {
  title: string
  instructor: string
  coverUrl: string
  duration: string
}

export function MeditationCard({ title, instructor, coverUrl, duration }: MeditationCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square">
        <img
          src={coverUrl || "/placeholder.svg"}
          alt={`${title} por ${instructor}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <span className="text-white text-sm font-medium">{duration}</span>
        </div>
        <Button
          size="icon"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-purple-600 border-none h-12 w-12"
        >
          <Play className="h-5 w-5" />
          <span className="sr-only">Reproduzir {title}</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs px-2 h-7">
          Iniciar
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Favoritar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
