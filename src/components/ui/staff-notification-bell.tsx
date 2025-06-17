import { useState } from 'react'
import { Bell, BellRing, Clock, User, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useStaffNotifications } from '@/hooks/use-staff-notifications'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface StaffNotificationBellProps {
  userId?: string
}

export default function StaffNotificationBell({ userId }: StaffNotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead } = useStaffNotifications(!!userId)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open && unreadCount > 0) {
      markAsRead()
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'NEW_COMPLAINT':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'COMPLAINT_UPDATE':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'STATUS_CHANGE':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'NEW_COMPLAINT':
        return 'bg-red-100'
      case 'COMPLAINT_UPDATE':
        return 'bg-blue-100'
      case 'STATUS_CHANGE':
        return 'bg-green-100'
      default:
        return 'bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
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
      
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Staff Notifications</h4>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'No new notifications'
            }
          </p>
        </div>
        
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <Link 
                    href={notification.complaint ? `/dashboard/staff/complaints/${notification.complaint.id}` : '#'}
                    className="block"
                  >
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          
                          {notification.complaint && (
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getPriorityColor(notification.complaint.priority)}`}
                              >
                                {notification.complaint.priority} Priority
                              </Badge>
                              
                              <Badge variant="outline" className="text-xs">
                                {notification.complaint.category}
                              </Badge>
                              
                              <span className="text-xs text-gray-500">
                                {notification.complaint.hostelBlock} - {notification.complaint.roomNumber}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-2">
                            {notification.triggeredBy && (
                              <div className="flex items-center text-xs text-gray-500">
                                <User className="h-3 w-3 mr-1" />
                                {notification.triggeredBy.name}
                              </div>
                            )}
                            
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(notification.createdAt)}
                            </div>
                          </div>
                        </div>
                        
                        {!notification.isRead && (
                          <div className="flex-shrink-0">
                            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t">
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link href="/dashboard/staff/notifications">
                View All Notifications
              </Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}