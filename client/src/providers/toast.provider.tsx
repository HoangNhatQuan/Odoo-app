import { Fragment, ReactNode } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import clsx from 'clsx'
import IconToast from '@/components/toast'
import { HeroIcon } from '@/components/icons'

export const useToast = () => {
  const message = ({
    msg,
    type,
    onClick,
  }: {
    msg: string
    type: 'success' | 'error'
    onClick?: () => void
  }) => {
    return toast.custom(
      ({ id }) => (
        <div
          className={clsx(
            'relative flex flex-row bg-white border rounded-2xl w-80 pr-4',
            {
              'border-[#7C9F43]': type === 'success',
              'border-[#EC534B]': type === 'error',
              'cursor-pointer': !!onClick,
            },
          )}
          onClick={() => onClick && onClick()}
        >
          <div
            className={clsx(
              'flex items-center justify-center w-12 rounded-l-2xl',
              { 'bg-[#ec534b40]': type === 'error' },
              { 'bg-[#7c9f4340]': type === 'success' },
            )}
          >
            <IconToast type={type} />
          </div>
          <div className="p-3 flex-1">
            <p className="text-sm text-medium">{msg}</p>
          </div>
          <HeroIcon.XMarkIcon
            width={16}
            className="cursor-pointer absolute right-2 top-2 text-default font-bold"
            onClick={() => toast.remove(id)}
          />
        </div>
      ),
      { duration: 4000 },
    )
  }

  return { message }
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Toaster />
      {children}
    </Fragment>
  )
}
