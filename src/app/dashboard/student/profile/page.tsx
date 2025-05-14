"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from 'lucide-react'
import { Toast } from "@/components/ui/use-toast"

// Mock student data (as would be collected from registration)
const studentData = {
  id: "STU12345",
  name: "John Smith",
  email: "john.smith@university.edu",
  phone: "+1 (555) 123-4567",
  program: "Computer Science",
  year: "3rd Year",
  hostelBlock: "A",
  roomNumber: "101",
  joinedDate: "2022-09-01",
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: studentData.name,
    email: studentData.email,
    phone: studentData.phone,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveProfile = () => {
    // In a real app, you would save to a backend
    setIsEditing(false)
    Toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

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
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile summary */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={studentData.name} />
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{studentData.name}</CardTitle>
            <CardDescription>{studentData.program}, {studentData.year}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Student ID</p>
              <p>{studentData.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{studentData.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{studentData.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Hostel</p>
              <p>Block {studentData.hostelBlock}, Room {studentData.roomNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Joined</p>
              <p>{new Date(studentData.joinedDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Change Password</Button>
          </CardFooter>
        </Card>

        {/* Right column - Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here. This information will be displayed on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input 
                  id="studentId" 
                  value={studentData.id} 
                  disabled 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  disabled={!isEditing} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program/Department</Label>
                <Input 
                  id="program" 
                  value={studentData.program} 
                  disabled 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <Input 
                  id="year" 
                  value={studentData.year} 
                  disabled 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hostelBlock">Hostel Block</Label>
                <Input 
                  id="hostelBlock" 
                  value={studentData.hostelBlock} 
                  disabled 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input 
                  id="roomNumber" 
                  value={studentData.roomNumber} 
                  disabled 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isEditing && (
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}