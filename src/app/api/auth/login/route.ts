import { NextRequest, NextResponse } from "next/server"
import { verify } from "argon2"
import prisma from "@/lib/db"
import { createJWTToken, setJWTCookie } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password, userType } = await req.json()

    // Validate input
    if (!email || !password || !userType) {
      return NextResponse.json({ 
        status: "error",
        error: "All fields are required" 
      }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        fullName: true,
        passwordHash: true,
        role: true,
        studentId: true,
        hostelBlock: true,
        roomNumber: true,
      }
    })

    if (!user) {
      return NextResponse.json({ 
        status: "error",
        error: "Invalid credentials" 
      }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verify(user.passwordHash, password)
    if (!isValidPassword) {
      return NextResponse.json({ 
        status: "error",
        error: "Invalid credentials" 
      }, { status: 401 })
    }

    // Check user type matches role
    const expectedRole = userType === "student" ? "STUDENT" : "STAFF"
    if (user.role !== expectedRole) {
      return NextResponse.json({ 
        status: "error",
        error: "Invalid account type" 
      }, { status: 401 })
    }

    // CREATE & SET JWT TOKEN
    const token = createJWTToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    await setJWTCookie(token)

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      studentId: user.studentId,
      hostelBlock: user.hostelBlock,
      roomNumber: user.roomNumber,
    }
    console.log("Login successful - JWT token set")

    return NextResponse.json({ 
      status: "success",
      message: "Login successful",
      user: userData 
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ 
      status: "error",
      error: "Internal server error" 
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
