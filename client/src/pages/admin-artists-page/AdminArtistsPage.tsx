import { getArtistListThunk, selectArtistListStatus } from "@/features/artist"
import { selectArtistList } from "@/features/artist/model/selectors"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { AdminArtists } from "@/widgets/admin-artists"
import { useEffect } from "react"

export const AdminArtistsPage = () => {

    const dispatch = useAppDispatch()
    const artistList = useAppSelector(selectArtistList)
    const artistListStatus = useAppSelector(selectArtistListStatus)

    useEffect(() => {
        dispatch(getArtistListThunk({
            page: 1,
            limit: 5,
        }))
    }, [])

    return (
        <AdminArtists artistList={artistList} artistListStatus={artistListStatus} />
    )
}
