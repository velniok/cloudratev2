import { IUserNotification, UserNotificationItem } from '@/entities/notification'
import styles from './UserNotificationPopup.module.scss'
import { FC } from 'react'

interface UserNotificationPopupProps {
    notifications: IUserNotification[]
    closeNotification: () => void
}

export const UserNotificationPopup: FC<UserNotificationPopupProps> = ({ notifications, closeNotification }) => {

    return (
        <div className={styles.popup}>
            <div className={styles.header}>
                <i className="ph-fill ph-bell"></i>
                <h3 className={styles.header__title}>Уведомления</h3>
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
