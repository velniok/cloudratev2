import type { FC, MouseEvent, ReactNode } from "react"
import styles from "./Rating.module.scss"

interface Rating {
    children: ReactNode
    size?: string
    onClick?: (e: MouseEvent) => void
    isHover?: boolean
    active?: boolean
}

export const Rating: FC<Rating> = ({ children, size, onClick, isHover, active }) => {
    return (
        <p className={`${styles.rating} ${size ? styles[size] : ''} ${active ? styles.active : ''} ${isHover ? styles.isHover : ''}`} onClick={onClick}>
            {children}
        </p>
    )
}
