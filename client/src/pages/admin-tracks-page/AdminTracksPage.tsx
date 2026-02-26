import { getTracksThunk, selectTrackList, selectTrackListStatus } from "@/features/track"
import { useAppDispatch, useAppSelector, useNotification } from "@/shared/lib"
import { AdminTracks } from "@/widgets/admin-tracks"
import { useEffect } from "react"

export const AdminTracksPage = () => {

    const dispatch = useAppDispatch()
    const { notify } = useNotification()
    const trackList = useAppSelector(selectTrackList)
    const trackListStatus = useAppSelector(selectTrackListStatus)

    useEffect(() => {
        dispatch(getTracksThunk()).unwrap()
            .then()
            .catch((err: { message: string }) => notify(err.message, 'Попробуйте еще раз', 'error'))
    }, [])

    return (
        <AdminTracks trackList={trackList} trackListStatus={trackListStatus} />
    )
}
