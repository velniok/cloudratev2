import { FC } from 'react'
import styles from './UserNotificationItem.module.scss'
import { IUserNotification } from '../model/types'
import { Link } from 'react-router-dom'
import { getMonth, useAppDispatch } from '@/shared/lib'
import { readNotificationApi } from '@/features/notification'
import { readNotify } from '@/features/auth/model/slice'

interface UserNotificationItemProps {
    notification: IUserNotification
    closeNotification?: () => void
}

export const UserNotificationItem: FC<UserNotificationItemProps> = ({ notification, closeNotification }) => {

    const dispatch = useAppDispatch()

    const onClick = () => {
        if (closeNotification) {
            closeNotification()
        }
        dispatch(readNotify({ id: notification.id }))
        readNotificationApi({ id: notification.id })
    }

    return (
        <li className={`${styles.item} ${!notification.isRead ? styles.notRead : ''}`}>
            <Link to={`/track/${notification.metadata.trackId}`} className={styles.item__link} onClick={onClick}>
                <i className="ph-fill ph-check-circle"></i>
                <div className={styles.item__info}>
                    <h4 className={styles.item__title}>{notification.title}</h4>
                    <p className={styles.item__desc}>{notification.message}</p>
                </div>
                <p className={`${styles.item__date} ${!notification.isRead ? styles.notRead : ''}`}>{new Date(notification.createdAt).getUTCDate()} {getMonth(notification.createdAt, 'pluralize')}</p>
            </Link>
        </li>
    )
}
