import { IReview } from "@/entities/review"
import { IApiError, IPagination } from "@/shared/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getUserReviewsApi } from "../api/reviewApi"
import { IReviewState } from "./reviewSliceTypes"

export const getUserReviewsThunk = createAsyncThunk<{ reviews: IReview[], pagination: IPagination }, { page: number, limit: number, id: number }, { rejectValue: IApiError }>('review/getUserReviewsThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getUserReviewsApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

const initialState: IReviewState = {
    reviewList: null,
    reviewListPagination: null,
    reviewListStatus: 'idle',
    reviewListError:  null
}

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserReviewsThunk.pending, (state) => {
            state.reviewList = null,
            state.reviewListStatus = 'loading',
            state.reviewListError = null
        })
        .addCase(getUserReviewsThunk.fulfilled, (state, action) => {
            state.reviewListStatus = 'success',
            state.reviewList = action.payload.reviews
            state.reviewListPagination = action.payload.pagination
        })
        .addCase(getUserReviewsThunk.rejected, (state, action) => {
            state.reviewListStatus = 'error',
            state.reviewListError = action.payload.message
        })
    }
})

export const ReviewReducer = reviewSlice.reducer