import { useState } from 'react'
import { Bell, BellRing, Clock, User, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useNotifications } from '@/hooks/use-notifications'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation' // Add this import

interface NotificationBellProps {
  userId?: string
}

export default function NotificationBell({ userId }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter() // Add router hook
  const { notifications, unreadCount, markAsRead } = useNotifications(!!userId)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open && unreadCount > 0) {
      // Mark as read when notifications are viewed
      markAsRead()
    }
  }

  // Add function to handle notification click
  const handleNotificationClick = (complaintId: string) => {
    setIsOpen(false) // Close the popover
    router.push(`/dashboard/student/complaints/${complaintId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return 'Recently'
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2"
        >
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5 text-red-500" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'No new notifications'
            }
          </p>
        </div>
        
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  {/* Make the entire notification clickable */}
                  <div 
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleNotificationClick(notification.complaintId)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate hover:text-blue-600">
                          {notification.complaintTitle}
                        </p>
                        
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getStatusColor(notification.complaintStatus)}`}
                          >
                            {notification.complaintStatus.replace('_', ' ')}
                          </Badge>
                          
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            {notification.staffName}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(notification.createdAt)}
                        </div>
                      </div>
                      
                      {!notification.isRead && (
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button 
              variant="ghost" 
              className="w-full text-sm"
              onClick={() => {
                setIsOpen(false)
                router.push('/dashboard/student/complaints')
              }}
            >
              View All Complaints
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}