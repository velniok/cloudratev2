import { FC } from 'react'
import styles from './GeneralItem.module.scss'

interface GeneralItemProps {
    title: string
    count: string
}

export const GeneralItem: FC<GeneralItemProps> = ({ title, count }) => {
    return (
        <li className={styles.statsItem}>
            <h3 className={styles.statsTitle}>{title}</h3>
            <p className={styles.statsCount}>{count}</p>
        </li>
    )
}
