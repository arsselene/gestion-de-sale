"use server"

export async function sendQRCodeEmail(professorName: string, professorEmail: string, qrCode: string) {
  try {
    // Simulate email sending - in production, use a service like SendGrid, Resend, or Nodemailer
    console.log(`[v0] Sending QR code email to ${professorEmail}`)

    // Mock email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: `QR code email sent successfully to ${professorEmail}`,
    }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    }
  }
}
