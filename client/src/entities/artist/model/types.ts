import type { ITrack } from "../../track"

export interface IArtist {
    id: string
    name: string
    soundcloudURL: string
    tracks: ITrack[]
}