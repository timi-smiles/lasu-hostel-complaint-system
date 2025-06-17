import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/auth"
import { UserRole, UserStatus } from "@/generated/prisma"

export async function POST(req: NextRequest) {
  try {
    const { email, password, userType } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
        status: UserStatus.ACTIVE,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if userType is provided and valid
    if (userType) {
      const role = userType.trim().toUpperCase() as UserRole
      const validRoles = Object.values(UserRole)

      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 })
      }

      if (user.role !== role) {
        return NextResponse.json({ error: "Invalid account type" }, { status: 401 })
      }
    }

    const isPasswordValid = await verifyPassword(user.passwordHash, password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ADD THIS - Required for modern browsers
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // FIX: Also set userRole cookie for faster role checks
    cookieStore.set("userRole", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ADD THIS
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    // FIX: Remove password hash from response and ensure complete user data
    const { passwordHash, ...userData } = user

    console.log(`Login successful: ${user.fullName} (${user.role})`) // ADD LOGGING

    return NextResponse.json({
      success: true, // ADD success flag
      message: "Login successful",
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName, // Ensure fullName is included
        role: userData.role
      },
    })

  } catch (error) {
    console.error(" Login error:", error) // Better error logging
    return NextResponse.json({
      error: "Internal server error",
      details: process.env.NODE_ENV !== "production" && error instanceof Error ? error.message : undefined,
    }, { status: 500 })
  }
}
