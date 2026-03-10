import { selectTrackList, selectTrackListPagination, selectTrackListStatus } from "@/features/track"
import { useAppSelector } from "@/shared/lib"
import { AdminTracks } from "@/widgets/admin-tracks"
import { FC } from "react"

interface AdminTracksPageProps {
    role: string
}

export const AdminTracksPage: FC<AdminTracksPageProps> = ({ role }) => {

    const trackList = useAppSelector(selectTrackList)
    const trackListPagination = useAppSelector(selectTrackListPagination)
    const trackListStatus = useAppSelector(selectTrackListStatus)

    return (
        <>
        {
            role === 'admin' && <AdminTracks trackListPagination={trackListPagination} trackList={trackList} trackListStatus={trackListStatus} />
        }
        </>
    )
}
