import { axios } from "@/shared/api"
import { IUpdateUserReq } from "./userApiTypes"

export const updateAvatarApi = (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return axios.post<{ url: string }>('/upload', formData)
}

export const updateUserApi = (params: IUpdateUserReq) => {
    return axios.patch(`user/update/${params.id}`, params.req)
}