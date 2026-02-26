import { IArtist } from '@/entities/artist'
import styles from './SearchItem.module.scss'
import { FC } from 'react'

interface SearchItemProps {
    data: IArtist
    onClick: (data: IArtist) => void
}

export const SearchItem: FC<SearchItemProps> = ({ data, onClick }) => {
    return (
        <li className={styles.search__item} onClick={() => onClick(data)}>
            {
                data.avatarUrl ?
                <img src={`${data.avatarUrl}`} alt="" className={styles.search__avatar} />
                :
                <div className={styles.search__avatar}></div>
            }
            <p className={styles.search__name}>{data.name}</p>
        </li> 
    )
}
