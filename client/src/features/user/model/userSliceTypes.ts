import { IArtist } from "@/entities/artist";
import { IReview } from "@/entities/review";
import { ISuggestion } from "@/entities/suggestion";
import type { IUser } from "@/entities/user";
import type { IPagination, TStatus } from "@/shared/types";

export interface IUserState {
    user: IUser | null
    userStatus: TStatus
    userError: string | null

    updateStatus: TStatus
    updateError: string | null

    follows: IArtist[] | null
    followsPagination: IPagination | null
    followsStatus: TStatus

    reviews: IReview[] | null
    reviewsPagination: IPagination | null
    reviewsStatus: TStatus

    suggestions: ISuggestion[] | null
    suggestionsStatus: TStatus

    userList: IUser[] | null
    userListStatus: TStatus
    userListError: string | null
}