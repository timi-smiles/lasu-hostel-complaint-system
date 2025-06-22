import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/db" // ✅ FIXED: Use singleton instead!
import { getUserIdFromRequest } from "@/lib/auth"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()

    console.log("Role Check: Checking authentication for userId:", userId)

    if (!userId) {
      console.log("Role Check: No user session found")
      return NextResponse.json({ 
        authenticated: false,
        error: "No user session found" 
      }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        fullName: true,
        // ✅ ADD: Additional user data for better UX
        hostelBlock: true,
        roomNumber: true,
        department: true
      },
    })

    if (!user) {
      console.log("Role Check: User not found in database")
      return NextResponse.json({ 
        authenticated: false,
        error: "User not found" 
      }, { status: 404 })
    }

    // ✅ ENHANCED: Check user status
    if (user.status !== 'ACTIVE') {
      console.log("Role Check: User account is not active -", user.status)
      return NextResponse.json({ 
        authenticated: false,
        error: "Account is not active. Please contact support." 
      }, { status: 403 })
    }

    console.log("Role Check: User authenticated -", user.fullName, "Role:", user.role)

    // ✅ ENHANCED: Better role-based paths
    const redirectPaths = {
      STUDENT: {
        dashboard: "/dashboard/student",
        profile: "/dashboard/student/profile", 
        complaints: "/dashboard/student/complaints",
        newComplaint: "/dashboard/student/new-complaint", // Fixed path
        settings: "/dashboard/student/settings"
      },
      STAFF: {
        dashboard: "/dashboard/staff",
        profile: "/dashboard/staff/profile",
        complaints: "/dashboard/staff/complaints",
        analytics: "/dashboard/staff/analytics",
        students: "/dashboard/staff/students",
        settings: "/dashboard/staff/settings"
      },
      ADMIN: {
        dashboard: "/dashboard/staff", // Admin uses staff dashboard
        profile: "/dashboard/staff/profile",
        complaints: "/dashboard/staff/complaints",
        analytics: "/dashboard/staff/analytics",
        users: "/dashboard/staff/users",
        students: "/dashboard/staff/students",
        settings: "/dashboard/staff/settings",
        system: "/dashboard/staff/system"
      }
    }

    // ✅ ADD: Get user's recent activity for dashboard
    const recentActivity = await prisma.complaint.findMany({
      where: user.role === 'STUDENT' 
        ? { studentId: user.id }
        : { assignedToId: user.id },
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true
      }
    }).catch(() => []) // Graceful fallback

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        fullName: user.fullName,
        hostelBlock: user.hostelBlock,
        roomNumber: user.roomNumber,
        department: user.department
      },
      paths: redirectPaths[user.role as keyof typeof redirectPaths] || redirectPaths.STUDENT,
      recentActivity, // ✅ ADD: For dashboard quick access
      timestamp: new Date().toISOString() // ✅ ADD: For cache debugging
    }, {
      headers: {
        // ✅ ADD: Cache control for auth checks
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error("Role check error:", error)
    return NextResponse.json({ 
      authenticated: false,
      error: "Authentication check failed",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}