import { Skeleton } from '@/shared/ui'
import styles from './ArtistCard.module.scss'

export const ArtistCardSkeleton = () => {
    return (
        <div className={styles.card}>
            <Skeleton width='140px' height='140px' borderRadius='50%' />
            <h3 className={styles.name}>
                <Skeleton width='120px' height='19px' borderRadius='6px' />
            </h3>
        </div>
    )
}
