import { Cover, Rating, Skeleton } from '@/shared/ui'
import styles from './TrackCard.module.scss'

export const TrackCardSekelton = () => {
    return (
        <div className={styles.card}>
            <Skeleton className={styles.cover} width='200px' height='200px' borderRadius='12px' mb='16px' />
            <h3 className={styles.title}>
                <Skeleton width='75%' height='15px' borderRadius='6px' />
            </h3>
            <ul className={styles.artist__list}>
                <Skeleton width='50%' height='12px' borderRadius='6px' />
            </ul>
            <Skeleton width='32px' height='32px' borderRadius='50%' />
        </div>
    )
}
