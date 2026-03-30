import { Skeleton } from '@/shared/ui'
import styles from './TrackRow.module.scss'

export const TrackRowSkelton = () => {
    return (
       <li className={styles.row}>
            <div className={styles.row__left}>
                <Skeleton width='48px' height='48px' borderRadius='8px' />
                <div className={styles.row__info}>
                    <h3 className={styles.row__title}>
                        <Skeleton height='17px' width='150px' borderRadius='6px' />
                    </h3>
                    <ul className={styles.row__artistList}>
                        <li className={styles.row__artistItem}>
                            <Skeleton height='15px' width='75px' borderRadius='6px' />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.row__right}>
                <p className={styles.row__release}>
                    <Skeleton height='17px' width='35px' borderRadius='6px' />
                </p>
                <div className={styles.row__rating}>
                    <Skeleton height='32px' width='32px' borderRadius='50%' />
                </div>
            </div>
       </li>
    )
}
