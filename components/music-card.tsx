import { Heart, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface MusicCardProps {
  title: string
  artist: string
  coverUrl: string
  duration: string
}

export function MusicCard({ title, artist, coverUrl, duration }: MusicCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square">
        <img
          src={coverUrl || "/placeholder.svg"}
          alt={`${title} por ${artist}`}
          className="object-cover w-full h-full"
        />
        <Button
          size="icon"
          className="absolute bottom-2 right-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white border-none"
        >
          <Play className="h-4 w-4" />
          <span className="sr-only">Reproduzir {title}</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{artist}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <span className="text-xs text-muted-foreground">{duration}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Favoritar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
