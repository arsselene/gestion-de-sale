"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, EyeOff, Mail, Clock, Plus, Trash2 } from 'lucide-react'
import { QRCodeDisplay } from "./qr-code-display"
import { sendQRCodeEmail } from "@/app/actions/send-qr-email"
import { mockProfessors, mockClassSessions } from "@/lib/real-time-data"
import { useProfessorsStorage } from "@/hooks/use-professors-storage"
import { AddProfessorDialog } from "./add-professor-dialog"

const DAYS_ORDER = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"]
const TIME_SLOTS = ["08:15", "10:00", "11:45", "14:00", "15:30", "17:00"]

export function ProfessorsPage() {
  const { professors, addProfessor, deleteProfessor, isLoaded } = useProfessorsStorage(mockProfessors)
  const [selectedProfessor, setSelectedProfessor] = useState(mockProfessors[0])
  const [visibleQRs, setVisibleQRs] = useState<Set<string>>(new Set())
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ [key: string]: string }>({})
  const [showAddDialog, setShowAddDialog] = useState(false)

  const currentSelected = professors.find((p) => p.professorId === selectedProfessor.professorId) || professors[0]

  const toggleQRVisibility = (id: string) => {
    const newVisible = new Set(visibleQRs)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleQRs(newVisible)
  }

  const downloadQRCode = (professor: (typeof professors)[0]) => {
    const svg = document.getElementById(`qr-${professor.professorId}`)
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = `${professor.name}-access-qr.png`
        link.click()
      }

      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  const handleSendEmail = async (professor: (typeof professors)[0]) => {
    setSendingEmail(professor.professorId)
    const result = await sendQRCodeEmail(professor.name, professor.email, `PROF_${professor.professorId}`)
    setEmailStatus((prev) => ({
      ...prev,
      [professor.professorId]: result.message,
    }))
    setSendingEmail(null)

    setTimeout(() => {
      setEmailStatus((prev) => ({
        ...prev,
        [professor.professorId]: "",
      }))
    }, 3000)
  }

  const getClassForSlot = (professorName: string, day: string, time: string) =>
    mockClassSessions.find(
      (session) => session.instructor.includes(professorName) && session.day === day && session.startTime === time,
    )

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Professors Management</h2>
        <p className="text-muted-foreground mt-2">
          Manage professor QR codes, access control, and view individual schedules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Professors List Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Professors</h3>
              <Button
                onClick={() => setShowAddDialog(true)}
                size="sm"
                variant="ghost"
                className="text-primary hover:bg-primary/10"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-2">
              {professors.map((prof) => (
                <div
                  key={prof.professorId}
                  className="flex items-center gap-2 group"
                >
                  <button
                    onClick={() => setSelectedProfessor(prof)}
                    className={`flex-1 text-left px-4 py-3 rounded-lg transition-colors ${
                      currentSelected?.professorId === prof.professorId
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted bg-muted/50"
                    }`}
                  >
                    <div className="font-medium text-sm">{prof.name}</div>
                    <div className="text-xs opacity-75">{prof.totalHoursPerWeek}h/week</div>
                  </button>
                  <button
                    onClick={() => deleteProfessor(prof.professorId)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Professor Details */}
        <div className="lg:col-span-3 space-y-6">
          {currentSelected && (
            <>
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{currentSelected.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{currentSelected.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{currentSelected.totalHoursPerWeek}h</div>
                    <p className="text-xs text-muted-foreground">Total hours/week</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  {currentSelected.email}
                </div>
              </Card>

              {/* QR Code Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-foreground">Access QR Code</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleQRVisibility(currentSelected.professorId)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {visibleQRs.has(currentSelected.professorId) ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>

                <div className="border border-border rounded-lg p-6 bg-muted/30">
                  {visibleQRs.has(currentSelected.professorId) ? (
                    <div className="flex flex-col items-center gap-4">
                      <div id={`qr-${currentSelected.professorId}`} className="bg-white p-4 rounded">
                        <QRCodeDisplay value={`PROF_${currentSelected.professorId}`} size={150} />
                      </div>
                      <p className="text-xs text-muted-foreground text-center break-all">{`PROF_${currentSelected.professorId}`}</p>
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center bg-background rounded border border-dashed border-border">
                      <p className="text-sm text-muted-foreground">QR Code hidden (click eye icon to show)</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => downloadQRCode(currentSelected)}
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-10"
                >
                  <Download size={16} />
                  Download QR Code
                </Button>
                <Button
                  onClick={() => handleSendEmail(currentSelected)}
                  disabled={sendingEmail === currentSelected.professorId}
                  className="bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 h-10"
                >
                  <Mail size={16} />
                  {sendingEmail === currentSelected.professorId ? "Sending..." : "Send Email"}
                </Button>
              </div>

              {/* Status Message */}
              {emailStatus[currentSelected.professorId] && (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                  {emailStatus[currentSelected.professorId]}
                </div>
              )}

              <Card className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Weekly Schedule</h4>
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
                            const classSession = getClassForSlot(currentSelected.name, day, time)
                            return (
                              <td key={`${day}-${time}`} className="py-3 px-3">
                                {classSession ? (
                                  <div className="bg-blue-500/10 border border-blue-200 dark:border-blue-800 rounded px-2 py-2 text-xs">
                                    <div className="font-semibold text-blue-900 dark:text-blue-200">
                                      {classSession.courseTitle}
                                    </div>
                                    <div className="text-blue-700 dark:text-blue-300 text-[10px]">
                                      {classSession.type} • {classSession.location}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-center text-muted-foreground text-xs">—</div>
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
            </>
          )}
        </div>
      </div>

      {showAddDialog && (
        <AddProfessorDialog
          onAdd={addProfessor}
          onClose={() => setShowAddDialog(false)}
        />
      )}
    </div>
  )
}
