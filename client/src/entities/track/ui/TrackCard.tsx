import { useState, type FC } from "react"
import styles from "./TrackCard.module.scss"
import { Link, useNavigate } from "react-router-dom"
import type { ITrack } from "../model/types"
import { Cover, Rating } from "@/shared/ui"

interface TrackCardProps {
    track: ITrack
}

export const TrackCard: FC<TrackCardProps> = ({ track }) => {

    const navigate = useNavigate()

    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={`/track/${track.id}`}>
                <Cover isHovered={isHovered} mb={'mb-16'} url={track.coverUrl} />
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
            <Rating>{track.avgRating}</Rating>
        </div>
    )
}
