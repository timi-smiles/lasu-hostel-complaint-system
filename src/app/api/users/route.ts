import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only staff and admin can list users
    if (user.role === "student") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const role = url.searchParams.get("role")
    const block = url.searchParams.get("block")

    let users = []

    if (role === "student") {
      users = await db.users.getAllStudents()
    } else if (role === "staff") {
      users = await db.users.getAllStaff()
    } else {
      // Get all users
      users = [...(await db.users.getAllStudents()), ...(await db.users.getAllStaff())]
    }

    // Filter by hostel block if provided
    if (block) {
      users = users.filter((u) => u.hostelBlock === block)
    }

    // Remove password hashes
    const sanitizedUsers = users.map(({ passwordHash, ...userData }) => userData)

    return NextResponse.json({ users: sanitizedUsers })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
