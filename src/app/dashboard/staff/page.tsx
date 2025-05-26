"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw } from "lucide-react"

interface Student {
  id: string
  fullName: string
  email: string
  hostelBlock?: string
  roomNumber?: string
}

interface ComplaintUpdate {
  id: string
  message: string
  createdAt: string
}

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT" // ✅ Added priority
  createdAt: string
  updatedAt: string
  student: Student
  updates: ComplaintUpdate[]
}

export default function StaffDashboard() {
  const { toast } = useToast()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterBlock, setFilterBlock] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all") // ✅ Added priority filter

  // Fetch complaints from API
  useEffect(() => {
    fetchComplaints()
  }, [toast])

  const fetchComplaints = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/complaints/all', {
        credentials: "include",
        cache: 'no-store', // Force fresh data
      })

      if (!response.ok) {
        throw new Error('Failed to fetch complaints')
      }

      const data = await response.json()
      console.log("Fetched complaints:", data)
      
      const complaintsData = data.complaints || data || []
      setComplaints(complaintsData)

    } catch (error) {
      console.error('Error fetching complaints:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch complaints')
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load complaints. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Refresh function for manual refresh
  const refreshComplaints = async () => {
    console.log("🔄 Refreshing complaints...")
    await fetchComplaints()
    toast({
      title: "Refreshed",
      description: "Complaints data has been updated.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "RESOLVED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // ✅ Added priority badge function
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "LOW":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
      case "MEDIUM":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>
      case "HIGH":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      case "URGENT":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 font-bold border-red-300">🚨 URGENT</Badge>
      default:
        return <Badge variant="outline">{priority || 'Unknown'}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // ✅ Updated filtering with priority
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      searchTerm === "" ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || complaint.category === filterCategory
    const matchesBlock = filterBlock === "all" || complaint.student.hostelBlock === filterBlock
    const matchesPriority = filterPriority === "all" || complaint.priority === filterPriority

    return matchesSearch && matchesCategory && matchesBlock && matchesPriority
  })

  // ✅ Enhanced complaint card component
  const ComplaintCard = ({ complaint }: { complaint: Complaint }) => (
    <Card key={complaint.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{complaint.title}</CardTitle>
            <CardDescription>
              {complaint.category} • ID: {complaint.id} • {formatDate(complaint.createdAt)}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {getStatusBadge(complaint.status)}
            {getPriorityBadge(complaint.priority)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Student</p>
            <p>{complaint.student.fullName}</p>
            <p className="text-sm text-gray-500">{complaint.student.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Location</p>
            <p>
              {complaint.student.hostelBlock && complaint.student.roomNumber
                ? `Block ${complaint.student.hostelBlock}, Room ${complaint.student.roomNumber}`
                : "Location not specified"}
            </p>
          </div>
        </div>

        <p className="text-gray-700">{complaint.description}</p>

        {/* ✅ Enhanced info display */}
        <div className="mt-2 flex gap-2 text-xs text-gray-500">
          <span>Priority: {complaint.priority}</span>
          <span>•</span>
          <span>Status: {complaint.status.replace('_', ' ')}</span>
          <span>•</span>
          <span>Updated: {formatDate(complaint.updatedAt)}</span>
        </div>

        {complaint.updates && complaint.updates.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Recent Updates:</h4>
            <div className="space-y-2">
              {complaint.updates.slice(-2).map((update) => (
                <div key={update.id} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                  <p className="text-gray-500">{formatDateTime(update.createdAt)}</p>
                  <p>{update.message}</p>
                </div>
              ))}
              {complaint.updates.length > 2 && (
                <p className="text-xs text-gray-500 pl-3">
                  +{complaint.updates.length - 2} more updates
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/staff/complaint/${complaint.id}`}>
          <Button className="w-full">
            Manage Complaint
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout userType="staff">
        <div className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />

          {/* Stats cards loading */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-9 w-12" />
                </CardContent>
              </Card>
            ))}
          </div>


          {/* Filter section loading */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <Skeleton className="h-6 w-36 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Tabs loading */}
          <Skeleton className="h-10 w-80 mb-4" />

          {/* Complaint cards loading */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-64" />
                      <Skeleton className="h-4 w-80" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout userType="staff">
        <div className="p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Failed to Load Complaints</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <div className="flex gap-2">
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                  <Button variant="outline" onClick={refreshComplaints}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="staff">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Staff Dashboard</h1>
          <Button onClick={refreshComplaints} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* ✅ Status Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{complaints.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-yellow-800">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-700">
                {complaints.filter((c) => c.status === "PENDING").length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700">
                {complaints.filter((c) => c.status === "IN_PROGRESS").length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-700">
                {complaints.filter((c) => c.status === "RESOLVED").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Enhanced Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Complaints</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search by ID, title, or student name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                  <SelectItem value="Noise Complaint">Noise Complaint</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Internet">Internet</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filterBlock} onValueChange={setFilterBlock}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by hostel block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  <SelectItem value="A">Block A</SelectItem>
                  <SelectItem value="B">Block B</SelectItem>
                  <SelectItem value="C">Block C</SelectItem>
                  <SelectItem value="D">Block D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">🚨 Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ✅ Enhanced Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="w-full overflow-x-auto scrollbar-hide mb-4">
            <TabsList className="w-max min-w-full flex-nowrap justify-start p-1">
              <TabsTrigger value="all" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                All ({filteredComplaints.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Pending ({filteredComplaints.filter(c => c.status === "PENDING").length})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                In Progress ({filteredComplaints.filter(c => c.status === "IN_PROGRESS").length})
              </TabsTrigger>
              <TabsTrigger value="resolved" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Resolved ({filteredComplaints.filter(c => c.status === "RESOLVED").length})
              </TabsTrigger>
              <TabsTrigger value="urgent" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4 bg-red-100 text-red-800">
                🚨 Urgent ({filteredComplaints.filter(c => c.priority === "URGENT").length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All Complaints Tab */}
          <TabsContent value="all" className="space-y-4">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-4">
            {filteredComplaints.filter((c) => c.status === "PENDING").length > 0 ? (
              filteredComplaints
                .filter((c) => c.status === "PENDING")
                .map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          {/* In Progress Tab */}
          <TabsContent value="in-progress" className="space-y-4">
            {filteredComplaints.filter((c) => c.status === "IN_PROGRESS").length > 0 ? (
              filteredComplaints
                .filter((c) => c.status === "IN_PROGRESS")
                .map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No in-progress complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          {/* Resolved Tab */}
          <TabsContent value="resolved" className="space-y-4">
            {filteredComplaints.filter((c) => c.status === "RESOLVED").length > 0 ? (
              filteredComplaints
                .filter((c) => c.status === "RESOLVED")
                .map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No resolved complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          {/* ✅ New Urgent Tab */}
          <TabsContent value="urgent" className="space-y-4">
            {filteredComplaints.filter((c) => c.priority === "URGENT").length > 0 ? (
              filteredComplaints
                .filter((c) => c.priority === "URGENT")
                .map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No urgent complaints match your filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
