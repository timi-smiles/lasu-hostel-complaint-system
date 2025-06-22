"use server"

import prisma from "@/lib/db" // FIXED: Use singleton instead!
// ❌ REMOVE: import { prisma } from "@/lib/prisma"

import { getCurrentUser } from "@/lib/auth"
import { ComplaintPriority, ComplaintStatus, UserRole } from "../../generated/prisma"
import { revalidatePath } from "next/cache"

export async function submitComplaint(formData: FormData) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to submit a complaint" }
    }

    if (user.role !== UserRole.STUDENT) {
      return { error: "Only students can submit complaints" }
    }

    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string

    // ENHANCED: Better validation
    if (!title?.trim() || !category?.trim() || !description?.trim()) {
      return { error: "All fields are required" }
    }

    if (title.length > 200) {
      return { error: "Title must be less than 200 characters" }
    }

    if (description.length > 2000) {
      return { error: "Description must be less than 2000 characters" }
    }

    // Validate student has hostel info
    if (!user.hostelBlock || !user.roomNumber) {
      return { error: "Your profile is missing hostel information. Please update your profile." }
    }

    // ENHANCED: Add priority detection based on category
    const getPriorityByCategory = (category: string): ComplaintPriority => {
      const urgentCategories = ['ELECTRICAL', 'PLUMBING', 'SECURITY']
      const highCategories = ['INTERNET', 'FURNITURE']
      
      if (urgentCategories.includes(category)) return ComplaintPriority.HIGH
      if (highCategories.includes(category)) return ComplaintPriority.MEDIUM
      return ComplaintPriority.LOW
    }

    // ENHANCED: Transaction for data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create complaint
      const newComplaint = await tx.complaint.create({
        data: {
          title: title.trim(),
          category: category as any as import("../../generated/prisma").ComplaintCategory,
          description: description.trim(),
          status: ComplaintStatus.PENDING,
          priority: getPriorityByCategory(category),
          studentId: user.id,
          hostelBlock: user.hostelBlock!,
          roomNumber: user.roomNumber!,
        },
      })

      // ADD: Create initial status log
      await tx.complaintStatusLog.create({
        data: {
          complaintId: newComplaint.id,
          oldStatus: ComplaintStatus.PENDING,
          newStatus: ComplaintStatus.PENDING,
          changedById: user.id
        }
      }).catch(() => {
        // Handle if status log table doesn't exist
        console.log("Status log table not available")
      })

      return newComplaint
    })

    // Revalidate the complaints page to show the new complaint
    revalidatePath("/dashboard/student")
    revalidatePath("/dashboard/student/complaints")

    return { success: true, complaint: result }
  } catch (error) {
    console.error("Submit complaint error:", error)
    
    // ENHANCED: Better error handling
    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return { error: "A similar complaint already exists" }
      }
      if (error.message.includes('foreign key')) {
        return { error: "Invalid data provided" }
      }
    }
    
    return { error: "Failed to submit complaint. Please try again." }
  }
}

