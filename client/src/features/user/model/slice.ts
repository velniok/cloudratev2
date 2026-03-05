import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserApi, getOneUser, getUsersApi, updateUserApi } from "../api/userApi";
import axios from "axios";
import type { IUserState } from "./userSliceTypes";
import type { IUser } from "@/entities/user";
import { IUpdateUserReq } from "../api/userApiTypes";
import { IApiError } from "@/shared/types";

export const getOneUserThunk = createAsyncThunk<{ user: IUser }, { id: number }, { rejectValue: IApiError }>('user/getOneUserThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getOneUser(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

export const getUsersThunk = createAsyncThunk<{ users: IUser[] }, void, { rejectValue: IApiError }>('user/getUsersThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getUsersApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
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
    }
})

const initialState: IUserState = {
    user: null,
    userStatus: 'idle',
    userError: null,
    updateStatus: 'idle',
    updateError: null,
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
            .addCase(getOneUserThunk.pending, (state) => {
                state.user = null,
                state.userStatus = 'loading',
                state.userError = null
            })
            .addCase(getOneUserThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.userStatus = 'success'
            })
            .addCase(getOneUserThunk.rejected, (state, action) => {
                state.userStatus = 'error',
                state.userError = action.payload.message
            })

            .addCase(getUsersThunk.pending, (state) => {
                state.userList = null,
                state.userListStatus = 'loading',
                state.userListError = null
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.userListStatus = 'success',
                state.userList = action.payload.users
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.userListStatus = 'error',
                state.userListError = action.payload.message
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
                state.updateError = action.payload.message
            })

            .addCase(deleteUserThunk.pending, (state) => {
                state.userListStatus = 'loading',
                state.userListError = null
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.userList = state.userList.filter((user) => user.id !== action.meta.arg.id),
                state.userListStatus = 'success'
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.userListStatus = 'error',
                state.userListError = action.payload.message
            })
    }
})

export const { clearUpdateError } = userSlice.actions
export const { initUpdateSlice } = userSlice.actions

export const UserReducer = userSlice.reducer