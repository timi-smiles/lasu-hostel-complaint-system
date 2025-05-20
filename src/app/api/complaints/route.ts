import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status")
    const category = url.searchParams.get("category")
    const block = url.searchParams.get("block")

    let complaints = []

    // If student, only return their complaints
    if (user.role === "student") {
      complaints = await db.complaints.getByStudentId(user.id)
    } else {
      // Staff or admin can see all complaints
      complaints = await db.complaints.getAll()
    }

    // Apply filters if provided
    if (status) {
      complaints = complaints.filter((c) => c.status === status)
    }

    if (category) {
      complaints = complaints.filter((c) => c.category === category)
    }

    if (block) {
      complaints = complaints.filter((c) => c.hostelBlock === block)
    }

    return NextResponse.json({ complaints })
  } catch (error) {
    console.error("Get complaints error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only students can create complaints
    if (user.role !== "student") {
      return NextResponse.json({ error: "Only students can submit complaints" }, { status: 403 })
    }

    const { title, category, description, priority = "medium" } = await req.json()

    // Validate required fields
    if (!title || !category || !description) {
      return NextResponse.json({ error: "Title, category, and description are required" }, { status: 400 })
    }

    // Create complaint
    const newComplaint = await db.complaints.create({
      title,
      category,
      description,
      status: "pending",
      priority,
      studentId: user.id,
      studentName: user.fullName,
      hostelBlock: user.hostelBlock!,
      roomNumber: user.roomNumber!,
    })

    return NextResponse.json(
      {
        message: "Complaint submitted successfully",
        complaint: newComplaint,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