export async function updateComplaintStatus(complaintId: string, status: string, message: string) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: "You must be logged in to update a complaint" }
    }

    if (user.role === UserRole.STUDENT) {
      return { error: "Students cannot update complaint status" }
    }

    // ENHANCED: Validate inputs
    if (!complaintId?.trim()) {
      return { error: "Invalid complaint ID" }
    }

    if (!status?.trim()) {
      return { error: "Status is required" }
    }

    // ENHANCED: Check complaint exists and get current status
    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
      select: {
        id: true,
        status: true,
        studentId: true,
        title: true
      }
    })

    if (!complaint) {
      return { error: "Complaint not found" }
    }

    // Convert status string to enum
    const statusEnum = status.toUpperCase().replace("-", "_") as ComplaintStatus

    // ENHANCED: Validate status transition
    const validStatusTransitions: Record<ComplaintStatus, ComplaintStatus[]> = {
      [ComplaintStatus.PENDING]: [ComplaintStatus.IN_PROGRESS, ComplaintStatus.REJECTED],
      [ComplaintStatus.IN_PROGRESS]: [ComplaintStatus.RESOLVED, ComplaintStatus.PENDING],
      [ComplaintStatus.RESOLVED]: [ComplaintStatus.IN_PROGRESS], // Can reopen if needed
      [ComplaintStatus.REJECTED]: [ComplaintStatus.PENDING, ComplaintStatus.IN_PROGRESS]
    }

    if (!validStatusTransitions[complaint.status]?.includes(statusEnum)) {
      return { error: `Cannot change status from ${complaint.status} to ${statusEnum}` }
    }

    // ENHANCED: Use transaction for consistency
    const result = await prisma.$transaction(async (tx) => {
      // Update complaint status
      const updatedComplaint = await tx.complaint.update({
        where: { id: complaintId },
        data: {
          status: statusEnum,
          assignedToId: user.id,
          updatedAt: new Date()
        },
      })

      // Add update message if provided
      if (message?.trim()) {
        await tx.complaintUpdate.create({
          data: {
            message: message.trim(),
            complaintId,
            staffId: user.id,
          },
        })
      }
      // ADD: Create status log
      await tx.complaintStatusLog.create({
        data: {
          complaintId,
          oldStatus: complaint.status,
          newStatus: statusEnum,
          changedById: user.id
        }
      }).catch(() => {
        // Handle if status log table doesn't exist
        console.log("Status log table not available")
      })

      // ADD: Create notification
      await tx.notification.create({
        data: {
          userId: complaint.studentId,
          title: `Complaint Status Updated`,
          message: `Your complaint "${complaint.title}" status has been changed to ${statusEnum.toLowerCase().replace('_', ' ')}`,
          type: 'COMPLAINT_UPDATE'
        }
      }).catch(() => {
        // Handle if notification table doesn't exist
        console.log("Notification table not available")
      })

      return updatedComplaint
    })

    // ENHANCED: More specific revalidation paths
    revalidatePath("/dashboard/staff")
    revalidatePath("/dashboard/staff/complaints")
    revalidatePath(`/dashboard/staff/complaints/${complaintId}`)
    revalidatePath("/dashboard/student")
    revalidatePath("/dashboard/student/complaints")
    revalidatePath(`/dashboard/student/complaints/${complaintId}`)

    return { success: true, complaint: result }
  } catch (error) {
    console.error("Update complaint status error:", error)
    
    // ENHANCED: Better error handling
    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return { error: "Duplicate status update detected" }
      }
      if (error.message.includes('foreign key')) {
        return { error: "Invalid complaint or user ID" }
      }
      if (error.message.includes('permission')) {
        return { error: "You don't have permission to update this complaint" }
      }
    }
    
    return { error: "Failed to update complaint. Please try again." }
  }
}

// ADD: New action for assigning complaints to staff
export async function assignComplaint(complaintId: string, staffId: string) {
  try {
    const user = await getCurrentUser()

    if (!user || (user.role !== UserRole.STAFF && user.role !== UserRole.ADMIN)) {
      return { error: "Unauthorized to assign complaints" }
    }

    // Validate staff exists
    const staff = await prisma.user.findUnique({
      where: { id: staffId },
      select: { id: true, role: true, fullName: true }
    })

    if (!staff || (staff.role !== UserRole.STAFF && staff.role !== UserRole.ADMIN)) {
      return { error: "Invalid staff member selected" }
    }

    // Update complaint assignment
    const updatedComplaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: {
        assignedToId: staffId,
        updatedAt: new Date()
      },
      select: {
        id: true,
        title: true,
        studentId: true
      }
    })

    // Add assignment update
    await prisma.complaintUpdate.create({
      data: {
        message: `Complaint assigned to ${staff.fullName}`,
        complaintId,
        staffId: user.id,
      },
    })

    // Revalidate paths
    revalidatePath("/dashboard/staff")
    revalidatePath("/dashboard/staff/complaints")
    revalidatePath(`/dashboard/staff/complaints/${complaintId}`)

    return { success: true, assignedTo: staff.fullName }
  } catch (error) {
    console.error("Assign complaint error:", error)
    return { error: "Failed to assign complaint. Please try again." }
  }
}

// ADD: New action for bulk status updates
export async function bulkUpdateStatus(complaintIds: string[], status: string, message?: string) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role === UserRole.STUDENT) {
      return { error: "Unauthorized to perform bulk updates" }
    }

    const statusEnum = status.toUpperCase().replace("-", "_") as ComplaintStatus

    // Use transaction for bulk update
    const result = await prisma.$transaction(async (tx) => {
      const updates = await Promise.all(
        complaintIds.map(async (id) => {
          await tx.complaint.update({
            where: { id },
            data: {
              status: statusEnum,
              assignedToId: user.id,
              updatedAt: new Date()
            }
          })

          if (message?.trim()) {
            await tx.complaintUpdate.create({
              data: {
                message: message.trim(),
                complaintId: id,
                staffId: user.id,
              },
            })
          }
        })
      )

      return updates
    })

    // Revalidate paths
    revalidatePath("/dashboard/staff")
    revalidatePath("/dashboard/staff/complaints")

    return { success: true, updatedCount: complaintIds.length }
  } catch (error) {
    console.error("Bulk update error:", error)
    return { error: "Failed to update complaints. Please try again." }
  }
}
