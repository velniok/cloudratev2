import { FC, MouseEvent } from 'react'
import styles from './UserRowAdmin.module.scss'
import { IUser } from '../model/types'
import { Badges, Cover } from '@/shared/ui'
import { getMonth, getOptimizedAvatar } from '@/shared/lib'
import { Link } from 'react-router-dom'

interface UserRowAdminProps {
    user: IUser
    hundleUpdateRole: (e: MouseEvent, id: number) => void
    hundleDeleteUser: (e: MouseEvent, id: number) => void
}

export const UserRowAdmin: FC<UserRowAdminProps> = ({ user, hundleUpdateRole, hundleDeleteUser }) => {
    return (
        <li className={styles.item}>
            <Link to={`/user/${user.username}`} className={styles.link}>
                <span className={styles.id}>#{user.id}</span>
                <div className={styles.user}>
                    <Cover
                        url={getOptimizedAvatar(user.avatarUrl ?? '', 32, 32)}
                        width='32px'
                        height='32px'
                        borderRadius='50%'
                    />
                    <div className={styles.user__meta}>
                        <h3 className={styles.user__nickname}>{user.nickname}</h3>
                        <h4 className={styles.user__username}>@{user.username}</h4>
                    </div>
                </div>
                <p className={styles.email}>{user.email}</p>
                <Badges badge={user.badges.find(badge => badge.isSelected)?.badgeName ?? 'user'} />
                <p className={styles.created}>{new Date(user.createdAt).getUTCDate()} {getMonth(user.createdAt, 'pluralize')} {new Date(user.createdAt).getUTCFullYear()}г.</p>
                <div className={styles.actions}>
                    <i className={`ph ph-pencil-simple ${styles.actions__edit}`} onClick={(e) => e.preventDefault()}></i>
                    <i className={`ph ph-shield-check ${styles.actions__role}`} onClick={(e) => hundleUpdateRole(e, user.id)}></i>
                    <i className={`ph ph-trash ${styles.actions__delete}`} onClick={(e) => hundleDeleteUser(e, user.id)}></i>
                </div>
            </Link>
        </li>
    )
}
