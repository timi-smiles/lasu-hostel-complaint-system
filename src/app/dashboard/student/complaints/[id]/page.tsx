"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout" //  Add this import
import { useToast } from "@/hooks/use-toast" //  Add this import
import { AlertCircle, ArrowLeft, Calendar, Clock, FileText, MessageSquare } from 'lucide-react'

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

export default function ComplaintDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { toast } = useToast() //  Add toast
  
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const response = await fetch(`/api/complaints/${id}`, {
          credentials: 'include'
        })
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Complaint not found')
          } else if (response.status === 401) {
            setError('Please log in to view this complaint')
          } else if (response.status === 403) {
            setError('You can only view your own complaints')
          } else {
            setError('Failed to load complaint')
          }
          return
        }
        
        const data = await response.json()
        setComplaint(data.complaint || data)
      } catch (err) {
        console.error('Error fetching complaint:', err)
        setError('Failed to load complaint')
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load complaint details",
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchComplaint()
    }
  }, [id, toast])

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

  //  Add priority badge function
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
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

  // Loading state
  if (loading) {
    return (
      <DashboardLayout userType="student"> {/*  Wrap in DashboardLayout */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-8 w-48 mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton className="h-6 w-64 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="h-5 w-5" />
                        <div>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Error state
  if (error || !complaint) {
    return (
      <DashboardLayout userType="student"> {/*  Wrap in DashboardLayout */}
        <div className="p-6">
          <div className="mb-4">
            <Link href="/dashboard/student"> {/*  Fix link path */}
              <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-6">Complaint Details</h1>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {error === 'Complaint not found' ? 'Complaint Not Found' : 'Error Loading Complaint'}
                </h2>
                <p className="text-gray-500 mb-6">
                  {error || "The complaint you're looking for doesn't exist or has been removed."}
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                  <Link href="/dashboard/student">
                    <Button variant="outline">Back to Dashboard</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="student"> {/*  Wrap in DashboardLayout */}
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Header with Back Button */}
          <div className="mb-6">
            {/* Mobile: Back button at top */}
            <div className="block sm:hidden mb-4">
              <Link href="/dashboard/student">
                <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </Link>
            </div>
            
            {/* Title and desktop back button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Complaint #{complaint.id.slice(-8)}</h1>
                <p className="text-muted-foreground">Submitted on {formatDate(complaint.createdAt)}</p>
              </div>
              {/* Desktop: Back button on the right */}
              <div className="hidden sm:block">
                <Link href="/dashboard/student">
                  <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Complaint Details */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <CardTitle className="text-xl">{complaint.title}</CardTitle>
                    <CardDescription>
                      {complaint.category} • Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(complaint.status)}
                    {getPriorityBadge(complaint.priority)} {/*  Add priority badge */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Submitted On</p>
                        <p className="font-medium">{formatDate(complaint.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Submission Time</p>
                        <p className="font-medium">{formatTime(complaint.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="font-medium">Block {complaint.hostelBlock}, Room {complaint.roomNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Priority</p>
                        <p className="font-medium">{complaint.priority}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Updates & Activity - Enhanced */}
            <Card>
              <CardHeader>
                <CardTitle>Updates & Activity</CardTitle>
                <CardDescription>
                  Track the progress of your complaint
                </CardDescription>
              </CardHeader>
              <CardContent>
                {complaint.updates && complaint.updates.length > 0 ? (
                  <div className="space-y-4">
                    {complaint.updates.map((update, index) => (
                      <div key={update.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          {index < complaint.updates.length - 1 && (
                            <div className="w-px h-full bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {update.staff?.fullName?.charAt(0) || 'S'}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <p className="text-sm font-medium text-blue-700">
                                    {update.staff?.fullName || 'System'}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDateTime(update.createdAt)}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500">Staff Member</p>
                              </div>
                            </div>
                            <p className="text-gray-800">{update.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No updates yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Updates from staff will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
