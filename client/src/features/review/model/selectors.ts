import type { RootState } from "@/app/store";

export const selectReviewList = (state: RootState) => state.review.reviewList
export const selectReviewListPagination = (state: RootState) => state.review.reviewListPagination
export const selectReviewListStatus = (state: RootState) => state.review.reviewListStatus
export const selectReviewListError = (state: RootState) => state.review.reviewListError