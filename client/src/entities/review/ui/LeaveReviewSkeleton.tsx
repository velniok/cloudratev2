import { Skeleton } from '@/shared/ui'
import styles from './LeaveReview.module.scss'

export const LeaveReviewSkeleton = () => {
    return (
        <div className={styles.content}>
            <Skeleton width='100%' height='250px' borderRadius='12px' />
        </div>
    )
}
