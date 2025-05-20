import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only staff and admin can access analytics
    if (user.role === "student") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get basic stats
    const stats = await db.complaints.getStats()

    // Get all complaints for time-based analysis
    const complaints = await db.complaints.getAll()

    // Calculate complaints over time (by month)
    const monthlyComplaints: Record<string, { total: number; resolved: number }> = {}

    complaints.forEach((complaint) => {
      const date = new Date(complaint.createdAt)
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyComplaints[monthYear]) {
        monthlyComplaints[monthYear] = { total: 0, resolved: 0 }
      }

      monthlyComplaints[monthYear].total++

      if (complaint.status === "resolved") {
        monthlyComplaints[monthYear].resolved++
      }
    })

    // Calculate average resolution time by category
    const resolutionTimeByCategory: Record<string, { total: number; count: number; avg: number }> = {}

    complaints.forEach((complaint) => {
      if (complaint.status === "resolved") {
        const created = new Date(complaint.createdAt).getTime()
        const updated = new Date(complaint.updatedAt).getTime()
        const resolutionTime = (updated - created) / (1000 * 60 * 60 * 24) // in days

        if (!resolutionTimeByCategory[complaint.category]) {
          resolutionTimeByCategory[complaint.category] = { total: 0, count: 0, avg: 0 }
        }

        resolutionTimeByCategory[complaint.category].total += resolutionTime
        resolutionTimeByCategory[complaint.category].count++
      }
    })

    // Calculate averages
    Object.keys(resolutionTimeByCategory).forEach((category) => {
      const { total, count } = resolutionTimeByCategory[category]
      resolutionTimeByCategory[category].avg = count > 0 ? total / count : 0
    })

    // Format data for response
    const monthlyData = Object.entries(monthlyComplaints).map(([month, data]) => ({
      month,
      complaints: data.total,
      resolved: data.resolved,
    }))

    const resolutionTimeData = Object.entries(resolutionTimeByCategory).map(([category, data]) => ({
      category,
      avgDays: Number.parseFloat(data.avg.toFixed(1)),
    }))

    return NextResponse.json({
      stats,
      monthlyData,
      resolutionTimeData,
    })
  } catch (error) {
    console.error("Get analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
