import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserApi, getUserFollowsApi, getUserListApi, getUserProfileApi, getUserReviewsApi, getUserSuggestionsApi, updateUserApi, updateUserRoleApi } from "../api/userApi";
import axios from "axios";
import type { IUserState } from "./userSliceTypes";
import type { IUser } from "@/entities/user";
import { IUpdateUserReq } from "../api/userApiTypes";
import { IApiError, IPagination } from "@/shared/types";
import { IArtist } from "@/entities/artist";
import { IReview } from "@/entities/review";
import { toggleFollowApi } from "@/features/artist";
import { ISuggestion } from "@/entities/suggestion";

export const getUserProfileThunk = createAsyncThunk<{ user: IUser }, { username: string }, { rejectValue: IApiError }>('user/getUserProfileThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getUserProfileApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getUserListThunk = createAsyncThunk<{ users: IUser[] }, void, { rejectValue: IApiError }>('user/getUserListThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getUserListApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getUserFollowsThunk = createAsyncThunk<{ artists: IArtist[], pagination: IPagination }, { page: number, limit: number, id: number }, { rejectValue: IApiError }>('user/getUserFollowsThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getUserFollowsApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const toggleFollowThunk = createAsyncThunk<{followed: boolean}, { artistId: number, userId: number }, { rejectValue: IApiError }>('/user/toggleFollowThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await toggleFollowApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getUserReviewsThunk = createAsyncThunk<{ reviews: IReview[], pagination: IPagination }, { page: number, limit: number, id: number }, { rejectValue: IApiError }>('user/getUserReviewsThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getUserReviewsApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getUserSuggestionsThunk = createAsyncThunk<{ suggestions: ISuggestion[], pagination: IPagination }, { id: number, filter: string | null, page: number, limit: number }, { rejectValue: IApiError }>('user/getUserSuggestionsThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getUserSuggestionsApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const updateUserThunk = createAsyncThunk<{ user: IUser }, IUpdateUserReq, { rejectValue: IApiError }>('user/updateUserThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateUserApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const updateUserRoleThunk = createAsyncThunk<{ role: string }, { id: number, role: 'admin' | 'user' }, { rejectValue: IApiError }>('user/updateUserRoleThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateUserRoleApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const deleteUserThunk = createAsyncThunk<void, { id: number }, { rejectValue: IApiError }>('user/deleteUserThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await deleteUserApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

const initialState: IUserState = {
    user: null,
    userStatus: 'idle',
    userError: null,

    updateStatus: 'idle',
    updateError: null,

    follows: null,
    followsPagination: null,
    followsStatus: 'idle',

    reviews: null,
    reviewsPagination: null,
    reviewsStatus: 'idle',

    suggestions: null,
    suggestionsPagination: null,
    suggestionsStatus: 'idle',

    userList: null,
    userListStatus: 'idle',
    userListError: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUpdateError: (state) => {
            state.updateError = null
        },
        initUpdateSlice: (state) => {
            state.updateStatus = 'idle'
            state.updateError = null
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(getUserProfileThunk.pending, (state) => {
                state.user = null,
                state.userStatus = 'loading',
                state.userError = null
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.userStatus = 'success'
            })
            .addCase(getUserProfileThunk.rejected, (state, action) => {
                state.userStatus = 'error',
                state.userError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(getUserListThunk.pending, (state) => {
                state.userList = null,
                state.userListStatus = 'loading',
                state.userListError = null
            })
            .addCase(getUserListThunk.fulfilled, (state, action) => {
                state.userListStatus = 'success',
                state.userList = action.payload.users
            })
            .addCase(getUserListThunk.rejected, (state, action) => {
                state.userListStatus = 'error',
                state.userListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(getUserFollowsThunk.pending, (state) => {
                state.follows = null,
                state.followsStatus = 'loading',
                state.followsPagination = null
            })
            .addCase(getUserFollowsThunk.fulfilled, (state, action) => {
                state.followsStatus = 'success',
                state.follows = action.payload.artists
                state.followsPagination = action.payload.pagination
            })
            .addCase(getUserFollowsThunk.rejected, (state, action) => {
                state.followsStatus = 'error',
                state.userError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(toggleFollowThunk.pending, (state) => {
                state.userError = null
            })
            .addCase(toggleFollowThunk.fulfilled, (state, action) => {
                if (state.follows) {
                    state.follows = state.follows.map((artist) => {
                        if (artist.id === action.meta.arg.artistId && artist.follow) {
                            if (action.payload.followed) {
                                ++artist.follow.followersCount
                                artist.follow.isFollowed = true
                            } else {
                                --artist.follow.followersCount
                                artist.follow.isFollowed = false
                            }
                        }
                        return artist
                    })
                }
            })
            .addCase(toggleFollowThunk.rejected, (state) => {
                state.followsStatus = 'error',
                state.userError = null
            })

            .addCase(getUserReviewsThunk.pending, (state) => {
                state.reviews = null,
                state.reviewsStatus = 'loading',
                state.reviewsPagination = null
            })
            .addCase(getUserReviewsThunk.fulfilled, (state, action) => {
                state.reviewsStatus = 'success',
                state.reviews = action.payload.reviews
                state.reviewsPagination = action.payload.pagination
            })
            .addCase(getUserReviewsThunk.rejected, (state, action) => {
                state.reviewsStatus = 'error',
                state.userError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(getUserSuggestionsThunk.pending, (state) => {
                state.suggestions = null,
                state.suggestionsStatus = 'loading',
                state.suggestionsPagination = null

            })
            .addCase(getUserSuggestionsThunk.fulfilled, (state, action) => {
                state.suggestionsStatus = 'success',
                state.suggestions = action.payload.suggestions,
                state.suggestionsPagination = action.payload.pagination
            })
            .addCase(getUserSuggestionsThunk.rejected, (state, action) => {
                state.suggestionsStatus = 'error',
                state.userError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(updateUserThunk.pending, (state) => {
                state.updateStatus = 'loading',
                state.updateError = null
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.updateStatus = 'success'
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.updateStatus = 'error',
                state.updateError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(updateUserRoleThunk.pending, (state) => {
                state.userListStatus = 'loading',
                state.updateError = null
            })
            .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
                if (state.userList) {
                    state.userList = state.userList.map(user => {
                        if (user.id === action.meta.arg.id) {
                            user.role = action.meta.arg.role
                        }
                        return user
                    })
                }
                state.userListStatus = 'success'
            })
            .addCase(updateUserRoleThunk.rejected, (state, action) => {
                state.userListStatus = 'error',
                state.userListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(deleteUserThunk.pending, (state) => {
                state.userListStatus = 'loading',
                state.userListError = null
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                if (state.userList) state.userList = state.userList.filter((user) => user.id !== action.meta.arg.id),
                state.userListStatus = 'success'
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.userListStatus = 'error',
                state.userListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const { clearUpdateError } = userSlice.actions
export const { initUpdateSlice } = userSlice.actions

export const UserReducer = userSlice.reducer