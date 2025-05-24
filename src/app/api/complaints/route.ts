import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { ComplaintPriority, ComplaintStatus } from '../../../generated/prisma'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status")
    const category = url.searchParams.get("category")
    const block = url.searchParams.get("block")

    // Base query - ALWAYS filter by user for students
    const where: any = {}

    // If student, ONLY return their complaints
    // Change userId to studentId to match your schema
    if (user.role === 'STUDENT') {
      where.studentId = user.id  // Changed from userId to studentId
    }

    // Add other filters
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
        student: {  // Changed from user to student to match your schema
          select: {
            id: true,
            fullName: true,
            hostelBlock: true,
            roomNumber: true
          }
        },
        updates: {
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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ complaints })
  } catch (error) {
    console.error('Error fetching complaints:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only students can create complaints
    if (user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can submit complaints' }, { status: 403 })
    }

    const { title, category, description, priority = ComplaintPriority.MEDIUM } = await req.json()

    // Validate required fields
    if (!title || !category || !description) {
      return NextResponse.json({ error: 'Title, category, and description are required' }, { status: 400 })
    }

    // Validate student has hostel info
    if (!user.hostelBlock || !user.roomNumber) {
      return NextResponse.json(
        { error: 'Your profile is missing hostel information. Please update your profile.' },
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
        studentId: user.id,  // Changed from userId to studentId
        hostelBlock: user.hostelBlock,
        roomNumber: user.roomNumber,
      },
      include: {
        student: {  // Changed from user to student
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
        message: 'Complaint submitted successfully',
        complaint: newComplaint,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Create complaint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
