import { getOneTrackThunk, selectTrack, selectTrackStatus } from "@/features/track"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
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

    useEffect(() => {
        dispatch(getOneTrackThunk({ id: Number(id) }))
    }, [id])

    return (
        <>
            <TrackHeader track={track} trackStatus={trackStatus} />
            <TrackGrade track={track} trackStatus={trackStatus} />
            <TrackReviews track={track} trackStatus={trackStatus} />
        </>
    )
}