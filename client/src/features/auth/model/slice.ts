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
    }
})

const initialState: IAuthState = {
    user: null,
    token: null,
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
                    state.token = action.payload.token,
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

export const { clearError, logout, setToken } = authSlice.actions

export const AuthReducer = authSlice.reducer