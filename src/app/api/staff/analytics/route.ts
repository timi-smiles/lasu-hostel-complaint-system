import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/lib/db" // FIXED: Use singleton instead!
import { getUserIdFromRequest } from "@/lib/auth"
import { $Enums } from "@/generated/prisma"


export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = await getUserIdFromRequest()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is staff
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, fullName: true }
    })

    if (!user || (user.role !== "STAFF" && user.role !== "ADMIN")) {
      return NextResponse.json({ 
        error: "Access denied. Staff access required." 
      }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "year"

    console.log(`Analytics: Fetching data for ${user.fullName} with time range: ${timeRange}`)

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case "week":
        startDate.setDate(now.getDate() - 7)
        break
      case "month":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "quarter":
        startDate.setMonth(now.getMonth() - 3)
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case "all":
        startDate = new Date("2020-01-01")
        break
    }

    // OPTIMIZED: Use Promise.all for parallel queries
    const [
      totalComplaints,
      complaintsByStatus,
      complaintsByCategory,
      complaintsByPriority,
      complaintsByBlock,
      blockStatusBreakdown,
      monthlyComplaints,
      resolvedComplaintsWithLogs,
      staffAssignments,
      satisfactionData
    ] = await Promise.all([
      // 1. Total complaints count
      prisma.complaint.count({
        where: {
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 2. Complaints by status
      prisma.complaint.groupBy({
        by: ['status'],
        _count: { id: true },
        where: {
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 3. Complaints by category
      prisma.complaint.groupBy({
        by: ['category'],
        _count: { id: true },
        where: {
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 4. Complaints by priority
      prisma.complaint.groupBy({
        by: ['priority'],
        _count: { id: true },
        where: {
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 5. Complaints by hostel block
      prisma.complaint.groupBy({
        by: ['hostelBlock'],
        _count: { id: true },
        where: {
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 6. Block status breakdown
      prisma.complaint.groupBy({
        by: ['hostelBlock', 'status'],
        _count: { id: true },
        where: {
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 7. Monthly trend data
      prisma.complaint.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          feedback: {
            select: {
              rating: true
            }
          }
        }
      }),

      // 8. Resolution time analysis
      prisma.complaint.findMany({
        where: {
          status: "RESOLVED",
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        },
        select: {
          id: true,
          category: true,
          createdAt: true,
          statusLogs: {
            where: {
              newStatus: "RESOLVED"
            },
            select: {
              createdAt: true
            },
            orderBy: {
              createdAt: "desc"
            },
            take: 1
          }
        }
      }),

      // 9. Staff performance metrics
      prisma.complaint.groupBy({
        by: ['assignedToId'],
        _count: { id: true },
        where: {
          assignedToId: { not: null },
          createdAt: {
            gte: timeRange === "all" ? undefined : startDate
          }
        }
      }),

      // 10. Satisfaction data
      prisma.complaintFeedback.findMany({
        where: {
          complaint: {
            createdAt: {
              gte: timeRange === "all" ? undefined : startDate
            }
          }
        },
        select: {
          rating: true,
          createdAt: true,
          complaint: {
            select: {
              category: true,
              hostelBlock: true
            }
          }
        }
      }).catch(() => []) // Handle if feedback table doesn't exist
    ])

    // Get staff details for performance metrics
    const staffIds = staffAssignments.map(sa => sa.assignedToId).filter(Boolean) as string[]
    
    const staffDetails = staffIds.length > 0 ? await prisma.user.findMany({
      where: {
        id: { in: staffIds }
      },
      select: {
        id: true,
        fullName: true,
        department: true
      }
    }) : []

    // Calculate detailed staff metrics
    const staffMetrics = await Promise.all(
      staffAssignments.map(async (assignment) => {
        const staffId = assignment.assignedToId!
        
        // Get all complaints assigned to this staff
        const staffComplaints = await prisma.complaint.findMany({
          where: {
            assignedToId: staffId,
            createdAt: {
              gte: timeRange === "all" ? undefined : startDate
            }
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
            category: true,
            feedback: {
              select: {
                rating: true
              }
            },
            statusLogs: {
              where: {
                newStatus: "RESOLVED"
              },
              select: {
                createdAt: true
              },
              orderBy: {
                createdAt: "desc"
              },
              take: 1
            }
          }
        })

        const resolvedComplaints = staffComplaints.filter(c => c.status === "RESOLVED")
        
        // Calculate average resolution time
        let totalResolutionDays = 0
        let resolvedCount = 0
        
        resolvedComplaints.forEach(complaint => {
          if (complaint.statusLogs.length > 0) {
            const resolvedDate = complaint.statusLogs[0].createdAt
            const createdDate = complaint.createdAt
            const days = Math.abs(resolvedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
            totalResolutionDays += days
            resolvedCount++
          }
        })

        const avgResolutionTime = resolvedCount > 0 ? totalResolutionDays / resolvedCount : 0

        // Calculate satisfaction rate
        const ratingsData = staffComplaints
          .map(c => c.feedback?.rating)
          .filter(rating => rating !== null && rating !== undefined) as number[]
        
        const avgRating = ratingsData.length > 0 
          ? ratingsData.reduce((a, b) => a + b, 0) / ratingsData.length 
          : 0

        const staffInfo = staffDetails.find(s => s.id === staffId)

        return {
          id: staffId,
          name: staffInfo?.fullName || "Unknown Staff",
          department: staffInfo?.department || "N/A",
          totalAssigned: assignment._count.id,
          resolved: resolvedComplaints.length,
          pending: staffComplaints.filter(c => c.status === "PENDING").length,
          inProgress: staffComplaints.filter(c => c.status === "IN_PROGRESS").length,
          avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
          satisfaction: Math.round((avgRating / 5) * 100),
          ratingsCount: ratingsData.length
        }
      })
    )

    // Get additional metrics
    const [
      activeUsers,
      totalStudents,
      totalStaff,
      recentComplaints
    ] = await Promise.all([
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.user.count({ where: { role: "STAFF" } }),
      getRecentComplaints(timeRange === "all" ? undefined : startDate)
    ])

    // Process the data for frontend consumption
    const processedData = {
      // Key metrics
      totalComplaints,
      resolvedComplaints: complaintsByStatus.find(s => s.status === "RESOLVED")?._count.id || 0,
      pendingComplaints: complaintsByStatus.find(s => s.status === "PENDING")?._count.id || 0,
      inProgressComplaints: complaintsByStatus.find(s => s.status === "IN_PROGRESS")?._count.id || 0,
      rejectedComplaints: complaintsByStatus.find(s => s.status === "REJECTED")?._count.id || 0,

      // Calculate overall metrics
      avgResolutionTime: calculateOverallResolutionTime(resolvedComplaintsWithLogs),
      satisfactionRate: calculateOverallSatisfaction(satisfactionData),

      // Charts data
      complaintsByCategory: complaintsByCategory.map(item => ({
        name: formatCategoryName(item.category),
        value: item._count.id,
        color: getCategoryColor(item.category)
      })),

      complaintsByStatus: complaintsByStatus.map(item => ({
        name: formatStatus(item.status),
        value: item._count.id,
        color: getStatusColor(item.status)
      })),

      complaintsByPriority: complaintsByPriority.map(item => ({
        name: formatPriority(item.priority),
        value: item._count.id,
        color: getPriorityColor(item.priority)
      })),

      complaintsByBlock: complaintsByBlock.map(item => ({
        name: item.hostelBlock,
        value: item._count.id
      })),

      // Block status breakdown for stacked charts
      blockStatusBreakdown: processBlockStatusData(blockStatusBreakdown),

      // Trends
      monthlyTrends: processMonthlyTrends(monthlyComplaints),
      weeklyComplaints: processWeeklyData(monthlyComplaints),

      // ADD: Resolution time by category
      resolutionTimeByCategory: calculateResolutionTimeByCategory(resolvedComplaintsWithLogs),

      // Staff performance
      staffPerformance: staffMetrics.sort((a, b) => b.resolved - a.resolved),

      // Satisfaction metrics
      satisfactionByCategory: processSatisfactionByCategory(satisfactionData),
      satisfactionByBlock: processSatisfactionByBlock(satisfactionData),

      // Additional insights
      activeUsers,
      totalStudents,
      totalStaff,
      
      // Recent activity
      recentComplaints,
      
      // Performance trends
      performanceTrends: await getPerformanceTrends(timeRange === "all" ? undefined : startDate)
    }

    console.log("Analytics API: Successfully processed analytics data")

    return NextResponse.json({
      success: true,
      data: processedData,
      meta: {
        timeRange,
        generatedAt: new Date().toISOString(),
        totalRecords: totalComplaints
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=150'
      }
    })

  } catch (error) {
    console.error("❌ Analytics API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    )
  }
}

// Helper functions
function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    "PLUMBING": "#3b82f6",
    "ELECTRICAL": "#eab308", 
    "FURNITURE": "#8b5cf6",
    "CLEANLINESS": "#06b6d4",
    "NOISE_COMPLAINT": "#ef4444",
    "SECURITY": "#f97316",
    "INTERNET": "#10b981",
    "OTHER": "#6b7280"
  }
  return colors[category] || "#6b7280"
}

function getStatusColor(status: string): string {
  const colors: { [key: string]: string } = {
    "RESOLVED": "#22c55e",
    "IN_PROGRESS": "#3b82f6",
    "PENDING": "#eab308",
    "REJECTED": "#ef4444"
  }
  return colors[status] || "#6b7280"
}

function getPriorityColor(priority: string): string {
  const colors: { [key: string]: string } = {
    "LOW": "#22c55e",
    "MEDIUM": "#eab308",
    "HIGH": "#f97316",
    "URGENT": "#ef4444"
  }
  return colors[priority] || "#6b7280"
}

function formatStatus(status: string): string {
  return status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())
}

function formatPriority(priority: string): string {
  return priority.charAt(0) + priority.slice(1).toLowerCase()
}

function formatCategoryName(category: string): string {
  return category.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())
}

function calculateOverallResolutionTime(resolvedComplaints: any[]): number {
  if (resolvedComplaints.length === 0) return 0
  
  let totalDays = 0
  let count = 0
  
  resolvedComplaints.forEach(complaint => {
    if (complaint.statusLogs.length > 0) {
      const resolvedDate = complaint.statusLogs[0].createdAt
      const createdDate = complaint.createdAt
      const days = Math.abs(resolvedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      totalDays += days
      count++
    }
  })
  
  return count > 0 ? Math.round((totalDays / count) * 10) / 10 : 0
}

function calculateOverallSatisfaction(satisfactionData: any[]): number {
  if (satisfactionData.length === 0) return 0
  
  const totalRating = satisfactionData.reduce((sum, item) => sum + item.rating, 0)
  const avgRating = totalRating / satisfactionData.length
  return Math.round((avgRating / 5) * 100)
}

function processBlockStatusData(data: any[]) {
  const blockStats: { [key: string]: { pending: number, inProgress: number, resolved: number, rejected: number } } = {}

  data.forEach(item => {
    if (!blockStats[item.hostelBlock]) {
      blockStats[item.hostelBlock] = { pending: 0, inProgress: 0, resolved: 0, rejected: 0 }
    }
    
    switch (item.status) {
      case "PENDING":
        blockStats[item.hostelBlock].pending = item._count.id
        break
      case "IN_PROGRESS":
        blockStats[item.hostelBlock].inProgress = item._count.id
        break
      case "RESOLVED":
        blockStats[item.hostelBlock].resolved = item._count.id
        break
      case "REJECTED":
        blockStats[item.hostelBlock].rejected = item._count.id
        break
    }
  })

  return Object.entries(blockStats).map(([name, stats]) => ({
    name,
    ...stats
  }))
}

function processMonthlyTrends(data: any[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const monthlyStats: { [key: string]: { complaints: number, resolved: number, ratings: number[] } } = {}

  data.forEach(complaint => {
    const month = months[complaint.createdAt.getMonth()]
    if (!monthlyStats[month]) {
      monthlyStats[month] = { complaints: 0, resolved: 0, ratings: [] }
    }
    
    monthlyStats[month].complaints++
    if (complaint.status === "RESOLVED") {
      monthlyStats[month].resolved++
    }
    if (complaint.feedback?.rating) {
      monthlyStats[month].ratings.push(complaint.feedback.rating)
    }
  })

  return months.map(month => ({
    month,
    complaints: monthlyStats[month]?.complaints || 0,
    resolved: monthlyStats[month]?.resolved || 0,
    satisfaction: monthlyStats[month]?.ratings.length > 0 
      ? Math.round((monthlyStats[month].ratings.reduce((a, b) => a + b, 0) / monthlyStats[month].ratings.length / 5) * 100)
      : 0
  }))
}

function processWeeklyData(data: any[]) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const weeklyStats = days.map(day => ({ day, complaints: 0 }))

  data.forEach(complaint => {
    const dayIndex = (complaint.createdAt.getDay() + 6) % 7
    weeklyStats[dayIndex].complaints++
  })

  return weeklyStats
}

function processSatisfactionByCategory(data: any[]) {
  const categoryStats: { [key: string]: number[] } = {}

  data.forEach(item => {
    const category = item.complaint.category
    if (!categoryStats[category]) {
      categoryStats[category] = []
    }
    categoryStats[category].push(item.rating)
  })

  return Object.entries(categoryStats).map(([category, ratings]) => ({
    name: formatCategoryName(category),
    satisfaction: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length / 5) * 100),
    count: ratings.length
  }))
}

function processSatisfactionByBlock(data: any[]) {
  const blockStats: { [key: string]: number[] } = {}

  data.forEach(item => {
    const block = item.complaint.hostelBlock
    if (!blockStats[block]) {
      blockStats[block] = []
    }
    blockStats[block].push(item.rating)
  })

  return Object.entries(blockStats).map(([block, ratings]) => ({
    name: block,
    satisfaction: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length / 5) * 100),
    count: ratings.length
  }))
}

async function getRecentComplaints(startDate?: Date) {
  return await prisma.complaint.findMany({
    where: {
      createdAt: {
        gte: startDate
      }
    },
    take: 10,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      category: true,
      createdAt: true,
      student: {
        select: {
          fullName: true,
          hostelBlock: true,
          roomNumber: true
        }
      }
    }
  })
}

async function getPerformanceTrends(startDate?: Date) {
  // Get monthly performance data
  const monthlyPerformance = await prisma.complaint.findMany({
    where: {
      createdAt: {
        gte: startDate
      }
    },
    select: {
      createdAt: true,
      status: true,
      statusLogs: {
        where: {
          newStatus: "RESOLVED"
        },
        select: {
          createdAt: true
        },
        take: 1,
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  // Process into monthly resolution rates
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const performance: { [key: string]: { total: number, resolved: number } } = {}

  monthlyPerformance.forEach(complaint => {
    const month = months[complaint.createdAt.getMonth()]
    if (!performance[month]) {
      performance[month] = { total: 0, resolved: 0 }
    }
    
    performance[month].total++
    if (complaint.status === "RESOLVED") {
      performance[month].resolved++
    }
  })

  return months.map(month => ({
    month,
    resolutionRate: performance[month] 
      ? Math.round((performance[month].resolved / performance[month].total) * 100)
      : 0,
    total: performance[month]?.total || 0,
    resolved: performance[month]?.resolved || 0
  }))
}

// ADD: Resolution time by category calculation
function calculateResolutionTimeByCategory(resolvedComplaints: any[]): Array<{ name: string; avgDays: number; count: number }> {
  const categoryStats: { [key: string]: { totalDays: number; count: number } } = {}

  resolvedComplaints.forEach(complaint => {
    if (complaint.statusLogs && complaint.statusLogs.length > 0) {
      const category = complaint.category
      const resolvedDate = new Date(complaint.statusLogs[0].createdAt)
      const createdDate = new Date(complaint.createdAt)
      const days = Math.abs(resolvedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      
      if (!categoryStats[category]) {
        categoryStats[category] = { totalDays: 0, count: 0 }
      }
      
      categoryStats[category].totalDays += days
      categoryStats[category].count++
    }
  })

  return Object.entries(categoryStats).map(([category, stats]) => ({
    name: formatCategoryName(category),
    avgDays: stats.count > 0 ? Math.round((stats.totalDays / stats.count) * 10) / 10 : 0,
    count: stats.count
  })).filter(item => item.count > 0) // Only include categories with resolved complaints
}
