"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Lock,
  UserX,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Types
type StudentStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"
type HostelBlock = "A" | "B" | "C" | "D"

interface Student {
  id: string
  fullName: string
  email: string
  phone?: string
  studentId?: string
  hostelBlock?: HostelBlock
  roomNumber?: string
  status: StudentStatus
  createdAt: string
  department?: string
  role: string
  lastLogin?: string
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

// Status badge component
const StatusBadge = ({ status }: { status: StudentStatus }) => {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      )
    case "INACTIVE":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Inactive
        </Badge>
      )
    case "SUSPENDED":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
          <UserX className="h-3 w-3" />
          Suspended
        </Badge>
      )
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">("all")
  const [blockFilter, setBlockFilter] = useState<HostelBlock | "all">("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 10
  const { toast } = useToast()

  // Fetch students from API
  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("Frontend: Fetching students from /api/users?role=student")
      
      const response = await fetch('/api/users?role=student', {
        credentials: 'include',
      })

      console.log("📡 Frontend: Response status:", response.status)
      console.log("📡 Frontend: Response headers:", response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(" Frontend: API Error Response:", errorText)
        
        if (response.status === 401) {
          throw new Error("Unauthorized access - Please log in")
        }
        if (response.status === 403) {
          throw new Error("Forbidden - You don't have permission to view students")
        }
        throw new Error(`Failed to fetch students: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log(" Frontend: Raw API response:", data)
      console.log(" Frontend: Users array:", data.users)
      console.log(" Frontend: Users length:", data.users?.length || 0)
      
      if (data.users && data.users.length > 0) {
        console.log(" Frontend: First user sample:", data.users[0])
      }
      
      const studentsData = data.users || []
      console.log(` Frontend: Setting ${studentsData.length} students`)
      
      setStudents(studentsData)

    } catch (err) {
      console.error(' Frontend: Error fetching students:', err)
      setError(err instanceof Error ? err.message : "Failed to load students")
      toast({
        variant: "destructive", 
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to load students. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.studentId && student.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (student.roomNumber && student.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()))

    // Status filter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    // Block filter
    const matchesBlock = blockFilter === "all" || student.hostelBlock === blockFilter

    // Tab filter
    if (currentTab === "active") return student.status === "ACTIVE" && matchesSearch && matchesBlock
    if (currentTab === "inactive") return student.status === "INACTIVE" && matchesSearch && matchesBlock
    if (currentTab === "suspended") return student.status === "SUSPENDED" && matchesSearch && matchesBlock

    return matchesSearch && matchesStatus && matchesBlock
  })

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  // Handle view student
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student)
    setViewDialogOpen(true)
  }

  // Handle status update
  const handleStatusUpdate = async (studentId: string, newStatus: StudentStatus) => {
    try {
      const response = await fetch(`/api/users/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update student status")
      }

      // Update local state
      setStudents(prev => prev.map(student => 
        student.id === studentId ? { ...student, status: newStatus } : student
      ))

      toast({
        title: "Success",
        description: `Student status updated to ${newStatus.toLowerCase()}.`,
      })

      setViewDialogOpen(false)
    } catch (err) {
      console.error('Error updating student status:', err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update student status. Please try again.",
      })
    }
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
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-12" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                <h3 className="text-lg font-semibold mb-2">Failed to Load Students</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchStudents}>Try Again</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="staff">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">View and manage all registered students</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchStudents}>
              <Filter className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {students.filter((s) => s.status === "ACTIVE").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {students.filter((s) => s.status === "INACTIVE").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {students.filter((s) => s.status === "SUSPENDED").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={blockFilter} onValueChange={(value) => setBlockFilter(value as HostelBlock | "all")}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Hostel Block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  <SelectItem value="A">Block A</SelectItem>
                  <SelectItem value="B">Block B</SelectItem>
                  <SelectItem value="C">Block C</SelectItem>
                  <SelectItem value="D">Block D</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StudentStatus | "all")}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
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
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Hostel</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No students found matching your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={student.fullName} />
                                <AvatarFallback>
                                  {student.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.fullName}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.studentId || "N/A"}</TableCell>
                          <TableCell>
                            {student.hostelBlock && student.roomNumber 
                              ? `Block ${student.hostelBlock}, Room ${student.roomNumber}`
                              : "Not assigned"
                            }
                          </TableCell>
                          <TableCell>{student.department || "Not specified"}</TableCell>
                          <TableCell>
                            <StatusBadge status={student.status} />
                          </TableCell>
                          <TableCell>{formatDate(student.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewStudent(student)}>
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
                                  <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Student
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {student.status !== "ACTIVE" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "ACTIVE")}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Set as Active
                                    </DropdownMenuItem>
                                  )}
                                  {student.status !== "INACTIVE" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "INACTIVE")}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Set as Inactive
                                    </DropdownMenuItem>
                                  )}
                                  {student.status !== "SUSPENDED" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "SUSPENDED")}>
                                      <UserX className="h-4 w-4 mr-2" />
                                      Suspend Student
                                    </DropdownMenuItem>
                                  )}
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
                  Showing <strong>{indexOfFirstStudent + 1}</strong> to{" "}
                  <strong>{Math.min(indexOfLastStudent, filteredStudents.length)}</strong> of{" "}
                  <strong>{filteredStudents.length}</strong> students
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Simplified other tabs - they use the same filtered data */}
          <TabsContent value="active" className="m-0">
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Active students are displayed in the "All Students" tab with active status filter.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive" className="m-0">
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Inactive students are displayed in the "All Students" tab with inactive status filter.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suspended" className="m-0">
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Suspended students are displayed in the "All Students" tab with suspended status filter.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Student Detail Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedStudent && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Student Profile</span>
                    <StatusBadge status={selectedStudent.status} />
                  </DialogTitle>
                  <DialogDescription>Student ID: {selectedStudent.studentId || "Not assigned"}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 flex flex-col items-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={`/placeholder.svg?height=128&width=128`} alt={selectedStudent.fullName} />
                      <AvatarFallback className="text-2xl">
                        {selectedStudent.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-lg font-semibold">{selectedStudent.fullName}</h3>
                    <p className="text-muted-foreground">{selectedStudent.department || "Not specified"}</p>
                    <p className="text-sm">Student</p>

                    <div className="mt-6 w-full space-y-2">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                      {selectedStudent.phone && (
                        <Button variant="outline" className="w-full justify-start" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Student
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{selectedStudent.email}</p>
                      </div>
                      {selectedStudent.phone && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{selectedStudent.phone}</p>
                        </div>
                      )}
                      {selectedStudent.hostelBlock && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Hostel Block</p>
                          <p>Block {selectedStudent.hostelBlock}</p>
                        </div>
                      )}
                      {selectedStudent.roomNumber && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                          <p>{selectedStudent.roomNumber}</p>
                        </div>
                      )}
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                        <p>{formatDate(selectedStudent.createdAt)}</p>
                      </div>
                      {selectedStudent.lastLogin && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                          <p>{formatDate(selectedStudent.lastLogin)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                      Close
                    </Button>
                    <Button>Edit Student</Button>
                  </div>
                  <div className="flex gap-2">
                    {selectedStudent.status !== "ACTIVE" && (
                      <Button variant="secondary" onClick={() => handleStatusUpdate(selectedStudent.id, "ACTIVE")}>
                        Set as Active
                      </Button>
                    )}
                    {selectedStudent.status !== "INACTIVE" && (
                      <Button variant="secondary" onClick={() => handleStatusUpdate(selectedStudent.id, "INACTIVE")}>
                        Set as Inactive
                      </Button>
                    )}
                    {selectedStudent.status !== "SUSPENDED" && (
                      <Button variant="destructive" onClick={() => handleStatusUpdate(selectedStudent.id, "SUSPENDED")}>
                        Suspend Student
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
