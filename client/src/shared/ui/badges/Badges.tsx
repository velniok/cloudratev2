import type { FC, ReactNode } from 'react'
import styles from './Badges.module.scss'

interface BadgesProps {
    children: ReactNode
}

export const Badges: FC<BadgesProps> = ({ children }) => {
    return (
        <span className={styles.badges}>{children}</span>
    )
}
