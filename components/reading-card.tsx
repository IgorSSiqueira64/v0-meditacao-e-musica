import { BookOpen, Heart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ReadingCardProps {
  title: string
  author: string
  coverUrl: string
  category: string
}

export function ReadingCard({ title, author, coverUrl, category }: ReadingCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[3/4]">
        <img
          src={coverUrl || "/placeholder.svg"}
          alt={`${title} por ${author}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-xs">
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs gap-1">
          <BookOpen className="h-3 w-3" />
          Ler
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Favoritar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
