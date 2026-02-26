import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "@/shared/model";
import { artistReducer } from "@/features/artist";
import { trackReducer } from "@/features/track";
import { UserReducer } from "@/features/user";
import { AuthReducer } from "@/features/auth";

const rootReducer = combineReducers({
    notification: notificationReducer,
    auth: AuthReducer,
    user: UserReducer,
    artist: artistReducer,
    track: trackReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch