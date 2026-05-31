import { Slider, Title } from '@/shared/ui'
import styles from './LatestTracks.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { useEffect } from 'react'
import { getLatestTracksThunk, selectLatestTracks, selectLatestTracksStatus } from '@/features/home'
import { TrackCard, TrackCardSekelton } from '@/entities/track'

export const LatestTracks = () => {

    const dispatch = useAppDispatch()
    const tracks = useAppSelector(selectLatestTracks)
    const tracksStatus = useAppSelector(selectLatestTracksStatus)

    useEffect(() => {
        dispatch(getLatestTracksThunk())
    }, [])

    return (
        <section className={styles.section}>
            <div className="container">
                <Title>ДОБАВЛЕННЫЕ ТРЕКИ</Title>
                <Slider>
                    {
                        tracksStatus === 'success' && tracks ?
                        tracks.map((track) => {
                            return <TrackCard key={track.id} track={track} />
                        })
                        :
                        Array.from({ length: 6 }).map((_, index) => {
                            return <TrackCardSekelton key={index} />
                        })
                    }
                </Slider>
            </div>
        </section>
    )
}
