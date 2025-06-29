"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/Logo"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { 
  ArrowLeft, 
  Users, 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Zap,
  Building,
  GraduationCap,
  Settings,
  BarChart3,
  MessageSquare,
  Bell,
  Star,
  Target,
  Award,
  Lightbulb,
  Menu
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-slate-100/15 to-blue-100/15 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <h1 className="text-xl font-bold text-gray-900">LASU Hostel System</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="md:block hidden">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register" className="md:block hidden">
                <Button size="sm">Register</Button>
              </Link>
            </div>

            {/* Mobile Menu - Hidden Auth Buttons */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 p-0">
                  <SheetHeader className="flex flex-row items-center justify-between p-4 border-b space-y-0">
                    <div className="flex items-center gap-2">
                      <Logo className="w-6 h-6" />
                      <SheetTitle className="text-lg font-bold text-gray-900">Menu</SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col h-full">
                    <div className="flex flex-col gap-3 p-6">                      
                      <SheetClose asChild>
                        <Link href="/login">
                          <Button variant="outline" className="w-full justify-center">
                            Login
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/register">
                          <Button className="w-full justify-center">
                            Register
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>

                    <div className="mt-auto p-4 border-t bg-gray-50">
                      <p className="text-sm text-gray-600 text-center">
                        Lagos State University
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div className="mb-6 group cursor-pointer">
                <span className="text-lg font-medium text-blue-600 tracking-wide uppercase transition-all duration-300 group-hover:text-purple-600 group-hover:tracking-wider">About Our System</span>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:w-32 group-hover:h-1.5 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Revolutionizing 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Hostel Management</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                A comprehensive digital solution designed to streamline complaint management, 
                enhance student satisfaction, and improve operational efficiency at Lagos State University hostels.
              </p>
            </div>
          </div>
        </section>

        {/* What is This System */}
        <section className="py-2 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is the LASU Hostel Complaint System?</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our system is a modern, web-based platform that digitizes and streamlines the entire complaint management process in university hostels.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ClipboardList className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Traditional Problem</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Paper-based complaint submissions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      No tracking system for complaints
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Delayed response times
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Poor communication between parties
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Lack of accountability and transparency
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200/50 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-800">Our Solution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Digital complaint submission system
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Real-time status tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Automated notifications and updates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Streamlined communication channels
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Complete transparency and accountability
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits for Everyone</h2>
              <p className="text-lg text-slate-600">
                Our system creates value for all stakeholders in the university hostel ecosystem.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* For Students */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-blue-800">For Students</CardTitle>
                      <CardDescription>Enhanced hostel living experience</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Easy Complaint Submission</h4>
                      <p className="text-sm text-slate-600">Submit complaints anytime, anywhere with our user-friendly interface</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Tracking</h4>
                      <p className="text-sm text-slate-600">Monitor the progress of your complaints from submission to resolution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Instant Notifications</h4>
                      <p className="text-sm text-slate-600">Get updates via email and in-app notifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Direct Communication</h4>
                      <p className="text-sm text-slate-600">Communicate directly with maintenance staff and administrators</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Hostel Staff */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Settings className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-green-800">For Hostel Staff</CardTitle>
                      <CardDescription>Streamlined operations management</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Efficient Task Management</h4>
                      <p className="text-sm text-slate-600">Organize and prioritize complaints based on urgency and type</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Performance Tracking</h4>
                      <p className="text-sm text-slate-600">Monitor response times and resolution rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Team Collaboration</h4>
                      <p className="text-sm text-slate-600">Assign tasks and collaborate with team members</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
                      <p className="text-sm text-slate-600">Ensure consistent service quality and student satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Administration */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Building className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-purple-800">For Administration</CardTitle>
                      <CardDescription>Data-driven decision making</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Analytics & Reports</h4>
                      <p className="text-sm text-slate-600">Access comprehensive reports and analytics dashboards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Compliance Monitoring</h4>
                      <p className="text-sm text-slate-600">Ensure compliance with university policies and standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Resource Optimization</h4>
                      <p className="text-sm text-slate-600">Optimize resource allocation based on complaint patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Strategic Insights</h4>
                      <p className="text-sm text-slate-600">Gain insights for long-term hostel improvement strategies</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-lg text-slate-600">
                Built with modern technology to ensure reliability, security, and ease of use.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <ClipboardList className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Categories</h3>
                  <p className="text-sm text-slate-600">
                    Automatically categorize complaints for faster resolution
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Priority System</h3>
                  <p className="text-sm text-slate-600">
                    Intelligent priority assignment based on complaint type
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                    <Bell className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Alerts</h3>
                  <p className="text-sm text-slate-600">
                    Instant notifications for all stakeholders
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-sm text-slate-600">
                    Comprehensive reporting and insights
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expected Impact</h2>
            <p className="text-xl text-blue-100 mb-12">
              Projected improvements with the implementation of our system
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">75%</div>
                <p className="text-blue-100">Faster Resolution Time</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">90%</div>
                <p className="text-blue-100">Student Satisfaction</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">60%</div>
                <p className="text-blue-100">Reduced Paperwork</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
                <p className="text-blue-100">Transparency</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Join thousands of students and staff who are already benefiting from our streamlined complaint management system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg border-2">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Logo className="w-6 h-6" />
            <h3 className="text-lg font-bold">LASU Hostel Complaint System</h3>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Lagos State University Hostel Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
