"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Clock, MapPin, Book, User } from "lucide-react"

interface ProfessorScheduleSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  courseTitle: string
  type: "Cours" | "TP" | "TD"
  location: string
  classLevel: string
}

interface ProfessorSchedule {
  id: string
  professorName: string
  department: string
  email: string
  totalHours: number
  classes: ProfessorScheduleSlot[]
}

const DAYS_ORDER = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]

export function ProfessorSchedulePage() {
  const [professorSchedules] = useState<ProfessorSchedule[]>([
    {
      id: "prof-khiat",
      professorName: "Dr. Khiat",
      department: "Génie des Systèmes Informatiques",
      email: "khiat@enpo.edu.dz",
      totalHours: 9,
      classes: [
        {
          id: "class-1",
          day: "Dimanche",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "Entreprise resource planning",
          type: "TP",
          location: "LAB-01",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-2",
          day: "Dimanche",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "ITIL",
          type: "TP",
          location: "LAB-01",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-3",
          day: "Lundi",
          startTime: "14h00",
          endTime: "15h30",
          courseTitle: "ERP",
          type: "Cours",
          location: "S-212",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-4",
          day: "Lundi",
          startTime: "15h30",
          endTime: "17h00",
          courseTitle: "ITIL",
          type: "Cours",
          location: "S212",
          classLevel: "3ème Année Ingénieur",
        },
      ],
    },
    {
      id: "prof-belbachir",
      professorName: "Dr. Belbachir",
      department: "Génie des Systèmes Informatiques",
      email: "belbachir@enpo.edu.dz",
      totalHours: 7.5,
      classes: [
        {
          id: "class-5",
          day: "Dimanche",
          startTime: "14h00",
          endTime: "15h30",
          courseTitle: "Systèmes Embarqués",
          type: "Cours",
          location: "S-214",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-6",
          day: "Dimanche",
          startTime: "15h30",
          endTime: "17h00",
          courseTitle: "Systèmes Embarqués",
          type: "TD",
          location: "S-214",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-7",
          day: "Jeudi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "Travail collaboratif",
          type: "TP",
          location: "LAB-01",
          classLevel: "3ème Année Ingénieur",
        },
      ],
    },
    {
      id: "prof-kabli",
      professorName: "Dr. Kabli",
      department: "Génie des Systèmes Informatiques",
      email: "kabli@enpo.edu.dz",
      totalHours: 8.25,
      classes: [
        {
          id: "class-8",
          day: "Lundi",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "Fouille de données et recherche d'information",
          type: "TP",
          location: "LAB-03",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-9",
          day: "Lundi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "Fouille de données et recherche d'information",
          type: "Cours",
          location: "S-212",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-10",
          day: "Mercredi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "Fouille de données et recherche d'information",
          type: "TD",
          location: "S-212",
          classLevel: "3ème Année Ingénieur",
        },
      ],
    },
    {
      id: "prof-mezzoudj",
      professorName: "Dr. Mezzoudj",
      department: "Génie des Systèmes Informatiques",
      email: "mezzoudj@enpo.edu.dz",
      totalHours: 10.5,
      classes: [
        {
          id: "class-11",
          day: "Mardi",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "EDI",
          type: "Cours",
          location: "S-212",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-12",
          day: "Mardi",
          startTime: "11h45",
          endTime: "13h15",
          courseTitle: "EDI",
          type: "TP",
          location: "LAB-01",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-13",
          day: "Mercredi",
          startTime: "08h15",
          endTime: "09h45",
          courseTitle: "Sécurité des réseaux de Télécommunication",
          type: "TP",
          location: "LAB-03",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-14",
          day: "Mercredi",
          startTime: "10h00",
          endTime: "11h30",
          courseTitle: "Sécurité des réseaux de Télécommunication",
          type: "Cours",
          location: "S-212",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-15",
          day: "Mercredi",
          startTime: "14h00",
          endTime: "15h30",
          courseTitle: "Cloud Computing Virtualisation",
          type: "Cours",
          location: "S-212",
          classLevel: "3ème Année Ingénieur",
        },
        {
          id: "class-16",
          day: "Mercredi",
          startTime: "15h30",
          endTime: "17h00",
          courseTitle: "Cloud Computing Virtualisation",
          type: "TP",
          location: "LAB-02",
          classLevel: "3ème Année Ingénieur",
        },
      ],
    },
  ])

  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorSchedule | null>(professorSchedules[0])

  const getClassesByDay = (professor: ProfessorSchedule) => {
    const classesByDay = new Map<string, ProfessorScheduleSlot[]>()
    DAYS_ORDER.forEach((day) => {
      classesByDay.set(
        day,
        professor.classes.filter((cls) => cls.day === day),
      )
    })
    return classesByDay
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Cours":
        return "bg-blue-100 text-blue-900"
      case "TP":
        return "bg-purple-100 text-purple-900"
      case "TD":
        return "bg-green-100 text-green-900"
      default:
        return "bg-gray-100 text-gray-900"
    }
  }

  const calculateDayHours = (classes: ProfessorScheduleSlot[]) => {
    return classes.reduce((total, cls) => {
      const start = Number.parseInt(cls.startTime.split("h")[0])
      const end = Number.parseInt(cls.endTime.split("h")[0])
      return total + (end - start)
    }, 0)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Professor Schedule Management</h2>
        <p className="text-muted-foreground mt-2">View and manage individual professor teaching schedules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Professors List Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Professors</h3>
            <div className="space-y-2">
              {professorSchedules.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => setSelectedProfessor(prof)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedProfessor?.id === prof.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted bg-muted/50"
                  }`}
                >
                  <div className="font-medium text-sm">{prof.professorName}</div>
                  <div className="text-xs opacity-75">{prof.totalHours}h/week</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Professor Schedule Details */}
        <div className="lg:col-span-3">
          {selectedProfessor && (
            <div className="space-y-6">
              {/* Professor Info Card */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedProfessor.professorName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedProfessor.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{selectedProfessor.totalHours}h</div>
                    <p className="text-xs text-muted-foreground">Total hours/week</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={16} />
                  {selectedProfessor.email}
                </div>
              </Card>

              {/* Weekly Schedule Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DAYS_ORDER.map((day) => {
                  const dayClasses = getClassesByDay(selectedProfessor).get(day) || []
                  const dayHours = calculateDayHours(dayClasses)

                  return (
                    <Card key={day} className="p-4">
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground">{day}</h4>
                        {dayHours > 0 && <p className="text-xs text-muted-foreground">{dayHours}h of classes</p>}
                        {dayHours === 0 && <p className="text-xs text-muted-foreground">No classes</p>}
                      </div>

                      <div className="space-y-3">
                        {dayClasses.length > 0 ? (
                          dayClasses.map((cls) => (
                            <div key={cls.id} className="border border-border rounded-lg p-3 bg-muted/30">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-foreground">{cls.courseTitle}</div>
                                  <span
                                    className={`inline-block text-xs px-2 py-1 rounded mt-1 font-medium ${getTypeColor(
                                      cls.type,
                                    )}`}
                                  >
                                    {cls.type}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2 text-xs text-muted-foreground mt-2">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} />
                                  {cls.startTime} - {cls.endTime}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  {cls.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Book size={14} />
                                  {cls.classLevel}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-muted-foreground text-sm">No classes scheduled</div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Full Week Overview Table */}
              <Card className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Weekly Overview</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold text-foreground">Time</th>
                        {DAYS_ORDER.map((day) => (
                          <th key={day} className="text-left py-2 px-3 font-semibold text-foreground">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(new Set(selectedProfessor.classes.map((c) => c.startTime))).map((time) => (
                        <tr key={time} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-3 font-medium text-foreground">{time}</td>
                          {DAYS_ORDER.map((day) => {
                            const cls = selectedProfessor.classes.find((c) => c.day === day && c.startTime === time)
                            return (
                              <td key={`${day}-${time}`} className="py-3 px-3">
                                {cls ? (
                                  <div className={`rounded p-2 text-xs ${getTypeColor(cls.type)}`}>
                                    <div className="font-medium">{cls.courseTitle}</div>
                                    <div>{cls.type}</div>
                                    <div>{cls.location}</div>
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground">—</div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
