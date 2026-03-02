import { IUser } from '@/entities/user'
import { Cover } from '../cover'
import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { Badges } from '../badges'

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
                <div className={styles.artist}>
                    <Cover width='40px' height='40px' borderRadius='6px' url={user.avatarUrl} />
                    <p className={styles.artist__nickname}>{user.nickname}</p>
                </div>
            </td>
            <td className={styles.table__data}>1.1.1</td>
            <td className={styles.table__data}>
                <Badges role={user.role}>{user.role}</Badges>
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
