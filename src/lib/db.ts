// lib/db.ts - PRODUCTION READY VERSION
import { hash, verify } from "argon2"
import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = new PrismaClient({
  log: process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  // Add connection pool settings for production
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Use Prisma types directly - no custom types needed
export type { User, Complaint, ComplaintStatus, ComplaintPriority, UserRole, ComplaintCategory } from '../generated/prisma'
import type { ComplaintCategory, ComplaintPriority } from '../generated/prisma'

// Database operations using Prisma ONLY
export const db = {
  users: {
    findByEmail: async (email: string) => {
      return await prisma.user.findUnique({
        where: { email }
      })
    },

    findById: async (id: string) => {
      return await prisma.user.findUnique({
        where: { id }
      })
    },

    create: async (userData: {
      fullName: string
      email: string
      password: string
      role: "STUDENT" | "STAFF" | "ADMIN"
      studentId?: string
      hostelBlock?: string
      roomNumber?: string
      department?: string
      phone?: string
    }) => {
      const passwordHash = await hash(userData.password)
      // Fix: Remove unused password variable
      const { password: _, ...data } = userData
      
      return await prisma.user.create({
        data: {
          ...data,
          passwordHash
        }
      })
    },

    update: async (id: string, userData: {
      fullName?: string
      email?: string
      hostelBlock?: string
      roomNumber?: string
      department?: string
      phone?: string
    }) => {
      return await prisma.user.update({
        where: { id },
        data: userData
      })
    },

    updatePassword: async (id: string, newPassword: string) => {
      const passwordHash = await hash(newPassword)
      await prisma.user.update({
        where: { id },
        data: { passwordHash }
      })
      return true
    },

    verifyPassword: async (passwordHash: string, password: string) => {
      return await verify(passwordHash, password)
    },

    getAllStudents: async () => {
      return await prisma.user.findMany({
        where: { role: 'STUDENT' }
      })
    },

    getAllStaff: async () => {
      return await prisma.user.findMany({
        where: { 
          role: { in: ['STAFF', 'ADMIN'] }
        }
      })
    }
  },

  complaints: {
    getAll: async () => {
      return await prisma.complaint.findMany({
        include: {
          student: {
            select: {
              fullName: true,
              hostelBlock: true,
              roomNumber: true
            }
          },
          assignedTo: {
            select: {
              fullName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    },

    getById: async (id: string) => {
      return await prisma.complaint.findUnique({
        where: { id },
        include: {
          student: true,
          assignedTo: true,
          statusLogs: {
            orderBy: { createdAt: 'desc' }
          }
        }
      })
    },

    getByStudentId: async (studentId: string) => {
      return await prisma.complaint.findMany({
        where: { studentId },
        orderBy: { createdAt: 'desc' }
      })
    },

    create: async (complaintData: {
      title: string
      category: string
      description: string
      priority: string
      studentId: string
      hostelBlock: string
      roomNumber: string
      images?: string[]
    }) => {
      // Convert to Prisma enum format
      const categoryEnum = complaintData.category.toUpperCase().replace(/\s+/g, '_')
      const priorityEnum = complaintData.priority.toUpperCase()

      return await prisma.complaint.create({
        data: {
          title: complaintData.title,
          description: complaintData.description,
          // Fix: Use proper enum types instead of any
          category: categoryEnum as ComplaintCategory,
          priority: priorityEnum as ComplaintPriority,
          studentId: complaintData.studentId,
          hostelBlock: complaintData.hostelBlock,
          roomNumber: complaintData.roomNumber,
          status: 'PENDING'
        }
      })
    },

    update: async (id: string, data: {
      status?: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED"
      assignedToId?: string
      priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
    }) => {
      return await prisma.complaint.update({
        where: { id },
        data
      })
    },

    getStats: async () => {
      const [
        total,
        pending,
        inProgress,
        resolved,
        rejected,
        byCategory,
        byBlock
      ] = await Promise.all([
        prisma.complaint.count(),
        prisma.complaint.count({ where: { status: 'PENDING' } }),
        prisma.complaint.count({ where: { status: 'IN_PROGRESS' } }),
        prisma.complaint.count({ where: { status: 'RESOLVED' } }),
        prisma.complaint.count({ where: { status: 'REJECTED' } }),
        prisma.complaint.groupBy({
          by: ['category'],
          _count: { id: true }
        }),
        prisma.complaint.groupBy({
          by: ['hostelBlock'],
          _count: { id: true }
        })
      ])

      return {
        total,
        pending,
        inProgress,
        resolved,
        rejected,
        byCategory: Object.fromEntries(
          byCategory.map(item => [item.category, item._count.id])
        ),
        byBlock: Object.fromEntries(
          byBlock.map(item => [item.hostelBlock, item._count.id])
        )
      }
    }
  }
}

export default prisma
