import { Link, useNavigate } from 'react-router-dom'
import styles from './TrackHeaderInfo.module.scss'
import type { ITrack } from '../model/types'
import { Cover, Rating } from '@/shared/ui'
import type { FC } from 'react'

interface TrackHeaderInfoProps {
    track: ITrack
}

export const TrackHeaderInfo: FC<TrackHeaderInfoProps> = ({ track }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.inner}>
            <Cover url={track.coverUrl} width='200px' height='200px' borderRadius='12px' />
            <div className={styles.info}>
                <ul className={styles.artist__list}>
                    {
                        track.artists.map((artist) => {
                            return (
                                <li key={artist.id} className={styles.artist__item} onClick={() => navigate(`/artist/${artist.id}`)}>
                                    <Cover width='32px' height='32px' borderRadius='50%' url={artist.avatarUrl} />
                                    <h3 className={styles.artist__name}>{artist.name}</h3>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2 className={styles.title}>{track.title}</h2>
                <div className={styles.rating}>
                    <Rating>{track.avgRating}</Rating>
                    <div className={styles.rating__info}>
                        <p className={styles.rating__title}>СРЕДНИЙ БАЛЛ</p>
                        <p className={styles.rating__desc}>На основе {track.reviews.length} оценок</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
