export interface IUserNotification {
    id: number
    createdAt: string
    isRead: boolean
    message: string
    title: string
    metadata: any
    type: string
    userId: number
}