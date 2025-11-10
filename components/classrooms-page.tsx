"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Edit2, Trash2 } from "lucide-react"

interface Classroom {
  id: string
  name: string
  capacity: number
  currentOccupancy: number
  doorStatus: "locked" | "unlocked"
  nextClass: string
  nextClassTime: string
}

export function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: "101",
      name: "Room 101 - Math",
      capacity: 30,
      currentOccupancy: 28,
      doorStatus: "locked",
      nextClass: "Algebra II",
      nextClassTime: "11:00 AM",
    },
    {
      id: "102",
      name: "Room 102 - Science",
      capacity: 25,
      currentOccupancy: 22,
      doorStatus: "unlocked",
      nextClass: "Biology",
      nextClassTime: "12:00 PM",
    },
    {
      id: "103",
      name: "Room 103 - English",
      capacity: 28,
      currentOccupancy: 25,
      doorStatus: "locked",
      nextClass: "Literature",
      nextClassTime: "1:00 PM",
    },
    {
      id: "104",
      name: "Room 104 - History",
      capacity: 32,
      currentOccupancy: 30,
      doorStatus: "locked",
      nextClass: "World History",
      nextClassTime: "2:00 PM",
    },
  ])

  const toggleDoor = (id: string) => {
    setClassrooms(
      classrooms.map((room) =>
        room.id === id ? { ...room, doorStatus: room.doorStatus === "locked" ? "unlocked" : "locked" } : room,
      ),
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Classrooms</h2>
          <p className="text-muted-foreground mt-2">Manage all classroom settings and door controls.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Add Classroom</Button>
      </div>

      {/* Classrooms Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Room Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Capacity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Occupancy</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Door Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Next Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classrooms.map((room) => (
                <tr key={room.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{room.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{room.capacity}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {room.currentOccupancy}/{room.capacity}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                        room.doorStatus === "locked" ? "bg-red-500/10 text-red-700" : "bg-green-500/10 text-green-700"
                      }`}
                    >
                      {room.doorStatus === "locked" ? <Lock size={14} /> : <Unlock size={14} />}
                      {room.doorStatus.charAt(0).toUpperCase() + room.doorStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div>{room.nextClass}</div>
                    <div className="text-xs text-muted-foreground/70">{room.nextClassTime}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleDoor(room.id)} className="text-xs">
                        {room.doorStatus === "locked" ? "Unlock" : "Lock"}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
