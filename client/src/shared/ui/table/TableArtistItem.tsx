import { FC, ReactNode } from 'react'
import { Rating } from '../rating'
import styles from './Table.module.scss'
import { IArtist } from '@/entities/artist'
import { Cover } from '../cover'
import { Link } from 'react-router-dom'
import { getOptimizedAvatar } from '@/shared/lib'

interface TableArtistItemProps {
    artist: IArtist
    actions: {
        name: string
        func: (id: number) => ReactNode
    }[]
}

export const TableArtistItem: FC<TableArtistItemProps> = ({ artist, actions }) => {

    return (
        <tr className={styles.table__row}>
            <td className={styles.table__data}>
                <Link to={`/artist/${artist.id}`} className={styles.artist}>
                    <Cover width='40px' height='40px' borderRadius='6px' url={getOptimizedAvatar(artist.avatarUrl ?? '', 40, 40)} />
                    <p className={styles.artist__nickname}>{artist.name}</p>
                </Link>
            </td>
            <td className={styles.table__data}>
                <p className={styles.artist__tracks}>{artist.tracksCount}</p>
            </td>
            <td className={styles.table__data}>
                {
                    artist.avgRating ? <Rating>{artist.avgRating}</Rating> : <p className={styles.artist__tracks}>Нет оценок</p>
                }
            </td>
            <td className={styles.table__data}>
                <div className={styles.action}>
                    {
                        actions.map((action, index) => {
                            return <div key={index} className={`${styles.action__button} ${styles[action.name]}`}>{action.func(artist.id)}</div>
                        })
                    }
                </div>
            </td>
        </tr>
    )
}
