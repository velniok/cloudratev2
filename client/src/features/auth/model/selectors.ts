import type { RootState } from "@/app/store";

export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthError = (state: RootState) => state.auth.error