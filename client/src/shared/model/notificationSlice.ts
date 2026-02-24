import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification, INotificationState } from "./notificationTypes";

const initialState: INotificationState = {
    notification: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<Omit<INotification, 'id'>>) => {
            state.notification.push({ ...action.payload, id: Date.now() })
        },
        hideNotification: (state, action: PayloadAction<number>) => {
            state.notification = state.notification.filter((n) => n.id !== action.payload)
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer