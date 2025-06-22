"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Calendar, Filter, Download, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Real data interfaces based on your API response
interface AnalyticsData {
  totalComplaints: number
  resolvedComplaints: number
  pendingComplaints: number
  inProgressComplaints: number
  rejectedComplaints: number
  avgResolutionTime: number
  satisfactionRate: number
  complaintsByCategory: Array<{ name: string; value: number; color: string }>
  complaintsByStatus: Array<{ name: string; value: number; color: string }>
  complaintsByPriority: Array<{ name: string; value: number; color: string }>
  complaintsByBlock: Array<{ name: string; value: number }>
  blockStatusBreakdown: Array<{ name: string; pending: number; inProgress: number; resolved: number; rejected: number }>
  monthlyTrends: Array<{ month: string; complaints: number; resolved: number; satisfaction: number }>
  weeklyComplaints: Array<{ day: string; complaints: number }>
  resolutionTimeByCategory: Array<{ name: string; avgDays: number; count: number }>
  staffPerformance: Array<{ 
    id: string
    name: string
    department: string
    totalAssigned: number
    resolved: number
    pending: number
    inProgress: number
    avgResolutionTime: number
    satisfaction: number
    ratingsCount: number
  }>
  satisfactionByCategory: Array<{ name: string; satisfaction: number; count: number }>
  satisfactionByBlock: Array<{ name: string; satisfaction: number; count: number }>
  activeUsers: number
  totalStudents: number
  totalStaff: number
  recentComplaints: Array<any>
  performanceTrends: Array<{ month: string; resolutionRate: number; total: number; resolved: number }>
}

