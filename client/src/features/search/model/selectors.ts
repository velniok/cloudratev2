import { RootState } from "@/app/store"

export const selectSearch = (state: RootState) => state.search.search
export const selectSearchStatus = (state: RootState) => state.search.status
export const selectSearchError = (state: RootState) => state.search.error