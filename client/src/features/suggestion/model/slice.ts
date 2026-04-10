import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { acceptTrackSuggestionApi, getTrackSuggestionApi, rejectTrackSuggestionApi } from "../api/suggestionApi";
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

export const acceptSuggestionThunk = createAsyncThunk<{ suggestion: ISuggestion }, { suggestion: ISuggestion}, { rejectValue: IApiError }>('/suggestion/acceptSuggestion', async (params, { rejectWithValue }) => {
    try {
        const { data } = await acceptTrackSuggestionApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const rejectSuggestionThunk = createAsyncThunk<{ suggestion: ISuggestion }, { suggestion: ISuggestion}, { rejectValue: IApiError }>('/suggestion/rejectSuggestion', async (params, { rejectWithValue }) => {
    try {
        const { data } = await rejectTrackSuggestionApi(params)
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

            .addCase(acceptSuggestionThunk.pending, (state) => {
                state.suggestionListError = null
            })
            .addCase(acceptSuggestionThunk.fulfilled, (state, action) => {
                if (state.suggestionList) {
                    state.suggestionList = state.suggestionList.map((suggestion) => {
                        if (suggestion.id === action.payload.suggestion.id) return action.payload.suggestion
                        return suggestion
                    })
                }
            })
            .addCase(acceptSuggestionThunk.rejected, (state, action) => {
                state.suggestionListStatus = 'error',
                state.suggestionListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(rejectSuggestionThunk.pending, (state) => {
                state.suggestionListError = null
            })
            .addCase(rejectSuggestionThunk.fulfilled, (state, action) => {
                if (state.suggestionList) {
                    state.suggestionList = state.suggestionList.map((suggestion) => {
                        if (suggestion.id === action.payload.suggestion.id) return action.payload.suggestion
                        return suggestion
                    })
                }
            })
            .addCase(rejectSuggestionThunk.rejected, (state, action) => {
                state.suggestionListStatus = 'error',
                state.suggestionListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const suggestionReducer = suggestionSlice.reducer