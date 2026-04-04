import { FC, MouseEvent, useState } from 'react'
import styles from './TrackRow.module.scss'
import { ITrack } from '../model/types'
import { Cover, CriteriasPopup, Rating } from '@/shared/ui'
import { getOptimizedAvatar } from '@/shared/lib'
import { useNavigate } from 'react-router-dom'
import { IReview } from '@/entities/review'

interface TrackRowProps {
    track: ITrack
    review?: IReview
}

export const TrackRow: FC<TrackRowProps> = ({ track, review }) => {

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
       <li className={styles.row} onClick={() => navigate(`/track/${track.id}`)}>
            <div className={styles.row__left}>
                <Cover url={getOptimizedAvatar(track.coverUrl ?? '', 48, 48)} height='48px' width='48px' borderRadius='8px' />
                <div className={styles.row__info}>
                    <h3 className={styles.row__title}>{track.title}</h3>
                    <p className={styles.row__artistItem}>{track.artist.name}</p>
                    <ul className={styles.row__artistList}>
                        {
                            track.featArtists?.map((artist) => {
                                return (
                                    <li key={artist.id} className={styles.row__artistItem}>{artist.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.row__right}>
                {
                    !review && <p className={styles.row__release}>{new Date(track.releaseData).getUTCFullYear()}</p>
                }
                <div className={styles.row__rating}>
                    {
                        review ?
                        <>
                            <Rating active={criterias} isHover={true} onClick={(e: MouseEvent) => handleOpenCriterias(e)}>{review.rating}</Rating>
                        </>
                        :
                        <>
                            {
                            track.avgRating ?
                            <>
                                {
                                    track.avgCriterias ?
                                    <Rating active={criterias} isHover={true} onClick={(e: MouseEvent) => handleOpenCriterias(e)}>{track.avgRating}</Rating>
                                    :
                                    <Rating>{track.avgRating}</Rating>
                                }
                            </>
                            : <span className={styles.rating__text}>Оценок нет</span>
                            }
                        </>
                    }
                    {
                        review ?
                        <CriteriasPopup review={Boolean(review.text)} close={() => setCriterias(false)} position={'left'} show={criterias} avgCriterias={[review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]} />
                        :
                        <CriteriasPopup close={() => setCriterias(false)} position={'left'} show={criterias} avgCriterias={Object.values(track.avgCriterias)} />
                    }
                </div>
            </div>
       </li>
    )
}
