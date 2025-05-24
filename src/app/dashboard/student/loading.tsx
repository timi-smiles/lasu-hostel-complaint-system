import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"

export default function StudentDashboardLoading() {
  return (
    <DashboardLayout userType="student">
      <div className="p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 mb-6 md:flex-row md:justify-between md:items-start md:space-y-0">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Stats Cards Loading - Colorful */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Total Complaints - Purple gradient */}
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-16 bg-white/20" />
            </CardContent>
          </Card>

          {/* Pending - Yellow */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-yellow-800">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-16 bg-yellow-200" />
            </CardContent>
          </Card>

          {/* Resolved - Green */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-16 bg-green-200" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Complaints Section */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Complaint Cards Loading - Fixed static cards */}
          <div className="grid gap-4 md:gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-56" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-18" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-72" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Load More Button */}
          <div className="flex justify-center">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8 md:mt-12">
          <div className="mb-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 mx-auto" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </div>
                <Skeleton className="h-9 w-24 mx-auto" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-28 mx-auto" />
                  <Skeleton className="h-4 w-36 mx-auto" />
                </div>
                <Skeleton className="h-9 w-24 mx-auto" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36 mx-auto" />
                  <Skeleton className="h-4 w-44 mx-auto" />
                </div>
                <Skeleton className="h-9 w-24 mx-auto" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mt-8 md:mt-12">
          <div className="mb-4">
            <Skeleton className="h-6 w-36 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-30" />
                      <Skeleton className="h-3 w-18" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}