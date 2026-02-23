import { TrackCard, type ITrack } from "@/entities/track"
import { Title } from "@/shared/ui"
import styles from "./LatestReleases.module.scss"

export const LatestReleases = () => {

    const tracks: ITrack[] = [
        {
            id: 1,
            title: 'овердоз',
            artist: 'темный принц',
            rating: 52,
        },
        {
            id: 2,
            title: 'sv moscow',
            artist: 'королевский XVII',
            rating: 32,
        },
        {
            id: 3,
            title: 'попал',
            artist: 'tewiq',
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
