import { IReview } from "@/entities/review";
import { ITrack } from "@/entities/track";
import { IPagination, TStatus } from "@/shared/types";

export interface ITrackState {
    track: ITrack | null
    trackStatus: TStatus
    trackError: string | null

    reviewsText: IReview[] | null
    reviewsTextStatus: TStatus
    reviewsTextPagination: IPagination | null

    trackList: ITrack[] | null
    trackListPagination: IPagination | null
    trackListStatus: TStatus
    trackListError: string | null
}