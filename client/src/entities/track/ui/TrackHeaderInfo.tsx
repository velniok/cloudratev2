import { Link, useNavigate } from 'react-router-dom'
import styles from './TrackHeaderInfo.module.scss'
import type { ITrack } from '../model/types'
import { Cover, CriteriasTooltip, Rating, Tooltip } from '@/shared/ui'
import { type FC } from 'react'
import { getOptimizedAvatar, pluralize } from '@/shared/lib'

interface TrackHeaderInfoProps {
    track: ITrack
}

export const TrackHeaderInfo: FC<TrackHeaderInfoProps> = ({ track }) => {

    const navigate = useNavigate()

    return (
        <div className={styles.inner}>
            <Cover
                url={getOptimizedAvatar(track.coverUrl ?? '', 200, 200)}
                width='200px'
                height='200px'
                borderRadius='12px'
                className={styles.cover}
            />
            <div className={styles.info}>
                <h2 className={styles.title}>
                    {track.title}
                    <a href={`${track.soundcloudUrl}`} className={styles.soundcloud}>
                        <i className="ph ph-soundcloud-logo"></i>
                    </a>
                </h2>
                <ul className={styles.artist__list}>
                    <Link className={styles.artist__item} to={`/artist/${track.artist.id}`}>
                        <Cover width='32px' height='32px' borderRadius='50%' className={styles.artist__avatar} url={getOptimizedAvatar(track.artist.avatarUrl ?? '', 32, 32)} />
                        <h3 className={styles.artist__name}>{track.artist.name}</h3>
                    </Link>
                    {
                        track.featArtists?.map((artist) => {
                            return (
                                <li key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)}>
                                    <Link to={`/artist/${artist.id}`} className={styles.artist__item}>
                                        <Cover width='32px' height='32px' borderRadius='50%' className={styles.artist__avatar} url={getOptimizedAvatar(artist.avatarUrl ?? '', 32, 32)} />
                                        <h3 className={styles.artist__name}>{artist.name}</h3>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <p className={styles.release}>Дата релиза <strong className={styles.release__strong}>{new Date(track.releaseData).toLocaleDateString()}</strong></p>
                {
                    track.avgRating
                    ?
                        <div className={styles.rating__wrapper}>
                            <Tooltip
                                tooltip={ <CriteriasTooltip avgCriterias={Object.values(track.avgCriterias)} /> }
                                place='bottom'
                            >
                                <div className={styles.rating}>
                                    <Rating>{track.avgRating}</Rating>
                                    <div className={styles.rating__info}>
                                        <p className={styles.rating__title}>СРЕДНИЙ БАЛЛ</p>
                                        <p className={styles.rating__desc}>На основе {track.reviewsCount} {pluralize(track.reviewsCount, 'оценки', 'оценок', 'оценок')}</p>
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                    :
                        <p className={styles.text}>Оценок нет</p>
                }
            </div>
        </div>
    )
}
