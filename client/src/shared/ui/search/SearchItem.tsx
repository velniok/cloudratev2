import { IArtist } from '@/entities/artist'
import styles from './SearchItem.module.scss'
import { FC } from 'react'
import { Cover } from '../cover'

interface SearchItemProps {
    data: IArtist
    onClick: (data: IArtist) => void
}

export const SearchItem: FC<SearchItemProps> = ({ data, onClick }) => {
    return (
        <li className={styles.search__item} onClick={() => onClick(data)}>
            <Cover width='30px' height='30px' borderRadius='50%' url={data.avatarUrl ?? ''} />
            <p className={styles.search__name}>{data.name}</p>
        </li> 
    )
}
