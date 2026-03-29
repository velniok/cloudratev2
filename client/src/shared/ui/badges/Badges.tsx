import type { FC, ReactNode } from 'react'
import styles from './Badges.module.scss'

interface BadgesProps {
    role: string
    size?: string
}

export const Badges: FC<BadgesProps> = ({ role, size }) => {

    const roleLables = {
        admin: 'Админ',
        user: 'Пользователь'
    }

    return (
        <span className={`${styles.badges} ${role ? styles[role] : ''} ${size ? styles[size] : ''}`}>{roleLables[role]}</span>
    )
}
