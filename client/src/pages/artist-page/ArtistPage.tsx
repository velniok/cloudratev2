import type { IArtist } from "@/entities/artist"
import { getOneArtistThunk, selectArtist, selectArtistStatus } from "@/features/artist"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { ArtistHeader } from "@/widgets/artist-header"
import { ArtistTopTracks } from "@/widgets/artist-top-tracks"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const ArtistPage = () => {

    const dispatch = useAppDispatch()
    const id = useParams<{ id: string }>().id
    const artist = useAppSelector(selectArtist)
    const artistStatus = useAppSelector(selectArtistStatus)

    useEffect(() => {
        dispatch(getOneArtistThunk({ id: Number(id) }))
    }, [id])

    return (
        <>
            <ArtistHeader artist={artist} artistStatus={artistStatus} />
            <ArtistTopTracks artist={artist} artistStatus={artistStatus} />
        </>
    )
}
