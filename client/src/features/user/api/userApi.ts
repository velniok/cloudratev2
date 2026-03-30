import type { IUser } from "@/entities/user"
import { axios } from "@/shared/api"
import { IUpdateUserReq } from "./userApiTypes"
import { IArtist } from "@/entities/artist"
import { IPagination } from "@/shared/types"
import { IReview } from "@/entities/review"

export const getUserProfileApi = (params: { username: string }) => {
    return axios.get<{ user: IUser }>(`/user/profile/${params.username}`)
}

export const getUserListApi = () => {
    return axios.get<{ users: IUser[] }>('/user/list')
}

export const getUserReviewsApi = (params: { page: number, limit: number, id: number }) => {
    return axios.get<{ reviews: IReview[], pagination: IPagination }>(`/user/reviews/${params.id}`, { params: { page: params.page, limit: params.limit } })
}

export const getUserFollowsApi = (params: { page: number, limit: number, id: number }) => {
    return axios.get<{ artists: IArtist[], pagination: IPagination }>(`/user/follows/${params.id}`, { params: { page: params.page, limit: params.limit }})
}

export const updateUserApi = (params: IUpdateUserReq) => {
    return axios.patch<{ user: IUser }>(`user/update/${params.id}`, params.req)
}

export const updateUserRoleApi = (params: { id: number, role: 'admin' | 'user' }) => {
    return axios.patch(`/user/update-role/${params.id}`, { role: params.role })
}

export const deleteUserApi = (params: { id: number }) => {
    return axios.delete(`/user/delete/${params.id}`)
}