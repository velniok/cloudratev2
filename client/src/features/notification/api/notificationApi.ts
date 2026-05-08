import { axios } from "@/shared/api"

export const readNotificationApi = (params: { id: number }) => {
    return axios.patch<{ success: boolean }>(`/notification/read/${params.id}`)
}