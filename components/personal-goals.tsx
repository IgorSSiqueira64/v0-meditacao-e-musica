"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, CheckCircle2, Edit2 } from "lucide-react"

interface Goal {
  id: number
  text: string
  completed: boolean
}

export function PersonalGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: "Meditar por 10 minutos todos os dias", completed: false },
    { id: 2, text: "Completar o programa de 21 dias de foco", completed: false },
    { id: 3, text: "Reduzir o tempo de uso de redes sociais", completed: true },
  ])
  const [newGoal, setNewGoal] = useState("")
  const [editingGoal, setEditingGoal] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }])
      setNewGoal("")
    }
  }

  const toggleGoal = (id: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const startEditing = (goal: Goal) => {
    setEditingGoal(goal.id)
    setEditText(goal.text)
  }

  const saveEdit = () => {
    if (editText.trim() && editingGoal) {
      setGoals(goals.map((goal) => (goal.id === editingGoal ? { ...goal, text: editText } : goal)))
      setEditingGoal(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Adicione uma nova meta..."
          className="rounded-full bg-white/5 border-white/10 text-white focus:border-blue-500/50"
        />
        <Button
          onClick={addGoal}
          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Adicionar</span>
        </Button>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              goal.completed ? "bg-blue-900/10 border-blue-500/30" : "bg-white/5 border-white/10"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full h-6 w-6 ${goal.completed ? "text-green-400" : "text-[#a0a0b0]"}`}
              onClick={() => toggleGoal(goal.id)}
            >
              <CheckCircle2 className="h-5 w-5" />
              <span className="sr-only">Completar</span>
            </Button>

            <div className="flex-1">
              {editingGoal === goal.id ? (
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="rounded-full bg-white/5 border-white/10 text-white focus:border-blue-500/50 h-8 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  autoFocus
                />
              ) : (
                <p className={`text-sm ${goal.completed ? "text-[#a0a0b0] line-through" : "text-white"}`}>
                  {goal.text}
                </p>
              )}
            </div>

            <div className="flex gap-1">
              {editingGoal === goal.id ? (
                <Button variant="ghost" size="icon" className="rounded-full h-6 w-6 text-blue-400" onClick={saveEdit}>
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="sr-only">Salvar</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-6 w-6 text-[#a0a0b0]"
                  onClick={() => startEditing(goal)}
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-6 w-6 text-[#a0a0b0] hover:text-red-400"
                onClick={() => removeGoal(goal.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remover</span>
              </Button>
            </div>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-center py-6">
            <p className="text-[#a0a0b0]">Nenhuma meta definida ainda</p>
            <p className="text-xs text-[#a0a0b0] mt-2">
              "Defina metas tão altas que pareçam impossíveis. Então prove a si mesmo que está errado."
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
