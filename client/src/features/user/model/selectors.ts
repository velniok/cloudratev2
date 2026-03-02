import type { RootState } from "@/app/store";

export const selectUserGetStatus = (state: RootState) => state.user.getStatus
export const selectUserUpdateStatus = (state: RootState) => state.user.updateStatus
export const selectUser = (state: RootState) => state.user.user
export const selectUserGetError = (state: RootState) => state.user.getError
export const selectUserUpdateError = (state: RootState) => state.user.updateError
export const selectUserList = (state: RootState) => state.user.userList
export const selectUserListStatus = (state: RootState) => state.user.userListStatus
export const selectUserListError = (state: RootState) => state.user.userListError