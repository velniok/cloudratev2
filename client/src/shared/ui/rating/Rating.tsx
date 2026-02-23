import type { FC, ReactNode } from "react"
import styles from "./Rating.module.scss"

interface Rating {
    children: ReactNode
}

export const Rating: FC<Rating> = ({ children }) => {
  return (
    <p className={styles.rating}>
        {children}
    </p>
  )
}
