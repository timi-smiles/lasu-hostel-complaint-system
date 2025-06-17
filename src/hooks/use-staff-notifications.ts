import { useState, useEffect } from 'react'

interface StaffNotification {
  id: string
  type: string
  title: string
  message: string
  createdAt: string
  isRead: boolean
  complaint?: {
    id: string
    title: string
    status: string
    priority: string
    category: string
    hostelBlock: string
    roomNumber: string
  }
  triggeredBy?: {
    id: string
    name: string
    role: string
  }
}

interface StaffNotificationData {
  notifications: StaffNotification[]
  unreadCount: number
}

export function useStaffNotifications(isActive: boolean = true) {
  const [notifications, setNotifications] = useState<StaffNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchNotifications = async () => {
    if (!isActive) return
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/staff/notifications', {
        credentials: 'include'
      })

      if (response.ok) {
        const data: StaffNotificationData = await response.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Failed to fetch staff notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationIds?: string[]) => {
    try {
      const response = await fetch('/api/staff/notifications', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notificationIds })
      })

      if (response.ok) {
        if (notificationIds) {
          // Mark specific notifications as read
          setNotifications(prev => 
            prev.map(n => 
              notificationIds.includes(n.id) ? { ...n, isRead: true } : n
            )
          )
          setUnreadCount(prev => Math.max(0, prev - notificationIds.length))
        } else {
          // Mark all as read
          setUnreadCount(0)
          setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        }
      }
    } catch (error) {
      console.error('Failed to mark notifications as read:', error)
    }
  }

  useEffect(() => {
    fetchNotifications()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)

    return () => clearInterval(interval)
  }, [isActive])

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead
  }
}