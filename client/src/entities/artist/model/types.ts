import type { ITrack } from "../../track"

export interface IArtist {
    id: string
    name: string
    avatarUrl: string
    soundcloudUrl: string
    avgRating?: number
    tracks: ITrack[]
}