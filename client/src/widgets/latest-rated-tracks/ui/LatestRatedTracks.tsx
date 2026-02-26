import { TrackCard, type ITrack } from "@/entities/track"
import { Title } from "@/shared/ui"
import styles from "./LatestRatedTracks.module.scss"

export const LatestRatedTracks = () => {

    const tracks: ITrack[] = [
        {
            kind: 'track',
            id: 1,
            title: 'овердоз',
            artistIds: ['1'],
            rating: 52,
        },
        {
            kind: 'track',
            id: 2,
            title: 'sv moscow',
            artistIds: ['1'],
            rating: 32,
        },
        {
            kind: 'track',
            id: 3,
            title: 'попал',
            artistIds: ['1'],
            rating: 67,
        },
    ]

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>НЕДАВНИЕ ОЦЕНКИ</Title>
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
