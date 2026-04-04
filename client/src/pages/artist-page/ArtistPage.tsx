import { getArtistProfileThunk, selectArtist, selectArtistStatus } from "@/features/artist"
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

    useEffect(() => {
        dispatch(getArtistProfileThunk({ id: Number(id) }))
    }, [id])

    return (
        <>
        {
            artistStatus === 'success' && artist ?
            <>
                <ArtistHeader artist={artist} />
                <ArtistTopTracks artist={artist} />
                <ArtistReleases artistId={artist.id} />
            </>
            :
            <Loading />
        }
        </>
    )
}
