import { getArtistsThunk, selectArtistListStatus } from "@/features/artist"
import { selectArtistList } from "@/features/artist/model/selectors"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { AdminArtists } from "@/widgets/admin-artists"
import { useEffect } from "react"

export const AdminArtistsPage = () => {

    const dispatch = useAppDispatch()
    const artistList = useAppSelector(selectArtistList)
    const artistListStatus = useAppSelector(selectArtistListStatus)

    useEffect(() => {
        dispatch(getArtistsThunk())
    }, [])

    return (
        <AdminArtists artistList={artistList} artistListStatus={artistListStatus} />
    )
}
