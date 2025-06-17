import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is staff or admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true }
    })

    if (!user || !["STAFF", "ADMIN"].includes(user.role)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Get notifications for staff (new complaints, updates, etc.)
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
        isRead: false
      },
      include: {
        complaint: {
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            category: true,
            hostelBlock: true,
            roomNumber: true
          }
        },
        triggeredBy: {
          select: {
            id: true,
            fullName: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    const unreadCount = notifications.length

    return NextResponse.json({
      success: true,
      notifications: notifications.map(notification => ({
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        createdAt: notification.createdAt,
        isRead: notification.isRead,
        complaint: notification.complaint ? {
          id: notification.complaint.id,
          title: notification.complaint.title,
          status: notification.complaint.status,
          priority: notification.complaint.priority,
          category: notification.complaint.category,
          hostelBlock: notification.complaint.hostelBlock,
          roomNumber: notification.complaint.roomNumber
        } : null,
        triggeredBy: notification.triggeredBy ? {
          id: notification.triggeredBy.id,
          name: notification.triggeredBy.fullName,
          role: notification.triggeredBy.role
        } : null
      })),
      unreadCount
    })

  } catch (error) {
    console.error(" Staff notifications fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Mark notifications as read
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationIds } = body

    if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      await prisma.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId: userId
        },
        data: {
          isRead: true
        }
      })
    } else {
      // Mark all notifications as read for this staff member
      await prisma.notification.updateMany({
        where: {
          userId: userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(" Mark staff notifications read error:", error)
    return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}