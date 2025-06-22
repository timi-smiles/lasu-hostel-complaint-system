import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/db" // ✅ FIXED: Use singleton instead!
import { getUserIdFromRequest } from "@/lib/auth"

// GET - Fetch Staff Profile
export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user data with all fields from your schema
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        phone: true,
        department: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // ✅ STRICT staff-only protection
    if (user.role !== "STAFF" && user.role !== "ADMIN") {
      console.log(`❌ Staff Profile: Access denied for role: ${user.role}`)
      return NextResponse.json({ 
        error: "Access denied. Staff access required.",
        userRole: user.role,
        redirectTo: "/dashboard/student/profile" // Add redirect hint
      }, { status: 403 })
    }

    // ✅ ADD: Get additional staff metrics for enhanced profile
    const [assignedComplaints, resolvedComplaints, averageRating] = await Promise.all([
      // Total complaints assigned to this staff
      prisma.complaint.count({
        where: { assignedToId: userId }
      }),
      
      // Resolved complaints count
      prisma.complaint.count({
        where: { 
          assignedToId: userId,
          status: "RESOLVED" 
        }
      }),
      
      // Average satisfaction rating
      prisma.complaintFeedback.aggregate({
        where: {
          complaint: {
            assignedToId: userId
          }
        },
        _avg: {
          rating: true
        }
      }).catch(() => ({ _avg: { rating: null } })) // Handle if feedback table doesn't exist
    ])

    console.log("✅ Staff Profile API: Successfully fetched for:", user.fullName)

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        // ✅ ADD: Staff performance metrics
        metrics: {
          totalAssigned: assignedComplaints,
          totalResolved: resolvedComplaints,
          resolutionRate: assignedComplaints > 0 
            ? Math.round((resolvedComplaints / assignedComplaints) * 100) 
            : 0,
          averageRating: averageRating._avg.rating 
            ? Math.round(averageRating._avg.rating * 10) / 10 
            : 0,
          satisfactionScore: averageRating._avg.rating 
            ? Math.round((averageRating._avg.rating / 5) * 100) 
            : 0
        }
      },
      timestamp: new Date().toISOString()
    }, {
      headers: {
        // ✅ ADD: Cache for profile data (can be cached briefly)
        'Cache-Control': 'private, max-age=300' // 5 minutes cache
      }
    })
  } catch (error) {
    console.error("❌ Staff Profile API Error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch staff profile",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// PUT - Update Staff Profile
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is staff BEFORE updating
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, fullName: true, email: true }
    })

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (existingUser.role !== "STAFF" && existingUser.role !== "ADMIN") {
      console.log(`❌ Staff Profile Update: Access denied for role: ${existingUser.role}`)
      return NextResponse.json({ 
        error: "Access denied. Staff access required.",
        redirectTo: "/dashboard/student/profile"
      }, { status: 403 })
    }

    const body = await request.json()
    const { fullName, phone, phoneNumber, department } = body

    // ✅ ENHANCED: Input validation
    if (!fullName?.trim()) {
      return NextResponse.json({ 
        error: "Full name is required" 
      }, { status: 400 })
    }

    if (fullName.trim().length < 2) {
      return NextResponse.json({ 
        error: "Full name must be at least 2 characters" 
      }, { status: 400 })
    }

    if (phone && !/^[\d\s\+\-\(\)]{10,15}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json({ 
        error: "Please provide a valid phone number" 
      }, { status: 400 })
    }

    // ✅ ENHANCED: Use transaction for profile update with audit log
    const result = await prisma.$transaction(async (tx) => {
      // Update user profile
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          fullName: fullName.trim(),
          phone: phone?.trim() || null,
          department: department?.trim() || null,
          updatedAt: new Date()
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          status: true,
          phone: true,
          department: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true,
        },
      })

      // ✅ REMOVED: Audit log functionality (table doesn't exist in schema)
      // Can be re-enabled after adding auditLog model to Prisma schema
      console.log("Profile updated for user:", userId)

      return updatedUser
    })

    console.log("✅ Staff Profile API: Successfully updated for:", result.fullName)

    return NextResponse.json({
      success: true,
      message: "Staff profile updated successfully",
      user: result,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        // ✅ Clear cache after update
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error("❌ Staff Profile Update Error:", error)
    
    // ✅ ENHANCED: Better error handling
    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return NextResponse.json({ 
          error: "Profile information conflicts with existing data" 
        }, { status: 409 })
      }
      
      if (error.message.includes('foreign key')) {
        return NextResponse.json({ 
          error: "Invalid department or role specified" 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json({ 
      error: "Failed to update staff profile",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// ✅ ADD: Password change endpoint for staff
export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { currentPassword, newPassword, confirmPassword } = body

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ 
        error: "All password fields are required" 
      }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ 
        error: "New passwords do not match" 
      }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ 
        error: "New password must be at least 8 characters long" 
      }, { status: 400 })
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        role: true, 
        passwordHash: true,
        fullName: true 
      }
    })

    if (!user || (user.role !== "STAFF" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Verify current password
    const { verify } = await import("argon2")
    const isValidPassword = await verify(user.passwordHash, currentPassword)
    
    if (!isValidPassword) {
      return NextResponse.json({ 
        error: "Current password is incorrect" 
      }, { status: 400 })
    }

    // Hash new password
    const { hash } = await import("argon2")
    const newPasswordHash = await hash(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        updatedAt: new Date()
      }
    })

    console.log("✅ Staff password updated for:", user.fullName)

    return NextResponse.json({
      success: true,
      message: "Password updated successfully"
    })

  } catch (error) {
    console.error("❌ Staff password update error:", error)
    return NextResponse.json({ 
      error: "Failed to update password" 
    }, { status: 500 })
  }
}