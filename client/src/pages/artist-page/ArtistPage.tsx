import { getOneArtistThunk, selectArtist, selectArtistStatus } from "@/features/artist"
import { selectAuthUser } from "@/features/auth"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { Loading } from "@/shared/ui"
import { ArtistHeader } from "@/widgets/artist-header"
import { ArtistReleases } from "@/widgets/artist-releases"
import { ArtistTopTracks } from "@/widgets/artist-top-tracks"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const ArtistPage = () => {

    const dispatch = useAppDispatch()
    const id = useParams<{ id: string }>().id
    const artist = useAppSelector(selectArtist)
    const artistStatus = useAppSelector(selectArtistStatus)
    const authUser = useAppSelector(selectAuthUser)

    useEffect(() => {
        dispatch(getOneArtistThunk({ id: Number(id), userId: authUser?.id }))
    }, [id, authUser])

    return (
        <>
        {
            artistStatus === 'success' ?
            <>
                <ArtistHeader artist={artist} artistStatus={artistStatus} />
                <ArtistTopTracks artist={artist} artistStatus={artistStatus} />
                <ArtistReleases artist={artist} artistStatus={artistStatus} />
            </>
            :
            <Loading />
        }
        </>
    )
}
