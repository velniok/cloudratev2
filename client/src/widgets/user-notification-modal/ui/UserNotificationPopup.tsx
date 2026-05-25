import { IUserNotification, UserNotificationItem } from '@/entities/notification'
import styles from './UserNotificationPopup.module.scss'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface UserNotificationPopupProps {
    notifications: IUserNotification[]
    closeNotification: () => void
    open: boolean
}

export const UserNotificationPopup: FC<UserNotificationPopupProps> = ({ notifications, open, closeNotification }) => {

    return (
        <div className={`${styles.popup} ${open ? styles.open : ''}`}>
            <div className={styles.header}>
                <i className="ph-fill ph-bell"></i>
                <h3 className={styles.header__title}>Уведомления</h3>
                <Link to={'/user/notifications'} className={styles.header__link}>
                    Показать все
                </Link>
            </div>
            <ul className={styles.list}>
                {
                    notifications.length > 0 ?                    
                    notifications.map((notification) => {
                        return <UserNotificationItem key={notification.id} closeNotification={closeNotification} notification={notification} />
                    })
                    :
                    <p className={styles.none}>Уведомлений нет</p>
                }
            </ul>
        </div>
    )
}
