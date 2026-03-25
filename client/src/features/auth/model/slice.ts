import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ILoginReq, type IRegisterReq, type IAuthRes } from "../api/authApiTypes";
import { authUser, loginUser, registerUser } from "../api/authApi";
import type { IAuthState } from "./authSliceTypes";
import axios from "axios";
import type { IUser } from "@/entities/user";
import { IApiError } from "@/shared/types";
import { useNotification } from "@/shared/lib";

export const registerThunk = createAsyncThunk<IAuthRes, IRegisterReq & { verifyCode: string }, { rejectValue: IApiError }>('auth/registerThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await registerUser(params)
        window.localStorage.setItem('token', data.token)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

export const loginThunk = createAsyncThunk<IAuthRes, ILoginReq, { rejectValue: IApiError }>('auth/loginThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await loginUser(params)
        window.localStorage.setItem('token', data.token)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

export const authThunk = createAsyncThunk<IAuthRes, void, { rejectValue: IApiError }>('auth/authThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await authUser()
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

const initialState: IAuthState = {
    user: null,
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
        logout: (state) => {
            state.user = null,
            state.status = 'idle',
            state.error = null,
            window.localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading',
                    state.error = null
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/fulfilled'),
                (state, action: PayloadAction<IAuthRes>) => {
                    state.user = action.payload.user,
                    state.status = 'success',
                    state.error = null
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/rejected'),
                (state, action: PayloadAction<IApiError>) => {
                    state.status = 'error',
                    state.error = action.payload.message
                }
            )
    }
})

export const { clearError } = authSlice.actions
export const { logout } = authSlice.actions

export const AuthReducer = authSlice.reducer