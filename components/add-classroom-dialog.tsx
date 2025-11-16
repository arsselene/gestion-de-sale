"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from 'lucide-react'

interface AddClassroomDialogProps {
  onAdd: (classroom: { id: string; name: string; capacity: number; isLocked: boolean; lastAccess: string; currentClass: null; nextClass: null }) => void
  onClose: () => void
}

export function AddClassroomDialog({ onAdd, onClose }: AddClassroomDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    capacity: 30,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.id.trim() && formData.name.trim() && formData.capacity > 0) {
      onAdd({
        id: formData.id,
        name: formData.name,
        capacity: formData.capacity,
        isLocked: false,
        lastAccess: "Never",
        currentClass: null,
        nextClass: null,
      })
      setFormData({ id: "", name: "", capacity: 30 })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Add New Classroom</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">
              Classroom ID (e.g., S-212)
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder="S-212"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">
              Classroom Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Classroom S-212"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">
              Capacity
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              min="1"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Classroom
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
