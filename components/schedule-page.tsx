'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Clock, MapPin, Users } from 'lucide-react'
import { useAppStore } from '@/lib/app-context'

const DAYS_ORDER = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08:15", "10:00", "11:45", "14:00", "15:30", "17:00"]

const getTypeColor = (type: string) => {
  switch (type) {
    case "Cours":
      return "bg-blue-500/10 text-blue-700 border-blue-200"
    case "TP":
      return "bg-purple-500/10 text-purple-700 border-purple-200"
    case "TD":
      return "bg-green-500/10 text-green-700 border-green-200"
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200"
  }
}

export function SchedulePage() {
  const { classSessions } = useAppStore()
  const [selectedDay, setSelectedDay] = useState("Dimanche")

  const getDaySchedules = (day: string) => classSessions.filter((s) => s.day === day)
  const getScheduleForSlot = (day: string, time: string) =>
    classSessions.find((s) => s.day === day && s.startTime === time)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Weekly Schedule</h2>
        <p className="text-muted-foreground mt-2">Complete view of all classes scheduled across the week</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Days Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <h3 className="font-semibold text-foreground mb-4">Days</h3>
            <div className="space-y-2">
              {DAYS_ORDER.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedDay === day ? "bg-primary text-primary-foreground" : "hover:bg-muted bg-muted/50"
                  }`}
                >
                  <div className="font-medium text-sm">{day}</div>
                  <div className="text-xs opacity-75">{getDaySchedules(day).length} classes</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Schedule Details */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedDay}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Classes scheduled: {getDaySchedules(selectedDay).length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{getDaySchedules(selectedDay).length}</div>
                <p className="text-xs text-muted-foreground">Total classes</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {getDaySchedules(selectedDay).length > 0 ? (
              getDaySchedules(selectedDay).map((schedule) => (
                <Card key={schedule.id} className={`p-4 border ${getTypeColor(schedule.type)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-base text-foreground">{schedule.courseTitle}</div>
                      <span className={`inline-block text-xs px-3 py-1 rounded-full mt-2 font-medium bg-opacity-20 border`}>
                        {schedule.type}
                      </span>
                    </div>
                    <div className="text-right text-sm font-medium text-foreground">
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mt-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{schedule.location} • Class {schedule.classLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{schedule.instructor}</span>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-4">
                <div className="text-center py-6 text-muted-foreground">No classes scheduled for {selectedDay}</div>
              </Card>
            )}
          </div>

          <Card className="p-6 overflow-hidden">
            <h4 className="font-semibold text-foreground mb-4">Complete Weekly Schedule</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-semibold text-foreground">Time</th>
                    {DAYS_ORDER.map((day) => (
                      <th key={day} className="text-center py-3 px-3 font-semibold text-foreground">
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
                        const schedule = getScheduleForSlot(day, time)
                        return (
                          <td key={`${day}-${time}`} className="py-3 px-3">
                            {schedule ? (
                              <div className={`rounded p-2 text-xs border ${getTypeColor(schedule.type)}`}>
                                <div className="font-semibold">{schedule.courseTitle}</div>
                                <div className="opacity-90">{schedule.type}</div>
                                <div className="opacity-75">{schedule.instructor}</div>
                                <div className="opacity-75">{schedule.location}</div>
                              </div>
                            ) : (
                              <div className="text-muted-foreground text-center">—</div>
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
      </div>
    </div>
  )
}
