import { RootState } from "@/app/store"

export const selectGeneralStatus = (state: RootState) => state.general.status
export const selectGeneral = (state: RootState) => state.general.general
export const selectGeneralError = (state: RootState) => state.general.error