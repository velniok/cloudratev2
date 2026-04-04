import type { FC } from "react"
import { TrackCard, TrackCardSekelton  } from "@/entities/track"
import { Slider, Title } from "@/shared/ui"
import styles from "./ArtistTopTracks.module.scss"
import { IArtist } from "@/entities/artist"

interface ArtistTopTracksProps {
    artist: IArtist
}

export const ArtistTopTracks: FC<ArtistTopTracksProps> = ({ artist }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ТОП ТРЕКОВ</Title>
                <Slider>
                    {
                        artist.topTracks ?
                        <>
                        {
                            artist.topTracks.map((track) => {
                                return <TrackCard key={track.id} track={track} />
                            })
                        }
                        </>
                        :
                        <>Треков нет</>
                    }
                </Slider>
            </div>
        </div>
    )
}
