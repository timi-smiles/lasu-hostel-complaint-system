// This file simulates a database with mock data
// In a real application, you would replace this with actual database calls

import { hash, verify } from "argon2"

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

// Mock data
const users: User[] = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john.smith@university.edu",
    passwordHash: "$2b$10$XfxLGnYh3NaT3wLg4V4Rn.L7TXxXekE.EK1YzTZQkX5ZxF/Xq5Bw2", // password: password123
    role: "student",
    studentId: "STU001",
    hostelBlock: "A",
    roomNumber: "101",
    department: "Computer Science",
    phone: "+1 (555) 123-4567",
    createdAt: "2023-01-15T08:30:00Z",
    lastLogin: "2025-05-14T09:30:00Z",
  },
  {
    id: "2",
    fullName: "Sarah Thompson",
    email: "sarah.thompson@university.edu",
    passwordHash: "$2b$10$XfxLGnYh3NaT3wLg4V4Rn.L7TXxXekE.EK1YzTZQkX5ZxF/Xq5Bw2", // password: password123
    role: "staff",
    department: "Hostel Management",
    phone: "+1 (555) 987-6543",
    createdAt: "2022-06-15T10:15:00Z",
    lastLogin: "2025-05-14T09:30:00Z",
  },
  {
    id: "3",
    fullName: "Admin User",
    email: "admin@university.edu",
    passwordHash: "$2b$10$XfxLGnYh3NaT3wLg4V4Rn.L7TXxXekE.EK1YzTZQkX5ZxF/Xq5Bw2", // password: password123
    role: "admin",
    department: "Administration",
    phone: "+1 (555) 555-5555",
    createdAt: "2022-01-01T00:00:00Z",
    lastLogin: "2025-05-14T09:30:00Z",
  },
  {
    id: "4",
    fullName: "Emily Johnson",
    email: "emily.johnson@university.edu",
    passwordHash: "$2b$10$XfxLGnYh3NaT3wLg4V4Rn.L7TXxXekE.EK1YzTZQkX5ZxF/Xq5Bw2", // password: password123
    role: "student",
    studentId: "STU042",
    hostelBlock: "B",
    roomNumber: "205",
    department: "Business Administration",
    phone: "+1 (555) 234-5678",
    createdAt: "2023-02-20T14:45:00Z",
    lastLogin: "2025-05-13T16:20:00Z",
  },
  {
    id: "5",
    fullName: "Michael Chen",
    email: "michael.chen@university.edu",
    passwordHash: "$2b$10$XfxLGnYh3NaT3wLg4V4Rn.L7TXxXekE.EK1YzTZQkX5ZxF/Xq5Bw2", // password: password123
    role: "student",
    studentId: "STU078",
    hostelBlock: "C",
    roomNumber: "310",
    department: "Engineering",
    phone: "+1 (555) 345-6789",
    createdAt: "2023-03-05T11:30:00Z",
    lastLogin: "2025-05-10T08:15:00Z",
  },
]

const complaints: Complaint[] = [
  {
    id: "C001",
    title: "Leaking Faucet in Bathroom",
    category: "Plumbing",
    description: "The faucet in my bathroom is constantly dripping, wasting water.",
    status: "in-progress",
    priority: "medium",
    studentId: "1",
    studentName: "John Smith",
    hostelBlock: "A",
    roomNumber: "101",
    createdAt: "2025-05-10T10:30:00Z",
    updatedAt: "2025-05-11T09:15:00Z",
    assignedTo: "Maintenance Team",
    updates: [
      {
        id: "U001",
        complaintId: "C001",
        message: "Maintenance team has been notified.",
        staffId: "2",
        staffName: "Sarah Thompson",
        createdAt: "2025-05-10T14:20:00Z",
      },
      {
        id: "U002",
        complaintId: "C001",
        message: "Plumber scheduled for tomorrow.",
        staffId: "2",
        staffName: "Sarah Thompson",
        createdAt: "2025-05-11T09:15:00Z",
      },
    ],
  },
  {
    id: "C002",
    title: "Broken Light Fixture",
    category: "Electrical",
    description: "The ceiling light in my room is flickering and sometimes doesn't turn on.",
    status: "pending",
    priority: "low",
    studentId: "4",
    studentName: "Emily Johnson",
    hostelBlock: "B",
    roomNumber: "205",
    createdAt: "2025-05-11T15:45:00Z",
    updatedAt: "2025-05-11T15:45:00Z",
    updates: [],
  },
  {
    id: "C003",
    title: "Noisy Neighbors",
    category: "Noise Complaint",
    description: "The residents in room 203 play loud music after quiet hours (11 PM).",
    status: "resolved",
    priority: "high",
    studentId: "5",
    studentName: "Michael Chen",
    hostelBlock: "C",
    roomNumber: "310",
    createdAt: "2025-05-05T20:10:00Z",
    updatedAt: "2025-05-08T11:20:00Z",
    assignedTo: "Hostel Warden",
    updates: [
      {
        id: "U003",
        complaintId: "C003",
        message: "Hostel warden has been informed.",
        staffId: "2",
        staffName: "Sarah Thompson",
        createdAt: "2025-05-06T10:00:00Z",
      },
      {
        id: "U004",
        complaintId: "C003",
        message: "Warden spoke with the residents.",
        staffId: "2",
        staffName: "Sarah Thompson",
        createdAt: "2025-05-06T16:30:00Z",
      },
      {
        id: "U005",
        complaintId: "C003",
        message: "Issue resolved. Please report if it happens again.",
        staffId: "2",
        staffName: "Sarah Thompson",
        createdAt: "2025-05-08T11:20:00Z",
      },
    ],
  },
]

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
