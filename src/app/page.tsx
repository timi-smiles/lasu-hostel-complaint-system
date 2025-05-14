import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/Logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-1"> {/* Reduced gap */}
              <Logo/>
              <h1 className="text-2xl font-bold text-gray-900">Complaint System</h1>
            </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Lagos State University Hostel Complaint Management System</h2>
          <p className="text-xl text-gray-600 mb-8">
            A streamlined platform for students to report ongoing issues in the hostel and for staffs and administration to efficiently manage and resolve them.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
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

        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Register & Login</h4>
              <p className="text-gray-600">Create an account with your student ID and login credentials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Submit Complaint</h4>
              <p className="text-gray-600">Fill out the complaint form with details about the issue</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Track Resolution</h4>
              <p className="text-gray-600">Monitor updates and resolution status in your dashboard</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Hostel Complaint System</h2>
              <p className="text-gray-400">Making hostel life better in Lagos State University</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Lagos State University Hostel Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
