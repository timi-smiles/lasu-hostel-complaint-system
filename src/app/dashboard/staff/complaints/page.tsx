"use client"

import { useState, useEffect } from "react"
import {
  Filter,
  Search,
  SlidersHorizontal,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Updated types to match your database schema
type ComplaintStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED"
type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
type ComplaintCategory = "Plumbing" | "Electrical" | "Furniture" | "Cleanliness" | "Noise Complaint" | "Security" | "Internet" | "Other"

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
  staff?: {
    id: string
    fullName: string
  }
}

interface Complaint {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  hostelBlock: string
  roomNumber: string
  createdAt: string
  updatedAt: string
  student: Student
  updates: ComplaintUpdate[]
  assignedTo?: {
    id: string
    fullName: string
  }
}

// Helper function to format date
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

// Status badge component
const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    case "IN_PROGRESS":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          In Progress
        </Badge>
      )
    case "RESOLVED":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Resolved
        </Badge>
      )
  }
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: ComplaintPriority }) => {
  switch (priority) {
    case "LOW":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
    case "MEDIUM":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>
    case "HIGH":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
    case "URGENT":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
  }
}

// Category badge component
const CategoryBadge = ({ category }: { category: ComplaintCategory }) => {
  const colors = {
    "Plumbing": "bg-blue-50 text-blue-700 border-blue-200",
    "Electrical": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Furniture": "bg-purple-50 text-purple-700 border-purple-200",
    "Cleanliness": "bg-green-50 text-green-700 border-green-200",
    "Noise Complaint": "bg-red-50 text-red-700 border-red-200",
    "Security": "bg-red-50 text-red-700 border-red-200",
    "Internet": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "Other": "bg-gray-50 text-gray-700 border-gray-200"
  }

  return (
    <Badge variant="outline" className={colors[category]}>
      {category}
    </Badge>
  )
}

