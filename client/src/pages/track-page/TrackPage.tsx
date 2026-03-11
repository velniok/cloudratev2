import { selectAuthUser } from "@/features/auth"
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
    const authUser = useAppSelector(selectAuthUser)
    const track = useAppSelector(selectTrack)
    const trackStatus = useAppSelector(selectTrackStatus)

    useEffect(() => {
        if (authUser) {
            dispatch(getOneTrackThunk({ trackId: Number(id), userId: authUser.id }))
        }
    }, [id, authUser])

    return (
        <>
            <TrackHeader track={track} trackStatus={trackStatus} />
            <TrackGrade track={track} trackStatus={trackStatus} />
            <TrackReviews track={track} trackStatus={trackStatus} />
        </>
    )
}