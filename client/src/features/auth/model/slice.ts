import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ILoginReq, type IRegisterReq, type IAuthRes } from "../api/authApiTypes";
import { authUser, loginUser, registerUser } from "../api/authApi";
import type { IAuthState } from "./authSliceTypes";
import axios from "axios";
import type { IUser } from "@/entities/user";

export const registerThunk = createAsyncThunk<IAuthRes, IRegisterReq, { rejectValue: { message: string } }>('auth/registerThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await registerUser(params)
        window.localStorage.setItem('token', data.token)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
    return rejectWithValue({ message: 'Сетевая ошибка' })
})

export const loginThunk = createAsyncThunk<IAuthRes, ILoginReq, { rejectValue: { message: string } }>('auth/loginThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await loginUser(params)
        window.localStorage.setItem('token', data.token)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
    return rejectWithValue({ message: 'Сетевая ошибка' })
})

export const authThunk = createAsyncThunk<{ user: IUser }, void, { rejectValue: { message: string } }>('auth/authThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await authUser()
        return data
    } catch (err) {
        console.log(err)
    }
    return rejectWithValue({ message: 'Сетевая ошибка' })
})

const initialState: IAuthState = {
    status: 'idle',
    error: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        logout: (state) => {
            state.status = 'idle',
            state.user = null,
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
                    state.status = 'success',
                    state.user = action.payload.user,
                    state.error = null
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('auth') && action.type.endsWith('/rejected'),
                (state, action: PayloadAction<{ message: string }>) => {
                    state.status = 'error',
                    state.error = action.payload.message
                }
            )
    }
})

export const { clearError } = authSlice.actions
export const { logout } = authSlice.actions

export const AuthReducer = authSlice.reducer