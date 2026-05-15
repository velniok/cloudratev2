import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ILoginReq, type IRegisterReq, type IAuthRes } from "../api/authApiTypes";
import { loginUser, refreshApi, registerUser } from "../api/authApi";
import type { IAuthState } from "./authSliceTypes";
import axios from "axios";
import { IApiError } from "@/shared/types";

export const registerThunk = createAsyncThunk<IAuthRes, IRegisterReq & { verifyCode: string }, { rejectValue: IApiError }>('auth/registerThunk', async (params, { rejectWithValue }) => {
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
    token: null,
    notifications: null,
    status: 'idle',
    error: null,
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state) => {
                state.error = null
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.notifications = action.payload.notifications,
                state.token = action.payload.token,
                state.status = 'success',
                state.error = null
                state.status = 'success'
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(loginThunk.pending, (state) => {
                state.status = 'loading',
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.notifications = action.payload.notifications,
                state.token = action.payload.token,
                state.status = 'success',
                state.error = null
                state.status = 'success'
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(authThunk.pending, (state) => {
                state.status = 'loading',
                state.error = null
            })
            .addCase(authThunk.fulfilled, (state, action) => {
                state.user = action.payload.user,
                state.notifications = action.payload.notifications,
                state.token = action.payload.token,
                state.status = 'success',
                state.error = null
                state.status = 'success'
            })
            .addCase(authThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const { clearError, logout, setToken } = authSlice.actions

export const AuthReducer = authSlice.reducer