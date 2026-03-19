import { Skeleton } from '@/shared/ui'
import styles from './UserHeaderInfo.module.scss'

export const UserHeaderInfoSkeleton = () => {
    return (
        <div className={styles.inner}>
            <Skeleton width='150px' height='150px' borderRadius='24px' />
            <div className={styles.info}>
                <h2 className={styles.nickname}>
                    <Skeleton width='280px' height='38px' borderRadius='12px' />
                    <Skeleton width='90px' height='24px' borderRadius='6px' />
                </h2>
                <p className={styles.username}>
                    <Skeleton width='120px' height='20px' borderRadius='6px' />
                </p>
                <div className={styles.created}>
                    <Skeleton width='250px' height='19px' borderRadius='6px' />
                </div>
                <p className={styles.soundcloud}>
                    <Skeleton width='105px' height='17px' borderRadius='6px' />
                </p>
                <div className={styles.stats}>
                    <div className={styles.stats__item}>
                        <Skeleton width='68px' height='38px' borderRadius='6px' />
                    </div>
                    <div className={styles.stats__item}>
                        <Skeleton width='68px' height='38px' borderRadius='6px' />
                    </div>
                </div>
            </div>
        </div>
    )
}
