import { Button } from "@/components/ui/button"

export function FeaturedContent() {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
      <div className="container relative z-10 py-12 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Encontre sua <span className="text-purple-600">Serenidade</span> Interior
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Descubra uma coleção cuidadosamente selecionada de músicas relaxantes, meditações guiadas e conteúdos
              inspiradores para nutrir sua mente, corpo e espírito.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Começar Agora
              </Button>
              <Button size="lg" variant="outline">
                Explorar Conteúdos
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Meditação e bem-estar"
              className="aspect-square rounded-full object-cover"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </div>
  )
}
