import type { ITrack } from "../../track"

export interface IArtist {
    kind: 'artist'
    id: number
    createdAt: string
    name: string
    avatarUrl: string | null
    soundcloudUrl: string
    avgRating?: number | null
    topTracks?: ITrack[]
    tracksCount?: number
    follow?: {
        followersCount: number
        isFollowed: boolean
    }
    temp?: false
}

export interface ITempArtist {
    id: string
    name: string
    avatarUrl: null
    temp: true
}