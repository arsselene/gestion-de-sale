"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Shield, Calendar } from "lucide-react"
import { mockClassSessions } from "@/lib/real-time-data"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "professor" | "staff"
  authorities: string[]
  createdAt: string
}

const DAYS_ORDER = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08:15", "10:00", "11:45", "14:00", "15:30", "17:00"]

export function SettingsPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "user-001",
      name: "Admin User",
      email: "admin@school.edu",
      role: "admin",
      authorities: ["manage_schedules", "manage_users", "manage_doors", "view_analytics", "add_schedule"],
      createdAt: "2024-01-01",
    },
    {
      id: "user-002",
      name: "Dr. Khiat",
      email: "khiat@polytechnic.dz",
      role: "professor",
      authorities: ["add_schedule", "view_schedule"],
      createdAt: "2024-01-15",
    },
    {
      id: "user-003",
      name: "Staff Member",
      email: "staff@school.edu",
      role: "staff",
      authorities: ["view_schedule"],
      createdAt: "2024-01-20",
    },
  ])

  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddSchedule, setShowAddSchedule] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "professor" as const })
  const [newSchedule, setNewSchedule] = useState({
    courseTitle: "",
    type: "Cours" as "Cours" | "TP" | "TD",
    instructor: "",
    location: "",
    day: "Lundi",
    startTime: "10:00",
    endTime: "11:30",
    capacity: "30",
    classLevel: "5ème",
  })

  const authorityOptions = [
    { id: "add_schedule", label: "Add Weekly Schedule", icon: Calendar },
    { id: "manage_schedules", label: "Manage All Schedules", icon: Calendar },
    { id: "view_schedule", label: "View Schedule", icon: Calendar },
    { id: "manage_users", label: "Manage Users", icon: Shield },
    { id: "manage_doors", label: "Manage Doors", icon: Shield },
    { id: "view_analytics", label: "View Analytics", icon: Shield },
  ]

  const toggleAuthority = (userId: string, authorityId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              authorities: user.authorities.includes(authorityId)
                ? user.authorities.filter((a) => a !== authorityId)
                : [...user.authorities, authorityId],
            }
          : user,
      ),
    )
  }

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as "admin" | "professor" | "staff",
        authorities: newUser.role === "professor" ? ["add_schedule", "view_schedule"] : ["view_schedule"],
        createdAt: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, user])
      setNewUser({ name: "", email: "", role: "professor" })
      setShowAddUser(false)
    }
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const addSchedule = () => {
    if (newSchedule.courseTitle && newSchedule.instructor) {
      const newClass = {
        id: `class-${Date.now()}`,
        courseTitle: newSchedule.courseTitle,
        type: newSchedule.type as "Cours" | "TP" | "TD",
        instructor: newSchedule.instructor,
        location: newSchedule.location,
        day: newSchedule.day,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        capacity: Number.parseInt(newSchedule.capacity),
        currentOccupancy: 0,
        classLevel: newSchedule.classLevel,
      }
      console.log("[v0] Adding new schedule:", newClass)
      setNewSchedule({
        courseTitle: "",
        type: "Cours",
        instructor: "",
        location: "",
        day: "Lundi",
        startTime: "10:00",
        endTime: "11:30",
        capacity: "30",
        classLevel: "5ème",
      })
      setShowAddSchedule(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Settings & Schedule Management</h2>
        <p className="text-muted-foreground mt-2">Manage user roles, authorities, and add new class schedules</p>
      </div>

      {/* Schedule Management Section */}
      <div className="mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">Add New Schedule</h3>
            <Button
              onClick={() => setShowAddSchedule(!showAddSchedule)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Plus size={18} />
              New Class Schedule
            </Button>
          </div>

          {showAddSchedule && (
            <div className="bg-muted/30 rounded-lg p-6 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Course Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Web Development"
                    value={newSchedule.courseTitle}
                    onChange={(e) => setNewSchedule({ ...newSchedule, courseTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Type</label>
                  <select
                    value={newSchedule.type}
                    onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value as "Cours" | "TP" | "TD" })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  >
                    <option value="Cours">Cours</option>
                    <option value="TP">TP</option>
                    <option value="TD">TD</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Instructor</label>
                  <input
                    type="text"
                    placeholder="e.g., Dr. Smith"
                    value={newSchedule.instructor}
                    onChange={(e) => setNewSchedule({ ...newSchedule, instructor: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Room 101"
                    value={newSchedule.location}
                    onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Day</label>
                  <select
                    value={newSchedule.day}
                    onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  >
                    {DAYS_ORDER.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Start Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 10:00"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">End Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 11:30"
                    value={newSchedule.endTime}
                    onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Capacity</label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={newSchedule.capacity}
                    onChange={(e) => setNewSchedule({ ...newSchedule, capacity: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={addSchedule} className="bg-green-600 text-white hover:bg-green-700">
                  Save Schedule
                </Button>
                <Button onClick={() => setShowAddSchedule(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Display current schedules */}
          <div className="bg-muted/20 rounded-lg p-4">
            <p className="text-sm font-medium text-foreground mb-3">Current Schedules ({mockClassSessions.length})</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {mockClassSessions.slice(0, 9).map((session) => (
                <div key={session.id} className="bg-background border border-border rounded-lg p-3 text-sm">
                  <div className="font-semibold text-foreground truncate">{session.courseTitle}</div>
                  <div className="text-xs text-muted-foreground">{session.instructor}</div>
                  <div className="text-xs text-muted-foreground">
                    {session.day} • {session.startTime}-{session.endTime}
                  </div>
                  <div className="text-xs text-muted-foreground">{session.location}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* User Management Section */}
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">User Management & Authorities</h3>
        <Button
          onClick={() => setShowAddUser(!showAddUser)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus size={18} />
          Add User
        </Button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "professor" | "staff" | "admin" })}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="professor">Professor</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={addUser} className="bg-green-600 text-white hover:bg-green-700">
              Add User
            </Button>
            <Button onClick={() => setShowAddUser(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-700">
                    <Shield size={12} />
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">Added {user.createdAt}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => deleteUser(user.id)} className="text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Authorities & Permissions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {authorityOptions.map((authority) => {
                  const Icon = authority.icon
                  const hasAuthority = user.authorities.includes(authority.id)
                  return (
                    <button
                      key={authority.id}
                      onClick={() => toggleAuthority(user.id, authority.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                        hasAuthority
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200"
                          : "border-border bg-background text-muted-foreground hover:border-blue-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          hasAuthority ? "border-blue-500 bg-blue-500" : "border-border bg-background"
                        }`}
                      >
                        {hasAuthority && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon size={14} />
                        <span>{authority.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
