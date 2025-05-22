"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Bell,
  ChevronDown,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./ui/Logo"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "student" | "staff" | "admin"
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const studentNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "My Complaints",
      href: "/dashboard/student/complaints",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "New Complaint",
      href: "/dashboard/student/new-complaint",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/student/profile",
      icon: <User className="h-5 w-5" />,
    },
  ]

  const staffNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/staff",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "All Complaints",
      href: "/dashboard/staff/complaints",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/staff/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Students",
      href: "/dashboard/staff/students",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  const navItems = userType === "student" ? studentNavItems : staffNavItems

  const isActive = (path: string) => {
    return pathname === path
  }

  const router = useRouter()

const handleLogout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    })

    if (res.ok) {
      router.push("/") // or "/login", depending on your app
    } else {
      console.error("Logout failed")
    }
  } catch (err) {
    console.error("Logout error:", err)
  }
}

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Logo className=" w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-900">Complaint System</h2>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive(item.href) ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
            <Button onClick={handleLogout} variant="outline" className="w-full justify-start" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
        </div>
      </aside>

      {/* Mobile header and content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* <div className="p-6 border-b">
                  <Logo className="block w-8 h-8" />
                  <h2 className="text-2xl font-bold text-gray-900">Complaint System</h2>
                </div> */}
                <div className="pl-1 p-6 border-b flex items-center gap-3">
                  <Logo className="w-8 h-8" />
                  <h2 className="text-2xl font-bold text-gray-900">Complaint System</h2>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                        isActive(item.href) ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <Button onClick={handleLogout} variant="outline" className="w-full justify-start" size="sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>{userType === "student" ? "JS" : "ST"}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{userType === "student" ? "John Smith" : "Staff Member"}</p>
                    <p className="text-xs text-gray-500 capitalize">{userType}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/dashboard/${userType}/profile`}>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                
                  <DropdownMenuItem onClick={handleLogout}>
                    {/* <Link href="/logout"> */}
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
