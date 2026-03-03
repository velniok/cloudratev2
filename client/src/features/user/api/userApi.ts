import type { IUser } from "@/entities/user"
import { axios } from "@/shared/api"
import { IUpdateUserReq } from "./userApiTypes"

export const getOneUser = (params: { id: number }) => {
    return axios.get<{ user: IUser }>(`/user/getOne/${params.id}`)
}

export const getUsersApi = () => {
    return axios.get<{ users: IUser[] }>('/user/get')
}

export const updateUserApi = (params: IUpdateUserReq) => {
    return axios.patch<{ user: IUser }>(`user/update/${params.id}`, params.req)
}

export const deleteUserApi = (params: { id: number }) => {
    return axios.delete(`/user/delete/${params.id}`)
}