"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

export default function NewComplaintPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    roomNumber: "101", // Pre-filled for demo
    hostelBlock: "A", // Pre-filled for demo
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would submit to a backend
    // For demo purposes, we'll simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/student?success=true")
    }, 1500)
  }

  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Submit New Complaint</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>Provide details about the issue you're experiencing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title describing the issue"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                    <SelectItem value="Noise Complaint">Noise Complaint</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Internet">Internet</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hostelBlock">Hostel Block</Label>
                  <Input id="hostelBlock" value={formData.hostelBlock} onChange={handleChange} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input id="roomNumber" value={formData.roomNumber} onChange={handleChange} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide a detailed description of the issue..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <Input id="image" type="file" accept="image/*" />
                <p className="text-xs text-gray-500">Upload an image of the issue if applicable (max 5MB)</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/student")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
