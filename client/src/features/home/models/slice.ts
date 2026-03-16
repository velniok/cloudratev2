import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHomeState } from "./homeSliceTypes";
import { ITrack } from "@/entities/track";
import { IApiError } from "@/shared/types";
import axios from "axios";
import { getNewTracksApi } from "../api/homeApi";

export const getNewTracksThunk = createAsyncThunk<{ tracks: ITrack[] }, void, { rejectValue: IApiError }>('/home/getNewTracksThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getNewTracksApi()
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

const initialState: IHomeState = {
    newTracks: null,
    newTracksStatus: 'idle',

    error: null
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNewTracksThunk.pending, (state) => {
                state.newTracks = null,
                state.newTracksStatus = 'loading',
                state.error = null
            })
            .addCase(getNewTracksThunk.fulfilled, (state, action) => {
                state.newTracks = action.payload.tracks
                state.newTracksStatus = 'success'
            })
            .addCase(getNewTracksThunk.rejected, (state, action) => {
                state.newTracksStatus = 'error',
                state.error = action.payload.message
            })
    }
})

export const homeReducer = homeSlice.reducer