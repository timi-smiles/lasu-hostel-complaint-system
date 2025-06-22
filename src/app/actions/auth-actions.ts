"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

// Define UserRole type if not imported from elsewhere
type UserRole = "STUDENT" | "STAFF" | "ADMIN";

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const userType = formData.get("userType") as string

    if (!email || !password || !userType) {
      return { error: "All fields are required" }
    }

const user = await db.users.findByEmail(email)
    if (!user) {
      return { error: "Invalid credentials" }
    }

    if (user.role !== userType) {
      return { error: "Invalid account type" }
    }

    const isPasswordValid = await db.users.verifyPassword(user.passwordHash, password)

    if (!isPasswordValid) {
      return { error: "Invalid credentials" }
    }

    // Set cookie
    const cookieStore = await cookies()
      cookieStore.set('userId', user.id, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

    // Redirect based on user role
    if ((user.role as UserRole) === "STUDENT") {
      redirect("/dashboard/student")
    } else if ((user.role as UserRole) === "STAFF") {
      redirect("/dashboard/staff")
    } else {
      redirect("/dashboard/admin")
    }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login. Please try again." }
  }
}

export async function register(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const userType = formData.get("userType") as string
    const studentId = formData.get("studentId") as string
    const hostelBlock = formData.get("hostelBlock") as string
    const roomNumber = formData.get("roomNumber") as string

    // Validate required fields
    if (!fullName || !email || !password || !userType) {
      return { error: "Required fields are missing" }
    }

    // Validate password match
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    // Validate student-specific fields
    if (userType === "STUDENT" && (!studentId || !hostelBlock || !roomNumber)) {
      return { error: "Student ID, hostel block, and room number are required for students" }
    }

    // Check if email already exists
    const existingUser = await db.users.findByEmail(email)
    if (existingUser) {
      return { error: "Email already in use" }
    }

    // Create user
    await db.users.create({
      fullName,
      email,
      password,
      role: userType as UserRole,
      studentId: userType === "STUDENT" ? studentId : undefined,
      hostelBlock: userType === "STUDENT" ? hostelBlock : undefined,
      roomNumber: userType === "STUDENT" ? roomNumber : undefined,
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An error occurred during registration. Please try again." }
  }
}

export async function logout() {
  (await cookies()).delete("userId")
  redirect("/")
}
