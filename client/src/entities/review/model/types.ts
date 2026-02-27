import { ITrack } from "@/entities/track"
import { IUser } from "@/entities/user"

export interface IReview {
    id: number
    text: string
    rating: number
    userId: number
    user?: IUser
    trackId: number
    track?: ITrack
}