import type { RootState } from "@/app/store";

export const selectUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.userStatus
export const selectUserError = (state: RootState) => state.user.userError

export const selectUserUpdateStatus = (state: RootState) => state.user.updateStatus
export const selectUserUpdateError = (state: RootState) => state.user.updateError

export const selectUserList = (state: RootState) => state.user.userList
export const selectUserListStatus = (state: RootState) => state.user.userListStatus
export const selectUserListError = (state: RootState) => state.user.userListError