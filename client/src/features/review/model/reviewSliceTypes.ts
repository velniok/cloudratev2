import { IReview } from "@/entities/review";
import { IPagination, TStatus } from "@/shared/types";

export interface IReviewState {
    reviewList: IReview[] | null,
    reviewListPagination: IPagination | null
    reviewListStatus: TStatus,
    reviewListError: string | null
}