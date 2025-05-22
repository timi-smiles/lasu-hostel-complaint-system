
// import { type NextRequest, NextResponse } from "next/server"
// import { cookies } from "next/headers"
// import { prisma } from "@/lib/prisma"  // Update to match your export style
// import { verifyPassword } from "@/lib/auth"
// import { UserRole, UserStatus } from "@/generated/prisma" // Import from generated Prisma code

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password, userType } = await req.json()

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
//     }

//     const user = await prisma.user.findUnique({
//       where: { 
//         email,
//         status: UserStatus.ACTIVE, // Only allow active users to login
//       },
//     })

//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
//     }

//     // If userType is provided, validate it matches the user's role
//     if (userType) {
//       // Convert userType string to UserRole enum
//       const role = userType.toUpperCase() as UserRole
      
//       if (user.role !== role) {
//         return NextResponse.json({ error: "Invalid account type" }, { status: 401 })
//       }
//     }

//     const isPasswordValid = await verifyPassword(user.passwordHash, password)

//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
//     }

//     // Update last login
//     await prisma.user.update({
//       where: { id: user.id },
//       data: { lastLogin: new Date() },
//     })

//     // Set cookie - cookies() returns a Promise, so await it
//     const cookieStore = await cookies();
//     cookieStore.set("userId", user.id, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//       path: "/",
//     })

//     // Return user data (without password)
//     const { passwordHash, ...userData } = user

//     return NextResponse.json({
//       message: "Login successful",
//       user: userData,
//     })
//   } catch (error) {
//     console.error("Login error:", error)
//     return NextResponse.json({ 
//       error: "Internal server error",
//       details: process.env.NODE_ENV !== "production" && error instanceof Error ? error.message : undefined
//     }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/auth"
import { UserRole, UserStatus } from "@/generated/prisma"

export async function POST(req: NextRequest) {
  try {
    const { email, password, userType } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
        status: UserStatus.ACTIVE,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if userType is provided and valid
    if (userType) {
      const role = userType.trim().toUpperCase() as UserRole
      const validRoles = Object.values(UserRole)

      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 })
      }

      if (user.role !== role) {
        return NextResponse.json({ error: "Invalid account type" }, { status: 401 })
      }
    }

    const isPasswordValid = await verifyPassword(user.passwordHash, password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    const { passwordHash, ...userData } = user

    return NextResponse.json({
      message: "Login successful",
      user: userData,
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({
      error: "Internal server error",
      details: process.env.NODE_ENV !== "production" && error instanceof Error ? error.message : undefined,
    }, { status: 500 })
  }
}
