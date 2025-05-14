"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { ArrowLeft, Link } from "lucide-react"

// Mock data for a specific complaint
const mockComplaint = {
  id: "C001",
  title: "Leaking Faucet in Bathroom",
  category: "Plumbing",
  description:
    "The faucet in my bathroom is constantly dripping, wasting water. I've tried tightening it but it still leaks. This has been happening for about a week now.",
  status: "in-progress",
  date: "2025-05-10T10:30:00",
  student: "John Smith",
  studentId: "STU12345",
  email: "john.smith@university.edu",
  phone: "+1 (555) 123-4567",
  hostelBlock: "A",
  roomNumber: "101",
  updates: [
    { date: "2025-05-10T14:20:00", message: "Maintenance team has been notified.", staff: "Admin" },
    { date: "2025-05-11T09:15:00", message: "Plumber scheduled for tomorrow.", staff: "Maintenance Supervisor" },
  ],
}

export default function ComplaintDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [complaint, setComplaint] = useState(mockComplaint)
  const [status, setStatus] = useState(complaint.status)
  const [updateMessage, setUpdateMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would submit to a backend
    // For demo purposes, we'll update the local state
    setTimeout(() => {
      const newUpdate = {
        date: new Date().toISOString(),
        message: updateMessage,
        staff: "Staff Member",
      }

      setComplaint((prev) => ({
        ...prev,
        status: status,
        updates: [...prev.updates, newUpdate],
      }))

      setUpdateMessage("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <DashboardLayout userType="staff">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Complaint #{params.id}</h1>
              <Link href="/dashboard/staff">
                <Button variant="ghost" className="flex items-center gap-2 pl-1 hover:bg-gray-100">
                  <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </Button>
              </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{complaint.title}</CardTitle>
                    <CardDescription>
                      {complaint.category} • Submitted on {formatDate(complaint.date)}
                    </CardDescription>
                  </div>
                  {getStatusBadge(complaint.status)}
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
                      <p className="text-gray-600 capitalize">{complaint.status.replace("-", " ")}</p>
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
                <div className="space-y-4">
                  {complaint.updates.map((update, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{update.staff}</p>
                        <p className="text-sm text-gray-500">{formatDate(update.date)}</p>
                      </div>
                      <p className="mt-1">{update.message}</p>
                    </div>
                  ))}

                  {complaint.updates.length === 0 && <p className="text-gray-500 text-center py-4">No updates yet</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Update</CardTitle>
              </CardHeader>
              <form onSubmit={handleUpdateSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-medium text-sm">Update Status</label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Add Update"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p>{complaint.student}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Student ID</p>
                    <p>{complaint.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{complaint.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{complaint.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Hostel & Room</p>
                    <p>
                      Block {complaint.hostelBlock}, Room {complaint.roomNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Contact Student
                </Button>
                <Button className="w-full" variant="outline">
                  Assign to Maintenance
                </Button>
                <Button className="w-full" variant="outline">
                  Schedule Inspection
                </Button>
                <Button className="w-full" variant="destructive">
                  Mark as Priority
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
