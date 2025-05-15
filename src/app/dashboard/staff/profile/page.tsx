"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, Building, Calendar, Shield, Lock, Upload, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"

// Mock staff data
const mockStaffData = {
  id: "STF001",
  name: "Sarah Thompson",
  email: "sarah.thompson@unihostel.edu",
  phone: "+1 (555) 987-6543",
  department: "Hostel Management",
  role: "Senior Warden",
  joinDate: "2022-06-15",
  address: "123 University Avenue, Campus Housing, Building 4",
  city: "University City",
  state: "CA",
  zip: "90210",
  bio: "Experienced hostel administrator with over 8 years of experience in student accommodation management. Passionate about creating a safe and comfortable living environment for all students.",
  emergencyContact: {
    name: "Michael Thompson",
    relationship: "Spouse",
    phone: "+1 (555) 123-4567",
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    newComplaints: true,
    statusUpdates: true,
    systemAnnouncements: true,
  },
  accountStatus: "active",
  lastLogin: "2025-05-14T09:30:00",
  permissions: ["manage_complaints", "view_analytics", "manage_students", "edit_settings"],
}

export default function StaffProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [staffData, setStaffData] = useState(mockStaffData)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setStaffData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setStaffData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }))
  }

  const handleSaveProfile = () => {
    setIsSaving(true)
    // In a real app, you would save to a backend
    // For demo purposes, we'll simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and update the password
    // For demo purposes, we'll just reset the form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    // Show success message or notification
  }

  return (
    <DashboardLayout userType="staff">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and manage your profile information</p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
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
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={staffData.name} />
                  <AvatarFallback className="text-2xl">
                    {staffData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{staffData.name}</CardTitle>
              <CardDescription>{staffData.role}</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {staffData.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Staff ID: {staffData.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: {new Date(staffData.joinDate).toLocaleDateString()}</span>
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
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
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
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={staffData.name} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={staffData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={staffData.phone} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Select defaultValue={staffData.department}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hostel Management">Hostel Management</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                              <SelectItem value="Security">Security</SelectItem>
                              <SelectItem value="Administration">Administration</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input id="department" value={staffData.department} disabled />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        {isEditing ? (
                          <Select defaultValue={staffData.role}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Senior Warden">Senior Warden</SelectItem>
                              <SelectItem value="Warden">Warden</SelectItem>
                              <SelectItem value="Assistant Warden">Assistant Warden</SelectItem>
                              <SelectItem value="Maintenance Supervisor">Maintenance Supervisor</SelectItem>
                              <SelectItem value="Administrator">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input id="role" value={staffData.role} disabled />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="joinDate">Join Date</Label>
                        <Input
                          id="joinDate"
                          type="date"
                          value={staffData.joinDate}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={staffData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Your address and contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={staffData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value={staffData.city} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" value={staffData.state} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" value={staffData.zip} onChange={handleInputChange} disabled={!isEditing} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Who to contact in case of emergency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Name</Label>
                        <Input
                          id="emergencyName"
                          value={staffData.emergencyContact.name}
                          onChange={(e) =>
                            setStaffData((prev) => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, name: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelationship">Relationship</Label>
                        <Input
                          id="emergencyRelationship"
                          value={staffData.emergencyContact.relationship}
                          onChange={(e) =>
                            setStaffData((prev) => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, relationship: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={staffData.emergencyContact.phone}
                          onChange={(e) =>
                            setStaffData((prev) => ({
                              ...prev,
                              emergencyContact: { ...prev.emergencyContact, phone: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
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
                        <Label>Staff ID</Label>
                        <Input value={staffData.id} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Status</Label>
                        <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                          <Badge
                            variant="outline"
                            className={`${
                              staffData.accountStatus === "active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {staffData.accountStatus === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Last Login</Label>
                        <Input
                          value={new Date(staffData.lastLogin).toLocaleString()}
                          disabled
                          className="text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {staffData.permissions.map((permission) => (
                          <div
                            key={permission}
                            className="flex items-center p-2 rounded-md bg-gray-50 border border-gray-200"
                          >
                            <Shield className="h-4 w-4 mr-2 text-green-600" />
                            <span className="text-sm capitalize">{permission.replace(/_/g, " ")}</span>
                          </div>
                        ))}
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
                      <Button variant="outline">Request Time Off</Button>
                      <Button variant="outline">View Activity Log</Button>
                      <Button variant="destructive">Deactivate Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Channels</h3>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={staffData.notifications.email}
                            onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                          </div>
                          <Switch
                            checked={staffData.notifications.push}
                            onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                          </div>
                          <Switch
                            checked={staffData.notifications.sms}
                            onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Types</h3>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>New Complaints</Label>
                            <p className="text-sm text-muted-foreground">When a new complaint is submitted</p>
                          </div>
                          <Switch
                            checked={staffData.notifications.newComplaints}
                            onCheckedChange={(checked) => handleNotificationChange("newComplaints", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Status Updates</Label>
                            <p className="text-sm text-muted-foreground">When a complaint status changes</p>
                          </div>
                          <Switch
                            checked={staffData.notifications.statusUpdates}
                            onCheckedChange={(checked) => handleNotificationChange("statusUpdates", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>System Announcements</Label>
                            <p className="text-sm text-muted-foreground">Important system-wide announcements</p>
                          </div>
                          <Switch
                            checked={staffData.notifications.systemAnnouncements}
                            onCheckedChange={(checked) => handleNotificationChange("systemAnnouncements", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                      </div>
                      <Switch disabled={!isEditing} />
                    </div>
                    <Button variant="outline" disabled={!isEditing}>
                      <Lock className="h-4 w-4 mr-2" />
                      Set Up Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Login Sessions</CardTitle>
                    <CardDescription>Manage your active login sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome on Windows • {new Date().toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Previous Session</p>
                          <p className="text-sm text-muted-foreground">
                            Safari on iPhone • {new Date(Date.now() - 86400000).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          Expired
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Lock className="h-4 w-4 mr-2" />
                      Log Out All Other Sessions
                    </Button>
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
