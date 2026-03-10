import type { FC, ReactNode } from 'react'
import styles from './Badges.module.scss'

interface BadgesProps {
    role: string
}

export const Badges: FC<BadgesProps> = ({ role }) => {

    const roleLables = {
        admin: 'Админ',
        user: 'Пользователь'
    }

    return (
        <span className={`${styles.badges} ${role ? styles[role] : ''}`}>{roleLables[role]}</span>
    )
}
