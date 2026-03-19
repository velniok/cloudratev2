import { ITrack } from '@/entities/track'
import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { Rating } from '../rating'
import { Cover } from '../cover'
import { Link } from 'react-router-dom'

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
                <Link to={`/track/${track.id}`} className={styles.track}>
                    <Cover width='40px' height='40px' borderRadius='6px' url={track.coverUrl} />
                    <p className={styles.track__title}>{track.title}</p>
                </Link>
            </td>
            <td className={styles.table__data}>
                <ul className={styles.track__artistList}>
                    {
                        track.artists.map((artist) => {
                            return (
                                <li key={artist.id} className={styles.track__artistItem}>
                                    <Cover width='32px' height='32px' borderRadius='50%' url={artist.avatarUrl} />
                                    <p className={styles.track__artistNickname}>{artist.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </td>
            <td className={styles.table__data}>
                {
                    track.avgRating ? <Rating>{track.avgRating}</Rating> : <p className={styles.track__release}>Оценок нет</p>
                }
            </td>
            <td className={styles.table__data}>
                <p className={styles.track__release}>{new Date(track.releaseData).toLocaleDateString()}</p>
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
