import { IArtist } from "@/entities/artist"
import type { IReview } from "../../review"

export interface ITrack {
    kind: 'track'
    id: number
    createdAt: string
    title: string
    coverUrl: string | null
    releaseData: string
    avgRating: number | null
    avgCriterias: {
        criteria1: number | null
        criteria2: number | null
        criteria3: number | null
        criteria4: number | null
        criteria5: number | null
    }
    artistIds: number[]
    artists?: IArtist[]
    reviews: IReview[]
}