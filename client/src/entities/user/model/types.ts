export interface IUser {
    id: number
    createdAt: Date
    role: 'user' | 'admin'
    nickname: string
    email: string
    password: string
    avatarUrl: string | null
}