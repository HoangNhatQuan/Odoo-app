import { IVideo } from '@/apis/video/video.type'

export default function VideoCard({ video }: { video: IVideo }) {
  const MAX_LENGTH = 300

  const handleReadMoreClick = (url: string) => {
    window.open(url, '_blank')
  }
  return (
    <div className="card flex flex-col md:flex-row justify-between items-start p-4 w-full rounded-lg mb-4">
      <div className="w-full md:w-1/2">
        <iframe
          width="100%"
          height="250"
          src={`https://www.youtube.com/embed/${video.videoYtbId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="w-full md:w-1/2 pt-4 md:pl-4">
        <h5 className="font-bold mb-2">{video.title}</h5>
        <p className="text-secondary text-base">
          Shared by: {video.referrer.name}
        </p>
        <div className="text-secondary text-sm mt-4">
          {video.description.length <= MAX_LENGTH
            ? video.description
            : `${video.description.substring(0, MAX_LENGTH)}...`}
          {video.description.length > MAX_LENGTH && (
            <span
              onClick={() => handleReadMoreClick(video.url)}
              className="text-orange cursor-pointer ml-1"
            >
              Read More
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
