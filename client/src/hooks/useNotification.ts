import { useCallback, useEffect, useState } from 'react'
import { QueryClient, useInfiniteQuery } from 'react-query'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

import { useProfile } from '@/providers/auth.provider'
import {
  getNotifications,
  markNotificationAsRead,
} from '@/apis/notification/notification.api'
import { INotification } from '@/apis/notification/notification.type'

export const useNotification = () => {
  const { user } = useProfile()
  const [unreadCount, setUnreadCount] = useState(0)
  const queryClient = new QueryClient()
  const navigate = useNavigate()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery(
      'notifications',
      ({ pageParam = 1 }) => getNotifications({ page: pageParam, pageSize: 3 }),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length ? allPages.length + 1 : undefined
        },
        onSuccess: (data) => {
          const allNotifications = data.pages.flat()
          queryClient.setQueryData<INotification[]>(
            'notifications',
            allNotifications,
          )
        },
      },
    )

  const notifications = data?.pages.flat() || []

  useEffect(() => {
    if (!user?.id) return

    const socket = io(`https://youtube-video-sharing-app-hm44.onrender.com`, {
      withCredentials: true,
    })

    socket.on('connect', () => {
      socket.emit('register-socket', user.id)
    })

    socket.on('newNotification', (newNotification: INotification) => {
      queryClient.setQueryData<INotification[]>(
        ['notifications'],
        (oldNotifications = []) => {
          return [newNotification, ...oldNotifications]
        },
      )

      setUnreadCount((prevCount) => prevCount + 1)
      refetch()
    })

    return () => {
      socket.disconnect()
    }
  }, [user?.id, queryClient, refetch])

  useEffect(() => {
    if (!notifications.length) return

    const unread = notifications.filter(
      (notification: INotification) => !notification.isRead,
    ).length
    setUnreadCount(unread)
  }, [notifications])

  const onClickNotification = useCallback(
    async (notification: INotification) => {
      await markNotificationAsRead(notification._id)
      queryClient.setQueryData<INotification[]>(
        ['notifications'],
        (oldNotifications = []) =>
          oldNotifications.map((elm) =>
            elm._id === notification._id ? { ...elm, read: true } : elm,
          ),
      )
      setUnreadCount((prev) => prev - 1)
    },
    [navigate, queryClient],
  )

  return {
    notifications,
    unreadCount,
    onClickNotification,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
