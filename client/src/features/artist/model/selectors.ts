import { RootState } from "@/app/store"

export const selectArtistListStatus = (state: RootState) => state.artist.artistListStatus
export const selectArtistList = (state: RootState) => state.artist.artistList
export const selectArtistError = (state: RootState) => state.artist.error

export const selectArtistStatus = (state: RootState) => state.artist.artistStatus
export const selectArtist = (state: RootState) => state.artist.artist