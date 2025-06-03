import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only staff and admin can access all complaints
    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const complaints = await prisma.complaint.findMany({
      include: {
        student: {  //  Changed from 'user' to 'student'
          select: {
            id: true,
            fullName: true,
            email: true,
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

    // Debug the data structure
    console.log('Fetched complaints:', JSON.stringify(complaints, null, 2))

    return NextResponse.json({ complaints })
  } catch (error) {
    console.error('Error fetching all complaints:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}