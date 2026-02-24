import { RootState } from "@/app/store"

export const selectArtistListStatus = (state: RootState) => state.artist.artistListStatus
export const selectArtistList = (state: RootState) => state.artist.artistList
export const selectArtistError = (state: RootState) => state.artist.error