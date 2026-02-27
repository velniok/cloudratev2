import { IArtist } from "@/entities/artist"
import type { IReview } from "../../review"

export interface ITrack {
    kind: 'track'
    id: number
    createdAt: Date
    title: string
    coverUrl: string | null
    avgRating: number
    artistIds: string[]
    artists?: IArtist[]
    reviews: IReview[] | []
}