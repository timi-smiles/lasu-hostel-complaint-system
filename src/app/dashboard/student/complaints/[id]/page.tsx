"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
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
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchComplaint()
    }
  }, [id])

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Loading state
  if (loading) {
    return (
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
                  <Skeleton className="h-6 w-20" />
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
    )
  }

  // Error state
  if (error || !complaint) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Link href="/dashboard/student/complaints">
            <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Complaints</span>
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
              <Link href="/dashboard/student/complaints">
                <Button>View All Complaints</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/student/complaints">
          <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Complaints</span>
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Complaint Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{complaint.title}</CardTitle>
                  <CardDescription>
                    {complaint.category} • Complaint #{complaint.id}
                  </CardDescription>
                </div>
                {getStatusBadge(complaint.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{complaint.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submitted On</p>
                    <p className="text-gray-600">{formatDate(complaint.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Time</p>
                    <p className="text-gray-600">{formatTime(complaint.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{complaint.hostelBlock}, Room {complaint.roomNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Priority</p>
                    <p className="text-gray-600">{complaint.priority}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Updates & Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complaint.updates && complaint.updates.length > 0 ? (
                  complaint.updates.map((update, index) => (
                    <div key={update.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {update.staff?.fullName?.charAt(0) || 'S'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {update.staff?.fullName || 'System'}
                          </p>
                          <p className="text-xs text-gray-500">Staff Member</p>
                          <p className="text-sm text-gray-600 mt-1">{update.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(update.createdAt)} at {formatTime(update.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No updates yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
