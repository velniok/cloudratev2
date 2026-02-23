import type { FC } from "react"
import type { ITrack } from "@/entities/track"
import { TrackHeaderInfo } from "@/entities/track"
import styles from "./TrackHeader.module.scss"

interface TrackHeaderProps {
    track: ITrack
}

export const TrackHeader: FC<TrackHeaderProps> = ({ track }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <TrackHeaderInfo track={track} />
            </div>
        </div>
    )
}