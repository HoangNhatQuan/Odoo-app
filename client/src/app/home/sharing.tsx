import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { shareVideo } from '@/apis/video/video.api'
import { useToast } from '@/providers/toast.provider'

interface FormData {
  url: string
}

const schema = yup.object().shape({
  url: yup
    .string()
    .url('Please enter a valid URL')
    .matches(
      /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      'Please enter a valid YouTube URL',
    )
    .required('YouTube URL is required'),
})

export default function ShareMovie() {
  const [loading, setLoading] = useState(false)
  const { message } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      await shareVideo(data.url)
      message({ msg: 'Video shared successfully!', type: 'success' })
    } catch (error) {
      message({
        msg: 'Failed to share the video. Please try again.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center h-screen mt-10">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex flex-col gap-2 mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              Youtube URL:
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input
                id="url"
                type="text"
                className="grow"
                placeholder="Enter YouTube URL"
                {...register('url')}
              />
            </label>
            {errors.url && (
              <p className="text-danger text-xs italic">
                {'*' + errors.url.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="btn btn-primary w-full" type="submit">
              Share Video {loading && <div className="loading loading-dots" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
