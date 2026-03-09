import type { FC } from "react"
import { TrackCard, TrackCardSekelton  } from "@/entities/track"
import { Slider, Title } from "@/shared/ui"
import styles from "./ArtistTopTracks.module.scss"
import { TStatus } from "@/shared/types"
import { IArtist } from "@/entities/artist"

interface ArtistTopTracksProps {
    artist: IArtist
    artistStatus: TStatus
}

export const ArtistTopTracks: FC<ArtistTopTracksProps> = ({ artist, artistStatus }) => {

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <Title>ТОП ТРЕКОВ</Title>
                <Slider>
                    {
                        artistStatus === 'success'
                        ?
                        <>
                        {
                            artist.tracks ?
                            <>
                            {
                                artist.tracks.map((track) => {
                                    return <TrackCard key={track.id} track={track} />
                                })
                            }
                            </>
                            :
                            <>Треков нет</>
                        }
                        </>
                        :
                        Array.from({ length: 5 }).map((_, index) => {
                            return <TrackCardSekelton key={index} />
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}
