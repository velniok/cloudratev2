import { Skeleton } from '@/shared/ui'
import styles from './TrackHeaderInfo.module.scss'

export const TrackHeaderInfoSkeleton = () => {
    return (
        <div className={styles.inner}>
            <Skeleton width='200px' height='200px' borderRadius='12px' />
            <div className={styles.info}>
                <ul className={styles.artist__list}>
                    <li className={styles.artist__item}>
                        <Skeleton width='32px' height='32px' borderRadius='50%' />
                        <h3 className={styles.artist__name}>
                            <Skeleton width='100px' height='21px' borderRadius='6px' />
                        </h3>
                    </li>
                </ul>
                <h2 className={styles.title}>
                    <Skeleton width='200px' height='52px' borderRadius='12px' />
                </h2>
                <Skeleton width='222px' height='51px' borderRadius='999px' />
            </div>
        </div>
    )
}
