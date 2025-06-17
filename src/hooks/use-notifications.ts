import { useState, useEffect } from 'react'

interface Notification {
  id: string
  message: string
  createdAt: string
  complaintId: string
  complaintTitle: string
  complaintStatus: string
  staffName: string
  isRead: boolean
}

interface NotificationData {
  notifications: Notification[]
  unreadCount: number
}

export function useNotifications(isActive: boolean = true) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchNotifications = async () => {
    if (!isActive) return
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/notifications', {
        credentials: 'include'
      })

      if (response.ok) {
        const data: NotificationData = await response.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async () => {
    try {
      const response = await fetch('/api/student/notifications', {
        method: 'PUT',
        credentials: 'include'
      })

      if (response.ok) {
        setUnreadCount(0)
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
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