import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/db" // ✅ FIXED: Use singleton instead!
import { getUserIdFromRequest } from "@/lib/auth"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is student
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true }
    })

    if (!user || user.role !== "STUDENT") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get unread notifications for student's complaints
    const notifications = await prisma.complaintUpdate.findMany({
      where: {
        complaint: {
          studentId: userId
        },
        isRead: false, // Only get unread notifications
        staffId: { not: null } // Only updates from staff
      },
      include: {
        complaint: {
          select: {
            id: true,
            title: true,
            status: true
          }
        },
        staff: {
          select: {
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20 // Limit to recent notifications
    })

    const unreadCount = notifications.length

    return NextResponse.json({
      success: true,
      notifications: notifications.map(notification => ({
        id: notification.id,
        message: notification.message,
        createdAt: notification.createdAt,
        complaintId: notification.complaint.id,
        complaintTitle: notification.complaint.title,
        complaintStatus: notification.complaint.status,
        staffName: notification.staff?.fullName || 'System',
        isRead: notification.isRead // Use actual isRead value
      })),
      unreadCount
    })

  } catch (error) {
    console.error(" Notifications fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

// Mark notifications as read
export async function PUT() {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mark all notifications as read for this student
    await prisma.complaintUpdate.updateMany({
      where: {
        complaint: {
          studentId: userId
        },
        isRead: false
      },
      data: {
        isRead: true // Now properly update the isRead field
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(" Mark notifications read error:", error)
    return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 })
  }
}