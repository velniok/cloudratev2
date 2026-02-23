import type { FC } from "react"
import { TrackCard, type ITrack } from "@/entities/track"
import { Title } from "@/shared/ui"
import styles from "./ArtistTopTracks.module.scss"

interface ArtistTopTracksProps {
    tracks: ITrack[]
}

export const ArtistTopTracks: FC<ArtistTopTracksProps> = ({ tracks }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ТОП ТРЕКОВ</Title>
                <div className={styles.list}>
                    {
                        tracks.map((track) => {
                            return <TrackCard key={track.id} track={track} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
