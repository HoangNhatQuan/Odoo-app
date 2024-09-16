import api from '@/configs/axios'
import { INotification } from './notification.type'

export const getNotifications = async ({
  page = 1,
  pageSize = 5,
}: {
  page: number
  pageSize: number
}) => {
  const offset = (page - 1) * pageSize
  const { data } = await api.get<INotification[]>('/notifications', {
    params: { offset, limit: pageSize },
  })
  return data
}

export const markNotificationAsRead = async (id: string) => {
  await api.patch(`/notifications/${id}/mark-read`)
}
