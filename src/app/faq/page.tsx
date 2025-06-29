"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/Logo"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Clock,
  Shield,
  User,
  Settings,
  Bell,
  FileText,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Menu
} from "lucide-react"
import { useState } from "react"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <User className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on 'Register' on the homepage or navigation menu. You'll need to provide your full name, email address, student ID (for students), hostel block, room number, and create a secure password. Staff members don't need to provide hostel information."
        },
        {
          question: "What information do I need to register?",
          answer: "Students need: Full name, email address, student ID, hostel block, room number, and phone number. Staff/Admin users need: Full name, email address, and phone number. All users must create a secure password."
        },
        {
          question: "Can I register if I'm not a student?",
          answer: "Yes! The system supports both students and staff/admin users. During registration, select 'Admin' as your account type if you're a staff member or administrator."
        },
        {
          question: "What if I forget my password?",
          answer: "Currently, password reset functionality is being implemented. For now, please contact the system administrator or hostel management for password assistance."
        }
      ]
    },
    {
      title: "Submitting Complaints",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
      questions: [
        {
          question: "How do I submit a complaint?",
          answer: "After logging in, go to your dashboard and click 'Submit New Complaint'. Fill in the complaint title, select a category (plumbing, electrical, furniture, etc.), describe the issue in detail, set priority level, and submit. You'll receive a confirmation and tracking number."
        },
        {
          question: "What types of complaints can I submit?",
          answer: "You can submit complaints about: Plumbing issues, Electrical problems, Furniture damage, Cleanliness concerns, Security issues, Internet/Wi-Fi problems, Noise complaints, Maintenance requests, and other hostel-related issues."
        },
        {
          question: "How detailed should my complaint description be?",
          answer: "Be as specific as possible. Include: Exact location (room number, floor, area), when the problem occurred, what happened, any safety concerns, and steps you've already taken. More details help staff resolve issues faster."
        },
        {
          question: "Can I attach photos to my complaint?",
          answer: "Photo attachment functionality is currently being developed. For now, provide detailed descriptions. You can mention in your complaint that photos are available if needed."
        },
        {
          question: "What priority levels are available?",
          answer: "Priority levels are: LOW (cosmetic issues), MEDIUM (inconvenient but not urgent), HIGH (affects daily activities), and URGENT (safety hazards or critical issues requiring immediate attention)."
        }
      ]
    },
    {
      title: "Tracking & Status",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-600",
      questions: [
        {
          question: "How do I track my complaint status?",
          answer: "In your dashboard, you'll see all your complaints with their current status: PENDING (awaiting review), IN_PROGRESS (being worked on), RESOLVED (completed), or REJECTED (not actionable). Click on any complaint to see detailed progress."
        },
        {
          question: "What do the different status meanings mean?",
          answer: "PENDING: Your complaint has been received and is awaiting staff review. IN_PROGRESS: Staff is actively working on resolving your issue. RESOLVED: The issue has been fixed and is considered complete. REJECTED: The complaint cannot be processed (usually with explanation)."
        },
        {
          question: "How long does it take to resolve complaints?",
          answer: "Resolution time varies by priority and complexity: URGENT (same day), HIGH (1-3 days), MEDIUM (3-7 days), LOW (1-2 weeks). Complex issues may take longer, but you'll receive regular updates."
        },
        {
          question: "Will I be notified of status changes?",
          answer: "Yes! You'll receive notifications when: Your complaint status changes, staff adds comments or requests more information, your complaint is assigned to a technician, and when it's resolved."
        }
      ]
    },
    {
      title: "Notifications & Communication",
      icon: <Bell className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
      questions: [
        {
          question: "How will I receive notifications?",
          answer: "You'll receive notifications through: In-app notifications (when you log in), email notifications (to your registered email), and dashboard alerts. Make sure your email address is correct and check your spam folder."
        },
        {
          question: "Can I communicate with maintenance staff?",
          answer: "Yes! When staff members update your complaint, they can add comments or ask questions. You'll be notified and can respond through the complaint details page. This ensures clear communication throughout the resolution process."
        },
        {
          question: "What if I need to add more information to my complaint?",
          answer: "You can add additional information by commenting on your complaint through the complaint details page. Staff will be notified of your update and can use the new information to better address your issue."
        },
        {
          question: "Can I cancel or modify a complaint after submission?",
          answer: "You cannot directly cancel complaints, but you can add comments explaining if the issue is resolved or if you want to withdraw the complaint. Staff can then update the status accordingly."
        }
      ]
    },
    {
      title: "Account & Privacy",
      icon: <Shield className="w-5 h-5" />,
      color: "bg-red-100 text-red-600",
      questions: [
        {
          question: "Is my personal information secure?",
          answer: "Yes! Your data is protected with encryption, secure authentication, and access controls. Only authorized staff can view complaint details, and your personal information is never shared with unauthorized parties."
        },
        {
          question: "Who can see my complaints?",
          answer: "Only you and authorized hostel staff/administrators can view your complaints. The system maintains privacy while ensuring appropriate staff can address your issues effectively."
        },
        {
          question: "Can I update my profile information?",
          answer: "Yes! You can update your profile information including your name, email, phone number, and room number (for students) through the profile settings in your dashboard."
        },
        {
          question: "How do I change my password?",
          answer: "You can change your password in your profile settings. Go to Dashboard > Profile > Security Settings. You'll need to enter your current password and choose a new secure password."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-gray-100 text-gray-600",
      questions: [
        {
          question: "What if I can't log into my account?",
          answer: "Check that you're using the correct email and password. Ensure Caps Lock is off and try clearing your browser cache. If problems persist, contact technical support or hostel administration."
        },
        {
          question: "The website isn't working properly. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or using a different browser. Ensure you have a stable internet connection. If issues continue, report the technical problem to support."
        },
        {
          question: "Can I use the system on my mobile phone?",
          answer: "Yes! The system is fully responsive and works on mobile phones, tablets, and computers. Use any modern web browser to access your account and manage complaints on the go."
        },
        {
          question: "What browsers are supported?",
          answer: "The system works with all modern browsers including Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version for the best experience."
        }
      ]
    }
  ]

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
                <span className="text-lg font-medium text-blue-600 tracking-wide uppercase transition-all duration-300 group-hover:text-purple-600 group-hover:tracking-wider">Frequently Asked Questions</span>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:w-32 group-hover:h-1.5 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Get Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Questions Answered</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Find answers to common questions about using the LASU Hostel Complaint Management System. 
                Can't find what you're looking for? Contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-3 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <HelpCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
                  <p className="text-slate-600">Common Questions Covered</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                  <p className="text-slate-600">System Availability</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg text-center">
                <CardContent className="pt-6">
                  <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Fast</h3>
                  <p className="text-slate-600">Response Times</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-2xl text-gray-900">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => {
                        const itemIndex = categoryIndex * 100 + faqIndex // Unique index
                        const isOpen = openItems.includes(itemIndex)
                        
                        return (
                          <div key={faqIndex} className={`border rounded-lg transition-all duration-200 ${isOpen ? 'border-blue-200/50 bg-blue-50/30' : 'border-slate-200'}`}>
                            <button
                              className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors rounded-lg"
                              onClick={() => toggleItem(itemIndex)}
                            >
                              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                              )}
                            </button>
                            {isOpen && (
                              <div className="px-4 pb-4">
                                <div className="pt-2 border-t border-slate-200/50">
                                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <AlertCircle className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
                  <p className="text-lg text-slate-600 mb-8">
                    Can't find the answer you're looking for? Our support team is here to help you.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                    <CardContent className="p-6 text-center">
                      <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                      <p className="text-sm text-slate-600 mb-4">Get help via email within 24 hours</p>
                      <Button variant="outline" size="sm" className="w-full">
                        mailsupport@lasu.edu.ng
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50">
                    <CardContent className="p-6 text-center">
                      <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                        <Phone className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                      <p className="text-sm text-slate-600 mb-4">Call us during business hours</p>
                      <Button variant="outline" size="sm" className="w-full">
                         +234 815 9109 065
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-2">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
