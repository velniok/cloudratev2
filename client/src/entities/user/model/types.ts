import { IArtist } from "@/entities/artist"
import { IReview } from "@/entities/review"

export interface IUser {
    kind: 'user'
    id: number
    createdAt: string
    role: 'user' | 'admin'
    nickname: string
    username: string
    email: string
    avatarUrl: string | null
    reviewsCount: number
    reviewsTextCount: number
}