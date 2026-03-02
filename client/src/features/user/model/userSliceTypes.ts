import type { IUser } from "@/entities/user";
import type { TStatus } from "@/shared/types";

export interface IUserState {
    getStatus: TStatus
    updateStatus: TStatus
    user: IUser | null
    updateError: string | null
    getError: string | null
    userList: IUser[] | null
    userListStatus: TStatus
    userListError: string | null
}