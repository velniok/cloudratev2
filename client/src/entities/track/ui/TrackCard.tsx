import { useState, type FC } from "react"
import styles from "./TrackCard.module.scss"
import { Link } from "react-router-dom"
import type { ITrack } from "../model/types"
import { Cover, Rating } from "@/shared/ui"

interface TrackCardProps {
    track: ITrack
}

export const TrackCard: FC<TrackCardProps> = ({ track }) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link to={'/track'}>
                <Cover isHovered={isHovered} mb={'mb-16'} />
            </Link>
            <h3 className={styles.title}>{track.title}</h3>
            <Link to={'/artist'} className={styles.artist}>{track.artist}</Link>
            <Rating>{track.rating}</Rating>
        </div>
    )
}
