import type { FC } from 'react'
import styles from './Badges.module.scss'

interface BadgesProps {
    badge: string | null
    size?: string
}

export const Badges: FC<BadgesProps> = ({ badge, size }) => {

    const badgeLables: Record<string, string> = {
        admin: 'Админ',
        user: 'Пользователь',
        beta: 'Участник беты',
    }

    return (
        <>
            {
                badge &&
                <span className={`${styles.badges} ${badge ? styles[badge] : ''} ${size ? styles[size] : ''}`}>{badgeLables[badge]}</span>
            }
        </>
    )
}