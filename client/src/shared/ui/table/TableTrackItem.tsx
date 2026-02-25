import { ITrack } from '@/entities/track'
import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { Rating } from '../rating'

interface TableTrackItemProps {
    track: ITrack
    actions: {
        name: string
        func: (id: number) => ReactNode
    }[]
}

export const TableTrackItem: FC<TableTrackItemProps> = ({ track, actions }) => {
    return (
        <tr className={styles.table__row}>
            <td className={styles.table__data}>
                <div className={styles.artist}>
                    {
                        track.coverUrl
                        ?
                        <img src={`${track.coverUrl}`} alt="" className={styles.track__cover} />
                        :
                        <div className={styles.track__cover}></div>
                    }
                    <p className={styles.track__title}>{track.title}</p>
                </div>
            </td>
            <td className={styles.table__data}>
                <ul className={styles.track__artistList}>
                    {
                        track.artists.map((artist) => {
                            return (
                                <li className={styles.track__artistItem}>
                                    <img src={`${artist.avatarUrl}`} alt="" className={styles.artist__avatar} />
                                    <p className={styles.artist__nickname}>{artist.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </td>
            <td className={styles.table__data}>
                {
                    track.rating
                    ?
                    <Rating>{track.rating}</Rating>
                    :
                    <Rating>0</Rating>
                }
            </td>
            <td className={styles.table__data}>
                <div className={styles.action}>
                    {
                        actions.map((action, index) => {
                            return <div key={index} className={`${styles.action__button} ${styles[action.name]}`}>{action.func(track.id)}</div>
                        })
                    }
                </div>
            </td>
        </tr>
    )
}
