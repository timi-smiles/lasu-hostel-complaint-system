import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"

export default function NewComplaintLoading() {
  return (
    <DashboardLayout userType="student">
      <div className="p-6">
        {/* Page Title Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-8 w-64" />
        </div>

        {/* Form Card Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-80 mt-2" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Title Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Category Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Description Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-32 w-full" />
            </div>

            {/* Image Upload Field Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-3 w-64" />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}