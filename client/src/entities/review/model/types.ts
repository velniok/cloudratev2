import { ITrack } from "@/entities/track"
import { IUser } from "@/entities/user"

export interface IReview {
    id: number
    text: string
    userId: number
    user?: IUser
    trackId: number
    track?: ITrack
}