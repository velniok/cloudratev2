import { Skeleton } from '@/shared/ui'
import styles from './ArtistCard.module.scss'

export const ArtistCardSkeleton = () => {
    return (
        <div className={styles.card}>
            <Skeleton className={styles.avatar} width='175px' height='175px' borderRadius='50%' />
            <h3 className={styles.name}>
                <Skeleton width='120px' height='19px' borderRadius='6px' />
            </h3>
        </div>
    )
}
