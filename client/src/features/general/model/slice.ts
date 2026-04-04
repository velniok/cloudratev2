import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getArtistsCountApi, getGeneralApi } from "../api/generalApi";
import { IGeneral } from "@/entities/general";
import { IGeneralState } from "./generalSliceTypes";
import { IApiError } from "@/shared/types";

export const getGeneralThunk = createAsyncThunk<{ general: IGeneral }, void, { rejectValue: IApiError }>('general/getGeneralThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getGeneralApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getArtistsCountThunk = createAsyncThunk<{ general: IGeneral }, void, { rejectValue: IApiError }>('general/getGeneralThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getArtistsCountApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

const initialState: IGeneralState = {
    general: null,
    status: 'idle',
    error: null,
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.startsWith('general') && action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading',
                    state.error = null
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('general') && action.type.endsWith('/fulfilled'),
                (state, action: PayloadAction<{ general: IGeneral }>) => {
                    state.general = action.payload.general
                    state.status = 'success',
                    state.error = null
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('general') && action.type.endsWith('/rejected'),
                (state, action: PayloadAction<IApiError>) => {
                    state.status = 'error',
                    state.error = action.payload?.message ?? 'Непредвиденная ошибка'
                }
            )
    }
})

export const generalReducer = generalSlice.reducer