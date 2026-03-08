import { RootState } from "@/app/store"

export const selectArtist = (state: RootState) => state.artist.artist
export const selectArtistStatus = (state: RootState) => state.artist.artistStatus
export const selectArtistError = (state: RootState) => state.artist.artistError

export const selectArtistList = (state: RootState) => state.artist.artistList
export const selectArtistListPagination = (state: RootState) => state.artist.artistListPagination
export const selectArtistListStatus = (state: RootState) => state.artist.artistListStatus
export const selectArtistListError = (state: RootState) => state.artist.artistListError
