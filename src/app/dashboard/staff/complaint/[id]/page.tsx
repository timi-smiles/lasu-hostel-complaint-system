"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { ArrowLeft, Mail, Phone, Clock, User, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { use } from "react"

// Types
type ComplaintStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED"
type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
type ComplaintCategory = "Plumbing" | "Electrical" | "Furniture" | "Cleanliness" | "Noise Complaint" | "Security" | "Internet" | "Other"

interface Student {
  id: string
  fullName: string
  email: string
  hostelBlock?: string
  roomNumber?: string
  phoneNumber?: string
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

export default function ComplaintDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params)
  
  const router = useRouter()
  const { toast } = useToast()
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<ComplaintStatus>("PENDING")
  const [updateMessage, setUpdateMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch complaint details
  useEffect(() => {
    async function fetchComplaint() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/complaints/${resolvedParams.id}`, {
          credentials: "include",
        })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Complaint not found')
          }
          if (response.status === 403) {
            throw new Error('Access denied - insufficient permissions')
          }
          if (response.status === 401) {
            throw new Error('Unauthorized - please log in')
          }
          throw new Error(`Failed to fetch complaint: ${response.status}`)
        }

        const data = await response.json()
        const complaintData = data.complaint || data
        
        setComplaint(complaintData)
        setStatus(complaintData.status)

      } catch (error) {
        console.error('Error fetching complaint:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch complaint')
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load complaint details",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (resolvedParams.id) {
      fetchComplaint()
    }
  }, [resolvedParams.id, toast])

  const getStatusBadge = (status: ComplaintStatus) => {
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

  const getPriorityBadge = (priority: ComplaintPriority) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!updateMessage.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an update message.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Update complaint status
      const statusResponse = await fetch(`/api/complaints/${resolvedParams.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })

      if (!statusResponse.ok) {
        throw new Error('Failed to update status')
      }

      // Add update message
      const updateResponse = await fetch(`/api/complaints/${resolvedParams.id}/updates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: updateMessage }),
      })

      if (!updateResponse.ok) {
        throw new Error('Failed to add update')
      }

      const updateData = await updateResponse.json()

      // Update local state
      setComplaint(prev => {
        if (!prev) return null
        return {
          ...prev,
          status: status,
          updatedAt: new Date().toISOString(),
          updates: [...prev.updates, updateData.update]
        }
      })

      setUpdateMessage("")
      
      toast({
        title: "Success",
        description: "Complaint updated successfully!",
      })

    } catch (error) {
      console.error('Error updating complaint:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update complaint. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickStatusUpdate = async (newStatus: ComplaintStatus) => {
    try {
      const response = await fetch(`/api/complaints/${resolvedParams.id}/status`, {
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

      setComplaint(prev => {
        if (!prev) return null
        return {
          ...prev,
          status: newStatus,
          updatedAt: new Date().toISOString()
        }
      })

      setStatus(newStatus)

      toast({
        title: "Status Updated",
        description: `Complaint marked as ${newStatus.toLowerCase().replace('_', ' ')}`,
      })

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status. Please try again.",
      })
    }
  }

  const handlePriorityUpdate = async (newPriority: ComplaintPriority) => {
    try {
      const response = await fetch(`/api/complaints/${resolvedParams.id}/priority`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ priority: newPriority }),
      })

      if (!response.ok) {
        throw new Error('Failed to update priority')
      }

      setComplaint(prev => {
        if (!prev) return null
        return {
          ...prev,
          priority: newPriority,
          updatedAt: new Date().toISOString()
        }
      })

      toast({
        title: "Priority Updated",
        description: `Complaint priority changed to ${newPriority.toLowerCase()}`,
      })

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update priority. Please try again.",
      })
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout userType="staff">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
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
      <DashboardLayout userType="staff">
        <div className="p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Failed to Load Complaint</h3>
                <p className="text-muted-foreground mb-4">{error || 'Complaint not found'}</p>
                <div className="flex gap-2">
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                  <Link href="/dashboard/staff">
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
    <DashboardLayout userType="staff">
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header - Mobile-first with back button at top */}
          <div className="mb-6">
            {/* Mobile: Back button at very top */}
            <div className="block sm:hidden mb-4">
              <Link href="/dashboard/staff">
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
                <Link href="/dashboard/staff">
                  <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Grid - Fixed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
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
                    <div className="flex flex-row gap-2 sm:flex-col sm:gap-2">
                      {getStatusBadge(complaint.status)}
                      {getPriorityBadge(complaint.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-600">{complaint.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">Location</h3>
                        <p className="text-gray-600">
                          Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">Current Status</h3>
                        <p className="text-gray-600">{complaint.status.replace("_", " ")}</p>
                      </div>
                    </div>

                    {complaint.assignedTo && (
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">Assigned To</h3>
                        <p className="text-gray-600">{complaint.assignedTo.fullName}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Updates & Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Updates & Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaint.updates && complaint.updates.length > 0 ? (
                      complaint.updates.map((update) => (
                        <div key={update.id} className="border-l-2 border-gray-200 pl-4 py-2">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">
                              {update.staff?.fullName || 'Staff Member'}
                              <span className="text-xs ml-2 text-muted-foreground">(Staff)</span>
                            </p>
                            <p className="text-sm text-gray-500">{formatDate(update.createdAt)}</p>
                          </div>
                          <p className="mt-1 text-gray-600">{update.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No updates yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add Update Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Update</CardTitle>
                  <CardDescription>
                    Update the complaint status and add a message for the student
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-medium text-sm">Update Status</label>
                      <Select value={status} onValueChange={(value) => setStatus(value as ComplaintStatus)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                          <SelectItem value="RESOLVED">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="font-medium text-sm">Update Message</label>
                      <Textarea
                        placeholder="Add details about the status update or actions taken..."
                        rows={4}
                        value={updateMessage}
                        onChange={(e) => setUpdateMessage(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Submitting..." : "Add Update"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>

            {/* Sidebar - Fixed */}
            <div className="space-y-4 lg:sticky lg:top-6">
              {/* Student Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="h-4 w-4" />
                    Student Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="font-medium">{complaint.student.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Student ID</p>
                    <p>{complaint.student.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="break-all text-sm">{complaint.student.email}</p>
                  </div>
                  {complaint.student.phoneNumber && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p>{complaint.student.phoneNumber}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Location
                    </p>
                    <p>
                      Block {complaint.student.hostelBlock || complaint.hostelBlock}, 
                      Room {complaint.student.roomNumber || complaint.roomNumber}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => window.location.href = `mailto:${complaint.student.email}`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Student
                  </Button>
                  
                  {/* Enhanced Phone Button - Always show but handle missing phone */}
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    disabled={!complaint.student.phoneNumber}
                    onClick={() => {
                      if (complaint.student.phoneNumber) {
                        console.log("📞 Calling:", complaint.student.phoneNumber)
                        window.location.href = `tel:${complaint.student.phoneNumber}`
                      } else {
                        toast({
                          variant: "destructive",
                          title: "No Phone Number",
                          description: "This student hasn't provided a phone number",
                        })
                      }
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {complaint.student.phoneNumber ? 
                      `Call Student (${complaint.student.phoneNumber})` : 
                      "No Phone Available"
                    }
                  </Button>

                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    disabled={complaint.status === "IN_PROGRESS"}
                    onClick={() => handleQuickStatusUpdate("IN_PROGRESS")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Mark In Progress
                  </Button>

                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    disabled={complaint.status === "RESOLVED"}
                    onClick={() => handleQuickStatusUpdate("RESOLVED")}
                  >
                    ✓ Mark as Resolved
                  </Button>

                  {complaint.priority !== "URGENT" && (
                    <Button 
                      className="w-full justify-start" 
                      variant="destructive"
                      onClick={() => handlePriorityUpdate("URGENT")}
                    >
                      🚨 Mark as Urgent
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Complaint Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Complaint Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span>{formatDate(complaint.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span>{formatDate(complaint.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priority:</span>
                      <span>{getPriorityBadge(complaint.priority)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span>{complaint.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Add bottom spacing */}
          <div className="h-8"></div>
        </div>
      </div>
    </DashboardLayout>
  )
}
