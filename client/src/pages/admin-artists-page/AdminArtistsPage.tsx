import { selectArtistListStatus } from "@/features/artist"
import { selectArtistList, selectArtistListPagination } from "@/features/artist/model/selectors"
import { useAppSelector } from "@/shared/lib"
import { AdminArtists } from "@/widgets/admin-artists"
import { FC } from "react"

interface AdminArtistsPageProps {
    role: string
}

export const AdminArtistsPage: FC<AdminArtistsPageProps> = ({ role }) => {

    const artistList = useAppSelector(selectArtistList)
    const artistListPagination = useAppSelector(selectArtistListPagination)
    const artistListStatus = useAppSelector(selectArtistListStatus)

    return (
        <>
        {
            role === 'admin' && <AdminArtists artistListPagination={artistListPagination} artistList={artistList} artistListStatus={artistListStatus} />
        }
        </>
    )
}
