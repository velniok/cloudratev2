import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOneUser } from "../api/getUserApi";
import axios from "axios";
import type { IUserState } from "./userSliceTypes";
import type { IUser } from "@/entities/user";
import { IUpdateUserReq } from "../api/userApiTypes";
import { updateUserApi } from "../api/updateUserApi";

export const getOneUserThunk = createAsyncThunk<{ user: IUser }, { id: number }, { rejectValue: { message: string } }>('user/getOneUserThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getOneUser(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
    return rejectWithValue({ message: "Сетевая ошибка" })
})

export const updateUserThunk = createAsyncThunk<{ user: IUser }, IUpdateUserReq, { rejectValue: { message: string } }>('user/updateUserThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateUserApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

const initialState: IUserState = {
    getStatus: 'idle',
    updateStatus: 'idle',
    user: null,
    updateError: null,
    getError: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(getOneUserThunk.pending, (state) => {
                state.getStatus = 'loading',
                state.getError = null
            })
            .addCase(getOneUserThunk.fulfilled, (state, action) => {
                state.getStatus = 'success',
                state.user = action.payload.user,
                state.getError = null
            })
            .addCase(getOneUserThunk.rejected, (state, action) => {
                state.getStatus = 'error',
                state.getError = action.payload?.message ?? 'Неизвестная ошибка'
            })

            .addCase(updateUserThunk.pending, (state) => {
                state.updateStatus = 'loading',
                state.updateError = null
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.updateStatus = 'success',
                state.user = action.payload.user,
                state.updateError = null
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.updateStatus = 'error',
                state.updateError = action.payload?.message ?? 'Неизвестная ошибка'
            })
    }
})

export const UserReducer = userSlice.reducer