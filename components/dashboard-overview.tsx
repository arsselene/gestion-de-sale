"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { DoorOpen, Clock, AlertCircle, Layers, TrendingUp, Users, RefreshCw } from "lucide-react"
import { simulateRealTimeUpdates, mockClassSessions, mockClassrooms, mockDoors } from "@/lib/real-time-data"

export function DashboardOverview() {
  const [realtimeStats, setRealtimeStats] = useState({
    doorsOpen: 3,
    classesInProgress: 0,
    alerts: 2,
    activeProfessors: 0,
    systemStatus: 98,
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [recentActivity, setRecentActivity] = useState([
    { time: "10:30 AM", action: "Room 101 door unlocked", status: "success" },
    { time: "10:15 AM", action: "Room 205 schedule updated", status: "info" },
    { time: "09:45 AM", action: "Room 103 door locked", status: "success" },
    { time: "09:20 AM", action: "System maintenance completed", status: "info" },
  ])

  useEffect(() => {
    const cleanup = simulateRealTimeUpdates(() => {
      // Calculate active classes
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinutes = now.getMinutes()
      const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`

      const classesInProgress = mockClassSessions.filter((session) => {
        return session.startTime <= currentTimeStr && session.endTime >= currentTimeStr
      }).length

      const activeProfessorsSet = new Set(
        mockClassSessions
          .filter((session) => session.startTime <= currentTimeStr && session.endTime >= currentTimeStr)
          .map((s) => s.instructor),
      )

      setRealtimeStats({
        doorsOpen: mockDoors.filter((d) => d.isOpen).length,
        classesInProgress,
        alerts:
          mockDoors.filter((d) => !d.isConnected).length +
          mockClassrooms.filter((c) => !c.isLocked && c.currentClass).length,
        activeProfessors: activeProfessorsSet.size,
        systemStatus: 98 - Math.random() * 2,
      })

      setCurrentTime(new Date())
    })

    return cleanup
  }, [])

  const stats = [
    {
      title: "Total Classrooms",
      value: mockClassrooms.length.toString(),
      icon: Layers,
      color: "bg-blue-500/10 text-blue-600",
      description: "Active classrooms",
    },
    {
      title: "Doors Open",
      value: realtimeStats.doorsOpen.toString(),
      icon: DoorOpen,
      color: "bg-green-500/10 text-green-600",
      description: "Currently unlocked",
    },
    {
      title: "Classes In Progress",
      value: realtimeStats.classesInProgress.toString(),
      icon: Clock,
      color: "bg-purple-500/10 text-purple-600",
      description: "Active sessions",
    },
    {
      title: "Alerts",
      value: realtimeStats.alerts.toString(),
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-600",
      description: "Require attention",
    },
    {
      title: "Active Professors",
      value: realtimeStats.activeProfessors.toString(),
      icon: Users,
      color: "bg-indigo-500/10 text-indigo-600",
      description: "Teaching now",
    },
    {
      title: "System Status",
      value: `${Math.round(realtimeStats.systemStatus)}%`,
      icon: TrendingUp,
      color: "bg-emerald-500/10 text-emerald-600",
      description: "Uptime",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-2">Live overview - Last updated: {currentTime.toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Real-time
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <div
                className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-green-500" : "bg-blue-500"}`}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
