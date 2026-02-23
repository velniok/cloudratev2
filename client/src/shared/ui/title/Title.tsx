import type { FC, ReactNode } from "react"
import styles from "./Title.module.scss"

interface TitleProps {
    children: ReactNode
}

export const Title: FC<TitleProps> = ({ children }) => {
    return (
        <h3 className={styles.title}>
            {children}
            <div className={styles.line}></div>
        </h3>
    )
}
