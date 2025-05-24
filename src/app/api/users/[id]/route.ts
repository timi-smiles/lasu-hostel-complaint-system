import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await getCurrentUser()
    const { id } = await params // Await params before using

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Users can only view their own profile or admin can view any profile
    if (currentUser.id !== id && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const user = await prisma.user.findUnique({
      where: { id }, // Use id instead of params.id
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
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await getCurrentUser()
    const { id } = await params // Await params before using

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Users can only update their own profile or admin can update any profile
    if (currentUser.id !== id && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const {
      fullName,
      phone,
      department,
      studentId,
      hostelBlock,
      roomNumber,
      status,
      role,
    } = await req.json()

    // Validate required fields
    if (!fullName) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 })
    }

    // Students cannot change their role or status
    const updateData: any = {
      fullName,
      phone,
      department,
      studentId,
      hostelBlock,
      roomNumber,
      updatedAt: new Date(),
    }

    // Only admins can update role and status
    if (currentUser.role === "ADMIN") {
      if (status) updateData.status = status
      if (role) updateData.role = role
    }

    const updatedUser = await prisma.user.update({
      where: { id }, // Use id instead of params.id
      data: updateData,
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
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const currentUser = await getCurrentUser()
    const { id } = await params // Await params before using

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can delete users
    if (currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Only administrators can delete users" }, { status: 403 })
    }

    // Don't allow deleting yourself
    if (currentUser.id === id) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 })
    }

    // Delete user's complaints and updates first (cascade delete)
    await prisma.complaintUpdate.deleteMany({
      where: { staffId: id },
    })

    await prisma.complaint.deleteMany({
      where: { studentId: id },
    })

    // Then delete the user
    const deletedUser = await prisma.user.delete({
      where: { id }, // Use id instead of params.id
    })

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    })
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
