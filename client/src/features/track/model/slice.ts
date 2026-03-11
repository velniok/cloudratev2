import { ITrack } from "@/entities/track";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTrackApi, deleteTrackApi, getOneTrackApi, getTracksApi, updateTrackApi } from "../api/trackApi";
import { ITrackState } from "./trackSliceTypes";
import { ITrackReq, ITrackUpdateReq } from "../api/trackApiTypes";
import { IApiError, IPagination } from "@/shared/types";
import { toggleLikeApi } from "@/features/review";

export const getTracksThunk = createAsyncThunk<{ tracks: ITrack[], pagination: IPagination }, { page: number, limit: number }, { rejectValue: IApiError }>('/track/getTracksThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getTracksApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getOneTrackThunk = createAsyncThunk<{ track: ITrack }, { trackId: number, userId: number }, { rejectValue: IApiError }>('/track/getOneTrackThunk', async (params, { rejectWithValue }) => {
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

export const toggleLikeReviewThunk = createAsyncThunk<{ liked: boolean }, { reviewId: number, userId: number }, { rejectValue: IApiError }>('/track/toggleLikeReview', async (params, { rejectWithValue }) => {
    try {
        const { data } = await toggleLikeApi(params)
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
    trackListPagination: null,
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
                state.trackListPagination = null,
                state.trackListStatus = 'loading',
                state.trackListError = null
            })
            .addCase(getTracksThunk.fulfilled, (state, action) => {
                state.trackList = action.payload.tracks
                if (action.payload.pagination) {
                    state.trackListPagination = action.payload.pagination
                }
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
                        Object.keys(action.meta.arg.req).map((key) => {
                            track[key] = action.meta.arg.req[key]
                        })
                    }
                    return track
                }),
                state.trackStatus = 'success'
            })
            .addCase(updateTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(toggleLikeReviewThunk.pending, (state) => {
                state.trackError = null
            })
            .addCase(toggleLikeReviewThunk.fulfilled, (state, action) => {
                state.track.reviews = state.track.reviews.map(review => {
                    if (review.id === action.meta.arg.reviewId) {
                        if (action.payload.liked) {
                            review.likesCount = String(+review.likesCount + 1)
                            review.isLiked = true
                        } else {
                            review.likesCount = String(+review.likesCount - 1)
                            review.isLiked = false
                        }
                    }
                    return review
                })
                state.trackStatus = 'success'
            })
            .addCase(toggleLikeReviewThunk.rejected, (state, action) => {
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