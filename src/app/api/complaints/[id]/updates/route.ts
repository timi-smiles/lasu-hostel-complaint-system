import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db" //  Use Prisma directly
import { NotificationService } from "@/lib/notification-service"

export async function POST(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context
  const { id } = await params

  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only staff and admin can add updates
    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id }
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    const { message } = await req.json()

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create the update using Prisma
    const update = await prisma.complaintUpdate.create({
      data: {
        message: message.trim(),
        complaintId: id,
        staffId: user.id,
        createdAt: new Date()
      },
      include: {
        staff: {
          select: {
            id: true,
            fullName: true
          }
        }
      }
    })

    // Update the complaint timestamp
    await prisma.complaint.update({
      where: { id },
      data: { updatedAt: new Date() }
    })

    console.log(`Update added to complaint ${id} by ${user.fullName}`)

    // Notify users about the new update
    await NotificationService.createComplaintUpdateNotification(complaint.id, user.id, message.trim())

    return NextResponse.json(
      {
        message: "Update added successfully",
        update: update, //  Frontend expects 'update'
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add complaint update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context
  const { id } = await params

  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await prisma.complaintUpdate.findMany({
      where: { complaintId: id },
      include: {
        staff: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({ updates })

  } catch (error) {
    console.error("Error fetching complaint updates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// When staff updates a complaint
export async function PUT(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context
  const { id } = await params

  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { complaintId, status, message } = await req.json()

    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId }
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    let statusChanged = false
    let newStatus = complaint.status

    // Check if status is being updated
    if (status && status !== complaint.status) {
      newStatus = status
      statusChanged = true
    }

    // Update complaint details
    await prisma.complaint.update({
      where: { id: complaintId },
      data: {
        status: newStatus,
        updatedAt: new Date()
      }
    })

    // Create notification for status change
    if (statusChanged) {
      await NotificationService.createStatusChangeNotification(
        complaintId,
        newStatus,
        user.id
      )
    }

    // Create notification for updates
    if (message && message.trim()) {
      await NotificationService.createComplaintUpdateNotification(
        complaintId,
        user.id,
        message.trim()
      )
    }

    return NextResponse.json({ message: "Complaint updated successfully" })

  } catch (error) {
    console.error("Error updating complaint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
