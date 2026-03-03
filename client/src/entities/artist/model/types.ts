import type { ITrack } from "../../track"

export interface IArtist {
    kind: 'artist'
    id: number
    createdAt: Date
    name: string
    avatarUrl: string | null
    soundcloudUrl: string
    avgRating: number | null
    tracks: ITrack[] | null
}