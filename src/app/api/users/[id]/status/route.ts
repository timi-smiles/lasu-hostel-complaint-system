import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admin can change user status
    if (currentUser.role !== "admin" && currentUser.role !== "staff") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const user = await db.users.findById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { status } = await req.json()

    if (!status || !["active", "inactive", "suspended"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Update user status
    const updatedUser = await db.users.update(params.id, { status })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user status" }, { status: 500 })
    }

    // Remove password hash
    const { passwordHash, ...userData } = updatedUser

    return NextResponse.json({
      message: "User status updated successfully",
      user: userData,
    })
  } catch (error) {
    console.error("Update user status error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
