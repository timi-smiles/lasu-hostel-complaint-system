import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params

    console.log("🔍 API: Fetching complaint with ID:", id)
    console.log("👤 API: Current user:", user?.fullName, "Role:", user?.role)

    if (!user) {
      console.log("❌ API: No user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ API: User found, searching for complaint...")

    const complaint = await prisma.complaint.findUnique({
      where: { id },
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

    if (!complaint) {
      console.log("❌ API: Complaint not found in database")
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    // ✅ UPDATED AUTHORIZATION: Allow students to view their own complaints
    if (user.role === 'STUDENT') {
      // Students can only view their own complaints
      if (complaint.studentId !== user.id) {
        console.log("❌ API: Student trying to access complaint that's not theirs")
        console.log("   Student ID:", user.id)
        console.log("   Complaint Student ID:", complaint.studentId)
        return NextResponse.json({ error: "You can only view your own complaints" }, { status: 403 })
      }
      console.log("✅ API: Student authorized to view their own complaint")
    } else if (user.role === 'STAFF' || user.role === 'ADMIN') {
      // Staff and admin can view all complaints
      console.log("✅ API: Staff/Admin authorized to view complaint")
    } else {
      console.log("❌ API: Unknown user role:", user.role)
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    console.log("✅ API: Found complaint:", complaint.title)
    console.log("📊 API: Complaint details:", {
      id: complaint.id,
      title: complaint.title,
      status: complaint.status,
      studentName: complaint.student.fullName,
      updatesCount: complaint.updates.length
    })

    return NextResponse.json({ complaint })

  } catch (error) {
    console.error("💥 API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params // ✅ Properly await the params Promise

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
            roomNumber: true
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
      await prisma.complaintUpdate.create({
        data: {
          message,
          complaintId: id,
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
    const { id } = await params // ✅ Properly await the params Promise

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
