"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Camera } from "lucide-react"

interface QRScannerProps {
  onScan: (qrCode: string) => void
  onClose: () => void
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [scannedCode, setScannedCode] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setScannedCode(value)

    // Simulate QR code scan (in real app, would use camera/barcode library)
    if (value.startsWith("PROF_")) {
      setTimeout(() => {
        onScan(value)
        setScannedCode("")
      }, 500)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Scan QR Code</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Camera Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-lg bg-primary/10 text-primary">
              <Camera size={32} />
            </div>
          </div>

          {/* Instructions */}
          <p className="text-sm text-muted-foreground text-center">
            Point your camera at the professor's QR code or paste the code below.
          </p>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={scannedCode}
            onChange={handleInputChange}
            placeholder="Scan QR code here..."
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Scanned Result */}
          {scannedCode && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-xs text-muted-foreground">Scanned Code:</p>
              <p className="text-sm font-mono text-green-600 break-all">{scannedCode}</p>
            </div>
          )}

          {/* Close Button */}
          <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
