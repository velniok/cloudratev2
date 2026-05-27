import { IArtist } from "@/entities/artist"
import type { IReview } from "../../review"

export interface ITrack {
    kind: 'track'
    id: number
    createdAt: string
    title: string
    coverUrl: string | null
    soundcloudUrl: string
    releaseData: string
    avgRating: number | null
    avgCriterias: {
        criteria1: number 
        criteria2: number
        criteria3: number
        criteria4: number
        criteria5: number
    }
    artistId: number
    artist: IArtist
    featArtistIds: number[]
    featArtists: IArtist[] | null
    reviewsCount: number
    userReview: IReview | null
}