import { ITrack } from "@/entities/track";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTrackApi, getTracksApi } from "../api/trackApi";
import { error } from "console";
import { ITrackState } from "./trackSliceTypes";
import { ITrackReq } from "../api/trackApiTypes";

export const getTracksThunk = createAsyncThunk<{ tracks: ITrack[] }, void, { rejectValue: { message: string } }>('/track/getTracksThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getTracksApi()
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const createTrackThunk = createAsyncThunk<{ track: ITrack }, ITrackReq, { rejectValue: { message: string } }>('/track/createTrackThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await createTrackApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

const initialState: ITrackState = {
    trackList: null,
    trackListStatus: 'idle',
    error: null
}

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTracksThunk.pending, (state) => {
                state.trackList = null,
                state.trackListStatus = 'loading'
            })
            .addCase(getTracksThunk.fulfilled, (state, action) => {
                state.trackList = action.payload.tracks
                state.trackListStatus = 'success'
            })
            .addCase(getTracksThunk.rejected, (state) => {
                state.trackList = null,
                state.trackListStatus = 'error'
            })

            .addCase(createTrackThunk.pending, (state) => {
                state.trackListStatus = 'loading'
            })
            .addCase(createTrackThunk.fulfilled, (state, action) => {
                state.trackList.push(action.payload.track)
                state.trackListStatus = 'success'
            })
            .addCase(createTrackThunk.rejected, (state) => {
                state.trackList = null,
                state.trackListStatus = 'error'
            })
    }
})

export const trackReducer = trackSlice.reducer