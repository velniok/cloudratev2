import { selectTrackList, selectTrackListPagination, selectTrackListStatus } from "@/features/track"
import { useAppSelector } from "@/shared/lib"
import { AdminTracks } from "@/widgets/admin-tracks"

export const AdminTracksPage = () => {

    const trackList = useAppSelector(selectTrackList)
    const trackListPagination = useAppSelector(selectTrackListPagination)
    const trackListStatus = useAppSelector(selectTrackListStatus)

    return (
        <AdminTracks trackListPagination={trackListPagination} trackList={trackList} trackListStatus={trackListStatus} />
    )
}
