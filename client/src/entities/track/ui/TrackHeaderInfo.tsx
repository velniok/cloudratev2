import { Link, useNavigate } from 'react-router-dom'
import styles from './TrackHeaderInfo.module.scss'
import type { ITrack } from '../model/types'
import { Cover } from '@/shared/ui'
import type { FC } from 'react'

interface TrackHeaderInfoProps {
    track: ITrack
}

export const TrackHeaderInfo: FC<TrackHeaderInfoProps> = ({ track }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.inner}>
            <Cover size={`maxSize`} url={track.coverUrl} />
            <div className={styles.info}>
                <ul className={styles.artist__list}>
                    {
                        track.artists.map((artist) => {
                            return (
                                <li key={artist.id} className={styles.artist__item} onClick={() => navigate(`/artist/${artist.id}`)}>
                                    {
                                        artist.avatarUrl
                                        ?
                                        <img src={`${artist.avatarUrl}`} alt="" className={styles.artist__avatar} />
                                        :
                                        <div className={styles.artist__avatar}></div>
                                    }
                                    <h3 className={styles.artist__name}>{artist.name}</h3>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2 className={styles.title}>{track.title}</h2>
                <div className={styles.rating}>
                    <p className={styles.rating__num}>{track.rating}</p>
                    <div className={styles.rating__info}>
                        <p className={styles.rating__title}>СРЕДНИЙ БАЛЛ</p>
                        <p className={styles.rating__desc}>На основе 128 оценок</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
