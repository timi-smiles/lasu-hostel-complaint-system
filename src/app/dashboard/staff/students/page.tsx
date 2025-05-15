"use client"

import { useState } from "react"
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
import DashboardLayout from "@/components/dashboard-layout"

// Types
type StudentStatus = "active" | "inactive" | "suspended"
type HostelBlock = "A" | "B" | "C" | "D"

interface Student {
  id: string
  fullName: string
  email: string
  phone: string
  studentId: string
  hostelBlock: HostelBlock
  roomNumber: string
  status: StudentStatus
  registrationDate: string
  department: string
  year: number
  gender: "male" | "female"
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  complaints?: number
  lastActive?: string
}

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU001",
    hostelBlock: "A",
    roomNumber: "101",
    status: "active",
    registrationDate: "2023-08-15T10:30:00",
    department: "Computer Science",
    year: 2,
    gender: "male",
    emergencyContact: {
      name: "Mary Smith",
      relationship: "Mother",
      phone: "+1 (555) 987-6543",
    },
    complaints: 3,
    lastActive: "2023-05-12T14:30:00",
  },
  {
    id: "2",
    fullName: "Emily Johnson",
    email: "emily.johnson@university.edu",
    phone: "+1 (555) 234-5678",
    studentId: "STU042",
    hostelBlock: "B",
    roomNumber: "205",
    status: "active",
    registrationDate: "2023-08-10T09:15:00",
    department: "Business Administration",
    year: 3,
    gender: "female",
    emergencyContact: {
      name: "Robert Johnson",
      relationship: "Father",
      phone: "+1 (555) 876-5432",
    },
    complaints: 1,
    lastActive: "2023-05-14T10:45:00",
  },
  {
    id: "3",
    fullName: "Michael Chen",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 345-6789",
    studentId: "STU078",
    hostelBlock: "C",
    roomNumber: "310",
    status: "inactive",
    registrationDate: "2023-08-05T14:20:00",
    department: "Engineering",
    year: 4,
    gender: "male",
    emergencyContact: {
      name: "Wei Chen",
      relationship: "Father",
      phone: "+1 (555) 765-4321",
    },
    complaints: 0,
    lastActive: "2023-04-30T16:20:00",
  },
  {
    id: "4",
    fullName: "Sarah Wilson",
    email: "sarah.wilson@university.edu",
    phone: "+1 (555) 456-7890",
    studentId: "STU103",
    hostelBlock: "A",
    roomNumber: "118",
    status: "active",
    registrationDate: "2023-08-12T11:45:00",
    department: "Psychology",
    year: 2,
    gender: "female",
    emergencyContact: {
      name: "James Wilson",
      relationship: "Father",
      phone: "+1 (555) 654-3210",
    },
    complaints: 2,
    lastActive: "2023-05-15T09:10:00",
  },
  {
    id: "5",
    fullName: "David Lee",
    email: "david.lee@university.edu",
    phone: "+1 (555) 567-8901",
    studentId: "STU056",
    hostelBlock: "D",
    roomNumber: "422",
    status: "suspended",
    registrationDate: "2023-08-08T13:30:00",
    department: "Medicine",
    year: 5,
    gender: "male",
    emergencyContact: {
      name: "Jennifer Lee",
      relationship: "Sister",
      phone: "+1 (555) 543-2109",
    },
    complaints: 5,
    lastActive: "2023-05-01T11:25:00",
  },
  {
    id: "6",
    fullName: "Jessica Brown",
    email: "jessica.brown@university.edu",
    phone: "+1 (555) 678-9012",
    studentId: "STU089",
    hostelBlock: "B",
    roomNumber: "230",
    status: "active",
    registrationDate: "2023-08-14T10:00:00",
    department: "Arts",
    year: 1,
    gender: "female",
    emergencyContact: {
      name: "Thomas Brown",
      relationship: "Father",
      phone: "+1 (555) 432-1098",
    },
    complaints: 0,
    lastActive: "2023-05-14T15:40:00",
  },
  {
    id: "7",
    fullName: "Robert Kim",
    email: "robert.kim@university.edu",
    phone: "+1 (555) 789-0123",
    studentId: "STU125",
    hostelBlock: "C",
    roomNumber: "315",
    status: "active",
    registrationDate: "2023-08-09T15:30:00",
    department: "Physics",
    year: 3,
    gender: "male",
    emergencyContact: {
      name: "Grace Kim",
      relationship: "Mother",
      phone: "+1 (555) 321-0987",
    },
    complaints: 1,
    lastActive: "2023-05-13T12:15:00",
  },
  {
    id: "8",
    fullName: "Olivia Martinez",
    email: "olivia.martinez@university.edu",
    phone: "+1 (555) 890-1234",
    studentId: "STU072",
    hostelBlock: "A",
    roomNumber: "105",
    status: "active",
    registrationDate: "2023-08-11T09:45:00",
    department: "Chemistry",
    year: 2,
    gender: "female",
    emergencyContact: {
      name: "Carlos Martinez",
      relationship: "Father",
      phone: "+1 (555) 210-9876",
    },
    complaints: 0,
    lastActive: "2023-05-15T14:30:00",
  },
  {
    id: "9",
    fullName: "William Taylor",
    email: "william.taylor@university.edu",
    phone: "+1 (555) 901-2345",
    studentId: "STU114",
    hostelBlock: "D",
    roomNumber: "410",
    status: "active",
    registrationDate: "2023-08-07T14:15:00",
    department: "Mathematics",
    year: 4,
    gender: "male",
    emergencyContact: {
      name: "Elizabeth Taylor",
      relationship: "Mother",
      phone: "+1 (555) 109-8765",
    },
    complaints: 2,
    lastActive: "2023-05-10T16:45:00",
  },
  {
    id: "10",
    fullName: "Sophia Garcia",
    email: "sophia.garcia@university.edu",
    phone: "+1 (555) 012-3456",
    studentId: "STU097",
    hostelBlock: "B",
    roomNumber: "215",
    status: "inactive",
    registrationDate: "2023-08-13T11:20:00",
    department: "Biology",
    year: 3,
    gender: "female",
    emergencyContact: {
      name: "Miguel Garcia",
      relationship: "Father",
      phone: "+1 (555) 098-7654",
    },
    complaints: 1,
    lastActive: "2023-04-28T10:30:00",
  },
  {
    id: "11",
    fullName: "James Wilson",
    email: "james.wilson@university.edu",
    phone: "+1 (555) 123-7890",
    studentId: "STU135",
    hostelBlock: "C",
    roomNumber: "320",
    status: "active",
    registrationDate: "2023-08-06T10:45:00",
    department: "Economics",
    year: 2,
    gender: "male",
    emergencyContact: {
      name: "Patricia Wilson",
      relationship: "Mother",
      phone: "+1 (555) 987-1234",
    },
    complaints: 0,
    lastActive: "2023-05-14T09:20:00",
  },
  {
    id: "12",
    fullName: "Emma Davis",
    email: "emma.davis@university.edu",
    phone: "+1 (555) 234-8901",
    studentId: "STU062",
    hostelBlock: "A",
    roomNumber: "112",
    status: "active",
    registrationDate: "2023-08-14T13:10:00",
    department: "Sociology",
    year: 1,
    gender: "female",
    emergencyContact: {
      name: "George Davis",
      relationship: "Father",
      phone: "+1 (555) 876-2345",
    },
    complaints: 1,
    lastActive: "2023-05-15T11:30:00",
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
const StatusBadge = ({ status }: { status: StudentStatus }) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Inactive
        </Badge>
      )
    case "suspended":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
          <UserX className="h-3 w-3" />
          Suspended
        </Badge>
      )
  }
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "all">("all")
  const [blockFilter, setBlockFilter] = useState<HostelBlock | "all">("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 10

  // Filter students based on search query and filters
  const filteredStudents = mockStudents.filter((student) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    // Block filter
    const matchesBlock = blockFilter === "all" || student.hostelBlock === blockFilter

    // Tab filter
    if (currentTab === "active") return student.status === "active" && matchesSearch && matchesBlock
    if (currentTab === "inactive") return student.status === "inactive" && matchesSearch && matchesBlock
    if (currentTab === "suspended") return student.status === "suspended" && matchesSearch && matchesBlock

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
  const handleStatusUpdate = (studentId: string, newStatus: StudentStatus) => {
    // In a real app, this would make an API call to update the status
    console.log(`Updating student ${studentId} status to ${newStatus}`)
    // Close the dialog
    setViewDialogOpen(false)
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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Export
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
              <div className="text-2xl font-bold">{mockStudents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockStudents.filter((s) => s.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {mockStudents.filter((s) => s.status === "inactive").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {mockStudents.filter((s) => s.status === "suspended").length}
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
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
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>
                            Block {student.hostelBlock}, Room {student.roomNumber}
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>Year {student.year}</TableCell>
                          <TableCell>
                            <StatusBadge status={student.status} />
                          </TableCell>
                          <TableCell>{formatDate(student.registrationDate)}</TableCell>
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
                                  <DropdownMenuItem>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {student.status !== "active" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "active")}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Set as Active
                                    </DropdownMenuItem>
                                  )}
                                  {student.status !== "inactive" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "inactive")}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Set as Inactive
                                    </DropdownMenuItem>
                                  )}
                                  {student.status !== "suspended" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "suspended")}>
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

          {/* Other tabs have the same content structure */}
          <TabsContent value="active" className="m-0">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Hostel</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No active students found matching your filters.
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
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>
                            Block {student.hostelBlock}, Room {student.roomNumber}
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>Year {student.year}</TableCell>
                          <TableCell>
                            <StatusBadge status={student.status} />
                          </TableCell>
                          <TableCell>{formatDate(student.registrationDate)}</TableCell>
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
                                  <DropdownMenuItem>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {student.status !== "inactive" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "inactive")}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Set as Inactive
                                    </DropdownMenuItem>
                                  )}
                                  {student.status !== "suspended" && (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(student.id, "suspended")}>
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

          {/* Other tabs would follow the same pattern */}
          <TabsContent value="inactive" className="m-0">
            {/* Similar structure */}
          </TabsContent>
          <TabsContent value="suspended" className="m-0">
            {/* Similar structure */}
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
                  <DialogDescription>Student ID: {selectedStudent.studentId}</DialogDescription>
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
                    <p className="text-muted-foreground">{selectedStudent.department}</p>
                    <p className="text-sm">Year {selectedStudent.year}</p>

                    <div className="mt-6 w-full space-y-2">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Student
                      </Button>

                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{selectedStudent.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p>{selectedStudent.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Hostel Block</p>
                        <p>Block {selectedStudent.hostelBlock}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                        <p>{selectedStudent.roomNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Gender</p>
                        <p className="capitalize">{selectedStudent.gender}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                        <p>{formatDate(selectedStudent.registrationDate)}</p>
                      </div>
                    </div>

                    {selectedStudent.emergencyContact && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Emergency Contact</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Name</p>
                              <p>{selectedStudent.emergencyContact.name}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Relationship</p>
                              <p>{selectedStudent.emergencyContact.relationship}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-muted-foreground">Phone</p>
                              <p>{selectedStudent.emergencyContact.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Complaint History</h4>
                      {selectedStudent.complaints === 0 ? (
                        <p className="text-center py-3 bg-gray-50 rounded-md">No complaints filed</p>
                      ) : (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p>
                            <span className="font-medium">{selectedStudent.complaints}</span> complaints filed
                          </p>
                          <Button variant="link" className="p-0 h-auto">
                            View Complaint History
                          </Button>
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
                    {selectedStudent.status !== "active" && (
                      <Button variant="secondary" onClick={() => handleStatusUpdate(selectedStudent.id, "active")}>
                        Set as Active
                      </Button>
                    )}
                    {selectedStudent.status !== "inactive" && (
                      <Button variant="secondary" onClick={() => handleStatusUpdate(selectedStudent.id, "inactive")}>
                        Set as Inactive
                      </Button>
                    )}
                    {selectedStudent.status !== "suspended" && (
                      <Button variant="destructive" onClick={() => handleStatusUpdate(selectedStudent.id, "suspended")}>
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
