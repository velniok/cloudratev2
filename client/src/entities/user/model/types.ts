import { IReview } from "@/entities/review"

export interface IUser {
    kind: 'user'
    id: number
    createdAt: string
    role: 'user' | 'admin'
    nickname: string
    username: string
    email: string
    password: string
    avatarUrl: string | null
    reviews: IReview[] | []
}