'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useAppStore } from '@/lib/app-context'

interface AddClassroomDialogProps {
  onClose: () => void
}

export function AddClassroomDialog({ onClose }: AddClassroomDialogProps) {
  const { addClassroom } = useAppStore()
  const [formData, setFormData] = useState({
    name: '',
    capacity: 30,
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('Classroom name is required')
      return
    }

    if (formData.capacity <= 0) {
      setError('Capacity must be greater than 0')
      return
    }

    addClassroom({
      name: formData.name,
      capacity: formData.capacity,
    })

    setFormData({ name: '', capacity: 30 })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Add New Classroom</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-600 text-sm">{error}</div>}

          <div>
            <label className="text-sm font-medium text-foreground block mb-1">
              Classroom Name (e.g., S-212)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="S-212"
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
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
              min="1"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Add Classroom
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
