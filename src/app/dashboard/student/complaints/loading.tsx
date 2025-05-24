import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ComplaintsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Back button skeleton */}
      <div className="mb-4">
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-44" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="mb-4">
          <Skeleton className="h-10 w-80" />
        </div>

        {/* Complaint cards skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-64 mb-2" />
                    <Skeleton className="h-4 w-80" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/5" />
                </div>

                {/* Updates section skeleton */}
                <div className="mt-4">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <div className="space-y-2">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="border-l-2 border-gray-200 pl-3 py-1">
                        <Skeleton className="h-3 w-32 mb-1" />
                        <Skeleton className="h-4 w-48 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Skeleton className="h-9 w-28" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}