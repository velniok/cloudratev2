import { IPagination } from "@/shared/types"
import type { ITrack } from "../../track"

export interface IArtist {
    kind: 'artist'
    id: number
    createdAt: string
    name: string
    avatarUrl: string | null
    soundcloudUrl: string
    avgRating: number | null
    tracks: {
        trackList: ITrack[]
        pagination: IPagination
    }
    topTracks: ITrack[] | null
    tracksCount?: number
    follow: {
        followersCount: number
        isFollowed: boolean
    }
}