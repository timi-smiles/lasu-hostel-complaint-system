import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: string[]
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles, 
  redirectTo = "/dashboard" 
}: ProtectedRouteProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null) // null = loading
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // Prevent multiple auth checks
    if (hasChecked) return

    const checkAuthorization = async () => {
      try {
        console.log("ProtectedRoute: Checking authorization...")
        
        //  Updated to use the new role check endpoint
        const response = await fetch("/api/auth/check-role", {
          credentials: "include",
        })

        if (!response.ok) {
          if (response.status === 401) {
            console.log(" Unauthorized - redirecting to login")
            toast({
              variant: "destructive",
              title: "Session Expired",
              description: "Please log in again to continue.",
            })
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        console.log(" ProtectedRoute: User role:", data.user.role)
        console.log(" ProtectedRoute: Allowed roles:", allowedRoles)

        if (allowedRoles.includes(data.user.role)) {
          console.log(" User authorized")
          setIsAuthorized(true)
        } else {
          console.log(" User not authorized")
          
          //  Use smart redirect paths from the API response
          const smartRedirect = data.paths?.dashboard || (() => {
            // Fallback logic if paths not provided
            if (data.user.role === "STUDENT") {
              return "/dashboard/student"
            } else if (data.user.role === "STAFF" || data.user.role === "ADMIN") {
              return "/dashboard/staff"
            }
            return redirectTo
          })()
          
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: `You don't have permission to access this page. Redirecting to your dashboard.`,
          })
          
          router.push(smartRedirect)
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error(" Authorization check failed:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to verify access. Please try logging in again.",
        })
        router.push("/login")
        setIsAuthorized(false)
      } finally {
        setHasChecked(true)
      }
    }

    checkAuthorization()
  }, [router, allowedRoles, redirectTo, hasChecked, toast])

  // Still loading
  if (isAuthorized === null || !hasChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Not authorized
  if (!isAuthorized) {
    return null
  }

  // Authorized
  return <>{children}</>
}