import type { FC, ReactNode } from "react"
import styles from "./Rating.module.scss"

interface Rating {
    children: ReactNode
    size?: string
}

export const Rating: FC<Rating> = ({ children, size }) => {
    return (
        <p className={`${styles.rating} ${size ? styles[size] : ''}`}>
            {children}
        </p>
    )
}
