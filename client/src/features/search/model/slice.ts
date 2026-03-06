import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearchReq, ISearchRes } from "../api/searchApiTypes";
import { IApiError } from "@/shared/types";
import axios from "axios";
import { searchApi } from "../api/searchApi";
import { ISearchState } from "./searchSliceTypes";

export const searchThunk = createAsyncThunk<ISearchRes, ISearchReq, { rejectValue: IApiError }>('/search/searchThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await searchApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

const initialState: ISearchState = {
    search: null,
    status: 'idle',
    error: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.search = null,
            state.status = 'idle',
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchThunk.pending, (state) => {
                state.search = null,
                state.status = 'loading',
                state.error = null
            })
            .addCase(searchThunk.fulfilled, (state, action) => {
                state.search = action.payload.result
                state.status = 'success'
            })
            .addCase(searchThunk.rejected, (state, action) => {
                state.status = 'error',
                state.error = action.payload.message
            })
    }
})

export const searchReducer = searchSlice.reducer
export const { clearSearch } = searchSlice.actions