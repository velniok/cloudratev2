import { FC, ReactNode } from 'react'
import { Rating } from '../rating'
import styles from './Table.module.scss'
import { IArtist } from '@/entities/artist'

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
                <div className={styles.artist}>
                    {
                        artist.avatarUrl
                        ?
                        <img src={`${artist.avatarUrl}`} alt="" className={styles.artist__avatar} />
                        :
                        <div className={styles.artist__avatar}></div>
                    }
                    <p className={styles.artist__nickname}>{artist.name}</p>
                </div>
            </td>
            <td className={styles.table__data}>{artist.tracks.length}</td>
            <td className={styles.table__data}>
                {
                    artist.avgRating
                    ?
                    <Rating>{artist.avgRating}</Rating>
                    :
                    <Rating>0</Rating>
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
