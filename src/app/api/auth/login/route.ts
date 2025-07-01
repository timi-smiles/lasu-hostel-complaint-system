import { NextRequest, NextResponse } from "next/server"
import { verify } from "argon2"
import prisma from "@/lib/db"
import { createJWTToken, setJWTCookie } from "@/lib/auth"

// Prevent static optimization for this API route
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    console.log("Login attempt started")
    
    const { email, password, userType } = await req.json()
    console.log("Parsed request data:", { email, userType }) // Don't log password

    // Validate input
    if (!email || !password || !userType) {
      console.log("Missing required fields")
      return NextResponse.json({ 
        status: "error",
        error: "All fields are required" 
      }, { status: 400 })
    }

    console.log("Searching for user:", email.toLowerCase())
    
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

    console.log("User found:", !!user)

    if (!user) {
      console.log("User not found")
      return NextResponse.json({ 
        status: "error",
        error: "Invalid credentials" 
      }, { status: 401 })
    }

    console.log("Verifying password...")
    
    // Verify password
    const isValidPassword = await verify(user.passwordHash, password)
    console.log("Password valid:", isValidPassword)
    
    if (!isValidPassword) {
      console.log("Invalid password")
      return NextResponse.json({ 
        status: "error",
        error: "Invalid credentials" 
      }, { status: 401 })
    }

    // Check user type matches role
    const expectedRole = userType === "student" ? "STUDENT" : "STAFF"
    console.log("Role check:", { userRole: user.role, expectedRole })
    
    if (user.role !== expectedRole) {
      console.log("Role mismatch")
      return NextResponse.json({ 
        status: "error",
        error: "Invalid account type" 
      }, { status: 401 })
    }

    console.log("Creating JWT token...")
    
    // CREATE & SET JWT TOKEN
    const token = createJWTToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    console.log("Setting JWT cookie...")
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
    console.error("Login error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : "Unknown"
    })
    return NextResponse.json({ 
      status: "error",
      error: "Internal server error" 
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
