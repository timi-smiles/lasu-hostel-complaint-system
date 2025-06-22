import prisma from "@/lib/db" // FIXED: Use singleton instead!

export class NotificationService {
  
  // Create notification for new complaint submission
  static async createNewComplaintNotification(complaintId: string, studentId: string) {
    try {
      // Get complaint details
      const complaint = await prisma.complaint.findUnique({
        where: { id: complaintId },
        include: {
          student: {
            select: { fullName: true, hostelBlock: true, roomNumber: true }
          }
        }
      })

      if (!complaint) return

      // Get all staff members to notify
      const staffMembers = await prisma.user.findMany({
        where: {
          role: { in: ["STAFF", "ADMIN"] },
          status: "ACTIVE"
        },
        select: { id: true }
      })

      // Create notifications for all staff members
      const notifications = staffMembers.map(staff => ({
        type: "NEW_COMPLAINT" as const,
        title: "New Complaint Submitted",
        message: `${complaint.student.fullName} submitted a new ${complaint.category} complaint from ${complaint.hostelBlock} Room ${complaint.roomNumber}`,
        userId: staff.id,
        complaintId: complaintId,
        triggeredById: studentId,
        isRead: false
      }))

      await prisma.notification.createMany({
        data: notifications
      })

      console.log(`📢 Created notifications for ${staffMembers.length} staff members about new complaint: ${complaint.title}`)

    } catch (error) {
      console.error(" Failed to create new complaint notifications:", error)
    }
  }

  // Create notification for complaint updates
  static async createComplaintUpdateNotification(complaintId: string, staffId: string, updateMessage: string) {
    try {
      // Get complaint and student details
      const complaint = await prisma.complaint.findUnique({
        where: { id: complaintId },
        include: {
          student: {
            select: { id: true, fullName: true }
          }
        }
      })

      if (!complaint) return

      // Create notification for the student
      await prisma.notification.create({
        data: {
          type: "COMPLAINT_UPDATE",
          title: "Complaint Update",
          message: `Your complaint "${complaint.title}" has been updated: ${updateMessage}`,
          userId: complaint.studentId,
          complaintId: complaintId,
          triggeredById: staffId,
          isRead: false
        }
      })

      console.log(`📢 Created update notification for student: ${complaint.student.fullName}`)

    } catch (error) {
      console.error(" Failed to create complaint update notification:", error)
    }
  }

  // Create notification for status changes
  static async createStatusChangeNotification(complaintId: string, newStatus: string, staffId: string) {
    try {
      const complaint = await prisma.complaint.findUnique({
        where: { id: complaintId },
        include: {
          student: {
            select: { id: true, fullName: true }
          }
        }
      })

      if (!complaint) return

      await prisma.notification.create({
        data: {
          type: "STATUS_CHANGE",
          title: "Complaint Status Updated",
          message: `Your complaint "${complaint.title}" status has been changed to ${newStatus.replace('_', ' ')}`,
          userId: complaint.studentId,
          complaintId: complaintId,
          triggeredById: staffId,
          isRead: false
        }
      })

      console.log(`📢 Created status change notification: ${newStatus}`)

    } catch (error) {
      console.error(" Failed to create status change notification:", error)
    }
  }
}