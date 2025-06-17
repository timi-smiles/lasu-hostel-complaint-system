"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Shield, GraduationCap, Users, Home, Phone, Hash, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [studentId, setStudentId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [hostelBlock, setHostelBlock] = useState("")
  const [roomNumber, setRoomNumber] = useState("")
  const [userType, setUserType] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    if (!acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      // FIX: Match the exact field names your backend expects
      const payload: any = {
        fullName,
        email,
        password,
        confirmPassword, // Backend requires this
        userType, // Backend expects 'userType', not 'role'
      }

      // Add student fields only if user is a student
      if (userType === "student") {
        payload.studentId = studentId
        payload.hostelBlock = hostelBlock
        payload.roomNumber = roomNumber
      }

      console.log("Sending registration data:", payload) // Debug log

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log("Server response:", data) // Debug log

      if (!res.ok) {
        throw new Error(data.error || "Registration failed")
      }

      alert("Registration successful! Please login.")
      router.push("/login")

    } catch (err: any) {
      console.error(" Registration error:", err)
      alert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      {/* Background decorations - Identical to login */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo/Header Section - Matching login */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Us Today</h1>
          <p className="text-gray-600">Create your LASU Hostel account</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-black/10">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Account Type Selection - Exact same style as login */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Account Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Student Card */}
                  <div
                    onClick={() => setUserType("student")}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      userType === "student"
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg shadow-green-500/20"
                        : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`p-2 rounded-lg ${
                        userType === "student" 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className={`font-semibold text-sm ${
                        userType === "student" ? "text-green-700" : "text-gray-700"
                      }`}>
                        Student
                      </span>
                      {userType === "student" && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Staff/Admin Card */}
                  <div
                    onClick={() => setUserType("staff")}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      userType === "staff"
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg shadow-blue-500/20"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`p-2 rounded-lg ${
                        userType === "staff" 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                      <span className={`font-semibold text-sm ${
                        userType === "staff" ? "text-blue-700" : "text-gray-700"
                      }`}>
                        Admin
                      </span>
                      {userType === "staff" && (
                        <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email Field - Same style as login */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Student ID Field (conditionally rendered) */}
              {userType === "student" && (
                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                  <Label htmlFor="studentId" className="text-sm font-semibold text-gray-700">
                    Student ID
                  </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Enter your student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-colors"
                      required
                    />
                  </div>
                </div>
              )}


              {/* Hostel Information (for students only) */}
              {userType === "student" && (
                <div className="space-y-4 animate-in slide-in-from-top duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Hostel Block */}
                    <div className="space-y-2">
                      <Label htmlFor="hostelBlock" className="text-sm font-semibold text-gray-700">
                        Hostel Block
                      </Label>
                      <Select value={hostelBlock} onValueChange={setHostelBlock} required>
                        <SelectTrigger className="h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20">
                          <SelectValue placeholder="Block" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Block A</SelectItem>
                          <SelectItem value="B">Block B</SelectItem>
                          <SelectItem value="C">Block C</SelectItem>
                          <SelectItem value="D">Block D</SelectItem>
                          <SelectItem value="E">Block E</SelectItem>
                          <SelectItem value="F">Block F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Room Number */}
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber" className="text-sm font-semibold text-gray-700">
                        Room Number
                      </Label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="roomNumber"
                          type="text"
                          placeholder="Room #"
                          value={roomNumber}
                          onChange={(e) => setRoomNumber(e.target.value)}
                          className="pl-11 h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Password Field - Same style as login */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-colors"
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 bg-gray-50/50 border-gray-200 focus:border-green-500 focus:ring-green-500/20 transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions - Beautiful custom checkbox */}
              <div className="space-y-3">
                <div 
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    acceptTerms
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg shadow-green-500/20"
                      : "border-gray-200 bg-gray-50/50 hover:border-green-300 hover:bg-green-50/50"
                  }`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                    acceptTerms
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 bg-white"
                  }`}>
                    {acceptTerms && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <Label className={`text-sm cursor-pointer ${
                      acceptTerms ? "text-green-700" : "text-gray-600"
                    }`}>
                      I agree to the{" "}
                      <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              {/* Register Button - Same style as login */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-green-500/25 transition-all duration-300 transform hover:translate-y-[-1px]" 
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <User className="w-4 h-4" />
                  </div>
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link 
                  href="/login" 
                  className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>

              {/* Divider - Same as login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Secure Registration</span>
                </div>
              </div>

              {/* Security Badge - Same as login */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Your information is encrypted and secure</span>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer - Same as login */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 LASU Hostel Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
