import { FC, useEffect, useState } from 'react'
import { DeleteIcon, EditIcon, InfoIcon, SuccessIcon } from '../icon'
import styles from './Notification.module.scss'
import { hideNotification } from '@/shared/model'
import { useAppDispatch } from '@/shared/lib'
import { INotification } from '@/shared/model'

interface NotificationItemProps {
    notification: INotification
}

export const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
    
    const dispatch = useAppDispatch()

    const [hiding, setHiding] = useState(false)

    const handleHide = () => {
        setHiding(true)
        setTimeout(() => dispatch(hideNotification(notification.id)), 300)
    };

    useEffect(() => {
        setTimeout(() => handleHide(), 3000)
    }, []);

    return (
        <li className={`${styles.item} ${hiding ? `${styles.hiding}` : ''} ${styles[notification.type]}`}>
            <div className={styles.icon}>
                {
                    notification.type === 'success'
                    ? <SuccessIcon />
                    : notification.type === 'delete'
                    ? <DeleteIcon />
                    : notification.type === 'edit'
                    ? <EditIcon />
                    : <InfoIcon />
                }
            </div>
            <div className={styles.text}>
                <p className={styles.title}>{notification.title}</p>
                <p className={styles.desc}>{notification.desc}</p>
            </div>
        </li>
    )
}
