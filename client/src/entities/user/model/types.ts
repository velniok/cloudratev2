export interface IUser {
    kind: 'user'
    id: number
    createdAt: string
    role: 'user' | 'admin'
    nickname: string
    username: string
    email: string
    avatarUrl: string | null
    soundcloudUrl: string | null
    reviewsCount: number
    reviewsTextCount: number
    badges: {
        badgeName: string
        isSelected: boolean
        createdAt?: string
    }[]
}