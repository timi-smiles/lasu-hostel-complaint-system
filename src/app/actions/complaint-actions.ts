"use server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { type ComplaintCategory, ComplaintPriority, ComplaintStatus, UserRole } from "@prisma/client"
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
    const categoryStr = formData.get("category") as string
    const description = formData.get("description") as string

    if (!title || !categoryStr || !description) {
      return { error: "All fields are required" }
    }

    // Convert category string to enum
    const category = categoryStr.toUpperCase().replace(" ", "_") as ComplaintCategory

    // Validate student has hostel info
    if (!user.hostelBlock || !user.roomNumber) {
      return { error: "Your profile is missing hostel information. Please update your profile." }
    }

    // Create complaint
    const newComplaint = await prisma.complaint.create({
      data: {
        title,
        category,
        description,
        status: ComplaintStatus.PENDING,
        priority: ComplaintPriority.MEDIUM,
        studentId: user.id,
        hostelBlock: user.hostelBlock,
        roomNumber: user.roomNumber,
      },
    })

    // Revalidate the complaints page to show the new complaint
    revalidatePath("/dashboard/student")

    return { success: true, complaint: newComplaint }
  } catch (error) {
    console.error("Submit complaint error:", error)
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

    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
    })

    if (!complaint) {
      return { error: "Complaint not found" }
    }

    // Convert status string to enum
    const statusEnum = status.toUpperCase().replace("-", "_") as ComplaintStatus

    // Update status
    await prisma.complaint.update({
      where: { id: complaintId },
      data: {
        status: statusEnum,
        assignedToId: user.id, // Assign to the staff member who updated it
      },
    })

    // Add update message if provided
    if (message) {
      await prisma.complaintUpdate.create({
        data: {
          message,
          complaintId,
          staffId: user.id,
        },
      })
    }

    // Revalidate the complaints page to show the updated status
    revalidatePath("/dashboard/staff")
    revalidatePath(`/dashboard/staff/complaint/${complaintId}`)

    return { success: true }
  } catch (error) {
    console.error("Update complaint status error:", error)
    return { error: "Failed to update complaint. Please try again." }
  }
}
