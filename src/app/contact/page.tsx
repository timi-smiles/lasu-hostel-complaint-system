"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/Logo"
import { 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Shield,
  User,
  Building,
  CheckCircle,
  Menu
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully! 📧",
        description: "Thank you for contacting us. We'll get back to you within 24-48 hours.",
        className: "bg-green-50 border-green-200 text-green-800",
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: ""
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us an email anytime",
      contact: "mailsupport@lasu.edu.ng",
      action: "mailto:mailsupport@lasu.edu.ng",
      color: "bg-blue-100 text-blue-600",
      availability: "Response within 24-48 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Call us during business hours",
      contact: "+234 815 9109 065",
      action: "tel:+2348159109065",
      color: "bg-green-100 text-green-600",
      availability: "Mon - Fri: 8:00 AM - 5:00 PM"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come to our physical location",
      contact: "Lagos State University, Ojo, Lagos, Nigeria",
      action: "https://maps.google.com/?q=Lagos+State+University+Ojo+Lagos+Nigeria",
      color: "bg-purple-100 text-purple-600",
      availability: "Mon - Fri: 8:00 AM - 4:00 PM"
    }
  ]

  const supportCategories = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Account Issues",
      description: "Login problems, password reset, profile updates"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Complaint Support",
      description: "Help with submitting or tracking complaints"
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "General Questions",
      description: "Questions about how the system works"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Technical Issues",
      description: "Website bugs, loading problems, errors"
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
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register">
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
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div className="mb-6 group cursor-pointer">
                <span className="text-lg font-medium text-blue-600 tracking-wide uppercase transition-all duration-300 group-hover:text-purple-600 group-hover:tracking-wider">Contact Us</span>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full transition-all duration-500 group-hover:w-32 group-hover:h-1.5 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Get In
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Touch</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Have questions about the LASU Hostel Complaint System? Need help with your account or submitting complaints? 
                We're here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-3 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
              <p className="text-lg text-slate-600">
                Choose the method that works best for you. We're committed to providing excellent support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`p-4 rounded-full w-fit mx-auto mb-6 ${method.color}`}>
                      {method.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-slate-600 mb-4">{method.description}</p>
                    <div className="mb-4">
                      <a 
                        href={method.action}
                        className="text-blue-600 hover:text-blue-700 font-semibold break-all"
                        target={method.action.startsWith('http') ? '_blank' : undefined}
                        rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {method.contact}
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{method.availability}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Support Categories */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl">
            <div className="grid xl:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="order-2 xl:order-1">
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl lg:text-2xl text-gray-900 flex flex-col sm:flex-row sm:items-center gap-2">
                      <Send className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription className="text-sm lg:text-base text-slate-600">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
                      {/* Name and Email Row */}
                      <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="h-11 lg:h-12 bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-11 lg:h-12 bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                            required
                          />
                        </div>
                      </div>

                      {/* Category Selection */}
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-semibold text-slate-700">
                          Category *
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)} required>
                          <SelectTrigger className="h-11 lg:h-12 bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="account">Account Issues</SelectItem>
                            <SelectItem value="complaint">Complaint Support</SelectItem>
                            <SelectItem value="general">General Questions</SelectItem>
                            <SelectItem value="technical">Technical Issues</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold text-slate-700">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Brief summary of your message"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="h-11 lg:h-12 bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-semibold text-slate-700">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Describe your question or issue in detail..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="min-h-[100px] lg:min-h-[120px] bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none transition-colors"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        className="w-full h-11 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:translate-y-[-1px]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-sm lg:text-base">Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Send className="w-4 h-4" />
                            <span className="text-sm lg:text-base">Send Message</span>
                          </div>
                        )}
                      </Button>

                      {/* Form Footer */}
                      <div className="pt-2 border-t border-slate-200/50">
                        <p className="text-xs text-slate-500 text-center">
                          * Required fields. We'll respond within 24-48 hours.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Support Categories */}
              <div className="order-1 xl:order-2 space-y-6 lg:space-y-8">
                <div className="text-center xl:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">What can we help you with?</h2>
                  <p className="text-base lg:text-lg text-slate-600 mb-6 lg:mb-8">
                    Our support team is experienced in handling various types of inquiries. Here are the most common areas we can assist you with:
                  </p>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  {supportCategories.map((category, index) => (
                    <Card key={index} className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex items-start gap-3 lg:gap-4">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                            {category.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{category.title}</h3>
                            <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">{category.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Links */}
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200/50 shadow-lg">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-green-600 mx-auto mb-3 lg:mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Looking for quick answers?</h3>
                    <p className="text-xs lg:text-sm text-slate-600 mb-3 lg:mb-4">
                      Check out our FAQ section for instant answers to common questions.
                    </p>
                    <Link href="/faq">
                      <Button variant="outline" size="sm" className="w-full h-9 lg:h-10 text-xs lg:text-sm">
                        Visit FAQ
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Contact Info Card for Mobile */}
                <Card className="xl:hidden bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50 shadow-lg">
                  <CardContent className="p-4 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-center">Need immediate assistance?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href="mailto:mailsupport@lasu.edu.ng" className="text-blue-600 hover:text-blue-700">
                          mailsupport@lasu.edu.ng
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a href="tel:+2348159109065" className="text-green-600 hover:text-green-700">
                          +234 815 9109 065
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* University Info */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Building className="w-8 h-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Lagos State University</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  The LASU Hostel Complaint Management System is an official platform designed to improve 
                  the quality of student accommodation and enhance the overall university experience.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-sm text-slate-600">Providing efficient complaint resolution for better hostel living conditions</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Our Commitment</h3>
                    <p className="text-sm text-slate-600">24/7 system availability with responsive support team</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Our Goal</h3>
                    <p className="text-sm text-slate-600">Creating a transparent and accountable hostel management system</p>
                  </div>
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
