import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createArtistApi, deleteArtistApi, getArtistsApi, getOneArtistApi, searchArtistsApi, updateArtistApi } from "../api/artistApi";
import { IArtist } from "@/entities/artist";
import axios from "axios";
import { IArtistState } from "./artistSliceTypes";
import { IArtistReq } from "../api/artistApiTypes";

export const getArtistsThunk = createAsyncThunk<{ artists: IArtist[]}, void, { rejectValue: { message: string } }>('artist/getArtistsThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getArtistsApi()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
})

export const createArtistThunk = createAsyncThunk<{ artist: IArtist }, IArtistReq, { rejectValue: { message: string } }>('/artist/createArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await createArtistApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const getOneArtistThunk = createAsyncThunk<{artist: IArtist}, { id: number }, { rejectValue: { message: string } }>('/artist/getOneArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await getOneArtistApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const updateArtistThunk = createAsyncThunk<{artist: IArtist}, { id: number, req: IArtistReq }, { rejectValue: { message: string } }>('/artist/updateArtistThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await updateArtistApi(params)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const searchArtistsThunk = createAsyncThunk<{ artists: IArtist[] }, { query: string }, { rejectValue: { message: string } }>('/artist/searchArtistsThunk', async (params, { rejectWithValue }) => {
    try {
        const { data } = await searchArtistsApi(params.query)
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        } 
    }
})

export const deleteArtistThunk = createAsyncThunk<void, { id: number }, { rejectValue: { message: string } }>('artist/deleteArtistThunk', async (params, { rejectWithValue }) => {
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
    artistList: null,
    artistListStatus: 'idle',
    artist: null,
    artistStatus: 'idle',
    error: null
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getArtistsThunk.pending, (state) => {
            state.artistList = null,
            state.artistListStatus = 'loading',
            state.error = null
        })
        .addCase(getArtistsThunk.fulfilled, (state, action) => {
            state.artistList = action.payload.artists,
            state.artistListStatus = 'success',
            state.error = null
        })
        .addCase(getArtistsThunk.rejected, (state) => {
            state.artistList = null,
            state.artistListStatus = 'error',
            state.error = null
        })

        .addCase(createArtistThunk.pending, (state) => {
            state.artistListStatus = 'loading',
            state.error = null
        })
        .addCase(createArtistThunk.fulfilled, (state, action) => {
            state.artistList.push(action.payload.artist)
            state.artistListStatus = 'success',
            state.error = null
        })
        .addCase(createArtistThunk.rejected, (state) => {
            state.artistList = null,
            state.artistListStatus = 'error',
            state.error = null
        })

        .addCase(getOneArtistThunk.pending, (state) => {
            state.artist = null
            state.artistStatus = 'loading',
            state.error = null
        })
        .addCase(getOneArtistThunk.fulfilled, (state, action) => {
            state.artist = action.payload.artist
            state.artistStatus = 'success'
            state.error = null
        })
        .addCase(getOneArtistThunk.rejected, (state) => {
            state.artist = null,
            state.artistStatus = 'error',
            state.error = null
        })

        .addCase(updateArtistThunk.pending, (state) => {
            state.artistListStatus = 'loading',
            state.error = null
        })
        .addCase(updateArtistThunk.fulfilled, (state, action) => {
            state.artistList = state.artistList.map((artist) => {
                if (artist.id === action.meta.arg.id) {
                    artist.name = action.meta.arg.req.name
                    artist.avatarUrl = action.meta.arg.req.avatarUrl
                    artist.soundcloudUrl = action.meta.arg.req.soundcloudUrl
                }
                return artist
            })
            state.artistListStatus = 'success'
            state.error = null
        })
        .addCase(updateArtistThunk.rejected, (state) => {
            state.artistList = null,
            state.artistListStatus = 'error',
            state.error = null
        })

        .addCase(searchArtistsThunk.pending, (state) => {
            state.artistListStatus = 'loading',
            state.error = null
        })
        .addCase(searchArtistsThunk.fulfilled, (state, action) => {
            state.artistList = action.payload.artists
            state.artistListStatus = 'success',
            state.error = null
        })
        .addCase(searchArtistsThunk.rejected, (state) => {
            state.artistList = null,
            state.artistListStatus = 'error',
            state.error = null
        })

        .addCase(deleteArtistThunk.pending, (state) => {
            state.artistListStatus = 'loading',
            state.error = null
        })
        .addCase(deleteArtistThunk.fulfilled, (state, action) => {
            state.artistList = state.artistList.filter((artist) => artist.id !== action.meta.arg.id)
            state.artistListStatus = 'success',
            state.error = null
        })
        .addCase(deleteArtistThunk.rejected, (state) => {
            state.artistList = null,
            state.artistListStatus = 'error',
            state.error = null
        })
    }
})

export const artistReducer = artistSlice.reducer