import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { fullName, email, password, userType, studentId, hostelBlock, roomNumber } = data

    // Validate required fields
    if (!fullName || !email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = await db.users.findByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // Validate student-specific fields
    if (userType === "student" && (!studentId || !hostelBlock || !roomNumber)) {
      return NextResponse.json(
        { error: "Student ID, hostel block, and room number are required for students" },
        { status: 400 },
      )
    }

    // Create user
    const newUser = await db.users.create({
      fullName,
      email,
      password,
      role: userType,
      studentId: userType === "student" ? studentId : undefined,
      hostelBlock: userType === "student" ? hostelBlock : undefined,
      roomNumber: userType === "student" ? roomNumber : undefined,
    })

    // Return user data (without password)
    const { passwordHash, ...userData } = newUser

    return NextResponse.json(
      {
        message: "Registration successful",
        user: userData,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
