"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
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
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,  // ADD THIS
  SheetHeader   // ADD THIS
} from "@/components/ui/sheet"
import { Logo } from "./ui/Logo"
import NotificationBell from "@/components/ui/notification-bell"
import StaffNotificationBell from "@/components/ui/staff-notification-bell"

// ADD THE ICON WRAPPER COMPONENT
interface IconWrapperProps {
  children: React.ReactNode
  className?: string
}

function IconWrapper({ children, className }: IconWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Remove any injected attributes from browser extensions
    if (ref.current) {
      const svgs = ref.current.querySelectorAll('svg')
      svgs.forEach(svg => {
        // Remove Dark Reader attributes
        svg.removeAttribute('data-darkreader-inline-stroke')
        svg.removeAttribute('data-darkreader-inline-fill')
        svg.style.removeProperty('--darkreader-inline-stroke')
        svg.style.removeProperty('--darkreader-inline-fill')
      })
    }
  })

  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {children}
    </div>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "student" | "staff" | "admin"
}

interface UserData {
  id: string
  fullName: string
  email: string
  role: string
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // ADD MOUNTED STATE
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const verifyDashboardAccessAndFetchUser = async () => {
      try {
        setIsLoading(true)
        console.log("DashboardLayout: Verifying access and fetching user data")

        const response = await fetch("/api/auth/check-role", {
          credentials: "include",
          cache: "no-store",
        })

        if (!response.ok) {
          console.log("DashboardLayout: Authentication failed - redirecting to login")
          router.push("/login")
          return
        }

        const data = await response.json()
        
        if (!data.user || !data.user.fullName || !data.user.role) {
          console.error("Incomplete user data received:", data.user)
          router.push("/login")
          return
        }

        console.log("DashboardLayout: Auth check successful -", data.user.fullName, "Role:", data.user.role)

        // Check if user is on correct dashboard type
        if (userType === "student" && data.user.role !== "STUDENT") {
          console.log(`🔄 Student dashboard accessed by ${data.user.role} - redirecting to staff dashboard`)
          router.push("/dashboard/staff")
          return
        }

        if (userType === "staff" && !["STAFF", "ADMIN"].includes(data.user.role)) {
          console.log(`🔄 Staff dashboard accessed by ${data.user.role} - redirecting to student dashboard`)
          router.push("/dashboard/student")
          return
        }

        console.log("DashboardLayout: User authorized for", userType, "dashboard")
        setUserData(data.user)
      } catch (error) {
        console.error("DashboardLayout: Access verification failed:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    verifyDashboardAccessAndFetchUser()
  }, [userType, router, mounted])

  const getInitials = (fullName: string | undefined | null): string => {
    if (!fullName || typeof fullName !== 'string') {
      return "?"
    }
    
    const names = fullName.trim().split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return names[0][0]?.toUpperCase() || "?"
  }

  // DON'T RENDER UNTIL MOUNTED
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-100">
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 md:p-6">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse md:hidden"></div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 md:p-6">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse md:hidden"></div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  const studentNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: <IconWrapper><Home className="h-5 w-5" /></IconWrapper>,
    },
    {
      title: "My Complaints",
      href: "/dashboard/student/complaints",
      icon: <IconWrapper><ClipboardList className="h-5 w-5" /></IconWrapper>,
    },
    {
      title: "New Complaint",
      href: "/dashboard/student/new-complaint",
      icon: <IconWrapper><MessageSquare className="h-5 w-5" /></IconWrapper>,
    },
    {
      title: "Profile",
      href: "/dashboard/student/profile",
      icon: <IconWrapper><User className="h-5 w-5" /></IconWrapper>,
    },
  ]

  const staffNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/staff",
      icon: <IconWrapper><Home className="h-5 w-5" /></IconWrapper>,
    },
    {
      title: "All Complaints",
      href: "/dashboard/staff/complaints",
      icon: <IconWrapper><ClipboardList className="h-5 w-5" /></IconWrapper>,
    },
    {
      title: "Analytics",
      href: "/dashboard/staff/analytics",
      icon: <IconWrapper><BarChart3 className="h-5 w-5" /></IconWrapper>,
    },
    {
      title: "Students",
      href: "/dashboard/staff/students",
      icon: <IconWrapper><Users className="h-5 w-5" /></IconWrapper>,
    },
  ]

  const navItems = userType === "student" ? studentNavItems : staffNavItems

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (res.ok) {
        router.push("/login")
      } else {
        console.error("Logout failed")
      }
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100" suppressHydrationWarning>
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-between p-4">
          <IconWrapper>
            <Logo className="w-8 h-8" />
          </IconWrapper>
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
            <IconWrapper>
              <LogOut className="h-4 w-4 mr-2" />
            </IconWrapper>
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
                  <IconWrapper>
                    <Menu className="h-6 w-6" />
                  </IconWrapper>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                {/* ADD THIS: Proper DialogTitle for accessibility */}
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                
                <div className="pl-1 p-6 border-b flex items-center gap-3">
                  <IconWrapper>
                    <Logo className="w-8 h-8" />
                  </IconWrapper>
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
                    <IconWrapper>
                      <LogOut className="h-4 w-4 mr-2" />
                    </IconWrapper>
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bells */}
            {userType === "student" && userData && (
              <NotificationBell userId={userData.id} />
            )}
            
            {userType === "staff" && userData && (
              <StaffNotificationBell userId={userData.id} />
            )}

            {/* User avatar dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src="/placeholder.svg?height=32&width=32" 
                      alt={userData.fullName} 
                    />
                    <AvatarFallback className="text-sm font-medium">
                      {getInitials(userData.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData.fullName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/dashboard/${userType}/profile`}>
                  <DropdownMenuItem>
                    <IconWrapper>
                      <User className="h-4 w-4 mr-2" />
                    </IconWrapper>
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <IconWrapper>
                    <LogOut className="h-4 w-4 mr-2" />
                  </IconWrapper>
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
