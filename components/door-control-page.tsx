"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, AlertCircle, CheckCircle, Edit2, Plus, Trash2 } from "lucide-react"
import { mockDoors, mockClassSessions } from "@/lib/real-time-data"

const DAYS_ORDER = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08:15", "10:00", "11:45", "14:00", "15:30", "17:00"]

export function DoorControlPage() {
  const [selectedDoor, setSelectedDoor] = useState(mockDoors[0])
  const [doors, setDoors] = useState(mockDoors)
  const [showModifyModal, setShowModifyModal] = useState(false)
  const [newClassForm, setNewClassForm] = useState({
    courseTitle: "",
    type: "Cours" as const,
    instructor: "",
    day: "Lundi",
    time: "10:00",
  })

  const lockedCount = doors.filter((d) => !d.isOpen).length
  const unlockedCount = doors.filter((d) => d.isOpen).length
  const disconnectedCount = doors.filter((d) => !d.isConnected).length

  const getClassesForDoor = (doorId: string) => {
    const classroom = doors.find((d) => d.id === doorId)?.classroomId
    return mockClassSessions.filter((c) => c.location === classroom)
  }

  const getClassForSlot = (doorId: string, day: string, time: string) => {
    const classroom = doors.find((d) => d.id === doorId)?.classroomId
    return mockClassSessions.find((c) => c.location === classroom && c.day === day && c.startTime === time)
  }

  const handleModifyClass = (dayToModify?: string, timeToModify?: string) => {
    if (!dayToModify || !timeToModify) {
      setShowModifyModal(true)
      return
    }

    if (!selectedDoor) return

    // Add new class (mock implementation)
    console.log("[v0] Adding class to door", selectedDoor.id, dayToModify, timeToModify, newClassForm)
    setShowModifyModal(false)
  }

  const handleDeleteClass = (day: string, time: string) => {
    console.log("[v0] Deleting class", day, time)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Door Control System</h2>
        <p className="text-muted-foreground mt-2">Monitor, control, and modify all classroom door schedules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Doors List Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <h3 className="font-semibold text-foreground mb-4">Doors</h3>
            <div className="space-y-2">
              {doors.map((door) => (
                <button
                  key={door.id}
                  onClick={() => setSelectedDoor(door)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedDoor?.id === door.id ? "bg-primary text-primary-foreground" : "hover:bg-muted bg-muted/50"
                  }`}
                >
                  <div className="font-medium text-sm">{door.name}</div>
                  <div className="text-xs opacity-75 flex items-center gap-1 mt-1">
                    <div className={`w-2 h-2 rounded-full ${door.isOpen ? "bg-orange-500" : "bg-green-500"}`} />
                    {door.isOpen ? "Open" : "Locked"}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Door Details */}
        <div className="lg:col-span-3">
          {selectedDoor && (
            <div className="space-y-6">
              {/* Status Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Locked Doors</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{lockedCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 text-green-600">
                      <Lock size={24} />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Open Doors</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{unlockedCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 text-orange-600">
                      <Unlock size={24} />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Disconnected</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{disconnectedCount}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 text-red-600">
                      <AlertCircle size={24} />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Selected Door Info Card */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedDoor.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">ID: {selectedDoor.id}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${selectedDoor.isConnected ? "bg-green-500" : "bg-red-500"}`} />
                </div>

                <div className="space-y-4">
                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        !selectedDoor.isOpen ? "bg-green-500/10 text-green-700" : "bg-orange-500/10 text-orange-700"
                      }`}
                    >
                      {!selectedDoor.isOpen ? <Lock size={14} /> : <Unlock size={14} />}
                      {selectedDoor.isOpen ? "Open" : "Locked"}
                    </span>
                  </div>

                  {/* Last Action */}
                  <div>
                    <p className="text-xs text-muted-foreground">Last Unlocked</p>
                    <p className="text-sm font-medium text-foreground">{selectedDoor.lastUnlockedBy}</p>
                    <p className="text-xs text-muted-foreground">{selectedDoor.lastUnlockedTime}</p>
                  </div>

                  {/* Battery Level */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">Battery Level</p>
                      <p className="text-sm font-medium text-foreground">{selectedDoor.batteryLevel}%</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          selectedDoor.batteryLevel > 50
                            ? "bg-green-500"
                            : selectedDoor.batteryLevel > 25
                              ? "bg-orange-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${selectedDoor.batteryLevel}%` }}
                      />
                    </div>
                  </div>

                  {/* Connection Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        selectedDoor.isConnected ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <CheckCircle size={16} />
                      {selectedDoor.isConnected ? "Connected" : "Disconnected"}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">Weekly Schedule & Classes</h4>
                  <Button size="sm" variant="outline" onClick={() => handleModifyClass()} className="gap-2">
                    <Plus size={16} />
                    Add Class
                  </Button>
                </div>

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
                            const classSession = getClassForSlot(selectedDoor.id, day, time)
                            return (
                              <td key={`${day}-${time}`} className="py-3 px-3">
                                {classSession ? (
                                  <div className="bg-blue-500/10 border border-blue-200 dark:border-blue-800 rounded px-2 py-2 text-xs group relative">
                                    <div className="font-semibold text-blue-900 dark:text-blue-200">
                                      {classSession.courseTitle}
                                    </div>
                                    <div className="text-blue-700 dark:text-blue-300 text-[10px]">
                                      {classSession.instructor}
                                    </div>
                                    <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                      <button
                                        onClick={() => handleModifyClass(day, time)}
                                        className="bg-blue-500 text-white rounded p-1 hover:bg-blue-600"
                                      >
                                        <Edit2 size={12} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteClass(day, time)}
                                        className="bg-red-500 text-white rounded p-1 hover:bg-red-600"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleModifyClass(day, time)}
                                    className="w-full h-10 text-center text-xs text-muted-foreground hover:bg-muted rounded transition-colors"
                                  >
                                    +
                                  </button>
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

              {/* All Doors Table */}
              <Card className="p-6 overflow-hidden">
                <h4 className="font-semibold text-foreground mb-4">All Doors Overview</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold text-foreground">Door</th>
                        <th className="text-left py-2 px-3 font-semibold text-foreground">Status</th>
                        <th className="text-left py-2 px-3 font-semibold text-foreground">Battery</th>
                        <th className="text-left py-2 px-3 font-semibold text-foreground">Connection</th>
                        <th className="text-left py-2 px-3 font-semibold text-foreground">Classes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doors.map((door) => (
                        <tr
                          key={door.id}
                          className="border-b border-border hover:bg-muted/30 cursor-pointer"
                          onClick={() => setSelectedDoor(door)}
                        >
                          <td className="py-3 px-3 font-medium text-foreground">{door.name}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                !door.isOpen ? "bg-green-500/10 text-green-700" : "bg-orange-500/10 text-orange-700"
                              }`}
                            >
                              {!door.isOpen ? <Lock size={12} /> : <Unlock size={12} />}
                              {door.isOpen ? "Open" : "Locked"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground text-xs">{door.batteryLevel}%</td>
                          <td className="py-3 px-3">
                            <span
                              className={`text-xs font-medium ${door.isConnected ? "text-green-600" : "text-red-600"}`}
                            >
                              {door.isConnected ? "Connected" : "Disconnected"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-xs text-muted-foreground">
                            {door.linkedClasses.length} classes
                          </td>
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

      {/* Modify Class Modal (placeholder) */}
      {showModifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add/Modify Class</h3>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Course Title"
                value={newClassForm.courseTitle}
                onChange={(e) => setNewClassForm({ ...newClassForm, courseTitle: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded"
              />
              <select
                value={newClassForm.day}
                onChange={(e) => setNewClassForm({ ...newClassForm, day: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded"
              >
                {DAYS_ORDER.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowModifyModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => handleModifyClass()} className="flex-1">
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
