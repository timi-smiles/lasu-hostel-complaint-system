// This file simulates a database with mock data
// In a real application, you would replace this with actual database calls

import { hash, verify } from "argon2"
import { PrismaClient } from '../generated/prisma'

declare global {
  var __prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient()
  }
  prisma = global.__prisma
}

export default prisma

// Mock data arrays
const users: User[] = []
const complaints: Complaint[] = []

// Types
export type UserRole = "student" | "staff" | "admin"

export interface User {
  id: string
  fullName: string
  email: string
  passwordHash: string
  role: UserRole
  studentId?: string
  hostelBlock?: string
  roomNumber?: string
  department?: string
  phone?: string
  createdAt: string
  lastLogin?: string
}

export type ComplaintStatus = "pending" | "in-progress" | "resolved" | "rejected"
export type ComplaintPriority = "low" | "medium" | "high" | "urgent"
export type ComplaintCategory =
  | "Plumbing"
  | "Electrical"
  | "Furniture"
  | "Cleanliness"
  | "Noise Complaint"
  | "Security"
  | "Internet"
  | "Other"

export interface ComplaintUpdate {
  id: string
  complaintId: string
  message: string
  staffId?: string
  staffName?: string
  createdAt: string
}

export interface Complaint {
  id: string
  title: string
  category: ComplaintCategory
  description: string
  status: ComplaintStatus
  priority: ComplaintPriority
  studentId: string
  studentName: string
  hostelBlock: string
  roomNumber: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
  updates: ComplaintUpdate[]
}

// Database operations
export const db = {
  // User operations
  users: {
    findByEmail: async (email: string): Promise<User | null> => {
      const user = users.find((u) => u.email === email)
      return user || null
    },

    findById: async (id: string): Promise<User | null> => {
      const user = users.find((u) => u.id === id)
      return user || null
    },

    create: async (userData: Omit<User, "id" | "passwordHash" | "createdAt"> & { password: string }): Promise<User> => {
      const passwordHash = await hash(userData.password)
      const newUser: User = {
        id: `${users.length + 1}`,
        passwordHash,
        createdAt: new Date().toISOString(),
        ...userData,
      }
      users.push(newUser)
      return newUser
    },

    update: async (id: string, userData: Partial<Omit<User, "id" | "passwordHash">>): Promise<User | null> => {
      const index = users.findIndex((u) => u.id === id)
      if (index === -1) return null

      users[index] = { ...users[index], ...userData }
      return users[index]
    },

    updatePassword: async (id: string, newPassword: string): Promise<boolean> => {
      const index = users.findIndex((u) => u.id === id)
      if (index === -1) return false

      users[index].passwordHash = await hash(newPassword)
      return true
    },

    verifyPassword: async (user: User, password: string): Promise<boolean> => {
      return verify(password, user.passwordHash)
    },

    getAllStudents: async (): Promise<User[]> => {
      return users.filter((u) => u.role === "student")
    },

    getAllStaff: async (): Promise<User[]> => {
      return users.filter((u) => u.role === "staff" || u.role === "admin")
    },
  },

  // Complaint operations
  complaints: {
    getAll: async (): Promise<Complaint[]> => {
      return complaints
    },

    getById: async (id: string): Promise<Complaint | null> => {
      const complaint = complaints.find((c) => c.id === id)
      return complaint || null
    },

    getByStudentId: async (studentId: string): Promise<Complaint[]> => {
      return complaints.filter((c) => c.studentId === studentId)
    },

    create: async (
      complaintData: Omit<Complaint, "id" | "createdAt" | "updatedAt" | "updates">,
    ): Promise<Complaint> => {
      const now = new Date().toISOString()
      const newComplaint: Complaint = {
        id: `C${String(complaints.length + 1).padStart(3, "0")}`,
        createdAt: now,
        updatedAt: now,
        updates: [],
        ...complaintData,
      }
      complaints.push(newComplaint)
      return newComplaint
    },

    update: async (
      id: string,
      complaintData: Partial<Omit<Complaint, "id" | "createdAt" | "updates">>,
    ): Promise<Complaint | null> => {
      const index = complaints.findIndex((c) => c.id === id)
      if (index === -1) return null

      complaints[index] = {
        ...complaints[index],
        ...complaintData,
        updatedAt: new Date().toISOString(),
      }
      return complaints[index]
    },

    addUpdate: async (
      complaintId: string,
      updateData: Omit<ComplaintUpdate, "id" | "complaintId" | "createdAt">,
    ): Promise<Complaint | null> => {
      const index = complaints.findIndex((c) => c.id === complaintId)
      if (index === -1) return null

      const newUpdate: ComplaintUpdate = {
        id: `U${String(complaints[index].updates.length + 1).padStart(3, "0")}`,
        complaintId,
        createdAt: new Date().toISOString(),
        ...updateData,
      }

      complaints[index].updates.push(newUpdate)
      complaints[index].updatedAt = newUpdate.createdAt

      return complaints[index]
    },

    delete: async (id: string): Promise<boolean> => {
      const index = complaints.findIndex((c) => c.id === id)
      if (index === -1) return false

      complaints.splice(index, 1)
      return true
    },

    getStats: async (): Promise<{
      total: number
      pending: number
      inProgress: number
      resolved: number
      byCategory: Record<string, number>
      byBlock: Record<string, number>
    }> => {
      const stats = {
        total: complaints.length,
        pending: complaints.filter((c) => c.status === "pending").length,
        inProgress: complaints.filter((c) => c.status === "in-progress").length,
        resolved: complaints.filter((c) => c.status === "resolved").length,
        byCategory: {} as Record<string, number>,
        byBlock: {} as Record<string, number>,
      }

      // Count by category
      complaints.forEach((c) => {
        if (!stats.byCategory[c.category]) {
          stats.byCategory[c.category] = 0
        }
        stats.byCategory[c.category]++

        if (!stats.byBlock[c.hostelBlock]) {
          stats.byBlock[c.hostelBlock] = 0
        }
        stats.byBlock[c.hostelBlock]++
      })

      return stats
    },
  },
}
