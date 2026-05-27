import { RootState } from "@/app/store";

export const selectNewTracks = (state: RootState) => state.home.newTracks
export const selectNewTracksStatus = (state: RootState) => state.home.newTracksStatus

export const selectNewReviews = (state: RootState) => state.home.newReviews
export const selectNewReviewsStatus = (state: RootState) => state.home.newReviewsStatus

export const selectLatestTracks = (state: RootState) => state.home.latestTracks
export const selectLatestTracksStatus = (state: RootState) => state.home.latestTracksStatus

export const selectHomeError = (state: RootState) => state.home.error