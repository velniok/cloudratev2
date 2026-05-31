export interface INotification {
    id: number
    title: string
    desc: string
    type: TNotificationTypes
}

export type TNotificationTypes = 'success' | 'delete' | 'edit' | 'error' | 'badge'

export interface INotificationState {
    notification: INotification[] | null
}