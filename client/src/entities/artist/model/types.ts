import type { ITrack } from "../../track"

export interface IArtist {
    id: string
    name: string
    soundcloudURL: string
    avgRating?: number
    tracks: ITrack[]
}