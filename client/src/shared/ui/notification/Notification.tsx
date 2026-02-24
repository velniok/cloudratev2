import { useAppSelector } from '@/shared/lib'
import styles from './Notification.module.scss'
import { NotificationItem } from './NotificationItem'

export const Notification = () => {

    const notification = useAppSelector((state) => state.notification.notification)

    return (
        <ul className={styles.list}>
            {
                notification?.map((notification) => {
                    return <NotificationItem notification={notification} key={notification.id} />
                })
            }
        </ul>
    )
}
