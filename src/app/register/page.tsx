"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    hostelBlock: "",
    roomNumber: "",
    password: "",
    confirmPassword: "",
    userType: "student",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, hostelBlock: value }))
  }

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   // In a real app, you would register with a backend
  //   // For demo purposes, we'll simulate registration
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     router.push("/login")
  //   }, 1500)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || "Registration failed")
      setIsLoading(false)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }


    alert("Registration successful")
    router.push("/login")
  } catch (error) {
    console.error("Registration error:", error)
    alert("Something went wrong")
    setIsLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to register for the complaint system
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                defaultValue="student"
                value={formData.userType}
                onValueChange={handleUserTypeChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="r-student" />
                  <Label htmlFor="r-student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="staff" id="r-staff" />
                  <Label htmlFor="r-staff">Staff</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.userType === "student" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    placeholder="e.g. STU12345"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hostelBlock">Hostel Block</Label>
                  <Select value={formData.hostelBlock} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hostel block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Block A</SelectItem>
                      <SelectItem value="B">Block B</SelectItem>
                      <SelectItem value="C">Block C</SelectItem>
                      <SelectItem value="D">Block D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input
                    id="roomNumber"
                    placeholder="e.g. 101"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full md:my-3" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:text-green-700">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
