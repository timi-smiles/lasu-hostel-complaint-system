import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db"  // Use Prisma instead of mock db

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role === "STUDENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const url = new URL(req.url)
    const role = url.searchParams.get("role")
    const block = url.searchParams.get("block")

    console.log("🔍 API: Query params - role:", role, "block:", block)

    let users = []

    if (role === "student") {
      console.log("🔍 API: Fetching students from Prisma database...")
      
      // Use Prisma to get real students from database
      users = await prisma.user.findMany({
        where: {
          role: "STUDENT"  //Prisma schema uses "STUDENT"
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          status: true,
          phone: true,
          studentId: true,
          hostelBlock: true,
          roomNumber: true,
          department: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true
        }
      })

      console.log(" API: Prisma found", users.length, "students")
      
      if (users.length > 0) {
        console.log(" API: First student:", users[0])
      }

    } else if (role === "staff") {
      users = await prisma.user.findMany({
        where: {
          OR: [
            { role: "STAFF" },
            { role: "ADMIN" }
          ]
        }
      })
    } else {
      // Get all users
      users = await prisma.user.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          status: true,
          phone: true,
          studentId: true,
          hostelBlock: true,
          roomNumber: true,
          department: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true
        }
      })
    }

    // Filter by hostel block if provided
    if (block) {
      console.log("🔍 API: Filtering by block:", block)
      users = users.filter((u) => u.hostelBlock === block)
      console.log(" API: After block filter:", users.length, "users")
    }

    console.log(" API: Returning", users.length, "users")

    return NextResponse.json({ users })

  } catch (error) {
    console.error(" API: Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
