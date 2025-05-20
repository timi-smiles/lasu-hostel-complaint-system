"use client"

import { useState } from "react"
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
import { Calendar, Filter, Download, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for analytics
const complaintsByCategory = [
  { name: "Plumbing", value: 35, color: "#8884d8" },
  { name: "Electrical", value: 25, color: "#82ca9d" },
  { name: "Furniture", value: 18, color: "#ffc658" },
  { name: "Cleanliness", value: 15, color: "#ff8042" },
  { name: "Noise", value: 12, color: "#0088fe" },
  { name: "Internet", value: 10, color: "#00C49F" },
  { name: "Security", value: 8, color: "#FFBB28" },
  { name: "Other", value: 7, color: "#FF8042" },
]

const complaintsByStatus = [
  { name: "Resolved", value: 45, color: "#4ade80" },
  { name: "In Progress", value: 30, color: "#60a5fa" },
  { name: "Pending", value: 25, color: "#facc15" },
]

const complaintsByBlock = [
  { name: "Block A", pending: 10, inProgress: 15, resolved: 20 },
  { name: "Block B", pending: 8, inProgress: 12, resolved: 18 },
  { name: "Block C", pending: 5, inProgress: 8, resolved: 12 },
  { name: "Block D", pending: 2, inProgress: 5, resolved: 10 },
]

const complaintsOverTime = [
  { name: "Jan", complaints: 20, resolved: 15 },
  { name: "Feb", complaints: 25, resolved: 20 },
  { name: "Mar", complaints: 30, resolved: 22 },
  { name: "Apr", complaints: 28, resolved: 25 },
  { name: "May", complaints: 35, resolved: 28 },
  { name: "Jun", complaints: 32, resolved: 30 },
  { name: "Jul", complaints: 40, resolved: 35 },
  { name: "Aug", complaints: 45, resolved: 38 },
  { name: "Sep", complaints: 50, resolved: 42 },
  { name: "Oct", complaints: 48, resolved: 45 },
  { name: "Nov", complaints: 52, resolved: 48 },
  { name: "Dec", complaints: 60, resolved: 50 },
]

const resolutionTimeByCategory = [
  { name: "Plumbing", avgDays: 3.2 },
  { name: "Electrical", avgDays: 2.5 },
  { name: "Furniture", avgDays: 4.8 },
  { name: "Cleanliness", avgDays: 1.5 },
  { name: "Noise", avgDays: 2.0 },
  { name: "Internet", avgDays: 1.8 },
  { name: "Security", avgDays: 1.2 },
  { name: "Other", avgDays: 3.5 },
]

const staffPerformance = [
  { name: "John Doe", resolved: 45, avgResolutionTime: 2.3, satisfaction: 92 },
  { name: "Jane Smith", resolved: 38, avgResolutionTime: 1.8, satisfaction: 95 },
  { name: "Robert Johnson", resolved: 32, avgResolutionTime: 2.5, satisfaction: 88 },
  { name: "Emily Davis", resolved: 28, avgResolutionTime: 3.1, satisfaction: 90 },
]

const weeklyComplaints = [
  { day: "Mon", complaints: 12 },
  { day: "Tue", complaints: 15 },
  { day: "Wed", complaints: 18 },
  { day: "Thu", complaints: 14 },
  { day: "Fri", complaints: 10 },
  { day: "Sat", complaints: 8 },
  { day: "Sun", complaints: 5 },
]

const priorityDistribution = [
  { name: "Low", value: 30, color: "#4ade80" },
  { name: "Medium", value: 45, color: "#facc15" },
  { name: "High", value: 20, color: "#f97316" },
  { name: "Urgent", value: 5, color: "#ef4444" },
]

const monthlyTrends = [
  { month: "Jan", complaints: 20, resolved: 15, satisfaction: 85 },
  { month: "Feb", complaints: 25, resolved: 20, satisfaction: 87 },
  { month: "Mar", complaints: 30, resolved: 22, satisfaction: 86 },
  { month: "Apr", complaints: 28, resolved: 25, satisfaction: 88 },
  { month: "May", complaints: 35, resolved: 28, satisfaction: 90 },
  { month: "Jun", complaints: 32, resolved: 30, satisfaction: 92 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [blockFilter, setBlockFilter] = useState("all")

  // Calculate key metrics
  const totalComplaints = 130
  const resolvedComplaints = 45
  const pendingComplaints = 25
  const inProgressComplaints = 30
  const avgResolutionTime = 2.5
  const satisfactionRate = 88

  // Calculate percentage changes (mock data)
  const complaintsChange = 15 // 15% increase from previous period
  const resolutionTimeChange = -8 // 8% decrease (improvement) from previous period
  const satisfactionChange = 5 // 5% increase from previous period

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


  return (
    <DashboardLayout userType="staff">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive analysis of complaint data and trends</p>
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
                <CardDescription>All time</CardDescription>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComplaints}</div>
              <div className="flex items-center pt-1">
                {complaintsChange > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">{complaintsChange}% increase</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs text-red-500">{Math.abs(complaintsChange)}% decrease</span>
                  </>
                )}
                <span className="text-xs text-muted-foreground ml-1">from last period</span>
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
              <div className="text-2xl font-bold">{Math.round((resolvedComplaints / totalComplaints) * 100)}%</div>
              <Progress
                value={(resolvedComplaints / totalComplaints) * 100}
                className="h-2 mt-2"
                style={{ "--progress-bar": "rgb(34 197 94)" } as React.CSSProperties}

              />
              <div className="grid grid-cols-3 gap-1 mt-2">
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground">Pending</div>
                  <div className="text-sm font-medium">{pendingComplaints}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground">In Progress</div>
                  <div className="text-sm font-medium">{inProgressComplaints}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground">Resolved</div>
                  <div className="text-sm font-medium">{resolvedComplaints}</div>
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
              <div className="text-2xl font-bold">{avgResolutionTime} days</div>
              <div className="flex items-center pt-1">
                {resolutionTimeChange < 0 ? (
                  <>
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">{Math.abs(resolutionTimeChange)}% faster</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs text-red-500">{resolutionTimeChange}% slower</span>
                  </>
                )}
                <span className="text-xs text-muted-foreground ml-1">from last period</span>
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
              <div className="text-2xl font-bold">{satisfactionRate}%</div>
              <div className="flex items-center pt-1">
                {satisfactionChange > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">{satisfactionChange}% increase</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xs text-red-500">{Math.abs(satisfactionChange)}% decrease</span>
                  </>
                )}
                <span className="text-xs text-muted-foreground ml-1">from last period</span>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complaintsByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {complaintsByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                      </PieChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complaintsByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {complaintsByStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                      </PieChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={complaintsByBlock} barSize={30}>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priorityDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {priorityDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                      </PieChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resolutionTimeByCategory} layout="vertical" barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgDays" fill="#8884d8" name="Avg. Days to Resolve" />
                      </BarChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={complaintsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyComplaints} barSize={30}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="complaints" fill="#8884d8" name="Complaints" />
                      </BarChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyTrends}>
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
                  {staffPerformance.map((staff, index) => (
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

                      {index < staffPerformance.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
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
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Plumbing", satisfaction: 85 },
                          { name: "Electrical", satisfaction: 90 },
                          { name: "Furniture", satisfaction: 82 },
                          { name: "Cleanliness", satisfaction: 88 },
                          { name: "Noise", satisfaction: 75 },
                          { name: "Internet", satisfaction: 78 },
                          { name: "Security", satisfaction: 92 },
                          { name: "Other", satisfaction: 80 },
                        ]}
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Block A", satisfaction: 87 },
                          { name: "Block B", satisfaction: 85 },
                          { name: "Block C", satisfaction: 90 },
                          { name: "Block D", satisfaction: 92 },
                        ]}
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
