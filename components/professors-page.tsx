"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, Trash2, Eye, EyeOff, Mail } from "lucide-react"
import { QRCodeDisplay } from "./qr-code-display"
import { sendQRCodeEmail } from "@/app/actions/send-qr-email"

interface Professor {
  id: string
  name: string
  email: string
  department: string
  qrCode: string
  createdAt: string
}

export function ProfessorsPage() {
  const [professors, setProfessors] = useState<Professor[]>([
    {
      id: "prof-001",
      name: "Mr. Johnson",
      email: "johnson@school.edu",
      department: "Mathematics",
      qrCode: "PROF_001_MR_JOHNSON_MATH",
      createdAt: "2024-01-15",
    },
    {
      id: "prof-002",
      name: "Ms. Smith",
      email: "smith@school.edu",
      department: "Science",
      qrCode: "PROF_002_MS_SMITH_SCIENCE",
      createdAt: "2024-01-15",
    },
    {
      id: "prof-003",
      name: "Mr. Davis",
      email: "davis@school.edu",
      department: "English",
      qrCode: "PROF_003_MR_DAVIS_ENGLISH",
      createdAt: "2024-01-15",
    },
    {
      id: "prof-004",
      name: "Ms. Wilson",
      email: "wilson@school.edu",
      department: "History",
      qrCode: "PROF_004_MS_WILSON_HISTORY",
      createdAt: "2024-01-15",
    },
  ])

  const [showQRModal, setShowQRModal] = useState<string | null>(null)
  const [visibleQRs, setVisibleQRs] = useState<Set<string>>(new Set())
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ [key: string]: string }>({})

  const toggleQRVisibility = (id: string) => {
    const newVisible = new Set(visibleQRs)
    if (newVisible.has(id)) {
      newVisible.delete(id)
    } else {
      newVisible.add(id)
    }
    setVisibleQRs(newVisible)
  }

  const downloadQRCode = (professor: Professor) => {
    const svg = document.getElementById(`qr-${professor.id}`)
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

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

  const handleSendEmail = async (professor: Professor) => {
    setSendingEmail(professor.id)
    const result = await sendQRCodeEmail(professor.name, professor.email, professor.qrCode)
    setEmailStatus((prev) => ({
      ...prev,
      [professor.id]: result.message,
    }))
    setSendingEmail(null)

    // Clear status message after 3 seconds
    setTimeout(() => {
      setEmailStatus((prev) => ({
        ...prev,
        [professor.id]: "",
      }))
    }, 3000)
  }

  const deleteProfessor = (id: string) => {
    setProfessors(professors.filter((p) => p.id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Professors & Access Control</h2>
          <p className="text-muted-foreground mt-2">Manage professor QR codes for door access.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
          <Plus size={18} />
          Add Professor
        </Button>
      </div>

      {/* Professors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professors.map((professor) => (
          <Card key={professor.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{professor.name}</h3>
                <p className="text-sm text-muted-foreground">{professor.department}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteProfessor(professor.id)}
                className="text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{professor.email}</p>
              </div>

              {/* QR Code Section */}
              <div className="border border-border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-foreground">Access QR Code</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleQRVisibility(professor.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {visibleQRs.has(professor.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                </div>

                {visibleQRs.has(professor.id) ? (
                  <div className="flex flex-col items-center gap-3">
                    <div id={`qr-${professor.id}`} className="bg-white p-2 rounded">
                      <QRCodeDisplay value={professor.qrCode} size={120} />
                    </div>
                    <p className="text-xs text-muted-foreground text-center break-all">{professor.qrCode}</p>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center bg-background rounded border border-dashed border-border">
                    <p className="text-xs text-muted-foreground">QR Code hidden</p>
                  </div>
                )}
              </div>

              {/* Created Date */}
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium text-foreground">{professor.createdAt}</p>
              </div>

              {/* Status Message */}
              {emailStatus[professor.id] && (
                <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                  {emailStatus[professor.id]}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => downloadQRCode(professor)}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download
                </Button>
                <Button
                  onClick={() => handleSendEmail(professor)}
                  disabled={sendingEmail === professor.id}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  {sendingEmail === professor.id ? "Sending..." : "Send Email"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
