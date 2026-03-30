import { ITrack } from "@/entities/track";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createTrackApi, deleteTrackApi, getTrackListApi, getTrackProfileApi, getTrackReviewsTextApi, updateTrackApi } from "../api/trackApi";
import { ITrackState } from "./trackSliceTypes";
import { ITrackReq, ITrackUpdateReq } from "../api/trackApiTypes";
import { IApiError, IPagination } from "@/shared/types";
import { IReview } from "@/entities/review";
import { toggleLikeReviewApi } from "@/features/review";

export const getTrackListThunk = createAsyncThunk<{ tracks: ITrack[], pagination: IPagination }, { page: number, limit: number }, { rejectValue: IApiError }>('/track/getTrackListThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getTrackListApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getTrackProfileThunk = createAsyncThunk<{ track: ITrack }, { trackId: number }, { rejectValue: IApiError }>('/track/getTrackProfileThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getTrackProfileApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getTrackReviewsTextThunk = createAsyncThunk<{ reviews: IReview[], pagination: IPagination }, { id: number, page: number, limit: number }, { rejectValue: IApiError }>('/track/getTrackReviewsTextThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getTrackReviewsTextApi(params)
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
        const { data } = await toggleLikeReviewApi(params)
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

    reviewsText: null,
    reviewsTextPagination: null,
    reviewsTextStatus: 'idle',

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
            .addCase(getTrackListThunk.pending, (state) => {
                state.trackList = null,
                state.trackListPagination = null,
                state.trackListStatus = 'loading',
                state.trackListError = null
            })
            .addCase(getTrackListThunk.fulfilled, (state, action) => {
                state.trackList = action.payload.tracks
                if (action.payload.pagination) {
                    state.trackListPagination = action.payload.pagination
                }
                state.trackListStatus = 'success'
            })
            .addCase(getTrackListThunk.rejected, (state, action) => {
                state.trackListStatus = 'error',
                state.trackListError = action.payload.message
            })

            .addCase(getTrackProfileThunk.pending, (state) => {
                state.track = null,
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(getTrackProfileThunk.fulfilled, (state, action) => {
                state.track = action.payload.track
                state.trackStatus = 'success'
            })
            .addCase(getTrackProfileThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(getTrackReviewsTextThunk.pending, (state) => {
                state.reviewsText = null,
                state.reviewsTextStatus = 'loading',
                state.reviewsTextPagination = null,
                state.trackError = null
            })
            .addCase(getTrackReviewsTextThunk.fulfilled, (state, action) => {
                state.reviewsText = action.payload.reviews
                state.reviewsTextPagination = action.payload.pagination
                state.reviewsTextStatus = 'success'
            })
            .addCase(getTrackReviewsTextThunk.rejected, (state, action) => {
                state.reviewsTextStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(createTrackThunk.pending, (state) => {
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(createTrackThunk.fulfilled, (state, action) => {
                state.trackList.push(action.payload.track),
                state.trackStatus = 'idle'
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
                state.trackStatus = 'idle'
            })
            .addCase(updateTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(toggleLikeReviewThunk.pending, (state) => {
                state.trackError = null
            })
            .addCase(toggleLikeReviewThunk.fulfilled, (state, action) => {
                state.reviewsText = state.reviewsText.map(review => {
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
                state.reviewsTextStatus = 'success'
            })
            .addCase(toggleLikeReviewThunk.rejected, (state, action) => {
                state.reviewsTextStatus = 'error',
                state.trackError = action.payload.message
            })

            .addCase(deleteTrackThunk.pending, (state) => {
                state.trackStatus = 'loading',
                state.trackError = null
            })
            .addCase(deleteTrackThunk.fulfilled, (state, action) => {
                state.trackList = state.trackList.filter((track) => track.id !== action.meta.arg.id),
                state.trackStatus = 'idle'
            })
            .addCase(deleteTrackThunk.rejected, (state, action) => {
                state.trackStatus = 'error',
                state.trackError = action.payload.message
            })
    }
})

export const trackReducer = trackSlice.reducer