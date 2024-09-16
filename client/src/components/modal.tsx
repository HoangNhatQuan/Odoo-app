import { Fragment, ReactNode } from 'react'

export type ModalProps = {
  open?: boolean
  onCancel?: () => void
  className?: string
  children: ReactNode
}

export default function Modal({
  open = false,
  onCancel = () => {},
  className = '',
  children,
}: ModalProps) {
  return (
    <Fragment>
      <input
        type="checkbox"
        className={'modal-toggle'}
        checked={open}
        readOnly
      />
      <div className="modal">
        <div className={'modal-box rounded-[1.75rem] ' + className}>
          {children}
        </div>
        <label className="modal-backdrop" onClick={onCancel} />
      </div>
    </Fragment>
  )
}
