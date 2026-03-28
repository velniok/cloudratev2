import { useNavigate } from 'react-router-dom'
import styles from './TrackHeaderInfo.module.scss'
import type { ITrack } from '../model/types'
import { Cover, CriteriasPopup, LinkIcon, Rating } from '@/shared/ui'
import { MouseEvent, useState, type FC } from 'react'
import { getOptimizedAvatar, pluralize } from '@/shared/lib'

interface TrackHeaderInfoProps {
    track: ITrack
}

export const TrackHeaderInfo: FC<TrackHeaderInfoProps> = ({ track }) => {

    const navigate = useNavigate()

    const [criterias, setCriterias] = useState<boolean>(false)

    const handleOpenCriterias = (e: MouseEvent) => {
        e.stopPropagation()
        if (true) {
            document.dispatchEvent(new Event('closePopups'))
        }
        setCriterias(!criterias)
    }

    return (
        <div className={styles.inner}>
            <Cover url={getOptimizedAvatar(track.coverUrl, 200, 200)} width='200px' height='200px' borderRadius='12px' />
            <div className={styles.info}>
                <ul className={styles.artist__list}>
                    {
                        track.artists.map((artist) => {
                            return (
                                <li key={artist.id} className={styles.artist__item} onClick={() => navigate(`/artist/${artist.id}`)}>
                                    <Cover width='32px' height='32px' borderRadius='50%' className={styles.artist__avatar} url={getOptimizedAvatar(artist.avatarUrl, 32, 32)} />
                                    <h3 className={styles.artist__name}>{artist.name}</h3>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2 className={styles.title}>{track.title}</h2>
                <a href={`${track.soundcloudUrl}`} className={styles.soundcloud}>
                    <LinkIcon />
                    SoundCloud
                </a>
                <p className={styles.release}>Дата релиза <strong className={styles.release__strong}>{new Date(track.releaseData).toLocaleDateString()}</strong></p>
                {
                    track.avgRating
                    ?
                        <div className={styles.rating__wrapper}>
                            <div className={`${styles.rating} ${criterias ? styles.open : ''}`} onClick={(e) => handleOpenCriterias(e)}>
                                <Rating>{track.avgRating}</Rating>
                                <div className={styles.rating__info}>
                                    <p className={styles.rating__title}>СРЕДНИЙ БАЛЛ</p>
                                    <p className={styles.rating__desc}>На основе {track.reviews.length} {pluralize(track.reviews.length, 'оценки', 'оценок', 'оценок')}</p>
                                </div>
                            </div>
                            <CriteriasPopup close={() => setCriterias(false)} position='bottom' show={criterias} avgCriterias={Object.values(track.avgCriterias)} />
                        </div>
                    :
                        <p className={styles.text}>Оценок нет</p>
                }
            </div>
        </div>
    )
}
