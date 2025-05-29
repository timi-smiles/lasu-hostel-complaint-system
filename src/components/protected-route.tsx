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
        console.log("🔍 ProtectedRoute: Checking authorization...")
        
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (!response.ok) {
          if (response.status === 401) {
            console.log("❌ Unauthorized - redirecting to login")
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        console.log("📊 ProtectedRoute: User role:", data.user.role)
        console.log("📊 ProtectedRoute: Allowed roles:", allowedRoles)

        if (allowedRoles.includes(data.user.role)) {
          console.log("✅ User authorized")
          setIsAuthorized(true)
        } else {
          console.log("❌ User not authorized")
          
          // Smart redirect based on actual user role
          let smartRedirect = redirectTo
          if (data.user.role === "STUDENT") {
            smartRedirect = "/dashboard/student"
          } else if (data.user.role === "STAFF" || data.user.role === "ADMIN") {
            smartRedirect = "/dashboard/staff"
          }
          
          router.push(smartRedirect)
          setIsAuthorized(false)
        }
      } catch (error) {
        console.error("❌ Authorization check failed:", error)
        router.push("/login")
        setIsAuthorized(false)
      } finally {
        setHasChecked(true)
      }
    }

    checkAuthorization()
  }, [router, allowedRoles, redirectTo, hasChecked])

  // Still loading
  if (isAuthorized === null || !hasChecked) {
    return null // Silent loading
  }

  // Not authorized
  if (!isAuthorized) {
    return null
  }

  // Authorized
  return <>{children}</>
}