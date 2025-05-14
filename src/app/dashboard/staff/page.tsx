"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for complaints
const mockComplaints = [
  {
    id: "C001",
    title: "Leaking Faucet in Bathroom",
    category: "Plumbing",
    description: "The faucet in my bathroom is constantly dripping, wasting water.",
    status: "in-progress",
    date: "2025-05-10T10:30:00",
    student: "John Smith",
    hostelBlock: "A",
    roomNumber: "101",
    updates: [
      { date: "2025-05-10T14:20:00", message: "Maintenance team has been notified." },
      { date: "2025-05-11T09:15:00", message: "Plumber scheduled for tomorrow." },
    ],
  },
  {
    id: "C002",
    title: "Broken Light Fixture",
    category: "Electrical",
    description: "The ceiling light in my room is flickering and sometimes doesn't turn on.",
    status: "pending",
    date: "2025-05-11T15:45:00",
    student: "Emily Johnson",
    hostelBlock: "B",
    roomNumber: "203",
    updates: [],
  },
  {
    id: "C003",
    title: "Noisy Neighbors",
    category: "Noise Complaint",
    description: "The residents in room 203 play loud music after quiet hours (11 PM).",
    status: "resolved",
    date: "2025-05-05T20:10:00",
    student: "Michael Brown",
    hostelBlock: "A",
    roomNumber: "105",
    updates: [
      { date: "2025-05-06T10:00:00", message: "Hostel warden has been informed." },
      { date: "2025-05-06T16:30:00", message: "Warden spoke with the residents." },
      { date: "2025-05-08T11:20:00", message: "Issue resolved. Please report if it happens again." },
    ],
  },
  {
    id: "C004",
    title: "Broken Chair",
    category: "Furniture",
    description: "One of the chairs in my room has a broken leg and is unusable.",
    status: "pending",
    date: "2025-05-12T08:20:00",
    student: "Sarah Wilson",
    hostelBlock: "C",
    roomNumber: "302",
    updates: [],
  },
  {
    id: "C005",
    title: "Wi-Fi Connectivity Issues",
    category: "Internet",
    description: "The Wi-Fi signal is very weak in my room, making it difficult to attend online classes.",
    status: "in-progress",
    date: "2025-05-09T11:15:00",
    student: "David Lee",
    hostelBlock: "D",
    roomNumber: "405",
    updates: [{ date: "2025-05-09T14:30:00", message: "IT department has been notified." }],
  },
]

export default function StaffDashboard() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterBlock, setFilterBlock] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      searchTerm === "" ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "" || complaint.category === filterCategory
    const matchesBlock = filterBlock === "" || complaint.hostelBlock === filterBlock

    return matchesSearch && matchesCategory && matchesBlock
  })

  return (
    <DashboardLayout userType="staff">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{complaints.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {complaints.filter((c) => c.status === "pending").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {complaints.filter((c) => c.status === "in-progress").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {complaints.filter((c) => c.status === "resolved").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Complaints</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{complaint.title}</CardTitle>
                        <CardDescription>
                          {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.date)}
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Student</p>
                        <p>{complaint.student}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p>
                          Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700">{complaint.description}</p>

                    {complaint.updates.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Updates:</h4>
                        <div className="space-y-2">
                          {complaint.updates.map((update, index) => (
                            <div key={index} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                              <p className="text-gray-500">{new Date(update.date).toLocaleString()}</p>
                              <p>{update.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/dashboard/staff/complaint/${complaint.id}`}>
                      <Button>Manage Complaint</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filteredComplaints.filter((c) => c.status === "pending").length > 0 ? (
              filteredComplaints
                .filter((c) => c.status === "pending")
                .map((complaint) => (
                  <Card key={complaint.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{complaint.title}</CardTitle>
                          <CardDescription>
                            {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.date)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(complaint.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Student</p>
                          <p>{complaint.student}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p>
                            Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700">{complaint.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/dashboard/staff/complaint/${complaint.id}`}>
                        <Button>Manage Complaint</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No pending complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {filteredComplaints.filter((c) => c.status === "in-progress").length > 0 ? (
              filteredComplaints
                .filter((c) => c.status === "in-progress")
                .map((complaint) => (
                  <Card key={complaint.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{complaint.title}</CardTitle>
                          <CardDescription>
                            {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.date)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(complaint.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Student</p>
                          <p>{complaint.student}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p>
                            Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700">{complaint.description}</p>

                      {complaint.updates.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Updates:</h4>
                          <div className="space-y-2">
                            {complaint.updates.map((update, index) => (
                              <div key={index} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                                <p className="text-gray-500">{new Date(update.date).toLocaleString()}</p>
                                <p>{update.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href={`/dashboard/staff/complaint/${complaint.id}`}>
                        <Button>Manage Complaint</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No in-progress complaints match your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {filteredComplaints.filter((c) => c.status === "resolved").length > 0 ? (
              filteredComplaints
                .filter((c) => c.status === "resolved")
                .map((complaint) => (
                  <Card key={complaint.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{complaint.title}</CardTitle>
                          <CardDescription>
                            {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.date)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(complaint.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Student</p>
                          <p>{complaint.student}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p>
                            Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700">{complaint.description}</p>

                      {complaint.updates.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Updates:</h4>
                          <div className="space-y-2">
                            {complaint.updates.map((update, index) => (
                              <div key={index} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                                <p className="text-gray-500">{new Date(update.date).toLocaleString()}</p>
                                <p>{update.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href={`/dashboard/staff/complaint/${complaint.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No resolved complaints match your filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
