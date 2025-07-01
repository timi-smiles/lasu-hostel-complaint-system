import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../../generated/prisma"
import crypto from "crypto"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

// Configure nodemailer (you'll need to set up your email service)
const transporter = nodemailer.createTransport({
  // For Gmail
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
  // For other services, configure accordingly
  // host: process.env.SMTP_HOST,
  // port: parseInt(process.env.SMTP_PORT || '587'),
  // secure: false,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASSWORD,
  // },
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

      // Save reset token to database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry,
        }
      })

      // Create reset URL
      const resetURL = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

      // Email template
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - LASU Hostel System</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .warning { background: #fef3cd; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .logo { font-size: 24px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="Logo"> LASU Hostel System</div>
              <h1>Password Reset Request</h1>
            </div>
            
            <div class="content">
              <h2>Hello ${user.fullName},</h2>
              
              <p>We received a request to reset your password for your LASU Hostel Complaint System account.</p>
              
              <p>Click the button below to reset your password:</p>
              
              <div style="text-align: center;">
                <a href="${resetURL}" class="button">Reset My Password</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 5px; font-family: monospace;">
                ${resetURL}
              </p>
              
              <div class="warning">
                <strong>⚠️ Important Security Information:</strong>
                <ul>
                  <li>This link will expire in <strong>1 hour</strong></li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Never share this link with anyone</li>
                  <li>Contact support if you have concerns: mailsupport@lasu.edu.ng</li>
                </ul>
              </div>
              
              <p>If you're having trouble clicking the button, you can also visit the link directly in your browser.</p>
              
              <p>Best regards,<br>
              LASU Hostel Management Team</p>
            </div>
            
            <div class="footer">
              <p>© 2024 Lagos State University Hostel Management System</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `

      // Send email
      try {
        await transporter.sendMail({
          from: `"LASU Hostel System" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Reset Your Password - LASU Hostel System",
          html: emailHTML,
          text: `
            Hello ${user.fullName},
            
            We received a request to reset your password for your LASU Hostel Complaint System account.
            
            Click this link to reset your password: ${resetURL}
            
            This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
            
            Best regards,
            LASU Hostel Management Team
          `
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        return NextResponse.json(
          { error: "Failed to send reset email. Please try again later." },
          { status: 500 }
        )
      }
    }

    // Always return success
    return NextResponse.json(
      { 
        message: "If an account with that email exists, we've sent a password reset link.",
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
