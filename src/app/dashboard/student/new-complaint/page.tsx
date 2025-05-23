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
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import { submitComplaint } from "@/app/actions/complaint-actions"

export default function NewComplaintPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  })
  const [formErrors, setFormErrors] = useState<{
    title?: string
    category?: string
    description?: string
    general?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error when user types
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [id]: undefined }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))

    // Clear error when user selects
    if (formErrors.category) {
      setFormErrors((prev) => ({ ...prev, category: undefined }))
    }
  }

  const validateForm = () => {
    const errors: {
      title?: string
      category?: string
      description?: string
    } = {}

    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!formData.category) {
      errors.category = "Category is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create a FormData object to pass to the server action
      const formDataObj = new FormData()
      formDataObj.append("title", formData.title)
      formDataObj.append("category", formData.category)
      formDataObj.append("description", formData.description)

      // Call the server action
      const result = await submitComplaint(formDataObj)

      if (result.error) {
        setFormErrors({ general: result.error })
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Your complaint has been submitted successfully.",
        })
        router.push("/dashboard/student?success=true")
      }
    } catch (error) {
      console.error("Error submitting complaint:", error)
      setFormErrors({
        general: error instanceof Error ? error.message : "An unexpected error occurred",
      })
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit complaint",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
              {formErrors.general && (
                <div className="bg-red-50 p-3 rounded-md text-red-700 text-sm mb-4">{formErrors.general}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Complaint Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title describing the issue"
                  value={formData.title}
                  onChange={handleChange}
                  className={formErrors.title ? "border-red-500" : ""}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger className={formErrors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PLUMBING">Plumbing</SelectItem>
                    <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                    <SelectItem value="FURNITURE">Furniture</SelectItem>
                    <SelectItem value="CLEANLINESS">Cleanliness</SelectItem>
                    <SelectItem value="NOISE_COMPLAINT">Noise Complaint</SelectItem>
                    <SelectItem value="SECURITY">Security</SelectItem>
                    <SelectItem value="INTERNET">Internet</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide a detailed description of the issue..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className={formErrors.description ? "border-red-500" : ""}
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
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
