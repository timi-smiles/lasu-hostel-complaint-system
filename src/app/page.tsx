"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/Logo"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Complaint System</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header - Remove the close button */}
                  <div className="flex items-center p-4 border-b">
                    <div className="flex items-center gap-2">
                      <Logo className="w-6 h-6" />
                      <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                    </div>
                    {/* Remove this entire SheetClose section */}
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex flex-col gap-4 p-6">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center">
                        Register
                      </Button>
                    </Link>
                  </div>

                  {/* Mobile Menu Footer */}
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
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <section className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Lagos State University Hostel Complaint Management System
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            A streamlined platform for students to report ongoing issues in the hostel and for staffs and administration to efficiently manage and resolve them.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto px-6 md:px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 md:px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Submit Complaints</CardTitle>
              <CardDescription>Report issues with your hostel facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Easily submit complaints about plumbing, electrical issues, furniture, cleanliness, or any other
                hostel-related problems.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full">Submit a Complaint</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Status</CardTitle>
              <CardDescription>Monitor the progress of your complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Keep track of all your submitted complaints and their current status - pending, in progress, or
                resolved.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button className="w-full" variant="outline">
                  View My Complaints
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Updates</CardTitle>
              <CardDescription>Receive notifications on complaint progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get timely updates when your complaint status changes or when staff leaves comments requesting more
                information.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button className="w-full" variant="outline">
                  Create Account
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>

        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg md:text-2xl font-bold text-green-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Register & Login</h4>
              <p className="text-gray-600 text-sm md:text-base">Create an account with your student ID and login credentials</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg md:text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Submit Complaint</h4>
              <p className="text-gray-600 text-sm md:text-base">Fill out the complaint form with details about the issue</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg md:text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Track Resolution</h4>
              <p className="text-gray-600 text-sm md:text-base">Monitor updates and resolution status in your dashboard</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-lg md:text-xl font-bold">Hostel Complaint System</h2>
              <p className="text-gray-400 text-sm md:text-base">Making hostel life better in Lagos State University</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center text-gray-400">
            <p className="text-xs md:text-sm">
              © {new Date().getFullYear()} Lagos State University Hostel Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
