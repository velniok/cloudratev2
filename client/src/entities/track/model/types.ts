import type { IReview } from "../../review"

export interface ITrack {
    id: number
    title: string
    artist: string
    rating: number
    reviews?: IReview[]
}