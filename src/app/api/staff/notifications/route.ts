import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/db" // FIXED: Use singleton instead!
import { getUserIdFromRequest } from "@/lib/auth"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
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

    // ENHANCED: Get notifications with error handling
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
    }).catch((error) => {
      console.log("Notifications table not available:", error.message)
      return [] // Return empty array if notifications table doesn't exist
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
      unreadCount,
      timestamp: new Date().toISOString() // ADD: For cache debugging
    }, {
      headers: {
        // ADD: Proper cache headers for real-time data
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error("❌ Staff notifications fetch error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch notifications",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Mark notifications as read
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationIds } = body

    // ENHANCED: Better validation
    if (notificationIds && Array.isArray(notificationIds) && notificationIds.length > 0) {
      // Validate all IDs are strings
      const validIds = notificationIds.filter(id => typeof id === 'string' && id.trim().length > 0)
      
      if (validIds.length === 0) {
        return NextResponse.json({ error: "No valid notification IDs provided" }, { status: 400 })
      }

      // Mark specific notifications as read
      const updateResult = await prisma.notification.updateMany({
        where: {
          id: { in: validIds },
          userId: userId
        },
        data: {
          isRead: true
        }
      }).catch((error) => {
        console.log("Notifications table not available:", error.message)
        return { count: 0 } // Return default if notifications table doesn't exist
      })

      return NextResponse.json({ 
        success: true, 
        updatedCount: updateResult.count,
        message: `Marked ${updateResult.count} notifications as read`
      })
    } else {
      // Mark all notifications as read for this staff member
      // Mark all notifications as read for this staff member
      const updateResult = await prisma.notification.updateMany({
        where: {
          userId: userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      }).catch((error) => {
        return { count: 0 } // Return default if notifications table doesn't exist
      })

      return NextResponse.json({ 
        success: true, 
        updatedCount: updateResult.count,
        message: `Marked all ${updateResult.count} notifications as read`
      })
    }

  } catch (error) {
    console.error("❌ Mark staff notifications read error:", error)
    return NextResponse.json({ 
      error: "Failed to mark notifications as read",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// ADD: Delete notifications endpoint
export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationIds, deleteAll = false } = body

    if (deleteAll) {
      // Delete all read notifications older than 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const deleteResult = await prisma.notification.deleteMany({
        where: {
          userId: userId,
          isRead: true,
          createdAt: {
            lt: thirtyDaysAgo
          }
        }
      }).catch(() => ({ count: 0 }))

      return NextResponse.json({ 
        success: true, 
        deletedCount: deleteResult.count,
        message: `Deleted ${deleteResult.count} old notifications`
      })
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Delete specific notifications
      const deleteResult = await prisma.notification.deleteMany({
        where: {
          id: { in: notificationIds },
          userId: userId
        }
      }).catch(() => ({ count: 0 }))

      return NextResponse.json({ 
        success: true, 
        deletedCount: deleteResult.count,
        message: `Deleted ${deleteResult.count} notifications`
      })
    } else {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
    }

  } catch (error) {
    console.error("❌ Delete notifications error:", error)
    return NextResponse.json({ 
      error: "Failed to delete notifications",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}