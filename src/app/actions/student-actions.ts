"use server"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function updateStudentStatus(studentId: string, status: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to update student status" }
    }

    if (user.role !== "staff" && user.role !== "admin") {
      return { error: "Only staff and administrators can update student status" }
    }

    const student = await db.users.findById(studentId)

    if (!student) {
      return { error: "Student not found" }
    }

    if (student.role !== "student") {
      return { error: "User is not a student" }
    }

    // Update student status
    const updatedStudent = await db.users.update(studentId, { status })

    if (!updatedStudent) {
      return { error: "Failed to update student status" }
    }

    return { success: true }
  } catch (error) {
    console.error("Update student status error:", error)
    return { error: "Failed to update student status. Please try again." }
  }
}

export async function resetStudentPassword(studentId: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to reset student password" }
    }

    if (user.role !== "admin") {
      return { error: "Only administrators can reset student passwords" }
    }

    const student = await db.users.findById(studentId)

    if (!student) {
      return { error: "Student not found" }
    }

    if (student.role !== "student") {
      return { error: "User is not a student" }
    }

    // Generate a random password
    const newPassword = Math.random().toString(36).slice(-8)

    // Update student password
    const success = await db.users.updatePassword(studentId, newPassword)

    if (!success) {
      return { error: "Failed to reset student password" }
    }

    return { success: true, newPassword }
  } catch (error) {
    console.error("Reset student password error:", error)
    return { error: "Failed to reset student password. Please try again." }
  }
}
