import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IHomeState } from "./homeSliceTypes";
import { ITrack } from "@/entities/track";
import { IApiError } from "@/shared/types";
import axios from "axios";
import { getNewReviewsApi, getNewTracksApi } from "../api/homeApi";
import { IReview } from "@/entities/review";

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

export const getNewReviewsThunk = createAsyncThunk<{ reviews: IReview[] }, void, { rejectValue: IApiError }>('/home/getNewReviewsThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getNewReviewsApi()
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

    newReviews: null,
    newReviewsStatus: 'idle',

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
                state.error = action.payload.message
            })
    }
})

export const homeReducer = homeSlice.reducer