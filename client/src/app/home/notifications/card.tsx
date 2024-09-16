import { formatDistanceToNow } from 'date-fns'

import { INotification } from '@/apis/notification/notification.type'
export default function NotificationCard({
  notification,
  onClickNotification,
}: {
  notification: INotification
  onClickNotification: () => void
}) {
  return (
    <div
      onClick={onClickNotification}
      className={`
        card p-4 mb-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <p
            className={`text-sm ${
              notification.isRead
                ? 'text-secondary'
                : 'text-black font-semibold'
            }`}
          >
            {notification.message}
          </p>
          <p className="text-xs text-secondary mt-1">
            From: {notification.sender.name}
          </p>
        </div>
        {!notification.isRead && (
          <span className="h-2 w-2 bg-danger rounded-full flex-shrink-0 mt-1"></span>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {formatDistanceToNow(new Date(notification.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  )
}