export default function ComplaintsPage() {
  const { toast } = useToast()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<ComplaintPriority | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | "all">("all")
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")

  // Fetch complaints from API
  useEffect(() => {
    async function fetchComplaints() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/complaints/all', {
          credentials: "include",
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

    fetchComplaints()
  }, [toast])

  // Filter complaints based on search query and filters
  const filteredComplaints = complaints.filter((complaint) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.hostelBlock.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter

    // Priority filter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter

    // Category filter
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter

    // Tab filter
    if (currentTab === "pending")
      return complaint.status === "PENDING" && matchesSearch && matchesPriority && matchesCategory
    if (currentTab === "in-progress")
      return complaint.status === "IN_PROGRESS" && matchesSearch && matchesPriority && matchesCategory
    if (currentTab === "resolved")
      return complaint.status === "RESOLVED" && matchesSearch && matchesPriority && matchesCategory
    if (currentTab === "urgent")
      return complaint.priority === "URGENT" && matchesSearch && matchesStatus && matchesCategory

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  // Handle view complaint
  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint)
    setViewDialogOpen(true)
  }

  // Handle status update
  const handleStatusUpdate = async (complaintId: string, newStatus: ComplaintStatus) => {
    try {
      const response = await fetch(`/api/complaints/${complaintId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Update local state
      setComplaints(prev => prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, status: newStatus, updatedAt: new Date().toISOString() }
          : complaint
      ))

      toast({
        title: "Success",
        description: `Complaint status updated to ${newStatus.toLowerCase().replace('_', ' ')}`,
      })

      setViewDialogOpen(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update complaint status",
      })
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Failed to Load Complaints</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/dashboard/staff">
        <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Complaints Management</h1>
          <p className="text-muted-foreground">View and manage all student complaints</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
        <div className="flex flex-col gap-4 mb-4">
          {/* Make TabsList horizontally scrollable on mobile */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <TabsList className="w-max min-w-full flex-nowrap justify-start p-1">
              <TabsTrigger value="all" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                All ({complaints.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Pending ({complaints.filter(c => c.status === "PENDING").length})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                In Progress ({complaints.filter(c => c.status === "IN_PROGRESS").length})
              </TabsTrigger>
              <TabsTrigger value="resolved" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Resolved ({complaints.filter(c => c.status === "RESOLVED").length})
              </TabsTrigger>
              <TabsTrigger value="urgent" className="whitespace-nowrap text-xs sm:text-sm px-2 sm:px-4">
                Urgent ({complaints.filter(c => c.priority === "URGENT").length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Rest of your filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search complaints..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value as ComplaintCategory | "all")}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
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

            <Select
              value={priorityFilter}
              onValueChange={(value) => setPriorityFilter(value as ComplaintPriority | "all")}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No complaints found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.id.slice(-8)}</TableCell>
                        <TableCell>{complaint.student.fullName}</TableCell>
                        <TableCell>Block {complaint.hostelBlock}, Room {complaint.roomNumber}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{complaint.title}</TableCell>
                        <TableCell>
                          <CategoryBadge category={complaint.category} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={complaint.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={complaint.priority} />
                        </TableCell>
                        <TableCell>{formatDate(complaint.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewComplaint(complaint)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewComplaint(complaint)}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  disabled={complaint.status === "IN_PROGRESS"}
                                  onClick={() => handleStatusUpdate(complaint.id, "IN_PROGRESS")}
                                >
                                  Mark as In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  disabled={complaint.status === "RESOLVED"}
                                  onClick={() => handleStatusUpdate(complaint.id, "RESOLVED")}
                                >
                                  Mark as Resolved
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredComplaints.length}</strong> of <strong>{complaints.length}</strong> complaints
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs with the same structure but filtered data */}
        <TabsContent value="pending" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No pending complaints found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.id.slice(-8)}</TableCell>
                        <TableCell>{complaint.student.fullName}</TableCell>
                        <TableCell>Block {complaint.hostelBlock}, Room {complaint.roomNumber}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{complaint.title}</TableCell>
                        <TableCell>
                          <CategoryBadge category={complaint.category} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={complaint.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={complaint.priority} />
                        </TableCell>
                        <TableCell>{formatDate(complaint.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewComplaint(complaint)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewComplaint(complaint)}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Assign Staff</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "IN_PROGRESS")}>
                                  Mark as In Progress
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar structure for other tabs */}
        <TabsContent value="in-progress" className="m-0">
          {/* Similar table structure */}
        </TabsContent>
        <TabsContent value="resolved" className="m-0">
          {/* Similar table structure */}
        </TabsContent>
        <TabsContent value="urgent" className="m-0">
          {/* Similar table structure */}
        </TabsContent>
      </Tabs>

      {/* Complaint Detail Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedComplaint && (
            <>
              <DialogHeader className="pb-4">
                <DialogTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-lg">Complaint {selectedComplaint.id.slice(-8)}</span>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <StatusBadge status={selectedComplaint.status} />
                    <PriorityBadge priority={selectedComplaint.priority} />
                  </div>
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Submitted on {formatDate(selectedComplaint.createdAt)}
                </DialogDescription>
              </DialogHeader>

              {/* Student & Location Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 border-b">
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Student</h4>
                  <p className="text-sm font-medium break-words">{selectedComplaint.student.fullName}</p>
                  <p className="text-xs text-muted-foreground break-all">{selectedComplaint.student.email}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</h4>
                  <p className="text-sm">Block {selectedComplaint.hostelBlock}, Room {selectedComplaint.roomNumber}</p>
                </div>
                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</h4>
                  <CategoryBadge category={selectedComplaint.category} />
                </div>
              </div>

              {/* Complaint Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2 break-words">{selectedComplaint.title}</h3>
                  <div className="p-3 bg-slate-50 rounded-md">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {selectedComplaint.description}
                    </p>
                  </div>
                </div>

                {selectedComplaint.assignedTo && (
                  <div className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Assigned to:</span> {selectedComplaint.assignedTo.fullName}
                    </p>
                  </div>
                )}

                {selectedComplaint.updates && selectedComplaint.updates.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      Updates
                      <Badge variant="secondary" className="text-xs">
                        {selectedComplaint.updates.length}
                      </Badge>
                    </h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedComplaint.updates.map((update) => (
                        <div
                          key={update.id}
                          className="p-3 rounded-md bg-green-50 border-l-4 border-green-500"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                            <p className="text-sm font-medium">
                              {update.staff?.fullName || 'Staff Member'}
                              <Badge variant="outline" className="text-xs ml-2">Staff</Badge>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDateTime(update.createdAt)}
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {update.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="pt-6 border-t">
                <div className="flex flex-col gap-3 w-full">
                  {/* Primary Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => setViewDialogOpen(false)}
                      className="w-full sm:w-auto"
                    >
                      Close
                    </Button>
                    <Button className="w-full sm:w-auto">
                      Add Update
                    </Button>
                  </div>
                  
                  {/* Status Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    {selectedComplaint.status !== "IN_PROGRESS" && (
                      <Button 
                        variant="secondary" 
                        onClick={() => handleStatusUpdate(selectedComplaint.id, "IN_PROGRESS")}
                        className="w-full sm:flex-1 text-xs sm:text-sm"
                      >
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Mark as In Progress
                      </Button>
                    )}
                    {selectedComplaint.status !== "RESOLVED" && (
                      <Button 
                        variant="default" 
                        onClick={() => handleStatusUpdate(selectedComplaint.id, "RESOLVED")}
                        className="w-full sm:flex-1 text-xs sm:text-sm"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
