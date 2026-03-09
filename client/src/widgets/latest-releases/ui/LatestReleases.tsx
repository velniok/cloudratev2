import { TrackCard, TrackCardSekelton } from "@/entities/track"
import { Slider, Title } from "@/shared/ui"
import styles from "./LatestReleases.module.scss"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { getTracksThunk, selectTrackList, selectTrackListStatus } from "@/features/track"
import { useEffect } from "react"

export const LatestReleases = () => {

    const dispatch = useAppDispatch()
    const trackList = useAppSelector(selectTrackList)
    const trackListStatus = useAppSelector(selectTrackListStatus)

    useEffect(() => {
        dispatch(getTracksThunk({ page: 1, limit: 15 }))
    }, [])

    return (
        <section className={styles.section}>
            <div className="container">
                <Title>СВЕЖИЕ РЕЛИЗЫ</Title>
                <Slider>
                    {
                        trackListStatus === 'success'
                        ?
                        <>
                        {
                            trackList.map((track) => {
                                return <TrackCard key={track.id} track={track} />
                            })
                        }
                        </>
                        :
                        Array.from({ length: 5 }).map((_, index) => {
                            return <TrackCardSekelton key={index} />
                        })
                    }
                </Slider>
            </div>
        </section>
    )
}
