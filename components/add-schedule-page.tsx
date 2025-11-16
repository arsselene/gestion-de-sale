"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Save, X } from "lucide-react"

interface ScheduleSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  courseTitle: string
  type: "Cours" | "TP" | "TD"
  instructor: string
  location: string
}

interface WeeklySchedule {
  id: string
  name: string
  department: string
  specialty: string
  semester: string
  createdAt: string
  slots: ScheduleSlot[]
}

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08h15", "09h00", "10h00", "11h45", "14h00", "15h30", "17h00"]

export function AddSchedulePage() {
  const [schedules, setSchedules] = useState<WeeklySchedule[]>([
    {
      id: "sched-001",
      name: "3ème Année Ingénieur",
      department: "Génie des Systèmes Informatiques",
      specialty: "Réseaux et Télécommunication (RT)",
      semester: "Semestre 5",
      createdAt: "2024-01-15",
      slots: [
        // Dimanche (Sunday)
        {
          id: "slot-1",
          day: "Dimanche",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "Entreprise resource planning",
          type: "TP",
          instructor: "Dr. Khiat / Mlle Senoussaoui",
          location: "LAB-01",
        },
        {
          id: "slot-2",
          day: "Dimanche",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "ITIL",
          type: "TP",
          instructor: "Dr. Khiat / Mlle Senoussaoui",
          location: "LAB-01",
        },
        {
          id: "slot-3",
          day: "Dimanche",
          startTime: "14h00",
          endTime: "15h30",
          courseTitle: "Systèmes Embarqués",
          type: "Cours",
          instructor: "Dr. Belbachir",
          location: "S-214",
        },
        {
          id: "slot-4",
          day: "Dimanche",
          startTime: "15h30",
          endTime: "17h00",
          courseTitle: "Systèmes Embarqués",
          type: "TD",
          instructor: "Dr. Belbachir",
          location: "S-214",
        },
        // Lundi (Monday)
        {
          id: "slot-5",
          day: "Lundi",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "Travail collaboratif",
          type: "Cours",
          instructor: "Mme SI Moussa",
          location: "S-212",
        },
        {
          id: "slot-6",
          day: "Lundi",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "Fouille de données et recherche d'information",
          type: "TP",
          instructor: "Dr. Kabli",
          location: "LAB-03",
        },
        {
          id: "slot-7",
          day: "Lundi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "Fouille de données et recherche d'information",
          type: "Cours",
          instructor: "Dr. Kabli",
          location: "S-212",
        },
        {
          id: "slot-8",
          day: "Lundi",
          startTime: "14h00",
          endTime: "15h30",
          courseTitle: "ERP",
          type: "Cours",
          instructor: "Dr. Khiat",
          location: "S-212",
        },
        {
          id: "slot-9",
          day: "Lundi",
          startTime: "15h30",
          endTime: "17h00",
          courseTitle: "ITIL",
          type: "Cours",
          instructor: "MR Khiat",
          location: "S212",
        },
        // Mardi (Tuesday)
        {
          id: "slot-10",
          day: "Mardi",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "EDI",
          type: "Cours",
          instructor: "Dr. Mezzoudj",
          location: "S-212",
        },
        {
          id: "slot-11",
          day: "Mardi",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "Antennes imprimées",
          type: "Cours",
          instructor: "Dr. Didouh",
          location: "S-212",
        },
        {
          id: "slot-12",
          day: "Mardi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "EDI",
          type: "TP",
          instructor: "Dr. Mezzoudj",
          location: "LAB-01",
        },
        // Mercredi (Wednesday)
        {
          id: "slot-13",
          day: "Mercredi",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "Sécurité des réseaux de Télécommunication",
          type: "TP",
          instructor: "Dr. Mezzoudj",
          location: "LAB-03",
        },
        {
          id: "slot-14",
          day: "Mercredi",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "Sécurité des réseaux de Télécommunication",
          type: "Cours",
          instructor: "Dr. Mezzoudj",
          location: "S-212",
        },
        {
          id: "slot-15",
          day: "Mercredi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "Fouille de données et recherche d'information",
          type: "TD",
          instructor: "Dr. Kabli",
          location: "S-212",
        },
        {
          id: "slot-16",
          day: "Mercredi",
          startTime: "14h00",
          endTime: "15h30",
          courseTitle: "Cloud Computing Virtualisation",
          type: "Cours",
          instructor: "Dr. Mezzoudj",
          location: "S-212",
        },
        {
          id: "slot-17",
          day: "Mercredi",
          startTime: "15h30",
          endTime: "17h00",
          courseTitle: "Cloud Computing Virtualisation",
          type: "TP",
          instructor: "Dr. Mezzoudj",
          location: "LAB-02",
        },
        // Jeudi (Thursday)
        {
          id: "slot-18",
          day: "Jeudi",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "Rédaction scientifique",
          type: "Cours",
          instructor: "Pr. Brahimi",
          location: "S-212",
        },
        {
          id: "slot-19",
          day: "Jeudi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "Travail collaboratif",
          type: "TP",
          instructor: "Dr. Belbachir",
          location: "LAB-01",
        },
      ],
    },
  ])

  const [editingSchedule, setEditingSchedule] = useState<WeeklySchedule | null>(null)
  const [showNewSlot, setShowNewSlot] = useState(false)
  const [newSlot, setNewSlot] = useState<Partial<ScheduleSlot>>({
    day: "Dimanche",
    startTime: "08h15",
    endTime: "09h45",
    courseTitle: "",
    type: "Cours",
    instructor: "",
    location: "",
  })

  const addSchedule = () => {
    const schedule: WeeklySchedule = {
      id: `sched-${Date.now()}`,
      name: "New Schedule",
      department: "Department",
      specialty: "Specialty",
      semester: "Semester",
      createdAt: new Date().toISOString().split("T")[0],
      slots: [],
    }
    setSchedules([...schedules, schedule])
  }

  const addSlotToSchedule = (scheduleId: string) => {
    if (!newSlot.courseTitle || !newSlot.instructor || !newSlot.location) {
      alert("Please fill all fields")
      return
    }

    setSchedules(
      schedules.map((sched) =>
        sched.id === scheduleId
          ? {
              ...sched,
              slots: [
                ...sched.slots,
                {
                  id: `slot-${Date.now()}`,
                  day: newSlot.day || "Dimanche",
                  startTime: newSlot.startTime || "08h15",
                  endTime: newSlot.endTime || "09h45",
                  courseTitle: newSlot.courseTitle || "",
                  type: (newSlot.type || "Cours") as "Cours" | "TP" | "TD",
                  instructor: newSlot.instructor || "",
                  location: newSlot.location || "",
                },
              ],
            }
          : sched,
      ),
    )
    setNewSlot({
      day: "Dimanche",
      startTime: "08h15",
      endTime: "09h45",
      courseTitle: "",
      type: "Cours",
      instructor: "",
      location: "",
    })
    setShowNewSlot(false)
  }

  const deleteSlot = (scheduleId: string, slotId: string) => {
    setSchedules(
      schedules.map((sched) =>
        sched.id === scheduleId
          ? {
              ...sched,
              slots: sched.slots.filter((slot) => slot.id !== slotId),
            }
          : sched,
      ),
    )
  }

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Schedule Management</h2>
          <p className="text-muted-foreground mt-2">Create and manage weekly class schedules.</p>
        </div>
        <Button
          onClick={addSchedule}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Schedule
        </Button>
      </div>

      {/* Schedules List */}
      <div className="space-y-6">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{schedule.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{schedule.department}</p>
                <p className="text-sm text-muted-foreground">{schedule.specialty}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteSchedule(schedule.id)}
                className="text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        className="border border-border px-4 py-3 text-left text-sm font-semibold text-foreground"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Get unique times */}
                  {Array.from(new Set(schedule.slots.map((s) => s.startTime))).map((time) => (
                    <tr key={time} className="hover:bg-muted/50">
                      {DAYS.map((day) => {
                        const slot = schedule.slots.find((s) => s.day === day && s.startTime === time)
                        return (
                          <td key={`${day}-${time}`} className="border border-border px-4 py-4 text-sm">
                            {slot ? (
                              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <div className="font-semibold text-blue-900">{slot.courseTitle}</div>
                                <div className="text-xs text-blue-700 mt-1">{slot.type}</div>
                                <div className="text-xs text-blue-600 mt-1">{slot.instructor}</div>
                                <div className="text-xs text-blue-600">{slot.location}</div>
                                <div className="text-xs text-blue-600">
                                  {slot.startTime} - {slot.endTime}
                                </div>
                                <button
                                  onClick={() => deleteSlot(schedule.id, slot.id)}
                                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={12} className="inline mr-1" />
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <div className="h-24 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">
                                —
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Slot Form */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">Add Class Slot</h4>
                <Button
                  onClick={() => setShowNewSlot(!showNewSlot)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus size={14} />
                  Add Slot
                </Button>
              </div>

              {showNewSlot && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  >
                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Start Time (e.g., 08h15)"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />

                  <input
                    type="text"
                    placeholder="End Time (e.g., 09h45)"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />

                  <select
                    value={newSlot.type}
                    onChange={(e) => setNewSlot({ ...newSlot, type: e.target.value as "Cours" | "TP" | "TD" })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  >
                    <option value="Cours">Cours (Lecture)</option>
                    <option value="TP">TP (Practical)</option>
                    <option value="TD">TD (Tutorial)</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Course Title"
                    value={newSlot.courseTitle}
                    onChange={(e) => setNewSlot({ ...newSlot, courseTitle: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />

                  <input
                    type="text"
                    placeholder="Instructor"
                    value={newSlot.instructor}
                    onChange={(e) => setNewSlot({ ...newSlot, instructor: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />

                  <input
                    type="text"
                    placeholder="Location (e.g., LAB-01)"
                    value={newSlot.location}
                    onChange={(e) => setNewSlot({ ...newSlot, location: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />

                  <div className="flex gap-2 lg:col-span-1">
                    <Button
                      onClick={() => addSlotToSchedule(schedule.id)}
                      className="flex-1 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <Save size={14} />
                      Save
                    </Button>
                    <Button onClick={() => setShowNewSlot(false)} variant="outline" className="flex-1">
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
