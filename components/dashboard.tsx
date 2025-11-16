"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { ClassroomsPage } from "./classrooms-page"
import { SchedulePage } from "./schedule-page"
import { DoorControlPage } from "./door-control-page"
import { ProfessorsPage } from "./professors-page"
import { SettingsPage } from "./settings-page"
import { AddSchedulePage } from "./add-schedule-page"
import { ProfessorSchedulePage } from "./professor-schedule-page"

type Page =
  | "dashboard"
  | "classrooms"
  | "schedule"
  | "professor-schedule"
  | "doors"
  | "professors"
  | "settings"
  | "add-schedule"

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {currentPage === "dashboard" && <DashboardOverview />}
        {currentPage === "classrooms" && <ClassroomsPage />}
        {currentPage === "schedule" && <SchedulePage />}
        {currentPage === "professor-schedule" && <ProfessorSchedulePage />}
        {currentPage === "doors" && <DoorControlPage />}
        {currentPage === "professors" && <ProfessorsPage />}
        {currentPage === "settings" && <SettingsPage />}
        {currentPage === "add-schedule" && <AddSchedulePage />}
      </main>
    </div>
  )
}
