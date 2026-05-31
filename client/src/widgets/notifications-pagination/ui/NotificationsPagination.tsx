import { LinksList, PaginationButtons, Skeleton, Title } from '@/shared/ui'
import styles from './NotificationsPagination.module.scss'
import { FC, useEffect } from 'react'
import { IUser } from '@/entities/user'
import { useAppDispatch, useAppSelector, usePagination } from '@/shared/lib'
import { getUserNotificationsThunk, selectUserNotifications, selectUserNotificationsPagination, selectUserNotificationsStatus } from '@/features/user'
import { UserNotificationItem } from '@/entities/notification'

interface NotificationsPaginationProps {
    user: IUser
}

export const NotificationsPagination: FC<NotificationsPaginationProps> = ({ user }) => {

    const { hundleNextPage, hundlePrevPage, hundlePage } = usePagination(getUserNotificationsThunk, `/user/notifications`, 15, user.id)
    const notificationsList = useAppSelector(selectUserNotifications)
    const notificationsListStatus = useAppSelector(selectUserNotificationsStatus)
    const notificationsListPagination = useAppSelector(selectUserNotificationsPagination)

    const links = [
        {
            title: 'Профиль',
            link: `/user/${user.username}`
        },
        {
            title: 'Уведомления',
            link: 'last'
        }
    ]

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <LinksList links={links} />
                <Title>УВЕДОМЛЕНИЯ</Title>
                {
                    notificationsListStatus === 'success' && notificationsList && notificationsListPagination ?
                    <>
                        {
                            notificationsList.length > 0 ?
                            <>
                                <ul className={styles.list}>
                                    {
                                        notificationsList.map((notification) => {
                                            return <UserNotificationItem key={notification.id} notification={notification} />
                                        })
                                    }
                                </ul>
                                <div className={styles.bottom}>
                                    <PaginationButtons
                                        page={notificationsListPagination.page}
                                        totalPages={notificationsListPagination.totalPages}
                                        hundleNextPage={hundleNextPage}
                                        hundlePrevPage={hundlePrevPage}
                                        hundlePage={hundlePage}
                                    />
                                </div>
                            </>
                            :
                            <p className={styles.none}>Уведомлений нет</p>
                        }
                    </>
                    :
                    <ul className={styles.list}>
                        {
                        Array.from({ length: 5 }).map((_, index) => {
                            return <Skeleton key={index} width='100%' height='64px' borderRadius='12px' />
                        })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}
