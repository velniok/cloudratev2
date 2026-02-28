import { useState, type FC } from "react"
import styles from "./TrackCard.module.scss"
import { Link, useNavigate } from "react-router-dom"
import type { ITrack } from "../model/types"
import { Cover, Rating } from "@/shared/ui"
import { IReview } from "@/entities/review"

interface TrackCardProps {
    track: ITrack
    review?: IReview
}

export const TrackCard: FC<TrackCardProps> = ({ track, review }) => {

    const navigate = useNavigate()

    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={`/track/${track.id}`}>
                <Cover isHovered={isHovered} mb={'mb-16'} url={track.coverUrl} width="200px" height="200px" borderRadius="12px" />
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
            <Rating>
                {
                    review ?
                    <>
                        {review.rating}
                    </>
                    :
                    <>
                        {track.avgRating ? track.avgRating : 0}
                    </>
                }
            </Rating>
        </div>
    )
}
