import { Fragment, useEffect, useRef, useState } from 'react'

import ModalTemplate from '@/components/modal'

import bell from '@/static/images/bell.png'
import { useNotification } from '@/hooks/useNotification'
import { INotification } from '@/apis/notification/notification.type'
import NotificationCard from './card'

export default function Notifications() {
  const [open, setOpen] = useState(false)

  const {
    notifications,
    unreadCount,
    onClickNotification,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotification()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    const dropdown = dropdownRef.current
    if (
      dropdown &&
      dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight - 20
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }

  useEffect(() => {
    const dropdown = dropdownRef.current
    if (dropdown) {
      dropdown.addEventListener('scroll', handleScroll)
      return () => dropdown.removeEventListener('scroll', handleScroll)
    }
  }, [hasNextPage, isFetchingNextPage])
  return (
    <Fragment>
      <div className="relative cursor-pointer" onClick={() => setOpen(true)}>
        {unreadCount > 0 && (
          <p className="absolute -top-[2px] -right-[2px] text-white text-[8px] leading-[10px] rounded-full bg-danger p-1">
            {unreadCount}+
          </p>
        )}

        <img className="h-8" src={bell} alt="Bell" />
      </div>
      <ModalTemplate open={open} onCancel={() => setOpen(false)}>
        <div className="flex flex-col gap-2">
          <h3> Notifications </h3>
          <div className="py-2">
            {notifications?.length === 0 ? (
              <p className="text-gray-700 px-4 py-2">No notifications</p>
            ) : (
              <>
                {notifications?.map((notification: INotification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    onClickNotification={() =>
                      onClickNotification(notification)
                    }
                  />
                ))}
                {hasNextPage && (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-full py-2 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {isFetchingNextPage ? 'Loading more...' : 'Load more'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </ModalTemplate>
    </Fragment>
  )
}
