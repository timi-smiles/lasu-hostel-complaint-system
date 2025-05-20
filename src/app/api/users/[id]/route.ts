import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Users can only access their own profile or staff can access any profile
    if (currentUser.id !== params.id && currentUser.role === "student") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const user = await db.users.findById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password hash
    const { passwordHash, ...userData } = user

    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Users can only update their own profile or admin can update any profile
    if (currentUser.id !== params.id && currentUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const user = await db.users.findById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { fullName, email, phone, department, hostelBlock, roomNumber } = await req.json()

    // Update user
    const updatedUser = await db.users.update(params.id, {
      fullName,
      email,
      phone,
      department,
      hostelBlock,
      roomNumber,
    })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }

    // Remove password hash
    const { passwordHash, ...userData } = updatedUser

    return NextResponse.json({
      message: "User updated successfully",
      user: userData,
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
