import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getArtists } from "../api/getArtistApi";
import { IArtist } from "@/entities/artist";
import axios from "axios";
import { error } from "console";
import { IArtistState } from "./artistSliceTypes";

export const getArtistsThunk = createAsyncThunk<{ artists: IArtist[]}, void, { rejectValue: { message: string } }>('artist/getArtistsThunk', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getArtists()
        return data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return rejectWithValue(err.response.data)
        }
    }
    return rejectWithValue({ message: 'Сетевая ошибка' })
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
    }
})

export const artistReducer = artistSlice.reducer