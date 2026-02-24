import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../../features/auth/model/slice";
import { UserReducer } from "../../features/user/model/slice";
import { notificationReducer } from "@/shared/model";

const rootReducer = combineReducers({
    notification: notificationReducer,
    auth: AuthReducer,
    user: UserReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch