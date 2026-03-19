import type { ITrack } from "../../track"

export interface IArtist {
    kind: 'artist'
    id: number
    createdAt: string
    name: string
    avatarUrl: string | null
    soundcloudUrl: string
    avgRating: number | null
    tracks: ITrack[] | null
    follow: {
        followersCount: number
        isFollowed: boolean
    }
}