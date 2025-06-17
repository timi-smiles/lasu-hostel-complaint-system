"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, Building, Calendar, Shield, Lock, Upload, Edit, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Types
// Update your StudentProfile interface to match the API response:
interface StudentProfile {
  id: string
  email: string
  fullName: string
  role: string
  status: string
  phone?: string
  department?: string
  studentId?: string
  hostelBlock?: string
  roomNumber?: string
  createdAt: string
  updatedAt?: string
  lastLogin?: string
}

export default function StudentProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true) // Make sure this is called "loading" not "isLoading"
  const [saving, setSaving] = useState(false)
  const [userData, setUserData] = useState<StudentProfile | null>(null)
  const [formData, setFormData] = useState<Partial<StudentProfile>>({})
  const [error, setError] = useState<string | null>(null)

  // Helper functions (same as staff profile)
  const formatDate = (dateString: string | Date | null | undefined, includeTime = false) => {
    if (!dateString) return 'Date not available'
    
    try {
      let date: Date
      
      if (typeof dateString === 'string') {
        date = new Date(dateString)
      } else if (dateString instanceof Date) {
        date = dateString
      } else {
        return 'Invalid date format'
      }
      
      if (isNaN(date.getTime())) {
        return 'Invalid date'
      }
      
      if (includeTime) {
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } else {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    } catch (error) {
      console.error('Date formatting error:', error, 'for input:', dateString)
      return 'Invalid date'
    }
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  }

  // 🎯 SAME fetch logic as staff profile with STUDENT protection
  useEffect(() => {
    const verifyAccessAndFetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 🎯 STEP 1: Check role first
        console.log("Student Profile: Checking role authorization")
        const roleResponse = await fetch("/api/auth/check-role", {
          credentials: "include",
        })

        if (!roleResponse.ok) {
          if (roleResponse.status === 401) {
            console.log(" Not authenticated - redirecting to login")
            router.push("/login")
            return
          }
          throw new Error("Failed to verify access")
        }

        const roleData = await roleResponse.json()
        console.log(" Role Check Result:", roleData.user.role)

        // 🎯 STEP 2: Verify user should be on student profile
        if (roleData.user.role !== "STUDENT") {
          console.log(` Access denied. User role: ${roleData.user.role} - redirecting to staff profile`)
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access student profiles.",
          })
          // Use the redirect path from the role check
          router.push(roleData.paths.profile || "/dashboard/staff/profile")
          return
        }

        // 🎯 STEP 3: Role verified, now fetch profile data
        console.log(" Student access verified - fetching profile from /api/student/profile")
        
        const profileResponse = await fetch("/api/student/profile", {
          credentials: "include",
        })

        if (!profileResponse.ok) {
          if (profileResponse.status === 401) {
            router.push("/login")
            return
          }
          if (profileResponse.status === 403) {
            const errorData = await profileResponse.json()
            console.log(" Profile access denied:", errorData.userRole)
            toast({
              variant: "destructive",
              title: "Access Denied",
              description: "You don't have permission to access student profiles.",
            })
            router.push(errorData.redirectTo || "/dashboard/staff/profile")
            return
          }
          throw new Error("Failed to fetch student profile")
        }

        const profileData = await profileResponse.json()
        console.log(" Student Profile: Successfully fetched:", profileData.user.fullName)
        
        setUserData(profileData.user)
        
        // Initialize form data with student-specific fields
        setFormData({
          fullName: profileData.user.fullName || "",
          email: profileData.user.email || "",
          phone: profileData.user.phone || "",
          department: profileData.user.department || "",
          hostelBlock: profileData.user.hostelBlock || "",
          roomNumber: profileData.user.roomNumber || "",
        })

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        console.error(" Student Profile Error:", err)
        setError(errorMessage)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load student profile. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    verifyAccessAndFetchProfile()
  }, [router, toast]) // Same dependencies as staff profile

  // Rest of your handlers (same as staff profile)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    if (!userData) return

    setSaving(true)
    try {
      console.log("💾 Student Profile: Saving to /api/student/profile")

      // 🎯 Change this from /api/users/${userData.id} to /api/student/profile
      const response = await fetch("/api/student/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          department: formData.department,
          hostelBlock: formData.hostelBlock,
          roomNumber: formData.roomNumber,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update student profile")
      }

      const result = await response.json()
      console.log(" Student Profile: Update successful:", result)

      // Update state with response data
      const updatedUser = result.user
      setUserData(updatedUser)
      
      setFormData({
        fullName: updatedUser.fullName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        department: updatedUser.department || "",
        hostelBlock: updatedUser.hostelBlock || "",
        roomNumber: updatedUser.roomNumber || "",
      })

      setIsEditing(false)

      toast({
        title: "Success!",
        description: "Your student profile has been updated successfully.",
      })
    } catch (err) {
      console.error(" Student Profile: Save error:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update student profile.",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    if (!userData) return
    
    setFormData({
      fullName: userData.fullName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      department: userData.department || "",
      hostelBlock: userData.hostelBlock || "",
      roomNumber: userData.roomNumber || "",
    })
    setIsEditing(false)
  }

  // Loading state
  if (loading) {
    return (
      <DashboardLayout userType="student">
        {/* Your existing skeleton loading */}
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-48" />
          {/* Add more skeleton content */}
        </div>
      </DashboardLayout>
    )
  }

  // Error state
  if (error || !userData) {
    return (
      <DashboardLayout userType="student">
        <div className="p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Failed to Load Profile</h3>
                <p className="text-muted-foreground mb-4">{error || "Profile not found"}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  // 🎯 MAIN RETURN - NO ProtectedRoute wrapper
  return (
    <DashboardLayout userType="student">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
            <p className="text-muted-foreground">View and manage your profile information</p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancelEdit} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Your existing profile content with student-specific fields */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card with student info */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.fullName} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(userData.fullName || "User")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{userData.fullName}</CardTitle>
              <CardDescription>{userData.role}</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {userData.department || "No Department"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              {userData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.hostelBlock || "No Hostel"} - {userData.roomNumber || "No Room"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Student ID: {userData.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined: {formatDate(userData.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Rest of your student profile form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hostelBlock">Hostel Block</Label>
                        <Input
                          id="hostelBlock"
                          value={formData.hostelBlock || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roomNumber">Room Number</Label>
                        <Input
                          id="roomNumber"
                          value={formData.roomNumber || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Security settings coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
