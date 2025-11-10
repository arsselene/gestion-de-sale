"use client"

import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface Schedule {
  id: string
  room: string
  subject: string
  teacher: string
  startTime: string
  endTime: string
  day: string
}

export function SchedulePage() {
  const [schedules] = useState<Schedule[]>([
    {
      id: "1",
      room: "Room 101",
      subject: "Algebra II",
      teacher: "Mr. Johnson",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      day: "Monday",
    },
    {
      id: "2",
      room: "Room 102",
      subject: "Biology",
      teacher: "Ms. Smith",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      day: "Monday",
    },
    {
      id: "3",
      room: "Room 103",
      subject: "English Literature",
      teacher: "Mr. Davis",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      day: "Monday",
    },
    {
      id: "4",
      room: "Room 104",
      subject: "World History",
      teacher: "Ms. Wilson",
      startTime: "1:00 PM",
      endTime: "2:00 PM",
      day: "Monday",
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Schedule Management</h2>
          <p className="text-muted-foreground mt-2">View and manage classroom schedules.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
          <Plus size={18} />
          Add Schedule
        </Button>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{schedule.subject}</h3>
                <p className="text-sm text-muted-foreground">{schedule.room}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit2 size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Teacher</p>
                <p className="text-sm font-medium text-foreground">{schedule.teacher}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Start Time</p>
                  <p className="text-sm font-medium text-foreground">{schedule.startTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End Time</p>
                  <p className="text-sm font-medium text-foreground">{schedule.endTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Day</p>
                <p className="text-sm font-medium text-foreground">{schedule.day}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
