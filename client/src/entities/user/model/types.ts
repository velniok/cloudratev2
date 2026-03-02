import { IReview } from "@/entities/review"

export interface IUser {
    kind: 'user'
    id: number
    createdAt: Date
    role: 'user' | 'admin'
    nickname: string
    email: string
    password: string
    avatarUrl: string | null
    reviews: IReview[] | []
}