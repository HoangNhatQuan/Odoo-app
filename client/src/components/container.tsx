import { CSSProperties, ReactNode } from 'react'

const MAX_WIDTH = 1200

export type ContainerProps = {
  isMaxWidth?: boolean
  children?: ReactNode
  style?: CSSProperties
  className?: string
  bodyClassName?: string
}
export default function Container({
  children,
  isMaxWidth = true,
  style,
  className,
  bodyClassName,
}: ContainerProps) {
  return (
    <div
      className={`flex w-full flex-row justify-center ${className}`}
      style={style}
    >
      <div
        className={`flex w-full px-4 ${bodyClassName}`}
        style={{ maxWidth: isMaxWidth ? MAX_WIDTH : 'auto' }}
      >
        {children}
      </div>
    </div>
  )
}
