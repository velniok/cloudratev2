import { Skeleton } from '../skeleton'
import styles from './SearchItem.module.scss'

export const SearchItemSkeleton = () => {
    return (
        <li className={styles.search__item}>
            <div className={styles.search__avatar}>
                <Skeleton width='30px' height='30px' borderRadius='50%' />
            </div>
            <Skeleton width='150px' height='14px' borderRadius='6px' />
        </li> 
    )
}
