import { Skeleton } from '@/shared/ui'
import styles from './SuggestionRow.module.scss'

export const SuggestionRowSkeleton = () => {
    return (
        <li className={`${styles.item}`}>
            <div className={styles.item__left}>
                <Skeleton isBlack width='100px' height='100px' borderRadius='12px' />
                <div className={styles.item__track}>
                    <div className={styles.item__trackInfo}>
                        <h3 className={styles.item__title}>
                            <Skeleton isBlack width='150px' height='23px' borderRadius='6px' />
                        </h3>
                        <div className={styles.item__soundcloud}>
                            <i className="ph ph-soundcloud-logo"></i>
                        </div>
                    </div>
                        <div className={styles.item__artist}>
                            <Skeleton isBlack width='25px' height='25px' borderRadius='50%' />
                            <h4 className={styles.item__artistName}>
                                <Skeleton isBlack width='100px' height='14px' borderRadius='6px' />
                            </h4>
                        </div>
                    <p className={styles.item__release}>
                        <i className='ph ph-calendar-blank'></i>
                        <Skeleton isBlack width='100px' height='12px' borderRadius='6px' />
                    </p>
                </div>
            </div>
            <div className={styles.item__right}>
                <div className={styles.item__status}>
                    <p className={`${styles.item__statusBadge}`}>
                        <Skeleton isBlack width='100px' height='29px' borderRadius='12px' />
                    </p>
                </div>
                <div className={styles.item__accept}>
                    <p className={styles.item__userCreated}>
                        <i className="ph ph-clock"></i>
                        <Skeleton isBlack width='80px' height='15px' borderRadius='12px' />
                    </p>
                </div>
            </div>
        </li>
    )
}
