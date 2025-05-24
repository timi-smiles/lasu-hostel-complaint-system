"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
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

interface User {
  id: string
  email: string
  fullName: string
  role: string
}

interface Complaint {
  id: string
  title: string
  category: string
  description: string
  status: string
  createdAt: string
  updates: Array<{
    id: string
    message: string
    createdAt: string
    staff?: {
      fullName: string
    }
  }>
}

export default function ComplaintsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Check authentication
  useEffect(() => {
    async function checkAuthAndFetchComplaints() {
      try {
        // First check authentication
        const authResponse = await fetch('/api/auth/me')
        if (!authResponse.ok) {
          setUser(null)
          return
        }
        
        const authData = await authResponse.json()
        setUser(authData.user)
        
        // Then fetch complaints
        const complaintsResponse = await fetch('/api/complaints')
        if (!complaintsResponse.ok) {
          throw new Error('Failed to fetch complaints')
        }
        
        const complaintsData = await complaintsResponse.json()
        console.log("Full API response:", complaintsData)
        
        const complaints = complaintsData.complaints || complaintsData || []
        setComplaints(complaints)
        
      } catch (error) {
        console.error('Error:', error)
        setComplaints([])
      } finally {
        setAuthLoading(false)
        setIsLoading(false)
      }
    }

    checkAuthAndFetchComplaints()
  }, [])

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Back button skeleton */}
        <div className="mb-4">
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-48" />
        </div>

        {/* Quick loading cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[...Array(3)].map((_, i) => (
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

        <div className="text-center">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    )
  }

  // Show loading while fetching complaints
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Back button skeleton */}
        <div className="mb-4">
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-48" />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[...Array(3)].map((_, i) => (
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

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-44" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-10">
          <p>Please log in to view your complaints.</p>
          <Link href="/login">
            <Button className="mt-4">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Show empty state if no complaints
  if (complaints.length === 0) {
    return (
      <div className="p-6 space-y-6">
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

        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">No Recent Complaints</h2>
          <p className="text-gray-500 mb-6">You haven't submitted any complaints yet.</p>
          <Link href="/dashboard/student/new-complaint">
            <Button>Submit Your First Complaint</Button>
          </Link>
        </div>
      </div>
    )
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
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "status") {
        const statusOrder: { [key: string]: number } = {
          PENDING: 0,
          IN_PROGRESS: 1,
          RESOLVED: 2,
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
              {complaints.filter((c) => c.status === "PENDING" || c.status === "IN_PROGRESS").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{complaints.filter((c) => c.status === "RESOLVED").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
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
                <SelectItem value="PLUMBING">Plumbing</SelectItem>
                <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                <SelectItem value="FURNITURE">Furniture</SelectItem>
                <SelectItem value="INTERNET">Internet</SelectItem>
                <SelectItem value="NOISE">Noise Complaint</SelectItem>
                <SelectItem value="HOUSEKEEPING">Housekeeping</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
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

      {/* Tabs and Complaints Display */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Complaints</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
          <TabsTrigger value="RESOLVED">Resolved</TabsTrigger>
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
                        {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.createdAt)}
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
                        {complaint.updates.map((update) => (
                          <div key={update.id} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                            <p className="text-gray-500">{new Date(update.createdAt).toLocaleString()}</p>
                            <p>{update.message}</p>
                            {update.staff && (
                              <p className="text-xs text-gray-400">- {update.staff.fullName}</p>
                            )}
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

        <TabsContent value="PENDING" className="space-y-4">
          {filteredComplaints.filter((c) => c.status === "PENDING").length > 0 ? (
            filteredComplaints
              .filter((c) => c.status === "PENDING")
              .map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{complaint.title}</CardTitle>
                        <CardDescription>
                          {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.createdAt)}
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

        <TabsContent value="IN_PROGRESS" className="space-y-4">
          {filteredComplaints.filter((c) => c.status === "IN_PROGRESS").length > 0 ? (
            filteredComplaints
              .filter((c) => c.status === "IN_PROGRESS")
              .map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{complaint.title}</CardTitle>
                        <CardDescription>
                          {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.createdAt)}
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
                          {complaint.updates.map((update) => (
                            <div key={update.id} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                              <p className="text-gray-500">{new Date(update.createdAt).toLocaleString()}</p>
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

        <TabsContent value="RESOLVED" className="space-y-4">
          {filteredComplaints.filter((c) => c.status === "RESOLVED").length > 0 ? (
            filteredComplaints
              .filter((c) => c.status === "RESOLVED")
              .map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{complaint.title}</CardTitle>
                        <CardDescription>
                          {complaint.category} • Complaint #{complaint.id} • {formatDate(complaint.createdAt)}
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
                          {complaint.updates.map((update) => (
                            <div key={update.id} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
                              <p className="text-gray-500">{new Date(update.createdAt).toLocaleString()}</p>
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