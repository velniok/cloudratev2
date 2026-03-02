import type { FC, ReactNode } from 'react'
import styles from './Badges.module.scss'

interface BadgesProps {
    children: ReactNode
    role?: string
}

export const Badges: FC<BadgesProps> = ({ children, role }) => {
    return (
        <span className={`${styles.badges} ${role ? styles[role] : ''}`}>{children}</span>
    )
}
