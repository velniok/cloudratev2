import { Skeleton } from '@/shared/ui'
import styles from './UserCard.module.scss'

export const UserCardSkeleton = () => {
    return (
        <div className={styles.card}>
            <Skeleton width='36px' height='36px' borderRadius='50%' isBlack={true} />
            <h3 className={styles.nickname}>
                <Skeleton width='120px' height='17px' borderRadius='12px' isBlack={true} />
            </h3>
        </div>
    )
}
