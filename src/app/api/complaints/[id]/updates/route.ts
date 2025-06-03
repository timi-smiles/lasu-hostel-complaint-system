import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db" //  Use Prisma directly

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params //  Await params Promise

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only staff and admin can add updates
    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id }
    })

    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 })
    }

    const { message } = await req.json()

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create the update using Prisma
    const update = await prisma.complaintUpdate.create({
      data: {
        message: message.trim(),
        complaintId: id,
        staffId: user.id,
        createdAt: new Date()
      },
      include: {
        staff: {
          select: {
            id: true,
            fullName: true
          }
        }
      }
    })

    // Update the complaint timestamp
    await prisma.complaint.update({
      where: { id },
      data: { updatedAt: new Date() }
    })

    console.log(`Update added to complaint ${id} by ${user.fullName}`)

    return NextResponse.json(
      {
        message: "Update added successfully",
        update: update, //  Frontend expects 'update'
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add complaint update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    const { id } = await params

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await prisma.complaintUpdate.findMany({
      where: { complaintId: id },
      include: {
        staff: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({ updates })

  } catch (error) {
    console.error("Error fetching complaint updates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
