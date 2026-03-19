import { Skeleton } from '@/shared/ui'
import styles from './ReviewCard.module.scss'

export const ReviewCardSkeleton = () => {
    return (
        <div className={styles.inner}>
            <div className={styles.top}>
                <div className={styles.user}>
                    <Skeleton width="32px" height="32px" borderRadius="50%" isBlack={true} />
                    <p className={styles.nickname}>
                        <Skeleton width='70px' height='17px' borderRadius='6px' isBlack={true} />
                    </p>
                    <Skeleton width='32px' height='32px' borderRadius="50%" isBlack={true} />
                </div>
            </div>
            <p className={styles.review__skeleton}>
                <Skeleton width='100%' height='17px' borderRadius="12px" isBlack={true} />
                <Skeleton width='100%' height='17px' borderRadius="12px" isBlack={true} />
                <Skeleton width='100%' height='17px' borderRadius="12px" isBlack={true} />
            </p>
            <div className={styles.action}>
                <Skeleton width='60px' height='31px' borderRadius='9999px' isBlack={true} />
            </div>
        </div>
    )
}
