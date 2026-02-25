import type { ITrack } from "../../track"

export interface IArtist {
    kind: 'artist'
    id: number
    name: string
    avatarUrl: string
    soundcloudUrl: string
    avgRating?: number
    tracks: ITrack[]
}