import { useMemo } from 'react'

import success from '@/static/images/success.svg'
import error from '@/static/images/error.svg'

type IconToastProps = {
  type?: 'success' | 'error' | 'warning'
}
export default function IconToast({ type = 'success' }: IconToastProps) {
  const icon = useMemo(() => {
    switch (type) {
      case 'success':
        return success
      case 'error':
        return error
      default:
        return ''
    }
  }, [type])

  return <img src={icon} alt={type} />
}
