"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Lock, Unlock } from "lucide-react"
import { mockClassrooms, mockClassSessions, type ClassSession } from "@/lib/real-time-data"

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08:15-09:45", "10:00-11:30", "11:45-13:15", "14:00-15:30", "15:30-17:00", "17:00-18:30"]

export function ClassroomsPage() {
  const [selectedClassroom, setSelectedClassroom] = useState(mockClassrooms[0])

  const getClassForSlot = (classroomId: string, day: string, timeSlot: string): ClassSession | null => {
    return (
      mockClassSessions.find(
        (session) =>
          session.location === classroomId && session.day === day && session.startTime === timeSlot.split("-")[0],
      ) || null
    )
  }

  const isClassroomLocked = (classroomId: string): boolean => {
    // Classroom is locked if no current class is in session
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`

    const hasCurrentClass = mockClassSessions.some(
      (session) =>
        session.location === classroomId && session.startTime <= currentTimeStr && session.endTime >= currentTimeStr,
    )

    return !hasCurrentClass
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Classrooms Weekly Schedule</h2>
        <p className="text-muted-foreground mt-2">View each classroom's lock status throughout the week</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Classrooms Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <h3 className="font-semibold text-foreground mb-4">Classrooms</h3>
            <div className="space-y-2">
              {mockClassrooms.map((classroom) => (
                <button
                  key={classroom.id}
                  onClick={() => setSelectedClassroom(classroom)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedClassroom?.id === classroom.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted bg-muted/50"
                  }`}
                >
                  <div className="font-medium text-sm">{classroom.name}</div>
                  <div className="text-xs opacity-75 flex items-center gap-1 mt-1">
                    {isClassroomLocked(classroom.id) ? (
                      <>
                        <Lock size={12} /> Locked
                      </>
                    ) : (
                      <>
                        <Unlock size={12} /> Open
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Schedule View */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedClassroom.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Capacity: {selectedClassroom.capacity}</p>
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${isClassroomLocked(selectedClassroom.id) ? "bg-red-500/10" : "bg-green-500/10"}`}
              >
                <div className="flex items-center gap-2">
                  {isClassroomLocked(selectedClassroom.id) ? (
                    <>
                      <Lock size={20} className="text-red-600" />
                      <span className="font-semibold text-red-600">Locked</span>
                    </>
                  ) : (
                    <>
                      <Unlock size={20} className="text-green-600" />
                      <span className="font-semibold text-green-600">Open</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Weekly Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Time</th>
                    {DAYS.map((day) => (
                      <th key={day} className="text-left py-3 px-3 font-semibold text-foreground text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIME_SLOTS.map((timeSlot) => (
                    <tr key={timeSlot} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-3 font-medium text-foreground whitespace-nowrap">{timeSlot}</td>
                      {DAYS.map((day) => {
                        const classSession = getClassForSlot(selectedClassroom.id, day, timeSlot)
                        return (
                          <td key={`${day}-${timeSlot}`} className="py-3 px-3">
                            {classSession ? (
                              <div className="bg-blue-500/10 border border-blue-200 dark:border-blue-800 rounded px-2 py-2 text-xs">
                                <div className="font-semibold text-blue-900 dark:text-blue-200">
                                  {classSession.courseTitle}
                                </div>
                                <div className="text-blue-700 dark:text-blue-300 text-[10px]">{classSession.type}</div>
                                <div className="text-blue-600 dark:text-blue-400 text-[10px]">
                                  {classSession.instructor}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-muted-foreground text-xs">-</div>
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

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">All Classrooms Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockClassrooms.map((classroom) => (
                <div key={classroom.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{classroom.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Capacity: {classroom.capacity}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        isClassroomLocked(classroom.id)
                          ? "bg-red-500/10 text-red-700"
                          : "bg-green-500/10 text-green-700"
                      }`}
                    >
                      {isClassroomLocked(classroom.id) ? "Locked" : "Open"}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Current: {classroom.currentClass?.courseTitle || "No class"}</p>
                    <p>Next: {classroom.nextClass?.courseTitle || "No class"}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
