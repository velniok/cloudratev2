import { FC, useState } from 'react'
import styles from './TrackRow.module.scss'
import { ITrack } from '../model/types'
import { Cover, CriteriasTooltip, Rating, Tooltip } from '@/shared/ui'
import { getOptimizedAvatar } from '@/shared/lib'
import { Link, useNavigate } from 'react-router-dom'
import { IReview } from '@/entities/review'

interface TrackRowProps {
    track: ITrack
    review?: IReview
}

export const TrackRow: FC<TrackRowProps> = ({ track, review }) => {

    const navigate = useNavigate()
    const [isTooltip, setIsTooltip] = useState<boolean>(false)

    return (
       <li className={styles.row}>
            <Link className={styles.link} to={`/track/${track.id}`}>
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
                            track.avgRating ?
                            <>
                            {
                                track.avgCriterias ?
                                    <Tooltip
                                        tooltip={ <CriteriasTooltip avgCriterias={Object.values(track.avgCriterias)} /> }
                                        setIsTooltip={setIsTooltip}
                                    >
                                        <Rating isHover={isTooltip}>{track.avgRating}</Rating>
                                    </Tooltip>
                                :
                                track.avgRating && <Rating>{track.avgRating}</Rating>
                            }
                            </>
                            : review ?
                            <Tooltip
                                tooltip={ <CriteriasTooltip isComment={!!review.text} avgCriterias={[review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]} /> }
                                setIsTooltip={setIsTooltip}
                            >
                                <Rating isHover={isTooltip}>{review.rating}</Rating>
                            </Tooltip>
                            :
                            <span className={styles.rating__text}>Оценок нет</span>
                        }
                    </div>
                </div>
            </Link>
       </li>
    )
}
