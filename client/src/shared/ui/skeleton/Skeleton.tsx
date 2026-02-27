import type { FC } from 'react'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
    width: string
    height: string
    borderRadius: string
    isBlack?: boolean
    mb?: string
}

export const Skeleton: FC<SkeletonProps> = ({ width, height, borderRadius, isBlack, mb }) => {
    return (
        <span className={`${styles.skeleton} ${isBlack ? styles.black : ''}`} style={{ width: `${width}`, height: `${height}`, borderRadius: `${borderRadius}`, marginBottom: mb }}></span>
    )
}
