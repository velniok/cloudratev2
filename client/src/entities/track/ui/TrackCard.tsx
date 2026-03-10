import { MouseEvent, useState, type FC } from "react"
import styles from "./TrackCard.module.scss"
import { Link, useNavigate } from "react-router-dom"
import type { ITrack } from "../model/types"
import { Cover, CriteriasPopup, Rating } from "@/shared/ui"
import { IReview } from "@/entities/review"

interface TrackCardProps {
    track: ITrack
    review?: IReview
}

export const TrackCard: FC<TrackCardProps> = ({ track, review }) => {

    const navigate = useNavigate()

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [criterias, setCriterias] = useState<boolean>(false)

    const handleOpenCriterias = (e: MouseEvent) => {
        e.stopPropagation()
        if (true) {
            document.dispatchEvent(new Event('closePopups'))
        }
        setCriterias(!criterias)
    }

    return (
        <div className={styles.card} style={{ zIndex: `${criterias ? '1' : '0'}` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={`/track/${track.id}`}>
                <Cover isHovered={isHovered} mb={'mb-16'} url={track.coverUrl} width="205px" height="205px" borderRadius="12px" />
            </Link>
            <h3 className={styles.title}>{track.title}</h3>
            <ul className={styles.artist__list}>
                {
                    track.artists.map((artist) => {
                        return (
                            <li key={artist.id} className={styles.artist__item} onClick={() => navigate(`/artist/${artist.id}`)}>
                                {artist.name}
                            </li>
                        )
                    })
                }
            </ul>
            <div className={styles.rating}>
                {
                    review ?
                    <>
                        <Rating active={criterias} isHover={true} onClick={(e: MouseEvent) => handleOpenCriterias(e)}>{review.rating}</Rating>
                        <CriteriasPopup review={Boolean(review.text)} close={() => setCriterias(false)} position={'top'} show={criterias} avgCriterias={[review.criteria1, review.criteria2, review.criteria3, review.criteria4, review.criteria5]} />
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
                            {
                                track.avgCriterias &&
                                <CriteriasPopup close={() => setCriterias(false)} position={'top'} show={criterias} avgCriterias={Object.values(track.avgCriterias)} />
                            }
                        </>
                        : <span className={styles.rating__text}>Оценок нет</span>
                        }
                    </>
                }
            </div>
        </div>
    )
}
