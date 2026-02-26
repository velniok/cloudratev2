import { RootState } from "@/app/store";

export const selectTrackList = (state: RootState) => state.track.trackList
export const selectTrackListStatus = (state: RootState) => state.track.trackListStatus
export const selectTrackError = (state: RootState) => state.track.error

export const selectTrack = (state: RootState) => state.track.track
export const selectTrackStatus = (state: RootState) => state.track.trackStatus