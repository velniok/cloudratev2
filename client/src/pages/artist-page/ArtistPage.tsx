import type { IArtist } from "@/entities/artist"
import { ArtistHeader } from "@/widgets/artist-header"
import { ArtistTopTracks } from "@/widgets/artist-top-tracks"

export const ArtistPage = () => {

    const artist: IArtist = {
        id: 'darkprinceee',
        name: 'темный принц',
        soundcloudURL: 'https://soundcloud.com/darkprinceee',
        tracks: [
            {
                id: 1,
                title: "овердоз",
                artist: "темный принц",
                rating: 52,
            },
            {
                id: 2,
                title: "песня птиц",
                artist: "темный принц",
                rating: 48,
            },
            {
                id: 3,
                title: "S.T.A.L'",
                artist: "темный принц",
                rating: 67,
            },
        ]
    }

    return (
        <>
            <ArtistHeader artist={artist} />
            <ArtistTopTracks tracks={artist.tracks} />
        </>
    )
}
