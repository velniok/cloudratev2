import { FC } from 'react'
import styles from './GeneralItem.module.scss'
import { Skeleton } from '@/shared/ui'

interface GeneralItemSkeletonProps {
    title: string
}

export const GeneralItemSkeleton: FC<GeneralItemSkeletonProps> = ({ title }) => {
    return (
        <li className={styles.statsItem}>
            <h3 className={styles.statsTitle}>{title}</h3>
            <Skeleton width='100%' height='38px' borderRadius='12px' isBlack={true} />
        </li>
    )
}
