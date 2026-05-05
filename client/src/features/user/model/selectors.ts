import type { RootState } from "@/app/store";

export const selectUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.userStatus
export const selectUserError = (state: RootState) => state.user.userError

export const selectUserUpdateStatus = (state: RootState) => state.user.updateStatus
export const selectUserUpdateError = (state: RootState) => state.user.updateError

export const selectUserFollows = (state: RootState) => state.user.follows
export const selectUserFollowsStatus = (state: RootState) => state.user.followsStatus
export const selectUserFollowsPagination = (state: RootState) => state.user.followsPagination

export const selectUserReviews = (state: RootState) => state.user.reviews
export const selectUserReviewsStatus = (state: RootState) => state.user.reviewsStatus
export const selectUserReviewsPagination = (state: RootState) => state.user.reviewsPagination

export const selectUserSuggestions = (state: RootState) => state.user.suggestions
export const selectUserSuggestionsStatus = (state: RootState) => state.user.suggestionsStatus

export const selectUserList = (state: RootState) => state.user.userList
export const selectUserListStatus = (state: RootState) => state.user.userListStatus
export const selectUserListError = (state: RootState) => state.user.userListError