import type { FC, ReactNode } from "react"
import styles from "./Title.module.scss"
import { Link } from "react-router-dom"

interface TitleProps {
    children: ReactNode
    link?: string
    linkTitle?: string
}

export const Title: FC<TitleProps> = ({ children, link, linkTitle }) => {
    return (
        <h3 className={styles.title}>
            {children}
            <div className={styles.line}></div>
            {
                link && <Link className={styles.link} to={link}>{linkTitle}</Link>
            }
        </h3>
    )
}
