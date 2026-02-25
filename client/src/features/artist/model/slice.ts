import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createArtistApi, deleteArtistApi, getArtistsApi } from "../api/artistApi";
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