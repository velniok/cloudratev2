import { ITrack } from "@/entities/track";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTrackApi, deleteTrackApi, getOneTrackApi, getTracksApi, updateTrackApi } from "../api/trackApi";
import { ITrackState } from "./trackSliceTypes";
import { ITrackReq, ITrackUpdateReq } from "../api/trackApiTypes";
import { IApiError } from "@/shared/types";

export const getTracksThunk = createAsyncThunk<{ tracks: ITrack[] }, void, { rejectValue: IApiError }>('/track/getTracksThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getTracksApi()
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getOneTrackThunk = createAsyncThunk<{ track: ITrack }, { id: number }, { rejectValue: IApiError }>('/track/getOneTrackThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getOneTrackApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const createTrackThunk = createAsyncThunk<{ track: ITrack }, ITrackReq, { rejectValue: IApiError }>('/track/createTrackThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await createTrackApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const updateTrackThunk = createAsyncThunk<{ track: ITrack }, ITrackUpdateReq, { rejectValue: IApiError }>('/track/updateTrackThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateTrackApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const deleteTrackThunk = createAsyncThunk<void, { id: number }, { rejectValue: IApiError }>('/track/deleteTrackThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await deleteTrackApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

const initialState: ITrackState = {
    track: null,
    trackStatus: 'idle',
    trackError: null,
    trackList: null,
    trackListStatus: 'idle',
    trackListError: null,
}

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTracksThunk.pending, (state) => {
                state.trackList = null,
                state.trackListStatus = 'loading',
                state.trackListError = null
            })
            .addCase(getTracksThunk.fulfilled, (state, action) => {
                state.trackList = action.payload.tracks,
                state.trackListStatus = 'success'
            })
            .addCase(getTracksThunk.rejected, (state, action) => {
                state.trackListStatus = 'error',
                state.trackListError = action.payload.message
            })

            .addCase(getOneTrackThunk.pending, (state) => {
                state.track = null,
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(getOneTrackThunk.fulfilled, (state, action) => {
                state.track = action.payload.track
                state.trackStatus = 'success'
            })
            .addCase(getOneTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(createTrackThunk.pending, (state) => {
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(createTrackThunk.fulfilled, (state, action) => {
                state.trackList.push(action.payload.track),
                state.trackStatus = 'success'
            })
            .addCase(createTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(updateTrackThunk.pending, (state) => {
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(updateTrackThunk.fulfilled, (state, action) => {
                state.trackList = state.trackList.map(track => {
                    if (track.id === action.meta.arg.id) {
                        track.title = action.meta.arg.req.title
                        track.coverUrl = action.meta.arg.req.coverUrl
                    }
                    return track
                }),
                state.trackStatus = 'success'
            })
            .addCase(updateTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(deleteTrackThunk.pending, (state) => {
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(deleteTrackThunk.fulfilled, (state, action) => {
                state.trackList = state.trackList.filter((track) => track.id !== action.meta.arg.id),
                state.trackStatus = 'success'
            })
            .addCase(deleteTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })
    }
})

export const trackReducer = trackSlice.reducer