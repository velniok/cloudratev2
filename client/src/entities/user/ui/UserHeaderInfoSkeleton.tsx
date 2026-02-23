import { Skeleton } from '@/shared/ui'
import styles from './UserHeaderInfo.module.scss'

export const UserHeaderInfoSkeleton = () => {
    return (
        <div className={styles.inner}>
            <Skeleton width='150px' height='150px' borderRadius='24px' />
            <div className={styles.info}>
                <h2 className={styles.nickname}>
                    <Skeleton width='280px' height='48px' borderRadius='12px' />
                </h2>
                <p className={styles.username}>
                    <Skeleton width='120px' height='20px' borderRadius='6px' />
                </p>
                <p className={styles.soundcloud}>
                    <Skeleton width='150px' height='17px' borderRadius='6px' />
                </p>
            </div>
        </div>
    )
}
