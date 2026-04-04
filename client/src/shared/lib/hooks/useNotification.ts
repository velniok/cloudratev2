import { showNotification, type TNotificationTypes } from "@/shared/model"
import { useAppDispatch } from "./useAppDispatch"

export const useNotification = () => {
    const dispatch = useAppDispatch()

    const notify = (title: string, desc: string, type: TNotificationTypes) => {
        dispatch(showNotification({ title, desc, type }))
    }

    return { notify }
}