import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params // Await params before using

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            hostelBlock: true,
            roomNumber: true
          }
        },
        updates: {
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
        }
      }
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // If student, check if they own the complaint
    if (user.role === 'STUDENT' && complaint.studentId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ complaint })
  } catch (error) {
    console.error("Get complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params // Await params before using

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id } // Use id instead of params.id
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // Only staff/admin can update complaint status
    if (user.role === "STUDENT") {
      return NextResponse.json({ error: "Students cannot update complaints" }, { status: 403 })
    }

    const { status, assignedTo, message } = await req.json()

    // Update complaint
    const updatedComplaint = await prisma.complaint.update({
      where: { id }, // Use id instead of params.id
      data: {
        status,
        assignedToId: assignedTo, // Changed from assignedTo to assignedToId
        updatedAt: new Date()
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            hostelBlock: true,
            roomNumber: true
          }
        },
        updates: {
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
        }
      }
    })

    // Add an update message if provided
    if (message) {
      await prisma.complaintUpdate.create({
        data: {
          message,
          complaintId: id, // Use id instead of params.id
          staffId: user.id
        }
      })
    }

    return NextResponse.json({
      message: "Complaint updated successfully",
      complaint: updatedComplaint,
    })
  } catch (error) {
    console.error("Update complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params // Await params before using

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admin can delete complaints
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Only administrators can delete complaints" }, { status: 403 })
    }

    // First delete all related updates
    await prisma.complaintUpdate.deleteMany({
      where: { complaintId: id } // Use id instead of params.id
    })

    // Then delete the complaint
    const deletedComplaint = await prisma.complaint.delete({
      where: { id } // Use id instead of params.id
    })

    return NextResponse.json({ 
      message: "Complaint deleted successfully",
      complaint: deletedComplaint
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      // Prisma error code for record not found
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }
    
    console.error("Delete complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
