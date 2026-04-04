import { TrackCard, TrackCardSekelton } from "@/entities/track"
import { Slider, Title } from "@/shared/ui"
import styles from "./LatestReleases.module.scss"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { getNewTracksThunk, selectNewTracks, selectNewTracksStatus } from "@/features/home"
import { useEffect } from "react"

export const LatestReleases = () => {

    const dispatch = useAppDispatch()
    const newTracks = useAppSelector(selectNewTracks)
    const newTracksStatus = useAppSelector(selectNewTracksStatus)

    useEffect(() => {
        dispatch(getNewTracksThunk())
    }, [])

    return (
        <section className={styles.section}>
            <div className="container">
                <Title>СВЕЖИЕ РЕЛИЗЫ</Title>
                <Slider>
                    {
                        newTracksStatus === 'success' && newTracks ?
                        <>
                        {
                            newTracks.map((track) => {
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
