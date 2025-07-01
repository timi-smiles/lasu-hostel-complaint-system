import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: "Reset token is required" },
        { status: 400 }
      )
    }

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // Token not expired
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        message: "Token is valid",
        valid: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: "An error occurred while verifying the token" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
