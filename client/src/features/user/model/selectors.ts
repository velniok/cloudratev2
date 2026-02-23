import type { RootState } from "@/app/store";

export const selectUserGetStatus = (state: RootState) => state.user.getStatus
export const selectUserUpdateStatus = (state: RootState) => state.user.updateStatus
export const selectUser = (state: RootState) => state.user.user
export const selectUserGetError = (state: RootState) => state.user.getError
export const selectUserUpdateError = (state: RootState) => state.user.updateError