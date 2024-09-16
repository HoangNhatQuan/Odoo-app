import { useEffect, useRef } from 'react'

import { IVideo } from '@/apis/video/video.type'
import VideoCard from './card'

type VideoListProps = {
  videos: IVideo[]
  isFetchingNextPage: boolean
  hasNextPage?: boolean
  fetchNextPage: () => void
}

export default function VideoList({
  videos,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: VideoListProps) {
  const loadingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 },
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (!videos.length) {
    return <div className="m-auto">No videos</div>
  }

  return (
    <div className="flex flex-col items-center">
      {videos.length &&
        videos.map((video) => (
          <VideoCard key={video.videoYtbId} video={video} />
        ))}
      {hasNextPage && <div ref={loadingRef} className="loading"></div>}
    </div>
  )
}
