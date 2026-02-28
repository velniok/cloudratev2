import { ITrack } from "@/entities/track"
import { IUser } from "@/entities/user"

export interface IReview {
    id: number
    text: string | null
    rating: number
    criteria1: number
    criteria2: number
    criteria3: number
    criteria4: number
    criteria5: number
    userId: number
    user?: IUser
    trackId: number
    track?: ITrack
}