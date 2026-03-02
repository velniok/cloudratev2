import { Skeleton } from '@/shared/ui'
import styles from './ReviewCard.module.scss'

export const ReviewCardSkeleton = () => {
    return (
        <div className={styles.inner}>
            <div className={styles.user}>
                <Skeleton width="32px" height="32px" borderRadius="50%" />
                <p className={styles.nickname}>
                    <Skeleton width='70px' height='17px' borderRadius='6px' />
                </p>
                <Skeleton width='32px' height='32px' borderRadius="50%" />
            </div>
            <p className={styles.review}>
                <Skeleton width='100%' height='17px' borderRadius="12px" />
                <Skeleton width='100%' height='17px' borderRadius="12px" />
                <Skeleton width='100%' height='17px' borderRadius="12px" />
            </p>
        </div>
    )
}
