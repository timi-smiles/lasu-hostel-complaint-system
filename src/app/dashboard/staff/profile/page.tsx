"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, Building, Calendar, Shield, Lock, Upload, Edit, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

// Types
interface StaffProfile {
  id: string
  email: string
  fullName: string
  role: string
  status: string
  phone?: string
  createdAt: string
  updatedAt?: string
  lastLogin?: string
}

export default function StaffProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userData, setUserData] = useState<StaffProfile | null>(null)
  const [formData, setFormData] = useState<Partial<StaffProfile>>({})
  const [error, setError] = useState<string | null>(null)

  // Helper function for safe date formatting
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

  // Helper function to generate initials
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("")
      .toUpperCase()
  }

  useEffect(() => {
    const verifyAccessAndFetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log("Staff Profile: Checking role authorization")
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

        if (!["STAFF", "ADMIN"].includes(roleData.user.role)) {
          console.log(` Access denied. User role: ${roleData.user.role} - redirecting to student profile`)
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access staff profiles.",
          })
          router.push(roleData.paths.profile || "/dashboard/student/profile")
          return
        }

        console.log(" Staff access verified - fetching profile from /api/staff/profile")
        
        const profileResponse = await fetch("/api/staff/profile", {
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
              description: "You don't have permission to access staff profiles.",
            })
            router.push(errorData.redirectTo || "/dashboard/student/profile")
            return
          }
          throw new Error("Failed to fetch staff profile")
        }

        const profileData = await profileResponse.json()
        console.log(" Staff Profile: Successfully fetched:", profileData.user.fullName)
        
        setUserData(profileData.user)
        
        // Initialize form data (removed department)
        setFormData({
          fullName: profileData.user.fullName || "",
          email: profileData.user.email || "",
          phone: profileData.user.phone || "",
        })

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        console.error(" Staff Profile Error:", err)
        setError(errorMessage)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load staff profile. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    verifyAccessAndFetchProfile()
  }, [router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSaveProfile = async () => {
    if (!userData) return

    setSaving(true)
    try {
      console.log("💾 Staff Profile: Saving to /api/staff/profile")

      const response = await fetch("/api/staff/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          // Removed department from save payload
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update staff profile")
      }

      const result = await response.json()
      console.log(" Staff Profile: Update successful:", result)

      const updatedUser = result.user
      setUserData(updatedUser)
      
      setFormData({
        fullName: updatedUser.fullName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        // Removed department from form data
      })

      setIsEditing(false)

      toast({
        title: "Success!",
        description: "Your staff profile has been updated successfully.",
      })
    } catch (err) {
      console.error(" Staff Profile: Save error:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update staff profile.",
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
      // Removed department reset
    })
    setIsEditing(false)
  }

  if (loading) {
    return (
      <DashboardLayout userType="staff">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !userData) {
    return (
      <DashboardLayout userType="staff">
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

  return (
      <DashboardLayout userType="staff">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Profile</h1>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
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
                <div className="mt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {"ADMIN"}
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
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ADMIN ID: {userData.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined: {formatDate(userData.createdAt)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/staff")}>
                  View Dashboard
                </Button>
                {isEditing && (
                  <Button variant="secondary" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
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
                            disabled // Email should not be editable
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
                        {/* ✅ REMOVED: Department field completely */}
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" value={"ADMIN"} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="createdAt">Join Date</Label>
                          <Input
                            id="createdAt"
                            value={formatDate(userData.createdAt)}
                            disabled
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Your account details and status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>ADMIN ID</Label>
                          <Input value={userData.id} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Status</Label>
                          <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                            <Badge
                              variant="outline"
                              className={`${
                                userData.status === "ACTIVE"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              {userData.status === "ACTIVE" ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Last Login</Label>
                          <Input
                            value={userData.lastLogin ? formatDate(userData.lastLogin, true) : "Never"}
                            disabled
                            className="text-muted-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Input value={"ADMIN"} disabled />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Actions</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline">Export My Data</Button>
                        <Button variant="outline" onClick={() => router.push('/change-password')}>
                          <Lock className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                        <Button variant="destructive">Deactivate Account</Button>
                      </div>
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
