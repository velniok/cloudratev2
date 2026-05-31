import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ILoginReq, type IRegisterReq, type IAuthRes } from "../api/authApiTypes";
import { loginUser, refreshApi, registerUser } from "../api/authApi";
import type { IAuthState } from "./authSliceTypes";
import axios from "axios";
import { IApiError } from "@/shared/types";
import { updateUserThunk } from "@/features/user";

export const registerThunk = createAsyncThunk<IAuthRes, IRegisterReq & { verifyCode?: string }, { rejectValue: IApiError }>('auth/registerThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await registerUser(params)
        localStorage.setItem('isAuth', 'true')
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const loginThunk = createAsyncThunk<IAuthRes, ILoginReq, { rejectValue: IApiError }>('auth/loginThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await loginUser(params)
        localStorage.setItem('isAuth', 'true')
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const authThunk = createAsyncThunk<IAuthRes, void, { rejectValue: IApiError }>('auth/authThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await refreshApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

const initialState: IAuthState = {
    user: null,
    userStatus: 'idle',
    token: null,
    notifications: null,
    status: 'idle',
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = null,
            state.status = 'idle',
            state.error = null,
            state.token = null,
            localStorage.removeItem('isAuth')
        },
        readNotify: (state, action: PayloadAction<{ id: number }>) => {
            if (state.notifications) state.notifications = state.notifications.map((notify) => {
                if (notify.id === action.payload.id) {
                    notify.isRead = true
                }
                return notify
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserThunk.pending, (state, action) => {
                state.userStatus = 'loading'
                state.user = null
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.userStatus = 'success'
                state.user = action.payload.user
            })

            .addCase(registerThunk.pending, (state) => {
                state.error = null
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.notifications = action.payload.notifications.notifications,
                state.token = action.payload.token,
                state.status = 'success',
                state.userStatus = 'success'
                state.error = null
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(loginThunk.pending, (state) => {
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.notifications = action.payload.notifications.notifications,
                state.token = action.payload.token,
                state.status = 'success',
                state.userStatus = 'success'
                state.error = null
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(authThunk.pending, (state) => {
                state.status = 'loading',
                state.userStatus = 'loading'
                state.error = null
            })
            .addCase(authThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.notifications = action.payload.notifications.notifications,
                state.token = action.payload.token,
                state.status = 'success',
                state.userStatus = 'success'
                state.error = null
            })
            .addCase(authThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const { clearError, logout, setToken, readNotify } = authSlice.actions

export const AuthReducer = authSlice.reducer