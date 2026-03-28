import { IUser } from '@/entities/user'
import { Cover } from '../cover'
import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { Badges } from '../badges'
import { Link } from 'react-router-dom'
import { getOptimizedAvatar } from '@/shared/lib'

interface TableUserItemProps {
    user: IUser
    actions: {
        name: string
        func: (id: number) => ReactNode
    }[]
}

export const TableUserItem: FC<TableUserItemProps> = ({ user, actions }) => {

    return (
        <tr className={styles.table__row}>
            <td className={styles.table__data}>
                <Link to={`/user/${user.username}`} className={styles.user}>
                    <Cover width='40px' height='40px' borderRadius='6px' url={getOptimizedAvatar(user.avatarUrl, 40, 40)} />
                    <div className={styles.user__bio}>
                        <p className={styles.user__nickname}>{user.nickname}</p>
                        <p className={styles.user__username}>@{user.username}</p>
                    </div>
                </Link>
            </td>
            <td className={styles.table__data}>
                <p className={styles.user__created}>{new Date(user.createdAt).toLocaleDateString()}</p>
            </td>
            <td className={styles.table__data}>
                <Badges role={user.role} />
            </td>
            <td className={styles.table__data}>
                <div className={styles.action}>
                    {
                        actions.map((action, index) => {
                            return <div key={index} className={`${styles.action__button} ${styles[action.name]}`}>{action.func(user.id)}</div>
                        })
                    }
                </div>
            </td>
        </tr>
    )
}
