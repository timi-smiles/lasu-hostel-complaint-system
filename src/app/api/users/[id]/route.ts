import { NextResponse } from "next/server"
import { PrismaClient } from "../../../../generated/prisma"
import { getCurrentUser } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Users can only access their own profile or staff can access any profile
    if (currentUser.id !== params.id && currentUser.role === "STUDENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
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
        lastLogin: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Users can only update their own profile or admin can update any profile
    if (currentUser.id !== params.id && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { fullName, email, phone, department, hostelBlock, roomNumber } = body

    // Validate required fields
    if (!fullName || !email) {
      return NextResponse.json({ error: "Full name and email are required" }, { status: 400 })
    }

    // Check if email is already in use by another user
    if (email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
          NOT: {
            id: params.id,
          },
        },
      })

      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 })
      }
    }

    // Update user with all fields
    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        fullName,
        email,
        phone: phone || null,
        department: department || null,
        hostelBlock: hostelBlock || null,
        roomNumber: roomNumber || null,
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
        lastLogin: true,
      },
    })

    console.log("User updated successfully:", updatedUser)

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
