import { Skeleton } from '@/shared/ui'
import styles from './ArtistRow.module.scss'

export const ArtistRowSkeleton = () => {
    return (
       <li className={styles.row}>
            <div className={styles.row__left}>
                <Skeleton height='48px' width='48px' borderRadius='8px' />
                <div className={styles.row__info}>
                    <h3 className={styles.row__name}>
                        <Skeleton height='17px' width='150px' borderRadius='8px' />
                    </h3>
                    <p className={styles.row__followers}>
                        <Skeleton height='15px' width='75px' borderRadius='8px' />
                    </p>
                </div>
            </div>
            <div className={styles.row__right}>
                <div className={styles.row__action}>
                    <Skeleton height='30px' width='160px' borderRadius='12px' />
                </div>
            </div>
       </li>
    )
}
