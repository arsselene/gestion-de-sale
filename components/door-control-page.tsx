"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, AlertCircle, CheckCircle, QrCode } from "lucide-react"
import { QRScanner } from "./qr-scanner"

interface Door {
  id: string
  room: string
  status: "locked" | "unlocked"
  lastAction: string
  lastActionTime: string
  batteryLevel: number
  connectionStatus: "connected" | "disconnected"
  requiresQRCode: boolean
  authorizedQRCodes: string[]
}

export function DoorControlPage() {
  const [doors, setDoors] = useState<Door[]>([
    {
      id: "door-101",
      room: "Room 101",
      status: "locked",
      lastAction: "Locked by Admin",
      lastActionTime: "10:30 AM",
      batteryLevel: 85,
      connectionStatus: "connected",
      requiresQRCode: true,
      authorizedQRCodes: ["PROF_001_MR_JOHNSON_MATH"],
    },
    {
      id: "door-102",
      room: "Room 102",
      status: "unlocked",
      lastAction: "Unlocked by Teacher",
      lastActionTime: "10:15 AM",
      batteryLevel: 72,
      connectionStatus: "connected",
      requiresQRCode: true,
      authorizedQRCodes: ["PROF_002_MS_SMITH_SCIENCE"],
    },
    {
      id: "door-103",
      room: "Room 103",
      status: "locked",
      lastAction: "Locked by System",
      lastActionTime: "09:45 AM",
      batteryLevel: 91,
      connectionStatus: "connected",
      requiresQRCode: true,
      authorizedQRCodes: ["PROF_003_MR_DAVIS_ENGLISH"],
    },
    {
      id: "door-104",
      room: "Room 104",
      status: "locked",
      lastAction: "Locked by Admin",
      lastActionTime: "09:20 AM",
      batteryLevel: 45,
      connectionStatus: "disconnected",
      requiresQRCode: true,
      authorizedQRCodes: ["PROF_004_MS_WILSON_HISTORY"],
    },
    {
      id: "door-105",
      room: "Room 105",
      status: "unlocked",
      lastAction: "Unlocked by Teacher",
      lastActionTime: "08:50 AM",
      batteryLevel: 68,
      connectionStatus: "connected",
      requiresQRCode: false,
      authorizedQRCodes: [],
    },
    {
      id: "door-106",
      room: "Room 106",
      status: "locked",
      lastAction: "Locked by System",
      lastActionTime: "08:30 AM",
      batteryLevel: 55,
      connectionStatus: "connected",
      requiresQRCode: false,
      authorizedQRCodes: [],
    },
  ])

  const [showQRScanner, setShowQRScanner] = useState(false)
  const [selectedDoorForQR, setSelectedDoorForQR] = useState<string | null>(null)

  const toggleDoor = (id: string) => {
    setDoors(
      doors.map((door) =>
        door.id === id
          ? {
              ...door,
              status: door.status === "locked" ? "unlocked" : "locked",
              lastAction: door.status === "locked" ? "Unlocked by Admin" : "Locked by Admin",
              lastActionTime: "Just now",
            }
          : door,
      ),
    )
  }

  const handleQRScan = (qrCode: string) => {
    if (!selectedDoorForQR) return

    const door = doors.find((d) => d.id === selectedDoorForQR)
    if (!door) return

    if (door.authorizedQRCodes.includes(qrCode)) {
      setDoors(
        doors.map((d) =>
          d.id === selectedDoorForQR
            ? {
                ...d,
                status: "unlocked",
                lastAction: `Unlocked by ${qrCode.split("_")[2]}`,
                lastActionTime: "Just now",
              }
            : d,
        ),
      )
      setShowQRScanner(false)
      setSelectedDoorForQR(null)
    } else {
      alert("Invalid QR code for this door!")
    }
  }

  const openQRScanner = (doorId: string) => {
    setSelectedDoorForQR(doorId)
    setShowQRScanner(true)
  }

  const lockedCount = doors.filter((d) => d.status === "locked").length
  const unlockedCount = doors.filter((d) => d.status === "unlocked").length
  const disconnectedCount = doors.filter((d) => d.connectionStatus === "disconnected").length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Door Control System</h2>
        <p className="text-muted-foreground mt-2">
          Monitor and control all classroom doors in real-time with QR code access.
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-sm text-muted-foreground">Unlocked Doors</p>
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

      {/* Door Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doors.map((door) => (
          <Card key={door.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{door.room}</h3>
                <p className="text-xs text-muted-foreground mt-1">ID: {door.id}</p>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  door.connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>

            <div className="space-y-4">
              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    door.status === "locked" ? "bg-green-500/10 text-green-700" : "bg-orange-500/10 text-orange-700"
                  }`}
                >
                  {door.status === "locked" ? <Lock size={14} /> : <Unlock size={14} />}
                  {door.status.charAt(0).toUpperCase() + door.status.slice(1)}
                </span>
              </div>

              {/* Last Action */}
              <div>
                <p className="text-xs text-muted-foreground">Last Action</p>
                <p className="text-sm font-medium text-foreground">{door.lastAction}</p>
                <p className="text-xs text-muted-foreground">{door.lastActionTime}</p>
              </div>

              {/* Battery Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Battery</p>
                  <p className="text-xs font-medium text-foreground">{door.batteryLevel}%</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      door.batteryLevel > 50 ? "bg-green-500" : door.batteryLevel > 25 ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${door.batteryLevel}%` }}
                  />
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    door.connectionStatus === "connected" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <CheckCircle size={14} />
                  {door.connectionStatus === "connected" ? "Connected" : "Disconnected"}
                </div>
              </div>

              {/* QR Code Badge */}
              {door.requiresQRCode && (
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                    <QrCode size={14} />
                    QR Code Required
                  </p>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex gap-2">
                {door.requiresQRCode && door.status === "locked" ? (
                  <Button
                    onClick={() => openQRScanner(door.id)}
                    disabled={door.connectionStatus === "disconnected"}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                  >
                    <QrCode size={16} />
                    Scan QR
                  </Button>
                ) : (
                  <Button
                    onClick={() => toggleDoor(door.id)}
                    disabled={door.connectionStatus === "disconnected"}
                    className={`flex-1 ${
                      door.status === "locked"
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {door.status === "locked" ? "Unlock Door" : "Lock Door"}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && <QRScanner onScan={handleQRScan} onClose={() => setShowQRScanner(false)} />}
    </div>
  )
}
