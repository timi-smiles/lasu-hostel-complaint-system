"use server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

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

    // Additional fields for students
    const hostelBlock = user.role === "student" ? (formData.get("hostelBlock") as string) : undefined
    const roomNumber = user.role === "student" ? (formData.get("roomNumber") as string) : undefined

    if (!fullName || !email) {
      return { error: "Name and email are required" }
    }

    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await db.users.findByEmail(email)
      if (existingUser && existingUser.id !== user.id) {
        return { error: "Email already in use by another user" }
      }
    }

    // Update user
    const updatedUser = await db.users.update(user.id, {
      fullName,
      email,
      phone,
      department,
      hostelBlock,
      roomNumber,
    })

    if (!updatedUser) {
      return { error: "Failed to update profile" }
    }

    return { success: true }
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

    // Verify current password
    const isPasswordValid = await db.users.verifyPassword(user, currentPassword)

    if (!isPasswordValid) {
      return { error: "Current password is incorrect" }
    }

    // Update password
    const success = await db.users.updatePassword(user.id, newPassword)

    if (!success) {
      return { error: "Failed to update password" }
    }

    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    return { error: "Failed to change password. Please try again." }
  }
}
