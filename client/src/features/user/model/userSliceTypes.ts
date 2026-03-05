import type { IUser } from "@/entities/user";
import type { TStatus } from "@/shared/types";

export interface IUserState {
    user: IUser | null
    userStatus: TStatus
    userError: string | null
    updateStatus: TStatus
    updateError: string | null
    userList: IUser[] | null
    userListStatus: TStatus
    userListError: string | null
}