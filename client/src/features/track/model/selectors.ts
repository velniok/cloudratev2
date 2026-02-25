import { RootState } from "@/app/store";

export const selectTrackList = (state: RootState) => state.track.trackList
export const selectTrackListStatus = (state: RootState) => state.track.trackListStatus
export const selectTrackError = (state: RootState) => state.track.error