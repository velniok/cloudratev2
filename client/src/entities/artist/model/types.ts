import type { ITrack } from "../../track"

export interface IArtist {
    id: string
    name: string
    avatarUrl: string
    soundcloudURL: string
    avgRating?: number
    tracks: ITrack[]
}