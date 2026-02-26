import { TrackCard, type ITrack } from "@/entities/track"
import { Title } from "@/shared/ui"
import styles from "./LatestRatedTracks.module.scss"

export const LatestRatedTracks = () => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>НЕДАВНИЕ ОЦЕНКИ</Title>
                <div className={styles.list}>
                    {/* {
                        tracks.map((track) => {
                            return <TrackCard key={track.id} track={track} />
                        })
                    } */}
                </div>
            </div>
        </div>
    )
}
