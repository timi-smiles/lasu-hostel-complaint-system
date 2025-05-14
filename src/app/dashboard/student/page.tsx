"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
]

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState(mockComplaints)

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

  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:gap-5">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Student Dashboard</h1>
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
              <p className="text-3xl font-bold">{complaints.filter((c) => c.status === "pending").length}</p>
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

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {complaints.map((complaint) => (
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
                  <Link href={`/dashboard/student/complaint/${complaint.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {complaints
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
                    <Link href={`/dashboard/student/complaint/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {complaints
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
                    <Link href={`/dashboard/student/complaint/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {complaints
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
                    <Link href={`/dashboard/student/complaint/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
