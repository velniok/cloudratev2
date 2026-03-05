import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getGeneralApi } from "../api/generalApi";
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
            .addCase(getGeneralThunk.pending, (state) => {
                state.general = null,
                state.status = 'loading',
                state.error = null
            })
            .addCase(getGeneralThunk.fulfilled, (state, action) => {
                state.general = action.payload.general,
                state.status = 'success'
            })
            .addCase(getGeneralThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload.message
            })
    }
})

export const generalReducer = generalSlice.reducer