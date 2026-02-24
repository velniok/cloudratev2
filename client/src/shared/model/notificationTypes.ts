export interface INotification {
    id: number
    title: string
    desc: string
    type: TNotificationTypes
}

export type TNotificationTypes = 'success' | 'delete' | 'edit'

export interface INotificationState {
    notification: INotification[] | null
}