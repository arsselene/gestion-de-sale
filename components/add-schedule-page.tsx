'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, X, Save } from 'lucide-react'
import { useAppStore } from '@/lib/app-context'

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]

export function AddSchedulePage() {
  const { classrooms, professors, classSessions, addClassSession, deleteClassSession } = useAppStore()
  const [showNewClass, setShowNewClass] = useState(false)
  const [newClass, setNewClass] = useState({
    courseTitle: '',
    type: 'Cours' as const,
    instructor: professors[0]?.name || '',
    location: classrooms[0]?.id || '',
    day: 'Dimanche',
    startTime: '08:15',
    endTime: '09:45',
    capacity: 30,
    currentOccupancy: 0,
    classLevel: '3ème',
  })

  const handleAddClass = () => {
    if (!newClass.courseTitle.trim() || !newClass.instructor.trim() || !newClass.location.trim()) {
      alert('Please fill all required fields')
      return
    }

    addClassSession({
      courseTitle: newClass.courseTitle,
      type: newClass.type,
      instructor: newClass.instructor,
      location: newClass.location,
      day: newClass.day,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      capacity: newClass.capacity,
      currentOccupancy: newClass.currentOccupancy,
      classLevel: newClass.classLevel,
    })

    setNewClass({
      courseTitle: '',
      type: 'Cours',
      instructor: professors[0]?.name || '',
      location: classrooms[0]?.id || '',
      day: 'Dimanche',
      startTime: '08:15',
      endTime: '09:45',
      capacity: 30,
      currentOccupancy: 0,
      classLevel: '3ème',
    })
    setShowNewClass(false)
  }

  // Group classes by day
  const getClassesByDay = (day: string) => classSessions.filter((c) => c.day === day)

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Add Classes to Schedule</h2>
          <p className="text-muted-foreground mt-2">Create and manage class sessions for each room</p>
        </div>
        <Button
          onClick={() => setShowNewClass(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Class
        </Button>
      </div>

      {/* Add Class Form */}
      {showNewClass && (
        <Card className="p-6 mb-8 border-2 border-primary">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">New Class Session</h3>
            <button onClick={() => setShowNewClass(false)} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Course Title *</label>
              <input
                type="text"
                value={newClass.courseTitle}
                onChange={(e) => setNewClass({ ...newClass, courseTitle: e.target.value })}
                placeholder="e.g., Advanced Database"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Day *</label>
              <select
                value={newClass.day}
                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {DAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Start Time *</label>
              <input
                type="time"
                value={newClass.startTime.replace(':', ':')}
                onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">End Time *</label>
              <input
                type="time"
                value={newClass.endTime.replace(':', ':')}
                onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Type *</label>
              <select
                value={newClass.type}
                onChange={(e) => setNewClass({ ...newClass, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Cours">Cours (Lecture)</option>
                <option value="TP">TP (Practical)</option>
                <option value="TD">TD (Tutorial)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Instructor *</label>
              <select
                value={newClass.instructor}
                onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {professors.map((prof) => (
                  <option key={prof.professorId} value={prof.name}>
                    {prof.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Classroom *</label>
              <select
                value={newClass.location}
                onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {classrooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Class Level</label>
              <input
                type="text"
                value={newClass.classLevel}
                onChange={(e) => setNewClass({ ...newClass, classLevel: e.target.value })}
                placeholder="3ème"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAddClass}
              className="flex-1 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Save Class
            </Button>
            <Button
              onClick={() => setShowNewClass(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Classes by Day */}
      <div className="space-y-6">
        {DAYS.map((day) => (
          <Card key={day} className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {day} ({getClassesByDay(day).length} classes)
            </h3>

            {getClassesByDay(day).length > 0 ? (
              <div className="space-y-3">
                {getClassesByDay(day).map((classSession) => (
                  <div key={classSession.id} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/30">
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{classSession.courseTitle}</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        <p>📅 {classSession.startTime} - {classSession.endTime}</p>
                        <p>👨‍🏫 {classSession.instructor}</p>
                        <p>🏛️ {classSession.location}</p>
                        <p>📚 {classSession.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteClassSession(classSession.id)}
                      className="text-muted-foreground hover:text-red-500 transition-all p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No classes scheduled for {day}</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
