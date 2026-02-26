import { IArtist } from "@/entities/artist"
import type { IReview } from "../../review"

export interface ITrack {
    kind: 'track'
    id: number
    title: string
    coverUrl?: string
    artistIds: string[]
    artists?: IArtist[]
    rating?: number
    reviews?: IReview[]
}