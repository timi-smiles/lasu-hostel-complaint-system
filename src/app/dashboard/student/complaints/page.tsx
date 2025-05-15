"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Filter, Search, SlidersHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for complaints
const mockComplaints = [
  {
    id: "C001",
    title: "Leaking Faucet in Bathroom",
    category: "Plumbing",
    description: "The faucet in my bathroom is constantly dripping, wasting water.",
    status: "in-progress",
    date: "2025-05-10T10:30:00",
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
    updates: [],
  },
  {
    id: "C003",
    title: "Noisy Neighbors",
    category: "Noise Complaint",
    description: "The residents in room 203 play loud music after quiet hours (11 PM).",
    status: "resolved",
    date: "2025-05-05T20:10:00",
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
    updates: [],
  },
  {
    id: "C005",
    title: "Wi-Fi Connectivity Issues",
    category: "Internet",
    description: "The Wi-Fi signal is very weak in my room, making it difficult to attend online classes.",
    status: "in-progress",
    date: "2025-05-09T11:15:00",
    updates: [{ date: "2025-05-09T14:30:00", message: "IT department has been notified." }],
  },
  {
    id: "C006",
    title: "Water Heater Not Working",
    category: "Plumbing",
    description: "The water heater in the bathroom is not working, only cold water is available.",
    status: "resolved",
    date: "2025-04-20T09:30:00",
    updates: [
      { date: "2025-04-20T11:00:00", message: "Maintenance team has been notified." },
      { date: "2025-04-21T14:15:00", message: "Water heater has been repaired." },
    ],
  },
  {
    id: "C007",
    title: "Missing Dustbin",
    category: "Housekeeping",
    description: "The dustbin in my room is missing after the cleaning staff visited.",
    status: "resolved",
    date: "2025-04-25T16:20:00",
    updates: [
      { date: "2025-04-26T09:10:00", message: "Housekeeping has been notified." },
      { date: "2025-04-26T15:30:00", message: "New dustbin has been provided." },
    ],
  },
]

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

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

  const filteredComplaints = complaints
    .filter((complaint) => {
      const matchesSearch =
        searchTerm === "" ||
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        filterCategory === "all" || filterCategory === "" || complaint.category === filterCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "status") {
        const statusOrder: { [key: string]: number } = {
          pending: 0,
          "in-progress": 1,
          resolved: 2,
        }
        return statusOrder[a.status] - statusOrder[b.status]
      }
      return 0
    })

  return (
    <div className="p-6 space-y-6">
        {/* Back button */}
    <div className="mb-4">
        <Link href="/dashboard/student">
          <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">My Complaints</h1>
        <Link href="/dashboard/student/new-complaint">
          <Button>Submit New Complaint</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
            <CardTitle className="text-lg">Active Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {complaints.filter((c) => c.status === "pending" || c.status === "in-progress").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{complaints.filter((c) => c.status === "resolved").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search complaints..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>
                    {filterCategory === "all" ? "All Categories" : filterCategory || "All Categories"}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Internet">Internet</SelectItem>
                <SelectItem value="Noise Complaint">Noise Complaint</SelectItem>
                <SelectItem value="Housekeeping">Housekeeping</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("status")}>
                  Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <Link href={`/dashboard/student/complaints/${complaint.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No complaints match your search criteria</p>
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
                    <p className="text-gray-700">{complaint.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/dashboard/student/complaints/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending complaints</p>
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
                    <Link href={`/dashboard/student/complaints/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No complaints in progress</p>
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
                    <Link href={`/dashboard/student/complaints/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No resolved complaints</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}