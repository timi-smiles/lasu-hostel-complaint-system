"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// Define types based on your Prisma schema
interface ComplaintUpdate {
  id: string
  message: string
  createdAt: string
  staffId?: string
  staff?: {
    id: string
    fullName: string
  }
}

interface Complaint {
  id: string
  title: string
  category: string
  description: string
  status: string
  priority: string
  hostelBlock: string
  roomNumber: string
  createdAt: string
  updatedAt: string
  updates: ComplaintUpdate[]
}

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Check for success message from URL query params
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get("success")

    if (success === "true") {
      toast({
        title: "Success!",
        description: "Your complaint has been submitted successfully.",
        variant: "default",
      })

      // Remove the query parameter from URL without refreshing the page
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/complaints", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to view your complaints")
        }
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch complaints")
      }

      const data = await response.json()
      setComplaints(data.complaints || [])
    } catch (err) {
      console.error("Error fetching complaints:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to load complaints",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
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

  // Loading state
  if (loading) {
    return (
      <DashboardLayout userType="student">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <Link href="/dashboard/student/new-complaint">
              <Button>Submit New Complaint</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Complaints</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-24" />
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout userType="student">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <Link href="/dashboard/student/new-complaint">
              <Button>Submit New Complaint</Button>
            </Link>
          </div>
          <Card className="bg-red-50">
            <CardHeader>
              <CardTitle>Error Loading Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setError(null)
                  fetchComplaints()
                }}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <Link href="/dashboard/student/new-complaint">
            <Button>Submit New Complaint</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-3xl font-bold">{complaints.filter((c) => c.status === "PENDING").length}</p>
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {complaints.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">No complaints submitted yet</h3>
                      <p className="text-gray-500 mt-1">
                        You haven't submitted any complaints. Submit your first complaint to get started.
                      </p>
                    </div>
                    <Link href="/dashboard/student/new-complaint">
                      <Button className="mt-4">Submit Your First Complaint</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              complaints.map((complaint) => (
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
                              {update.staff && <p className="text-xs text-gray-500">- {update.staff.fullName}</p>}
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
            )}
          </TabsContent>

          {["pending", "in-progress", "resolved"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {complaints
                .filter((c) => c.status === status.toUpperCase().replace("-", "_"))
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
                                {update.staff && <p className="text-xs text-gray-500">- {update.staff.fullName}</p>}
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
                ))}
              {complaints.filter((c) => c.status === status.toUpperCase().replace("-", "_")).length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-gray-500">
                        {complaints.length === 0
                          ? "You haven't submitted any complaints yet."
                          : `No ${status.replace("-", " ")} complaints found.`}
                      </p>
                      {complaints.length === 0 && (
                        <Link href="/dashboard/student/new-complaint">
                          <Button variant="outline" className="mt-2">
                            Submit a Complaint
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
