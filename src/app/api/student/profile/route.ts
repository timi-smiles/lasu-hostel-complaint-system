import { NextRequest, NextResponse } from "next/server"
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
        studentId: true,
        hostelBlock: true,
        roomNumber: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    //  STRICT student-only protection
    if (user.role !== "STUDENT") {
      console.log(` Student Profile: Access denied for role: ${user.role}`)
      return NextResponse.json({ 
        error: "Access denied. Student access required.",
        userRole: user.role,
        redirectTo: "/dashboard/staff/profile" // Add redirect hint
      }, { status: 403 })
    }

    console.log(" Student Profile API: Successfully fetched for:", user.fullName)

    return NextResponse.json({
      success: true,
      user: user,
    })
  } catch (error) {
    console.error(" Student Profile API Error:", error)
    return NextResponse.json({ error: "Failed to fetch student profile" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is student BEFORE updating
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, fullName: true }
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (existingUser.role !== "STUDENT") {
      console.log(` Student Profile Update: Access denied for role: ${existingUser.role}`)
      return NextResponse.json({ 
        error: "Access denied. Student access required.",
        redirectTo: "/dashboard/staff/profile"
      }, { status: 403 })
    }

    const body = await request.json()
    const { fullName, phone, department, hostelBlock, roomNumber } = body

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        phone,
        department,
        hostelBlock,
        roomNumber,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        phone: true,
        department: true,
        studentId: true,
        hostelBlock: true,
        roomNumber: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    })

    console.log(" Student Profile API: Successfully updated for:", updatedUser.fullName)

    return NextResponse.json({
      success: true,
      message: "Student profile updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error(" Student Profile Update Error:", error)
    return NextResponse.json({ error: "Failed to update student profile" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}