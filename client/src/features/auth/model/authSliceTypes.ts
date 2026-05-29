import { IUserNotification } from "@/entities/notification"
import type { IUser } from "@/entities/user"
import type { TStatus } from "@/shared/types"

export interface IAuthState {
    status: TStatus
    token: string | null
    notifications: IUserNotification[] | null
    user: IUser | null
    error: string | null
    userStatus: TStatus
}