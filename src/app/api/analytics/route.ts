import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import prisma from '@/lib/db' // Correct singleton usage

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow staff/admin to access analytics
    if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // ✅ ADD: Get time range from query params
    const url = new URL(request.url)
    const timeRange = url.searchParams.get('timeRange') || 'month'
    
    // ✅ ADD: Calculate date range for filtering
    const getDateFilter = (range: string) => {
      const now = new Date()
      const startDate = new Date()
      
      switch (range) {
        case 'week':
          startDate.setDate(now.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(now.getMonth() - 1)
          break
        case 'quarter':
          startDate.setMonth(now.getMonth() - 3)
          break
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1)
          break
        case 'all':
          return {} // No date filter
        default:
          startDate.setMonth(now.getMonth() - 1)
      }
      
      return {
        createdAt: {
          gte: startDate
        }
      }
    }

    const dateFilter = getDateFilter(timeRange)

    // ✅ ENHANCED: More comprehensive analytics queries
    const [
      totalComplaints,
      complaintsByStatus,
      complaintsByCategory,
      complaintsByPriority,
      complaintsByBlock,
      monthlyTrends,
      avgResolutionTime,
      staffPerformance,
      satisfactionRating,
      recentComplaints
    ] = await Promise.all([
      // 1. Total complaints count with date filter
      prisma.complaint.count({
        where: dateFilter
      }),

      // 2. Complaints grouped by status
      prisma.complaint.groupBy({
        by: ['status'],
        _count: {
          id: true
        },
        where: dateFilter
      }),

      // 3. Complaints grouped by category
      prisma.complaint.groupBy({
        by: ['category'],
        _count: {
          id: true
        },
        where: dateFilter
      }),

      // 4. Complaints grouped by priority
      prisma.complaint.groupBy({
        by: ['priority'],
        _count: {
          id: true
        },
        where: dateFilter
      }),

      // ✅ ADD: Complaints by hostel block
      prisma.complaint.groupBy({
        by: ['hostelBlock'],
        _count: {
          id: true
        },
        where: dateFilter
      }),

      // ✅ ADD: Monthly trends (last 12 months for trending)
      prisma.complaint.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
          }
        },
        select: {
          id: true,
          status: true,
          createdAt: true
        }
      }),

      // ✅ ADD: Average resolution time for resolved complaints
      prisma.complaint.findMany({
        where: {
          status: 'RESOLVED',
          ...dateFilter
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          category: true
        }
      }),

      // ✅ ADD: Staff performance metrics
      prisma.complaint.groupBy({
        by: ['assignedToId'],
        _count: {
          id: true
        },
        where: {
          assignedToId: { not: null },
          ...dateFilter
        }
      }),

      // ✅ ADD: Satisfaction rating (if you have feedback table)
      prisma.complaintFeedback?.findMany({
        where: {
          complaint: dateFilter
        },
        select: {
          rating: true,
          complaint: {
            select: {
              category: true
            }
          }
        }
      }).catch(() => null), // Handle if feedback table doesn't exist

      // 6. Recent complaints with enhanced data
      prisma.complaint.findMany({
        take: 10,
        where: dateFilter,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          category: true,
          createdAt: true,
          updatedAt: true,
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
        }
      })
    ])

    // ✅ ADD: Process monthly trends data
    const processMonthlyTrends = (complaints: any[]) => {
      const monthlyData: Record<string, any> = {}
      
      complaints.forEach(complaint => {
        const month = new Date(complaint.createdAt).toISOString().substring(0, 7) // YYYY-MM
        
        if (!monthlyData[month]) {
          monthlyData[month] = {
            month,
            total: 0,
            resolved: 0,
            pending: 0,
            inProgress: 0
          }
        }
        
        monthlyData[month].total++
        monthlyData[month][complaint.status.toLowerCase()] = 
          (monthlyData[month][complaint.status.toLowerCase()] || 0) + 1
      })
      
      return Object.values(monthlyData).sort((a: any, b: any) => 
        a.month.localeCompare(b.month)
      )
    }

    // ✅ ADD: Calculate resolution time metrics
    const calculateResolutionMetrics = (resolvedComplaints: any[]) => {
      if (resolvedComplaints.length === 0) {
        return {
          averageDays: 0,
          byCategory: []
        }
      }

      const resolutionTimes = resolvedComplaints.map(complaint => {
        const created = new Date(complaint.createdAt)
        const resolved = new Date(complaint.updatedAt)
        return {
          category: complaint.category,
          days: Math.ceil((resolved.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
        }
      })

      const averageDays = resolutionTimes.reduce((sum, item) => sum + item.days, 0) / resolutionTimes.length

      // Group by category
      const byCategory = resolutionTimes.reduce((acc: any, item) => {
        if (!acc[item.category]) {
          acc[item.category] = { total: 0, count: 0 }
        }
        acc[item.category].total += item.days
        acc[item.category].count += 1
        return acc
      }, {})

      const categoryMetrics = Object.entries(byCategory).map(([category, data]: [string, any]) => ({
        category,
        averageDays: Math.round(data.total / data.count * 10) / 10
      }))

      return {
        averageDays: Math.round(averageDays * 10) / 10,
        byCategory: categoryMetrics
      }
    }

    // ✅ ADD: Calculate satisfaction metrics
    const calculateSatisfactionMetrics = (feedbackData: any[]) => {
      if (!feedbackData || feedbackData.length === 0) {
        return {
          overall: 0,
          byCategory: []
        }
      }

      const overall = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length

      const byCategory = feedbackData.reduce((acc: any, item) => {
        const category = item.complaint.category
        if (!acc[category]) {
          acc[category] = { total: 0, count: 0 }
        }
        acc[category].total += item.rating
        acc[category].count += 1
        return acc
      }, {})

      const categoryMetrics = Object.entries(byCategory).map(([category, data]: [string, any]) => ({
        category,
        average: Math.round(data.total / data.count * 10) / 10
      }))

      return {
        overall: Math.round(overall * 10) / 10,
        byCategory: categoryMetrics
      }
    }

    // ✅ ENHANCED: Return comprehensive analytics data
    const analyticsData = {
      // Basic metrics
      totalComplaints,
      complaintsByStatus: complaintsByStatus.map(item => ({
        status: item.status,
        count: item._count.id,
        percentage: Math.round((item._count.id / totalComplaints) * 100)
      })),
      complaintsByCategory: complaintsByCategory.map(item => ({
        category: item.category,
        count: item._count.id,
        percentage: Math.round((item._count.id / totalComplaints) * 100)
      })),
      complaintsByPriority: complaintsByPriority.map(item => ({
        priority: item.priority,
        count: item._count.id,
        percentage: Math.round((item._count.id / totalComplaints) * 100)
      })),
      
      // ✅ NEW: Enhanced metrics
      complaintsByBlock: complaintsByBlock.map(item => ({
        block: item.hostelBlock,
        count: item._count.id
      })),
      
      monthlyTrends: processMonthlyTrends(monthlyTrends),
      
      resolutionMetrics: calculateResolutionMetrics(avgResolutionTime),
      
      satisfactionMetrics: calculateSatisfactionMetrics(satisfactionRating || []),
      
      staffWorkload: staffPerformance.map(item => ({
        staffId: item.assignedToId,
        assignedCount: item._count.id
      })),
      
      recentComplaints: recentComplaints.map(complaint => ({
        ...complaint,
        timeAgo: getTimeAgo(complaint.createdAt)
      })),
      
      // ✅ ADD: Meta information
      metadata: {
        timeRange,
        generatedAt: new Date().toISOString(),
        dataFreshness: '5 minutes'
      }
    }

    return NextResponse.json(analyticsData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=150', // Cache for 5 minutes
        'X-Total-Count': totalComplaints.toString()
      }
    })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// ✅ ADD: Helper function for time ago
function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const created = new Date(date)
  const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }
}
