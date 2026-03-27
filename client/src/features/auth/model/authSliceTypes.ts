import type { IUser } from "@/entities/user"
import type { TStatus } from "@/shared/types"

export interface IAuthState {
    status: TStatus
    token: string | null
    user: IUser | null
    error: string | null
}