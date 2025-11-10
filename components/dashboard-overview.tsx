"use client"

import { Card } from "@/components/ui/card"
import { DoorOpen, Clock, AlertCircle, Layers } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Classrooms",
      value: "24",
      icon: Layers,
      color: "bg-blue-500/10 text-blue-600",
      description: "Active classrooms",
    },
    {
      title: "Doors Open",
      value: "3",
      icon: DoorOpen,
      color: "bg-green-500/10 text-green-600",
      description: "Currently unlocked",
    },
    {
      title: "Classes Today",
      value: "18",
      icon: Clock,
      color: "bg-purple-500/10 text-purple-600",
      description: "Scheduled sessions",
    },
    {
      title: "Alerts",
      value: "2",
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-600",
      description: "Require attention",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your classroom overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-start justify-between">
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
          {[
            { time: "10:30 AM", action: "Room 101 door unlocked", status: "success" },
            { time: "10:15 AM", action: "Room 205 schedule updated", status: "info" },
            { time: "09:45 AM", action: "Room 103 door locked", status: "success" },
            { time: "09:20 AM", action: "System maintenance completed", status: "info" },
          ].map((activity, idx) => (
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
