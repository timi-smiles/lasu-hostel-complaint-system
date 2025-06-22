import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/db'
import { ComplaintStatus } from '../../../../../generated/prisma'

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

    // Only staff and admin can update complaint status
    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const { status } = await req.json()

    // Validate status
    const validStatuses: ComplaintStatus[] = ['PENDING', 'IN_PROGRESS', 'RESOLVED']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: PENDING, IN_PROGRESS, RESOLVED' },
        { status: 400 }
      )
    }

    // Check if complaint exists
    const existingComplaint = await prisma.complaint.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    })

    if (!existingComplaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
    }

    // Update complaint status
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: {
        status: status,
        updatedAt: new Date(),
        // Optionally assign to current user if not already assigned
        ...(status === 'IN_PROGRESS' && !existingComplaint.assignedToId && {
          assignedToId: user.id
        })
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

    // Create a status log entry
    await prisma.complaintStatusLog.create({
      data: {
        complaintId: id, // Use id instead of params.id
        oldStatus: existingComplaint.status,
        newStatus: status,
        changedById: user.id,
        createdAt: new Date()
      }
    })

    await prisma.complaintUpdate.create({
      data: {
        complaintId: id, // Use id instead of params.id
        staffId: user.id,
        message: `Status changed from ${existingComplaint.status.toLowerCase().replace('_', ' ')} to ${status.toLowerCase().replace('_', ' ')}`,
        createdAt: new Date()
      }
    })

    console.log(`Complaint ${id} status updated from ${existingComplaint.status} to ${status} by ${user.fullName}`)

    return NextResponse.json({
      message: 'Complaint status updated successfully',
      complaint: updatedComplaint,
      previousStatus: existingComplaint.status,
      newStatus: status
    })

  } catch (error) {
    console.error('Error updating complaint status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET method to retrieve current status (optional)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } //  Fixed: Promise<{ id: string }>
) {
  try {
    const user = await getCurrentUser()
    const { id } = await params //  Fixed: Await the params

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const complaint = await prisma.complaint.findUnique({
      where: { id }, //  Fixed: Use id instead of params.id
      select: {
        id: true,
        status: true,
        updatedAt: true,
        assignedTo: {
          select: {
            id: true,
            fullName: true
          }
        }
      }
    })

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 })
    }

    // Students can only view their own complaints
    if (user.role === 'STUDENT') {
      const complaintWithStudent = await prisma.complaint.findUnique({
        where: { id }, //  Fixed: Use id instead of params.id
        select: { studentId: true }
      })

      if (complaintWithStudent?.studentId !== user.id) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 })
      }
    }

    return NextResponse.json({
      status: complaint.status,
      updatedAt: complaint.updatedAt,
      assignedTo: complaint.assignedTo
    })

  } catch (error) {
    console.error('Error fetching complaint status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}