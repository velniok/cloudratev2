import type { IArtist } from "@/entities/artist"
import { ArtistHeader } from "@/widgets/artist-header"
import { ArtistTopTracks } from "@/widgets/artist-top-tracks"

export const ArtistPage = () => {

    const artist: IArtist = {
        id: 1,
        name: 'темный принц',
        soundcloudUrl: 'https://soundcloud.com/darkprinceee',
        avatarUrl: "https://res.cloudinary.com/dgtigjrl5/image/upload/v1771949859/images/qyov8f6vhm7w4zglc8ac.jpg",
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
