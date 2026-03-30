import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createArtistApi, deleteArtistApi, getArtistListApi, getArtistProfileApi, getArtistTracksApi, toggleFollowApi, updateArtistApi } from "../api/artistApi";
import type { IArtist } from "@/entities/artist";
import axios from "axios";
import type { IArtistState } from "./artistSliceTypes";
import type { IArtistReq } from "../api/artistApiTypes";
import type { IApiError, IPagination } from "@/shared/types";
import { ITrack } from "@/entities/track";

export const getArtistListThunk = createAsyncThunk<{ artists: IArtist[], pagination: IPagination}, {page: number, limit: number}, { rejectValue: IApiError }>('artist/getArtistListThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getArtistListApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

export const createArtistThunk = createAsyncThunk<{ artist: IArtist }, IArtistReq, { rejectValue: IApiError }>('/artist/createArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await createArtistApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getArtistProfileThunk = createAsyncThunk<{artist: IArtist}, { id: number }, { rejectValue: IApiError }>('/artist/getArtistProfileThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getArtistProfileApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getArtistTracksThunk = createAsyncThunk<{ tracks: ITrack[], pagination: IPagination }, { page: number, limit: number, id: number }, { rejectValue: IApiError }>('/artist/getArtistTracksThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getArtistTracksApi(params)
        return data
    } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const updateArtistThunk = createAsyncThunk<{artist: IArtist}, { id: number, req: IArtistReq }, { rejectValue: IApiError }>('/artist/updateArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateArtistApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const toggleFollowThunk = createAsyncThunk<{followed: boolean}, { artistId: number, userId: number }, { rejectValue: IApiError }>('/artist/toggleFollowThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await toggleFollowApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const deleteArtistThunk = createAsyncThunk<void, { id: number }, { rejectValue: IApiError }>('artist/deleteArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await deleteArtistApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

const initialState: IArtistState = {
    artist: null,
    artistStatus: 'idle',
    artistError: null,

    tracks: null,
    tracksPagination: null,
    tracksStatus: 'idle',

    artistList: null,
    artistListPagination: null,
    artistListStatus: 'idle',
    artistListError: null,
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getArtistListThunk.pending, (state) => {
            state.artistList = null,
            state.artistListPagination = null,
            state.artistListStatus = 'loading',
            state.artistListError = null
        })
        .addCase(getArtistListThunk.fulfilled, (state, action) => {
            state.artistList = action.payload.artists
            if (action.payload.pagination) {
                state.artistListPagination = action.payload.pagination
            }
            state.artistListStatus = 'success'
        })
        .addCase(getArtistListThunk.rejected, (state, action) => {
            state.artistListStatus = 'error',
            state.artistListError = action.payload.message
        })

        
        .addCase(getArtistProfileThunk.pending, (state) => {
            state.artist = null,
            state.artistStatus = 'loading',
            state.artistError = null
        })
        .addCase(getArtistProfileThunk.fulfilled, (state, action) => {
            state.artist = action.payload.artist,
            state.artistStatus = 'success'
        })
        .addCase(getArtistProfileThunk.rejected, (state, action) => {
            state.artist = null,
            state.artistStatus = 'error',
            state.artistError = action.payload.message
        })

        .addCase(getArtistTracksThunk.pending, (state) => {
            state.tracksStatus = 'loading'
            state.artistError = null
        })
        .addCase(getArtistTracksThunk.fulfilled, (state, action) => {
            state.tracks = action.payload.tracks
            if (action.payload.pagination) {
                state.tracksPagination = action.payload.pagination
            }
            state.tracksStatus = 'success'
        })
        .addCase(getArtistTracksThunk.rejected, (state, action) => {
            state.tracksStatus = 'error',
            state.artistError = action.payload.message
        })
        
        .addCase(createArtistThunk.pending, (state) => {
            state.artistStatus = 'loading',
            state.artistError = null
        })
        .addCase(createArtistThunk.fulfilled, (state, action) => {
            state.artistList.push(action.payload.artist),
            state.artistStatus = 'idle'
        })
        .addCase(createArtistThunk.rejected, (state, action) => {
            state.artistStatus = 'error',
            state.artistError = action.payload.message
        })

        .addCase(updateArtistThunk.pending, (state) => {
            state.artistStatus = 'loading',
            state.artistError = null
        })
        .addCase(updateArtistThunk.fulfilled, (state, action) => {
            state.artistList = state.artistList.map((artist) => {
                if (artist.id === action.meta.arg.id) {
                    Object.keys(action.meta.arg.req).map(key => {
                        artist[key] = action.meta.arg.req[key]
                    })
                }
                return artist
            }),
            state.artistStatus = 'idle'
        })
        .addCase(updateArtistThunk.rejected, (state) => {
            state.artistStatus = 'error',
            state.artistError = null
        })

        .addCase(toggleFollowThunk.pending, (state) => {
            state.artistError = null
        })
        .addCase(toggleFollowThunk.fulfilled, (state, action) => {
            if (action.payload.followed) {
                ++state.artist.follow.followersCount
                state.artist.follow.isFollowed = true
            } else {
                --state.artist.follow.followersCount
                state.artist.follow.isFollowed = false
            }
        })
        .addCase(toggleFollowThunk.rejected, (state) => {
            state.artistStatus = 'error',
            state.artistError = null
        })

        .addCase(deleteArtistThunk.pending, (state) => {
            state.artistStatus = 'loading',
            state.artistError = null
        })
        .addCase(deleteArtistThunk.fulfilled, (state, action) => {
            state.artistList = state.artistList.filter((artist) => artist.id !== action.meta.arg.id),
            state.artistStatus = 'idle'
        })
        .addCase(deleteArtistThunk.rejected, (state, action) => {
            state.artistStatus = 'error',
            state.artistError = action.payload.message
        })
    }
})

export const artistReducer = artistSlice.reducer