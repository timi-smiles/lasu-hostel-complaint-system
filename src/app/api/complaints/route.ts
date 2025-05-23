import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { type ComplaintCategory, ComplaintPriority, ComplaintStatus, UserRole } from "../../../generated/prisma"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status") as ComplaintStatus | null
    const category = url.searchParams.get("category") as ComplaintCategory | null
    const block = url.searchParams.get("block")

    // Base query - ALWAYS filter by user for students
    const where: any = {}

    // If student, ONLY return their complaints
    if (user.role === UserRole.STUDENT) {
      where.studentId = user.id
    }
    // Staff and admin can see all complaints (existing logic)

    // Apply additional filters if provided
    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    if (block) {
      where.hostelBlock = block
    }

    const complaints = await prisma.complaint.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            studentId: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true,
          },
        },
        updates: {
          include: {
            staff: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ complaints })
  } catch (error) {
    console.error("Get complaints error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only students can create complaints
    if (user.role !== UserRole.STUDENT) {
      return NextResponse.json({ error: "Only students can submit complaints" }, { status: 403 })
    }

    const { title, category, description, priority = ComplaintPriority.MEDIUM } = await req.json()

    // Validate required fields
    if (!title || !category || !description) {
      return NextResponse.json({ error: "Title, category, and description are required" }, { status: 400 })
    }

    // Validate student has hostel info
    if (!user.hostelBlock || !user.roomNumber) {
      return NextResponse.json(
        { error: "Your profile is missing hostel information. Please update your profile." },
        { status: 400 },
      )
    }

    // Create complaint
    const newComplaint = await prisma.complaint.create({
      data: {
        title,
        category,
        description,
        status: ComplaintStatus.PENDING,
        priority,
        studentId: user.id,
        hostelBlock: user.hostelBlock,
        roomNumber: user.roomNumber,
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            studentId: true,
          },
        },
        updates: true,
      },
    })

    return NextResponse.json(
      {
        message: "Complaint submitted successfully",
        complaint: newComplaint,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
