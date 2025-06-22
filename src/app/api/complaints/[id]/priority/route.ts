import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { ComplaintPriority } from '../../../../../generated/prisma'

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context
  const { id } = await params

  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only staff and admin can update complaint priority
    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const { priority } = await req.json()

    // Validate priority
    const validPriorities: ComplaintPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']
    if (!priority || !validPriorities.includes(priority)) {
      return NextResponse.json(
        { error: 'Invalid priority. Must be one of: LOW, MEDIUM, HIGH, URGENT' },
        { status: 400 }
      )
    }

    // Check if complaint exists
    const existingComplaint = await prisma.complaint.findUnique({
      where: { id }
    })

    if (!existingComplaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
    }

    // Update complaint priority
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: {
        priority: priority,
        updatedAt: new Date()
      },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true,
            hostelBlock: true,
            roomNumber: true
          }
        },
        assignedTo: {
          select: {
            id: true,
            fullName: true
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
      }
    })

    // Create an automatic update entry
    await prisma.complaintUpdate.create({
      data: {
        complaintId: id,
        staffId: user.id,
        message: `Priority changed from ${existingComplaint.priority.toLowerCase()} to ${priority.toLowerCase()}`,
        createdAt: new Date()
      }
    })

    console.log(`Complaint ${id} priority updated from ${existingComplaint.priority} to ${priority} by ${user.fullName}`)

    return NextResponse.json({
      message: 'Complaint priority updated successfully',
      complaint: updatedComplaint,
      previousPriority: existingComplaint.priority,
      newPriority: priority
    })

  } catch (error) {
    console.error('Error updating complaint priority:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}