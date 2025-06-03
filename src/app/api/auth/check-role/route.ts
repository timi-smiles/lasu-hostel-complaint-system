import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    console.log("🔍 Role Check: Checking authentication for userId:", userId)

    if (!userId) {
      console.log(" Role Check: No user session found")
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
      },
    })

    if (!user) {
      console.log(" Role Check: User not found in database")
      return NextResponse.json({ 
        authenticated: false,
        error: "User not found" 
      }, { status: 404 })
    }

    console.log(" Role Check: User authenticated -", user.fullName, "Role:", user.role)

    // Return role-specific redirect paths
    const redirectPaths = {
      STUDENT: {
        dashboard: "/dashboard/student",
        profile: "/dashboard/student/profile",
        complaints: "/dashboard/student/complaints",
        newComplaint: "/dashboard/student/complaints/new"
      },
      STAFF: {
        dashboard: "/dashboard/staff",
        profile: "/dashboard/staff/profile",
        complaints: "/dashboard/staff/complaints",
        analytics: "/dashboard/staff/analytics"
      },
      ADMIN: {
        dashboard: "/dashboard/staff",
        profile: "/dashboard/staff/profile",
        complaints: "/dashboard/staff/complaints",
        analytics: "/dashboard/staff/analytics",
        users: "/dashboard/staff/users"
      }
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        fullName: user.fullName,
      },
      paths: redirectPaths[user.role as keyof typeof redirectPaths] || redirectPaths.STUDENT
    })
  } catch (error) {
    console.error(" Role check error:", error)
    return NextResponse.json({ 
      authenticated: false,
      error: "Authentication check failed" 
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}