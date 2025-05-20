import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await db.complaints.getById(params.id)

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // Students can only add updates to their own complaints
    if (user.role === "student" && complaint.studentId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { message, status } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Add update
    const updatedComplaint = await db.complaints.addUpdate(params.id, {
      message,
      staffId: user.role !== "student" ? user.id : undefined,
      staffName: user.role !== "student" ? user.fullName : undefined,
    })

    // Update status if provided (staff only)
    if (status && user.role !== "student") {
      await db.complaints.update(params.id, { status })
    }

    return NextResponse.json(
      {
        message: "Update added successfully",
        complaint: updatedComplaint,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add complaint update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
