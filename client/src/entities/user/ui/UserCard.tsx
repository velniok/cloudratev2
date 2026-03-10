import { FC } from 'react'
import styles from './UserCard.module.scss'
import { IUser } from '../model/types'
import { Cover } from '@/shared/ui'
import { Link } from 'react-router-dom'

interface UserCardProps {
    user: IUser
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
    return (
        <Link to={`/user/${user.username}`} className={styles.card}>
            <Cover url={user.avatarUrl} width='36px' height='36px' borderRadius='50%' />
            <h3 className={styles.nickname}>{user.nickname}</h3>
        </Link>
    )
}
