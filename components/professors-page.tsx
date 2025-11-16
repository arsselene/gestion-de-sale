'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Plus, Trash2 } from 'lucide-react'
import { useAppStore } from '@/lib/app-context'
import { AddProfessorDialog } from './add-professor-dialog'

const DAYS_ORDER = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08:15", "10:00", "11:45", "14:00", "15:30", "17:00"]

export function ProfessorsPage() {
  const { professors, classSessions, addProfessor, deleteProfessor } = useAppStore()
  const [selectedProfessor, setSelectedProfessor] = useState(professors[0])
  const [showAddDialog, setShowAddDialog] = useState(false)

  const currentSelected = professors.find((p) => p.professorId === selectedProfessor.professorId) || professors[0]

  const getProfessorClasses = (professorName: string) =>
    classSessions.filter((s) => s.instructor.includes(professorName))

  const getClassForSlot = (professorName: string, day: string, time: string) =>
    classSessions.find(
      (session) => session.instructor.includes(professorName) && session.day === day && session.startTime === time
    )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Professors Management</h2>
        <p className="text-muted-foreground mt-2">Manage professors and view their schedules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Professors List Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Professors</h3>
              <Button
                onClick={() => setShowAddDialog(true)}
                size="sm"
                variant="ghost"
                className="text-primary hover:bg-primary/10"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-2">
              {professors.map((prof) => (
                <div key={prof.professorId} className="flex items-center gap-2 group">
                  <button
                    onClick={() => setSelectedProfessor(prof)}
                    className={`flex-1 text-left px-4 py-3 rounded-lg transition-colors ${
                      currentSelected?.professorId === prof.professorId
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted bg-muted/50'
                    }`}
                  >
                    <div className="font-medium text-sm">{prof.name}</div>
                    <div className="text-xs opacity-75">{prof.totalHoursPerWeek}h/week</div>
                  </button>
                  <button
                    onClick={() => deleteProfessor(prof.professorId)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Professor Details */}
        <div className="lg:col-span-3 space-y-6">
          {currentSelected && (
            <>
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{currentSelected.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{currentSelected.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{currentSelected.totalHoursPerWeek}h</div>
                    <p className="text-xs text-muted-foreground">Total hours/week</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  {currentSelected.email}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Weekly Schedule ({getProfessorClasses(currentSelected.name).length} classes)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-3 font-semibold text-foreground">Time</th>
                        {DAYS_ORDER.map((day) => (
                          <th key={day} className="text-center py-3 px-3 font-semibold text-foreground text-sm">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIME_SLOTS.map((time) => (
                        <tr key={time} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-3 font-medium text-foreground whitespace-nowrap">{time}</td>
                          {DAYS_ORDER.map((day) => {
                            const classSession = getClassForSlot(currentSelected.name, day, time)
                            return (
                              <td key={`${day}-${time}`} className="py-3 px-3">
                                {classSession ? (
                                  <div className="bg-blue-500/10 border border-blue-200 rounded px-2 py-2 text-xs">
                                    <div className="font-semibold text-blue-900">{classSession.courseTitle}</div>
                                    <div className="text-blue-700 text-[10px]">{classSession.type} • {classSession.location}</div>
                                  </div>
                                ) : (
                                  <div className="text-center text-muted-foreground text-xs">—</div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {showAddDialog && (
        <AddProfessorDialog onClose={() => setShowAddDialog(false)} />
      )}
    </div>
  )
}
