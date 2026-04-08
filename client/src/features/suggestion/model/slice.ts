import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTrackSuggestionApi } from "../api/suggestionApi";
import { IApiError } from "@/shared/types";
import axios from "axios";
import { ISuggestionState } from "./suggestionSliceTypes";
import { ISuggestion } from "@/entities/suggestion";

export const getSuggestionList = createAsyncThunk<{ suggestions: ISuggestion[] }, void, { rejectValue: IApiError }>('/suggestion/getSuggestionList', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getTrackSuggestionApi()
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

const initialState: ISuggestionState = {
    suggestionList: null,
    suggestionListStatus: 'idle',
    suggestionListError: null,
}

const suggestionSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSuggestionList.pending, (state) => {
                state.suggestionList = null,
                state.suggestionListStatus = 'loading',
                state.suggestionListError = null
            })
            .addCase(getSuggestionList.fulfilled, (state, action) => {
                state.suggestionList = action.payload.suggestions
                state.suggestionListStatus = 'success'
            })
            .addCase(getSuggestionList.rejected, (state, action) => {
                state.suggestionListStatus = 'error',
                state.suggestionListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const suggestionReducer = suggestionSlice.reducer