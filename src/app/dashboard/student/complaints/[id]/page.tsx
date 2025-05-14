"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Toast } from "@/components/ui/use-toast"
import { AlertCircle, ArrowLeft, Calendar, Clock, FileText, MessageSquare } from 'lucide-react'

// Mock data for a specific complaint
const mockComplaints = [
  {
    id: "C001",
    title: "Leaking Faucet in Bathroom",
    category: "Plumbing",
    description: "The faucet in my bathroom is constantly dripping, wasting water. I've tried tightening it but it still leaks. This has been happening for about a week now.",
    status: "in-progress",
    date: "2025-05-10T10:30:00",
    location: "Block A, Room 101",
    priority: "Medium",
    assignedTo: "Maintenance Team",
    updates: [
      { 
        date: "2025-05-10T14:20:00", 
        message: "Maintenance team has been notified.", 
        author: "Admin",
        authorRole: "System"
      },
      { 
        date: "2025-05-11T09:15:00", 
        message: "Plumber scheduled for tomorrow.", 
        author: "David Wilson",
        authorRole: "Maintenance Supervisor"
      },
    ],
  },
  {
    id: "C002",
    title: "Broken Light Fixture",
    category: "Electrical",
    description: "The ceiling light in my room is flickering and sometimes doesn't turn on. It's making it difficult to study at night.",
    status: "pending",
    date: "2025-05-11T15:45:00",
    location: "Block A, Room 101",
    priority: "Low",
    assignedTo: "Unassigned",
    updates: [],
  },
]


export default function ComplaintDetailPage() {
  const params = useParams()  // Use the 'useParams' hook to capture the dynamic ID from the URL
  const router = useRouter()
  const id = params.id as string  // Extract the complaint ID from the URL parameters
  
  // Find the complaint based on the ID
  const complaint = mockComplaints.find(c => c.id === id)
  
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  if (!complaint) {
    return (
      <div className="p-6">
        {/* Back button */}
        <div className="mb-4">
            <Link href="/dashboard/student">
                  <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                  </Button>
            </Link>
            <h1 className="text-2xl font-bold">Complaint Details</h1>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Complaint Not Found</h2>
              <p className="text-gray-500 mb-6">The complaint you're looking for doesn't exist or has been removed.</p>
              <Link href="/dashboard/student/complaints">
                <Button>View All Complaints</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmitComment = () => {
    if (!comment.trim()) return

    setIsSubmitting(true)

    // In a real app, you would submit to a backend
    setTimeout(() => {
      setIsSubmitting(false)
      setComment("")
      Toast({
        title: "Comment submitted",
        description: "Your comment has been added to the complaint.",
      })
    }, 1000)
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6 ">
            <Link href="/dashboard/student">
                  <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                  </Button>
            </Link>
      </div>
        <h1 className="text-2xl font-bold mt-[-15px] mb-2  sm:ml-4">Complaint Details</h1>

      {/* Render the complaint details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - left side */}
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

              {/* Complaint details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submitted On</p>
                    <p className="text-gray-600">{formatDate(complaint.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Time</p>
                    <p className="text-gray-600">{formatTime(complaint.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Category</p>
                    <p className="text-gray-600">{complaint.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <p className="text-gray-600 capitalize">{complaint.status.replace("-", " ")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Updates & Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complaint.updates.length > 0 ? (
                  complaint.updates.map((update, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{update.author.charAt(0)}</AvatarFallback>
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={update.author} />
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{update.author}</p>
                          <p className="text-xs text-gray-500">{update.authorRole}</p>
                          <p className="text-sm text-gray-600">{update.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{formatDate(update.date)} at {formatTime(update.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No updates yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
