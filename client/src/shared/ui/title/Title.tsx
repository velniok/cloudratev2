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
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{children}</h3>
            {/* <div className={styles.line}></div> */}
            {
                link && <Link className={styles.link} to={link}>{linkTitle}</Link>
            }
        </div>
    )
}
