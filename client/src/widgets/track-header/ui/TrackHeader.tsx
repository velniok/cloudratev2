import type { FC } from "react"
import type { ITrack } from "@/entities/track"
import { TrackHeaderInfo } from "@/entities/track"
import styles from "./TrackHeader.module.scss"
import { TStatus } from "@/shared/types"

interface TrackHeaderProps {
    track: ITrack
    trackStatus: TStatus
}

export const TrackHeader: FC<TrackHeaderProps> = ({ track, trackStatus }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                {
                    trackStatus === 'success'
                    ?
                    <TrackHeaderInfo track={track} />
                    :
                    <>Загрузка</>
                }
            </div>
        </div>
    )
}