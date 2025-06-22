import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db"
import { getUserIdFromRequest } from "@/lib/auth"


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {  
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // FIX: Include student data in the query
    const complaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        student: {  // ADD THIS - Include student data
          select: {
            id: true,
            fullName: true,
            email: true,
            hostelBlock: true,
            roomNumber: true,
          }
        },
        assignedTo: {  // ADD THIS - Include assigned staff
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        updates: {
          include: {
            staff: {
              select: {
                id: true,  // ADD ID
                fullName: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // Verify student can only see their own complaints
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (user?.role === "STUDENT" && complaint.studentId !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // ADD LOGGING to debug
    console.log("Complaint found:", {
      id: complaint.id,
      title: complaint.title,
      studentName: complaint.student?.fullName,
      studentId: complaint.student?.id,
      updatesCount: complaint.updates?.length || 0
    })

    return NextResponse.json({
      success: true,
      complaint
    })

  } catch (error) {
    console.error(" Error fetching complaint:", error)
    return NextResponse.json({ 
      error: "Failed to fetch complaint",
      details: process.env.NEXT_PUBLIC_NODE_ENV !== "production" ? (error instanceof Error ? error.message : String(error)) : undefined
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Keep your existing PUT and DELETE methods as they are - they look good!
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params //  Properly await the params Promise

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id }
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
      where: { id },
      data: {
        status,
        assignedToId: assignedTo,
        updatedAt: new Date()
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            hostelBlock: true,
            roomNumber: true,
          }
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
            email: true
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
      // When staff adds an update, ensure isRead is set to false
      await prisma.complaintUpdate.create({
        data: {
          message,
          complaintId: id,
          staffId: user.id,
          isRead: false // Ensure new updates are unread
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
    const { id } = await params //  Properly await the params Promise

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admin can delete complaints
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Only administrators can delete complaints" }, { status: 403 })
    }

    // First delete all related records
    await prisma.$transaction([
      prisma.complaintUpdate.deleteMany({
        where: { complaintId: id }
      }),
      // Add other related deletions if they exist
    ])

    // Then delete the complaint
    const deletedComplaint = await prisma.complaint.delete({
      where: { id }
    })

    return NextResponse.json({ 
      message: "Complaint deleted successfully",
      complaint: deletedComplaint
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }
    
    console.error("Delete complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
