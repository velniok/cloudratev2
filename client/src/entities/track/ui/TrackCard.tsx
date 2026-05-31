import { useState, type FC } from "react"
import styles from "./TrackCard.module.scss"
import { Link } from "react-router-dom"
import type { ITrack } from "../model/types"
import { Cover, CriteriasTooltip, Rating, Tooltip } from "@/shared/ui"
import { IReview } from "@/entities/review"
import { getOptimizedAvatar } from "@/shared/lib"

interface TrackCardProps {
    track: ITrack
    review?: IReview
}

export const TrackCard: FC<TrackCardProps> = ({ track, review }) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isTooltip, setIsTooltip] = useState<boolean>(false)

    return (
        <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={`/track/${track.id}`}>
                <Cover
                    isHovered={isHovered}
                    mb={'mb-16'}
                    url={getOptimizedAvatar(track.coverUrl ?? '', 180, 180)}
                    width="175px"
                    height="175px"
                    borderRadius="12px"
                    className={styles.cover}
                />
            </Link>
            <h3 className={styles.title}>{track.title}</h3>
            <ul className={styles.artist__list}>
                <p className={styles.artist__item}>
                    <Link className={styles.artist__link} to={`/artist/${track.artist.id}`}>
                        {track.artist.name}
                    </Link>
                </p>
                {
                    track.featArtists?.map((artist) => {
                        return (
                            <li key={artist.id} className={styles.artist__item}>
                                <Link className={styles.artist__link} to={`/artist/${artist.id}`}>
                                    {artist.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={styles.rating}>
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
    )
}