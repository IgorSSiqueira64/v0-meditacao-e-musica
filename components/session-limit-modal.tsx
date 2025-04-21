"use client"

import { useState, useEffect } from "react"
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getTimeUntilNextFreeSession } from "@/services/session-limit"

interface SessionLimitModalProps {
  open: boolean
  onClose: () => void
}

export function SessionLimitModal({ open, onClose }: SessionLimitModalProps) {
  const [timeUntilNext, setTimeUntilNext] = useState<string>("")

  useEffect(() => {
    if (open) {
      setTimeUntilNext(getTimeUntilNextFreeSession())
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#0a0a0a] to-[#121218] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            Limite de Sessões Atingido
          </DialogTitle>
          <DialogDescription className="text-[#a0a0b0]">Você já utilizou sua sessão gratuita diária.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-900/20 border border-red-500/30">
            <Clock className="h-5 w-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-white">
                Sua próxima sessão gratuita estará disponível em <span className="font-medium">{timeUntilNext}</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-xl p-4">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              Desbloqueie Acesso Ilimitado
            </h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Acesso ilimitado a todas as sessões</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Sessões exclusivas de alta frequência</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Visualizações dinâmicas avançadas</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Sem anúncios ou interrupções</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
          >
            Voltar
          </Button>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-[0_0_15px_rgba(66,153,225,0.3)] hover:shadow-[0_0_25px_rgba(66,153,225,0.5)] transition-all duration-300"
          >
            <Link href="/premium">Obter Premium</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
