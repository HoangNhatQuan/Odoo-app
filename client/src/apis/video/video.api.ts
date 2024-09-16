import api from '@/configs/axios'
import { IVideo } from './video.type'

export interface IVideoRes<T> {
  count: number
  items: T[]
}

export const getVideos = async ({
  page = 1,
  pageSize = 10,
}: {
  page: number
  pageSize: number
}) => {
  const offset = (page - 1) * pageSize
  const { data } = await api.get<IVideoRes<IVideo>>('/videos', {
    params: {
      offset,
      limit: pageSize,
    },
  })
  const totalPages = Math.ceil(data.count || 0 / pageSize)
  return { ...data, currentPage: page, totalPages }
}

export const shareVideo = async (url: string) => {
  const { data } = await api.post<IVideo>('/videos/share', { url })
  return data as IVideo
}
