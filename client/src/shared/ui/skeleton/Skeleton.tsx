import type { FC } from 'react'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
    width: string
    height: string
    borderRadius: string
}

export const Skeleton: FC<SkeletonProps> = ({ width, height, borderRadius }) => {
    return (
        <span className={styles.skeleton} style={{ width: `${width}`, height: `${height}`, borderRadius: `${borderRadius}` }}></span>
    )
}
