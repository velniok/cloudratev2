import { ITrack } from '@/entities/track'
import styles from './Table.module.scss'
import { FC, ReactNode } from 'react'
import { Rating } from '../rating'
import { Cover } from '../cover'
import { Link } from 'react-router-dom'
import { getOptimizedAvatar } from '@/shared/lib'

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
                    <Cover width='40px' height='40px' borderRadius='6px' url={getOptimizedAvatar(track.coverUrl ?? '', 40, 40)} />
                    <p className={styles.track__title}>{track.title}</p>
                </Link>
            </td>
            <td className={styles.table__data}>
                <div className={styles.track__artist}>
                    <Link to={`/artist/${track.artistId}`} className={styles.track__artistItem}>
                        <Cover width='32px' height='32px' borderRadius='50%' url={track.artist.avatarUrl ?? ''} />
                        <p className={styles.track__artistNickname}>{track.artist.name}</p>
                    </Link>
                    <ul className={styles.track__artistList}>
                        {
                            track.featArtists &&
                            <div className={styles.track__feat}>
                            feat.
                            {
                                track.featArtists.map((artist) => {
                                    return (
                                        <Link key={artist.id} to={`/artist/${artist.id}`} className={styles.track__featNickname}>{artist.name}</Link>
                                    )
                                })
                            }
                            </div>
                        }
                    </ul>
                </div>
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
