import { getTrackProfileThunk, selectTrack, selectTrackStatus } from "@/features/track"
import { useAppDispatch, useAppSelector, useDocumentTitle } from "@/shared/lib"
import { Loading } from "@/shared/ui"
import { TrackGrade } from "@/widgets/track-grade"
import { TrackHeader } from "@/widgets/track-header"
import { TrackReviews } from "@/widgets/track-reviews"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const TrackPage = () => {

    const dispatch = useAppDispatch()
    const id = useParams<{ id: string }>().id
    const track = useAppSelector(selectTrack)
    const trackStatus = useAppSelector(selectTrackStatus)

    useDocumentTitle(track ? `${track.title}` : 'Загрузка...')

    useEffect(() => {
        dispatch(getTrackProfileThunk({ trackId: Number(id) }))
    }, [id])

    return (
        <>
        {
            trackStatus === 'success' && track ?
            <>
                <TrackHeader track={track} />
                <TrackGrade track={track} />
                <TrackReviews trackId={track.id} />
            </>
            :
            <Loading />
        }
        </>
    )
}