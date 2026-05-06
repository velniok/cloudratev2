import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiError } from "@/shared/types";
import axios from "axios";
import { ISuggestionState } from "./suggestionSliceTypes";
import { ISuggestion } from "@/entities/suggestion";
import { IArtist } from "@/entities/artist";
import { acceptSuggestionApi, getSuggestionListApi, rejectSuggestionApi, updateSuggestionArtistApi, updateSuggestionFeatApi } from "../api/suggestionApi";

export const getSuggestionList = createAsyncThunk<{ suggestions: ISuggestion[] }, void, { rejectValue: IApiError }>('/suggestion/getSuggestionList', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getSuggestionListApi()
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
        const { data } = await acceptSuggestionApi(params)
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
        const { data } = await rejectSuggestionApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const updateSuggestionArtistThunk = createAsyncThunk<{ suggestion: ISuggestion }, { id: number, req: IArtist }, { rejectValue: IApiError }>('/suggestion/updateSuggestionArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateSuggestionArtistApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
        return rejectWithValue({ message: 'Непредвиденная ошибка' })
    }
})

export const updateSuggestionFeatThunk = createAsyncThunk<{ suggestion: ISuggestion }, { id: number, tempId: string, req: IArtist }, { rejectValue: IApiError }>('/suggestion/updateSuggestionFeatThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateSuggestionFeatApi(params)
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

            .addCase(updateSuggestionArtistThunk.pending, (state) => {
                state.suggestionListError = null
            })
            .addCase(updateSuggestionArtistThunk.fulfilled, (state, action) => {
                if (state.suggestionList) {
                    state.suggestionList = state.suggestionList.map((suggestion) => {
                        if (suggestion.id === action.meta.arg.id) {
                            suggestion.artist = {
                                kind: 'artist',
                                id: action.meta.arg.req.id,
                                name: action.meta.arg.req.name,
                                avatarUrl: action.meta.arg.req.avatarUrl,
                                soundcloudUrl: action.meta.arg.req.soundcloudUrl,
                                createdAt: action.meta.arg.req.createdAt,
                            }
                        }
                        return suggestion
                    })
                }
            })
            .addCase(updateSuggestionArtistThunk.rejected, (state, action) => {
                state.suggestionListStatus = 'error',
                state.suggestionListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })

            .addCase(updateSuggestionFeatThunk.pending, (state) => {
                state.suggestionListError = null
            })
            .addCase(updateSuggestionFeatThunk.fulfilled, (state, action) => {
                if (state.suggestionList) {
                    state.suggestionList = state.suggestionList.map((suggestion) => {
                        if (suggestion.id === action.meta.arg.id) {
                            suggestion.featArtists = [...suggestion.featArtists, {
                                kind: 'artist',
                                id: action.meta.arg.req.id,
                                name: action.meta.arg.req.name,
                                avatarUrl: action.meta.arg.req.avatarUrl,
                                soundcloudUrl: action.meta.arg.req.soundcloudUrl,
                                createdAt: action.meta.arg.req.createdAt,
                            }]
                        }
                        return suggestion
                    })
                }
            })
            .addCase(updateSuggestionFeatThunk.rejected, (state, action) => {
                state.suggestionListStatus = 'error',
                state.suggestionListError = action.payload?.message ?? 'Непредвиденная ошибка'
            })
    }
})

export const suggestionReducer = suggestionSlice.reducer