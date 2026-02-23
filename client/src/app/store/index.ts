import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../../features/auth/model/slice";
import { UserReducer } from "../../features/user/model/slice";

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch