import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHomeState } from "./homeSliceTypes";
import { ITrack } from "@/entities/track";
import { IApiError } from "@/shared/types";
import axios from "axios";
import { getLatestTracksApi, getNewReviewsApi, getNewTracksApi } from "../api/homeApi";
import { IReview } from "@/entities/review";

export const getNewTracksThunk = createAsyncThunk<{ tracks: ITrack[] }, void, { rejectValue: IApiError }>('/home/getNewTracksThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getNewTracksApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getNewReviewsThunk = createAsyncThunk<{ reviews: IReview[] }, void, { rejectValue: IApiError }>('/home/getNewReviewsThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getNewReviewsApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const getLatestTracksThunk = createAsyncThunk<{ tracks: ITrack[] }, void, { rejectValue: IApiError }>('/home/getLatestTracksThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getLatestTracksApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

const initialState: IHomeState = {
    newTracks: null,
    newTracksStatus: 'idle',

    newReviews: null,
    newReviewsStatus: 'idle',

    latestTracks: null,
    latestTracksStatus: 'idle',

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
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(getLatestTracksThunk.pending, (state) => {
                state.latestTracks = null,
                state.latestTracksStatus = 'loading',
                state.error = null
            })
            .addCase(getLatestTracksThunk.fulfilled, (state, action) => {
                state.latestTracks = action.payload.tracks
                state.latestTracksStatus = 'success'
            })
            .addCase(getLatestTracksThunk.rejected, (state, action) => {
                state.latestTracksStatus = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(getNewReviewsThunk.pending, (state) => {
                state.newReviews = null,
                state.newReviewsStatus = 'loading',
                state.error = null
            })
            .addCase(getNewReviewsThunk.fulfilled, (state, action) => {
                state.newReviews = action.payload.reviews
                state.newReviewsStatus = 'success'
            })
            .addCase(getNewReviewsThunk.rejected, (state, action) => {
                state.newReviewsStatus = 'error',
                state.error = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const homeReducer = homeSlice.reducer