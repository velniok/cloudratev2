import type { IUser } from "@/entities/user"
import { axios } from "@/shared/api"

export const getOneUser = (params: { id: number }) => {
    return axios.get<{ user: IUser }>(`/user/getOne/${params.id}`)
}

export const getUsersApi = () => {
    return axios.get<{ users: IUser[] }>('/user/get')
}