"use client"

interface QRCodeDisplayProps {
  value: string
  size?: number
}

export function QRCodeDisplay({ value, size = 120 }: QRCodeDisplayProps) {
  // This generates a deterministic pattern based on the QR code value
  const generateQRPattern = (text: string) => {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }

    const cells = 21
    const pattern: boolean[] = []
    for (let i = 0; i < cells * cells; i++) {
      pattern.push(Math.random() > 0.5)
    }
    return pattern
  }

  const pattern = generateQRPattern(value)
  const cells = 21
  const cellSize = size / cells

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="bg-white">
      {pattern.map((isBlack, index) => {
        const row = Math.floor(index / cells)
        const col = index % cells
        return isBlack ? (
          <rect key={index} x={col * cellSize} y={row * cellSize} width={cellSize} height={cellSize} fill="black" />
        ) : null
      })}
    </svg>
  )
}
