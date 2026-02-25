import { Skeleton } from '../skeleton'
import styles from './Table.module.scss'

export const TableSkeleton = () => {
    return (
        <tr className={styles.table__row}>
            <td className={styles.table__data}>
                <div className={styles.artist}>
                    <Skeleton width='40px' height='40px' borderRadius='6px' />
                    <p className={styles.artist__nickname}>
                        <Skeleton width='150px' height='21px' borderRadius='6px' />
                    </p>
                </div>
            </td>
            <td className={styles.table__data}>
                <Skeleton width='30px' height='21px' borderRadius='6px' />
            </td>
            <td className={styles.table__data}>
                <Skeleton width='32px' height='32px' borderRadius='50%' />
            </td>
            <td className={styles.table__data}>
                <div className={styles.action}>
                    <Skeleton width='32px' height='32px' borderRadius='6px' />
                    <Skeleton width='32px' height='32px' borderRadius='6px' />
                </div>
            </td>
        </tr>
    )
}
