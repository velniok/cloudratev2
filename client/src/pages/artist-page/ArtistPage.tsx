import type { IArtist } from "@/entities/artist"
import { ArtistHeader } from "@/widgets/artist-header"
import { ArtistTopTracks } from "@/widgets/artist-top-tracks"

export const ArtistPage = () => {

    const artist: IArtist = {
        kind: 'artist',
        id: 1,
        name: 'темный принц',
        soundcloudUrl: 'https://soundcloud.com/darkprinceee',
        avatarUrl: "https://res.cloudinary.com/dgtigjrl5/image/upload/v1771949859/images/qyov8f6vhm7w4zglc8ac.jpg",
        tracks: [
            {
                kind: 'track',
                id: 1,
                title: "овердоз",
                artistIds: ['1'],
                artists: [],
                rating: 52,
            }
        ]
    }

    return (
        <>
            <ArtistHeader artist={artist} />
            <ArtistTopTracks tracks={artist.tracks} />
        </>
    )
}
