"use server"

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to update your profile" }
    }

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const department = formData.get("department") as string
    const hostelBlock = formData.get("hostelBlock") as string
    const roomNumber = formData.get("roomNumber") as string

    if (!fullName || !email) {
      return { error: "Name and email are required" }
    }

    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      if (existingUser && existingUser.id !== user.id) {
        return { error: "Email already in use by another user" }
      }
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName,
        email,
        phone: phone || null,
        department: department || null,
        hostelBlock: hostelBlock || null,
        roomNumber: roomNumber || null,
      },
    })

    // Revalidate the profile page
    revalidatePath("/dashboard/student/profile")

    return {
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        department: updatedUser.department,
        hostelBlock: updatedUser.hostelBlock,
        roomNumber: updatedUser.roomNumber,
        studentId: updatedUser.studentId,
        role: updatedUser.role,
        status: updatedUser.status,
        createdAt: updatedUser.createdAt.toISOString(),
        lastLogin: updatedUser.lastLogin?.toISOString(),
      },
    }
  } catch (error) {
    console.error("Update profile error:", error)
    return { error: "Failed to update profile. Please try again." }
  }
}

export async function changePassword(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to change your password" }
    }

    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { error: "All fields are required" }
    }

    if (newPassword !== confirmPassword) {
      return { error: "New passwords do not match" }
    }

    if (newPassword.length < 8) {
      return { error: "New password must be at least 8 characters" }
    }

    // Get user with password hash
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!userWithPassword) {
      return { error: "User not found" }
    }

    // Verify current password (you'll need to implement this based on your auth system)
    const bcrypt = require("bcryptjs")
    const isPasswordValid = await bcrypt.compare(currentPassword, userWithPassword.passwordHash)

    if (!isPasswordValid) {
      return { error: "Current password is incorrect" }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
      },
    })

    return { success: true, message: "Password changed successfully" }
  } catch (error) {
    console.error("Change password error:", error)
    return { error: "Failed to change password. Please try again." }
  }
}
