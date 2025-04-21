"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getCurrentUser, updateUser } from "@/services/auth-service"
import { Loader2, Save, User, Bell, Shield, CreditCard } from "lucide-react"

export default function PerfilPage() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Configurações de notificações
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [reminderNotifications, setReminderNotifications] = useState(true)

  useEffect(() => {
    setMounted(true)
    const userData = getCurrentUser()
    if (userData) {
      setUser(userData)
      setName(userData.name)
      setEmail(userData.email)
    }
  }, [])

  const handleSaveProfile = async () => {
    setIsLoading(true)

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateUser({
        name,
        email,
      })

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar suas informações. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram atualizadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao atualizar preferências:", error)
      toast({
        title: "Erro ao atualizar preferências",
        description: "Não foi possível atualizar suas preferências. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#050510] to-[#0c0c18] text-white">
      <NavBar />
      <main className="flex-1 container max-w-5xl py-12">
        <h1 className="text-3xl font-medium mb-8">Configurações da Conta</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white/10">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-white/10">
              <Shield className="h-4 w-4 mr-2" />
              Privacidade
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-white/10">
              <CreditCard className="h-4 w-4 mr-2" />
              Assinatura
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription className="text-[#a0a0b0]">Atualize suas informações pessoais.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <p className="text-sm text-[#a0a0b0]">
                    Conta criada em: {new Date(user.createdAt || Date.now()).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-sm text-[#a0a0b0]">
                    Método de login:{" "}
                    {user.provider === "email"
                      ? "Email e senha"
                      : user.provider === "google"
                        ? "Google"
                        : user.provider === "apple"
                          ? "Apple"
                          : "Demo"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription className="text-[#a0a0b0]">Escolha como deseja receber notificações.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por Email</p>
                    <p className="text-sm text-[#a0a0b0]">Receba atualizações e lembretes por email.</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-[#a0a0b0]">Receba notificações em tempo real no navegador.</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembretes de Prática</p>
                    <p className="text-sm text-[#a0a0b0]">Receba lembretes para suas sessões diárias.</p>
                  </div>
                  <Switch checked={reminderNotifications} onCheckedChange={setReminderNotifications} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Salvar Preferências
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Privacidade e Segurança</CardTitle>
                <CardDescription className="text-[#a0a0b0]">
                  Gerencie suas configurações de privacidade e segurança.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Histórico de Atividades</p>
                    <p className="text-sm text-[#a0a0b0]">Permitir que armazenemos seu histórico de sessões.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compartilhamento de Dados</p>
                    <p className="text-sm text-[#a0a0b0]">Permitir compartilhamento anônimo para melhorar o serviço.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10">
                    Excluir Todos os Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Informações de Assinatura</CardTitle>
                <CardDescription className="text-[#a0a0b0]">
                  Gerencie sua assinatura e métodos de pagamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Plano Atual</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.premium ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}
                    >
                      {user.premium ? "Premium" : "Gratuito"}
                    </span>
                  </div>
                  <p className="text-sm text-[#a0a0b0]">
                    {user.premium
                      ? "Você tem acesso a todas as sessões e recursos premium."
                      : "Acesso limitado a sessões gratuitas."}
                  </p>
                </div>

                {!user.premium && (
                  <div className="rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 p-4">
                    <p className="font-medium mb-2">Atualize para o Plano Premium</p>
                    <p className="text-sm text-[#a0a0b0] mb-4">
                      Desbloqueie acesso ilimitado a todas as sessões e recursos exclusivos.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Assinar Premium
                    </Button>
                  </div>
                )}

                {user.premium && (
                  <>
                    <div className="space-y-2">
                      <p className="font-medium">Método de Pagamento</p>
                      <div className="flex items-center gap-2 rounded-lg bg-white/5 p-3">
                        <div className="h-8 w-12 rounded bg-white/10"></div>
                        <div>
                          <p className="text-sm">•••• •••• •••• 4242</p>
                          <p className="text-xs text-[#a0a0b0]">Expira em 12/2025</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Histórico de Faturamento</p>
                      <div className="rounded-lg bg-white/5 p-3 mb-2">
                        <div className="flex justify-between mb-1">
                          <p className="text-sm">Assinatura Premium</p>
                          <p className="text-sm">R$19,90</p>
                        </div>
                        <p className="text-xs text-[#a0a0b0]">01/04/2023</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-3">
                        <div className="flex justify-between mb-1">
                          <p className="text-sm">Assinatura Premium</p>
                          <p className="text-sm">R$19,90</p>
                        </div>
                        <p className="text-xs text-[#a0a0b0]">01/03/2023</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-red-400 hover:text-red-300"
                    >
                      Cancelar Assinatura
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  )
}
