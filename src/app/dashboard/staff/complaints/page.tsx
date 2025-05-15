"use client"

import { useState } from "react"
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
import Link from "next/link"

// Types
type ComplaintStatus = "pending" | "in-progress" | "resolved" | "rejected"
type ComplaintPriority = "low" | "medium" | "high" | "urgent"
type ComplaintCategory = "maintenance" | "roommate" | "facilities" | "security" | "other"

interface Complaint {
  id: string
  studentId: string
  studentName: string
  roomNumber: string
  category: ComplaintCategory
  subject: string
  description: string
  status: ComplaintStatus
  priority: ComplaintPriority
  dateSubmitted: string
  lastUpdated: string
  assignedTo?: string
  attachments?: string[]
  comments?: {
    id: string
    user: string
    userType: "student" | "staff"
    text: string
    timestamp: string
  }[]
}

// Mock data
const mockComplaints: Complaint[] = [
  {
    id: "COMP-2023-001",
    studentId: "STU001",
    studentName: "John Smith",
    roomNumber: "A-101",
    category: "maintenance",
    subject: "Broken shower head",
    description:
      "The shower head in my bathroom is leaking and spraying water in all directions. It needs to be replaced.",
    status: "pending",
    priority: "medium",
    dateSubmitted: "2023-05-10T09:30:00",
    lastUpdated: "2023-05-10T09:30:00",
    comments: [
      {
        id: "c1",
        user: "John Smith",
        userType: "student",
        text: "I've been waiting for 3 days now. When will this be fixed?",
        timestamp: "2023-05-13T14:20:00",
      },
    ],
  },
  {
    id: "COMP-2023-002",
    studentId: "STU042",
    studentName: "Sarah Johnson",
    roomNumber: "B-205",
    category: "roommate",
    subject: "Roommate conflict",
    description:
      "My roommate plays loud music late at night and doesn't respect quiet hours. I've tried talking to them but the issue persists.",
    status: "in-progress",
    priority: "high",
    dateSubmitted: "2023-05-08T15:45:00",
    lastUpdated: "2023-05-09T10:15:00",
    assignedTo: "Resident Advisor",
    comments: [
      {
        id: "c2",
        user: "Resident Advisor",
        userType: "staff",
        text: "I've scheduled a mediation session for tomorrow at 4pm.",
        timestamp: "2023-05-09T10:15:00",
      },
    ],
  },
  {
    id: "COMP-2023-003",
    studentId: "STU078",
    studentName: "Michael Chen",
    roomNumber: "C-310",
    category: "facilities",
    subject: "No hot water",
    description:
      "There has been no hot water in my room for the past 2 days. It's very uncomfortable to shower with cold water.",
    status: "resolved",
    priority: "high",
    dateSubmitted: "2023-05-05T08:20:00",
    lastUpdated: "2023-05-07T11:30:00",
    assignedTo: "Maintenance Staff",
    comments: [
      {
        id: "c3",
        user: "Maintenance Staff",
        userType: "staff",
        text: "The water heater has been repaired. Please let us know if you still experience issues.",
        timestamp: "2023-05-07T11:30:00",
      },
      {
        id: "c4",
        user: "Michael Chen",
        userType: "student",
        text: "Hot water is working now. Thank you!",
        timestamp: "2023-05-07T18:45:00",
      },
    ],
  },
  {
    id: "COMP-2023-004",
    studentId: "STU103",
    studentName: "Emily Rodriguez",
    roomNumber: "A-118",
    category: "security",
    subject: "Broken door lock",
    description:
      "The lock on my door is not working properly. Sometimes it doesn't lock at all which is a security concern.",
    status: "in-progress",
    priority: "urgent",
    dateSubmitted: "2023-05-09T17:10:00",
    lastUpdated: "2023-05-10T08:45:00",
    assignedTo: "Security Team",
    comments: [
      {
        id: "c5",
        user: "Security Team",
        userType: "staff",
        text: "A temporary fix has been applied. A new lock will be installed tomorrow.",
        timestamp: "2023-05-10T08:45:00",
      },
    ],
  },
  {
    id: "COMP-2023-005",
    studentId: "STU056",
    studentName: "David Wilson",
    roomNumber: "D-422",
    category: "maintenance",
    subject: "Clogged sink",
    description:
      "The sink in my bathroom is clogged and drains very slowly. I've tried using drain cleaner but it didn't help.",
    status: "rejected",
    priority: "low",
    dateSubmitted: "2023-05-07T12:30:00",
    lastUpdated: "2023-05-08T09:20:00",
    assignedTo: "Maintenance Staff",
    comments: [
      {
        id: "c6",
        user: "Maintenance Staff",
        userType: "staff",
        text: "This is a duplicate complaint. Please refer to COMP-2023-006 which has already been addressed.",
        timestamp: "2023-05-08T09:20:00",
      },
    ],
  },
  {
    id: "COMP-2023-006",
    studentId: "STU089",
    studentName: "Jessica Lee",
    roomNumber: "B-230",
    category: "facilities",
    subject: "Heating not working",
    description:
      "The heating in my room is not working and it's getting very cold at night. I've checked the thermostat but it seems to be broken.",
    status: "pending",
    priority: "high",
    dateSubmitted: "2023-05-11T10:15:00",
    lastUpdated: "2023-05-11T10:15:00",
  },
  {
    id: "COMP-2023-007",
    studentId: "STU125",
    studentName: "Robert Kim",
    roomNumber: "C-315",
    category: "other",
    subject: "Noisy construction",
    description:
      "There is construction work happening right outside my window starting very early in the morning. It's disrupting my sleep and study time.",
    status: "in-progress",
    priority: "medium",
    dateSubmitted: "2023-05-10T14:50:00",
    lastUpdated: "2023-05-11T09:30:00",
    assignedTo: "Hostel Manager",
    comments: [
      {
        id: "c7",
        user: "Hostel Manager",
        userType: "staff",
        text: "We're working with the construction company to adjust their hours. In the meantime, we can offer temporary relocation to another room.",
        timestamp: "2023-05-11T09:30:00",
      },
    ],
  },
  {
    id: "COMP-2023-008",
    studentId: "STU072",
    studentName: "Olivia Brown",
    roomNumber: "A-105",
    category: "maintenance",
    subject: "Flickering lights",
    description:
      "The lights in my room flicker constantly which is causing eye strain and headaches. I think the bulbs or wiring need to be checked.",
    status: "resolved",
    priority: "medium",
    dateSubmitted: "2023-05-06T11:20:00",
    lastUpdated: "2023-05-08T15:40:00",
    assignedTo: "Maintenance Staff",
    comments: [
      {
        id: "c8",
        user: "Maintenance Staff",
        userType: "staff",
        text: "The faulty light fixture has been replaced.",
        timestamp: "2023-05-08T15:40:00",
      },
    ],
  },
]

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Status badge component
const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          In Progress
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Resolved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Rejected
        </Badge>
      )
  }
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: ComplaintPriority }) => {
  switch (priority) {
    case "low":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
    case "medium":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>
    case "high":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
    case "urgent":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
  }
}

