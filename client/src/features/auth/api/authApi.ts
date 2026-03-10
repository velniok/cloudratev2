import type { IUser } from "@/entities/user"
import { axios } from "@/shared/api"
import { type IAuthRes, type IRegisterReq, type ILoginReq } from "./authApiTypes"

export const registerUser = (params: IRegisterReq) => {
    return axios.post<IAuthRes>('auth/register', params)
}

export const loginUser = (params: ILoginReq) => {
    return axios.post<IAuthRes>('auth/login', params)
}

export const authUser = () => {
    return axios.get<IAuthRes>('auth/me')
}