import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await db.complaints.getById(params.id)

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // If student, check if they own the complaint
    if (user.role === "student" && complaint.studentId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ complaint })
  } catch (error) {
    console.error("Get complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await db.complaints.getById(params.id)

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // Only staff/admin can update complaint status
    if (user.role === "student") {
      return NextResponse.json({ error: "Students cannot update complaints" }, { status: 403 })
    }

    const { status, assignedTo } = await req.json()

    // Update complaint
    const updatedComplaint = await db.complaints.update(params.id, {
      status,
      assignedTo,
    })

    return NextResponse.json({
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    })
  } catch (error) {
    console.error("Update complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admin can delete complaints
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Only administrators can delete complaints" }, { status: 403 })
    }

    const success = await db.complaints.delete(params.id)

    if (!success) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Complaint deleted successfully" })
  } catch (error) {
    console.error("Delete complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
