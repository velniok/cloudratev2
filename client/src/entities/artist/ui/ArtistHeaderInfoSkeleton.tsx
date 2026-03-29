import { LinkIcon, Skeleton } from '@/shared/ui'
import styles from './ArtistHeaderInfo.module.scss'

export const ArtistHeaderInfoSkeleton = () => {
    return (
        <div className={styles.inner}>
            <Skeleton className={styles.avatar} width='200px' height='200px' borderRadius='12px' />
            <div className={styles.info}>
                <h2 className={styles.name}>
                    <Skeleton width='180px' height='52px' borderRadius='12px' />
                </h2>
                <a className={styles.soundcloud}>
                    <Skeleton width='105px' height='17px' borderRadius='6px' />
                </a>
                <ul className={styles.stats__list}>
                    <li className={styles.stats__item}>
                        <Skeleton width='125px' height='37px' borderRadius='6px' />
                    </li>
                    <li className={styles.stats__item}>
                        <Skeleton width='125px' height='37px' borderRadius='6px' />
                    </li>
                </ul>
                <Skeleton width='205px' height='37px' borderRadius='12px' />
            </div>
        </div>
    )
}