// Category badge component
const CategoryBadge = ({ category }: { category: ComplaintCategory }) => {
  switch (category) {
    case "maintenance":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Maintenance
        </Badge>
      )
    case "roommate":
      return (
        <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
          Roommate
        </Badge>
      )
    case "facilities":
      return (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          Facilities
        </Badge>
      )
    case "security":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Security
        </Badge>
      )
    case "other":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Other
        </Badge>
      )
  }
}

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<ComplaintPriority | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | "all">("all")
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")

  // Filter complaints based on search query and filters
  const filteredComplaints = mockComplaints.filter((complaint) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter

    // Priority filter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter

    // Category filter
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter

    // Tab filter
    if (currentTab === "pending")
      return complaint.status === "pending" && matchesSearch && matchesPriority && matchesCategory
    if (currentTab === "in-progress")
      return complaint.status === "in-progress" && matchesSearch && matchesPriority && matchesCategory
    if (currentTab === "resolved")
      return complaint.status === "resolved" && matchesSearch && matchesPriority && matchesCategory
    if (currentTab === "urgent")
      return complaint.priority === "urgent" && matchesSearch && matchesStatus && matchesCategory

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  // Handle view complaint
  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint)
    setViewDialogOpen(true)
  }

  // Handle status update
  const handleStatusUpdate = (complaintId: string, newStatus: ComplaintStatus) => {
    // In a real app, this would make an API call to update the status
    console.log(`Updating complaint ${complaintId} status to ${newStatus}`)

    // For demo purposes, we'll update the mock data
    const updatedComplaints = mockComplaints.map((complaint) => {
      if (complaint.id === complaintId) {
        return {
          ...complaint,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
        }
      }
      return complaint
    })

    // Close the dialog
    setViewDialogOpen(false)
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
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
          </TabsList>

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
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="roommate">Roommate</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
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
                    <TableHead>Room</TableHead>
                    <TableHead>Subject</TableHead>
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
                        <TableCell className="font-medium">{complaint.id}</TableCell>
                        <TableCell>{complaint.studentName}</TableCell>
                        <TableCell>{complaint.roomNumber}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{complaint.subject}</TableCell>
                        <TableCell>
                          <CategoryBadge category={complaint.category} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={complaint.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={complaint.priority} />
                        </TableCell>
                        <TableCell>{formatDate(complaint.dateSubmitted)}</TableCell>
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
                                <DropdownMenuItem
                                  disabled={complaint.status === "in-progress"}
                                  onClick={() => handleStatusUpdate(complaint.id, "in-progress")}
                                >
                                  Mark as In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  disabled={complaint.status === "resolved"}
                                  onClick={() => handleStatusUpdate(complaint.id, "resolved")}
                                >
                                  Mark as Resolved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  disabled={complaint.status === "rejected"}
                                  onClick={() => handleStatusUpdate(complaint.id, "rejected")}
                                >
                                  Reject Complaint
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
                Showing <strong>{filteredComplaints.length}</strong> of <strong>{mockComplaints.length}</strong>{" "}
                complaints
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs have the same content structure */}
        <TabsContent value="pending" className="m-0">
          <Card>
            <CardContent className="p-0">
              {/* Same table structure as "all" tab */}
              <Table>
                {/* Table content */}
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Subject</TableHead>
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
                        <TableCell className="font-medium">{complaint.id}</TableCell>
                        <TableCell>{complaint.studentName}</TableCell>
                        <TableCell>{complaint.roomNumber}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{complaint.subject}</TableCell>
                        <TableCell>
                          <CategoryBadge category={complaint.category} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={complaint.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={complaint.priority} />
                        </TableCell>
                        <TableCell>{formatDate(complaint.dateSubmitted)}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "in-progress")}>
                                  Mark as In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(complaint.id, "rejected")}>
                                  Reject Complaint
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
                Showing <strong>{filteredComplaints.length}</strong> of{" "}
                <strong>{mockComplaints.filter((c) => c.status === "pending").length}</strong> pending complaints
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs would follow the same pattern */}
        <TabsContent value="in-progress" className="m-0">
          {/* Similar structure */}
        </TabsContent>
        <TabsContent value="resolved" className="m-0">
          {/* Similar structure */}
        </TabsContent>
        <TabsContent value="urgent" className="m-0">
          {/* Similar structure */}
        </TabsContent>
      </Tabs>

      {/* Complaint Detail Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedComplaint && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Complaint {selectedComplaint.id}</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedComplaint.status} />
                    <PriorityBadge priority={selectedComplaint.priority} />
                  </div>
                </DialogTitle>
                <DialogDescription>Submitted on {formatDate(selectedComplaint.dateSubmitted)}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Student</h4>
                  <p className="text-sm">{selectedComplaint.studentName}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Room Number</h4>
                  <p className="text-sm">{selectedComplaint.roomNumber}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                  <CategoryBadge category={selectedComplaint.category} />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedComplaint.subject}</h3>
                  <p className="mt-2 text-sm text-gray-700">{selectedComplaint.description}</p>
                </div>

                {selectedComplaint.assignedTo && (
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Assigned to:</span> {selectedComplaint.assignedTo}
                    </p>
                  </div>
                )}

                {selectedComplaint.comments && selectedComplaint.comments.length > 0 && (
                  <div className="space-y-3 mt-6">
                    <h4 className="text-sm font-medium">Comments</h4>
                    {selectedComplaint.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-md ${
                          comment.userType === "staff"
                            ? "bg-green-50 border-l-4 border-green-500"
                            : "bg-gray-50 border-l-4 border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">
                            {comment.user}
                            <span className="text-xs ml-2 text-muted-foreground capitalize">({comment.userType})</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button>Add Comment</Button>
                </div>
                <div className="flex gap-2">
                  {selectedComplaint.status !== "in-progress" && (
                    <Button variant="secondary" onClick={() => handleStatusUpdate(selectedComplaint.id, "in-progress")}>
                      Mark as In Progress
                    </Button>
                  )}
                  {selectedComplaint.status !== "resolved" && (
                    <Button variant="default" onClick={() => handleStatusUpdate(selectedComplaint.id, "resolved")}>
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
