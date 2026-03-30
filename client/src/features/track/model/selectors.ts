import { RootState } from "@/app/store";

export const selectTrack = (state: RootState) => state.track.track
export const selectTrackStatus = (state: RootState) => state.track.trackStatus
export const selectTrackError = (state: RootState) => state.track.trackError

export const selectTrackReviewsText = (state: RootState) => state.track.reviewsText
export const selectTrackReviewsTextPagination = (state: RootState) => state.track.reviewsTextPagination
export const selectTrackReviewsTextStatus = (state: RootState) => state.track.reviewsTextStatus

export const selectTrackList = (state: RootState) => state.track.trackList
export const selectTrackListPagination = (state: RootState) => state.track.trackListPagination
export const selectTrackListStatus = (state: RootState) => state.track.trackListStatus
export const selectTrackListError = (state: RootState) => state.track.trackListError
