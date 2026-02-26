import { TrackCard, type ITrack } from "@/entities/track"
import { Title } from "@/shared/ui"
import styles from "./LatestReleases.module.scss"

export const LatestReleases = () => {

    const tracks: ITrack[] = [
        {
            kind: 'track',
            id: 1,
            title: 'овердоз',
            artistIds: ['1'],
            artists: [],
            rating: 52,
        },
        {
            kind: 'track',
            id: 2,
            title: 'sv moscow',
            artistIds: ['1'],
            artists: [],
            rating: 32,
        },
        {
            kind: 'track',
            id: 3,
            title: 'попал',
            artistIds: ['1'],
            artists: [],
            rating: 67,
        },
    ]

    return (
        <section className={styles.section}>
            <div className="container">
                <Title>СВЕЖИЕ РЕЛИЗЫ</Title>
                <div className={styles.list}>
                    {
                        tracks.map((track) => {
                            return <TrackCard key={track.id} track={track} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}
