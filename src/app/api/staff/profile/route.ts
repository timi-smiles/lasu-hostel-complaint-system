import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient()

// GET - Fetch Staff Profile
export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user data with all fields from your schema
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        phone: true,
        department: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    //  STRICT staff-only protection
    if (user.role !== "STAFF" && user.role !== "ADMIN") {
      console.log(` Staff Profile: Access denied for role: ${user.role}`)
      return NextResponse.json({ 
        error: "Access denied. Staff access required.",
        userRole: user.role,
        redirectTo: "/dashboard/student/profile" // Add redirect hint
      }, { status: 403 })
    }

    console.log(" Staff Profile API: Successfully fetched for:", user.fullName)

    return NextResponse.json({
      success: true,
      user: user,
    })
  } catch (error) {
    console.error(" Staff Profile API Error:", error)
    return NextResponse.json({ error: "Failed to fetch staff profile" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// PUT - Update Staff Profile
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is staff BEFORE updating
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, fullName: true }
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (existingUser.role !== "STAFF" && existingUser.role !== "ADMIN") {
      console.log(` Staff Profile Update: Access denied for role: ${existingUser.role}`)
      return NextResponse.json({ 
        error: "Access denied. Staff access required.",
        redirectTo: "/dashboard/student/profile"
      }, { status: 403 })
    }

    const body = await request.json()
    const { fullName, phone, department } = body

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        phone,
        department,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        phone: true,
        department: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    })

    console.log(" Staff Profile API: Successfully updated for:", updatedUser.fullName)

    return NextResponse.json({
      success: true,
      message: "Staff profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error(" Staff Profile Update Error:", error)
    return NextResponse.json({ error: "Failed to update staff profile" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}