export default function AnalyticsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("year")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  // Fetch analytics data from your API endpoint
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Analytics: Fetching data for time range:", timeRange)

        const response = await fetch(`/api/staff/analytics?timeRange=${timeRange}`, {
          credentials: "include",
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          if (response.status === 403) {
            toast({
              variant: "destructive",
              title: "Access Denied",
              description: "You don't have permission to access analytics.",
            })
            router.push("/dashboard")
            return
          }
          throw new Error("Failed to fetch analytics data")
        }

        const result = await response.json()
        console.log(" Analytics: Successfully fetched data:", result)
        
        setAnalyticsData(result.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        console.error(" Analytics: Fetch error:", err)
        setError(errorMessage)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load analytics data. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeRange, router, toast])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // Loading state
  if (loading) {
    return (
      <DashboardLayout userType="staff">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-3 w-64" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-80 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Error state
  if (error || !analyticsData) {
    return (
      <DashboardLayout userType="staff">
        <div className="p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Failed to Load Analytics</h3>
                <p className="text-muted-foreground mb-4">{error || "Analytics data not found"}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  // Calculate percentage changes (you can enhance this with historical data)
  const resolutionRate = analyticsData.totalComplaints > 0 
    ? Math.round((analyticsData.resolvedComplaints / analyticsData.totalComplaints) * 100)
    : 0

  return (
    <DashboardLayout userType="staff">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of complaint data and trends
              {analyticsData.totalComplaints > 0 && (
                <span className="ml-2 text-sm">
                  • {analyticsData.totalComplaints} total complaints
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                <CardDescription>All complaints</CardDescription>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalComplaints}</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-xs text-muted-foreground">
                  {analyticsData.totalStudents} active students
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                <CardDescription>Complaints resolved</CardDescription>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolutionRate}%</div>
              <Progress
                value={resolutionRate}
                className="h-2 mt-2"
                style={{ "--progress-bar": "rgb(34 197 94)" } as React.CSSProperties}
              />
              <div className="grid grid-cols-3 gap-1 mt-2">
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground">Pending</div>
                  <div className="text-sm font-medium">{analyticsData.pendingComplaints}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground">In Progress</div>
                  <div className="text-sm font-medium">{analyticsData.inProgressComplaints}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground">Resolved</div>
                  <div className="text-sm font-medium">{analyticsData.resolvedComplaints}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
                <CardDescription>Days to resolve</CardDescription>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.avgResolutionTime || 0} days</div>
              <div className="flex items-center pt-1">
                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-muted-foreground">
                  {analyticsData.totalStaff} active staff
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                <CardDescription>Based on feedback</CardDescription>
              </div>
              <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.satisfactionRate}%</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-muted-foreground">from feedback ratings</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Complaints by Category */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Complaints by Category</CardTitle>
                  <CardDescription>Distribution of complaints across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData?.complaintsByCategory?.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.complaintsByCategory}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {analyticsData.complaintsByCategory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No category data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Complaints by Status */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Complaints by Status</CardTitle>
                  <CardDescription>Current status of all complaints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.complaintsByStatus.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.complaintsByStatus}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {analyticsData.complaintsByStatus.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No status data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Complaints by Hostel Block */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Complaints by Hostel Block</CardTitle>
                  <CardDescription>Number of complaints from each hostel block</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.blockStatusBreakdown.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.blockStatusBreakdown} barSize={30}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="pending" stackId="a" fill="#facc15" name="Pending" />
                          <Bar dataKey="inProgress" stackId="a" fill="#60a5fa" name="In Progress" />
                          <Bar dataKey="resolved" stackId="a" fill="#4ade80" name="Resolved" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No block data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Priority Distribution */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Priority Distribution</CardTitle>
                  <CardDescription>Complaints by priority level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.complaintsByPriority.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.complaintsByPriority}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {analyticsData.complaintsByPriority.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No priority data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resolution Time by Category */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Resolution Time by Category</CardTitle>
                  <CardDescription>Average days to resolve by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData?.resolutionTimeByCategory?.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.resolutionTimeByCategory} layout="vertical" barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="avgDays" fill="#8884d8" name="Avg. Days to Resolve" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No resolution time data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Complaints Over Time */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Complaints Over Time</CardTitle>
                  <CardDescription>Monthly trend of complaints and resolutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData?.monthlyTrends?.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="complaints"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            name="Total Complaints"
                          />
                          <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved Complaints" />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No trends data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Complaint Pattern */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Weekly Complaint Pattern</CardTitle>
                  <CardDescription>Number of complaints by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.weeklyComplaints.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.weeklyComplaints} barSize={30}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="complaints" fill="#8884d8" name="Complaints" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No weekly data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trends */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Complaints, resolutions and satisfaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData?.monthlyTrends?.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="complaints"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                            name="Complaints"
                          />
                          <Area
                            type="monotone"
                            dataKey="resolved"
                            stackId="2"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            name="Resolved"
                          />
                          <Line
                            type="monotone"
                            dataKey="satisfaction"
                            stroke="#ffc658"
                            name="Satisfaction %"
                            yAxisId={1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No monthly trends data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance</CardTitle>
                <CardDescription>Metrics for staff handling complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {analyticsData?.staffPerformance?.length > 0 ? (
                    analyticsData.staffPerformance.map((staff, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{staff.name}</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {staff.resolved} Resolved
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Avg. Resolution Time</span>
                              <span>{staff.avgResolutionTime} days</span>
                            </div>
                            <Progress
                              value={100 - (staff.avgResolutionTime / 5) * 100}
                              className="h-2"
                                style={{ "--progress-bar": "rgb(59 130 246)" } as React.CSSProperties} // bg-blue-500
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Satisfaction Rate</span>
                              <span>{staff.satisfaction}%</span>
                            </div>
                            <Progress value={staff.satisfaction} 
                            className="h-2" 
                            style={{ "--progress-bar": "rgb(34 197 94)" } as React.CSSProperties } // Tailwind's green-500
                            />
                          </div>
                        </div>

                        {index < analyticsData.staffPerformance.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No staff performance data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Satisfaction Trends</CardTitle>
                  <CardDescription>Student satisfaction over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.monthlyTrends.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[70, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="satisfaction"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                            name="Satisfaction %"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No satisfaction trend data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction by Category</CardTitle>
                  <CardDescription>Average satisfaction rating by complaint category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.satisfactionByCategory.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={analyticsData.satisfactionByCategory}
                          barSize={30}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[70, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="satisfaction" fill="#8884d8" name="Satisfaction %" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No satisfaction by category data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction by Hostel Block</CardTitle>
                  <CardDescription>Average satisfaction rating by hostel block</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {analyticsData.satisfactionByBlock.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={analyticsData.satisfactionByBlock}
                          barSize={30}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[70, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="satisfaction" fill="#82ca9d" name="Satisfaction %" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No satisfaction by block data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
