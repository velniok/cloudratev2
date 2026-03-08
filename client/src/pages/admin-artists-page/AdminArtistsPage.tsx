import { selectArtistListStatus } from "@/features/artist"
import { selectArtistList, selectArtistListPagination } from "@/features/artist/model/selectors"
import { useAppSelector } from "@/shared/lib"
import { AdminArtists } from "@/widgets/admin-artists"

export const AdminArtistsPage = () => {

    const artistList = useAppSelector(selectArtistList)
    const artistListPagination = useAppSelector(selectArtistListPagination)
    const artistListStatus = useAppSelector(selectArtistListStatus)

    return (
        <AdminArtists artistListPagination={artistListPagination} artistList={artistList} artistListStatus={artistListStatus} />
    )
}
