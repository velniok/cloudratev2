import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "@/shared/model";
import { artistReducer } from "@/features/artist";
import { trackReducer } from "@/features/track";
import { UserReducer } from "@/features/user";
import { AuthReducer } from "@/features/auth";
import { generalReducer } from "@/features/general";
import { searchReducer } from "@/features/search";

const rootReducer = combineReducers({
    notification: notificationReducer,
    auth: AuthReducer,
    user: UserReducer,
    artist: artistReducer,
    track: trackReducer,
    general: generalReducer,
    search: searchReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch