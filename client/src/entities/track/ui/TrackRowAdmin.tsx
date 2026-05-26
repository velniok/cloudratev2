import { Link } from 'react-router-dom'
import styles from './TrackRowAdmin.module.scss'
import { FC } from 'react'
import { ITrack } from '../model/types'
import { Cover, Rating } from '@/shared/ui'
import { getMonth, getOptimizedAvatar } from '@/shared/lib'

interface TrackRowAdminProps {
    track: ITrack
    hundleUpdateTrack: (id: number) => void
    hundleDeleteTrack: (id: number) => void
}

export const TrackRowAdmin: FC<TrackRowAdminProps> = ({ track, hundleUpdateTrack, hundleDeleteTrack }) => {
    return (
        <li className={styles.item}>
            <span className={styles.id}>#{track.id}</span>
            <Link to={`/track/${track.id}`} className={styles.track}>
                <Cover
                    url={getOptimizedAvatar(track.coverUrl ?? '', 32, 32)}
                    width='32px'
                    height='32px'
                    borderRadius='50%'
                />
                <h3 className={styles.track__title}>{track.title}</h3>
            </Link>
            <div className={styles.artists}>
                <Link to={`/artist/${track.artistId}`} className={styles.artists__item}>
                    <Cover
                        url={getOptimizedAvatar(track.artist.avatarUrl ?? '', 32, 32)}
                        width='32px'
                        height='32px'
                        borderRadius='50%'
                    />
                    <p className={styles.artists__name}>{track.artist.name}</p>
                </Link>
                {
                    track.featArtists &&
                    <div className={styles.artists__feat}>
                        <p className={styles.artists__text}>feat.</p>
                        <ul className={styles.artists__list}>
                            {
                                track.featArtists.map((feat) => {
                                    return (
                                        <li key={feat.id} className={styles.artists__nameFeat}>
                                            <Link to={`/artist/${feat.id}`}>
                                                {feat.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
            {
                track.avgRating ? <Rating>{track.avgRating}</Rating> : <Rating>-</Rating>
            }
            <p className={styles.release}>{new Date(track.releaseData).getUTCDate()} {getMonth(track.releaseData, 'pluralize')} {new Date(track.releaseData).getUTCFullYear()}г.</p>
            <div className={styles.actions}>
                <i className={`ph ph-pencil-simple ${styles.actions__edit}`} onClick={() => hundleUpdateTrack(track.id)}></i>
                <i className={`ph ph-trash ${styles.actions__delete}`} onClick={() => hundleDeleteTrack(track.id)}></i>
            </div>
        </li>
    )
}
