import { axios } from "@/shared/api"
import { type IAuthRes, type IRegisterReq, type ILoginReq } from "./authApiTypes"

export const sendVerifyCodeApi = (params: IRegisterReq) => {
    return axios.post<IAuthRes>('auth/sendVerifyCode', params)
}

export const registerUser = (params: IRegisterReq & { verifyCode: string }) => {
    return axios.post<IAuthRes>('auth/register', params)
}

export const loginUser = (params: ILoginReq) => {
    return axios.post<IAuthRes>('auth/login', params)
}

export const refreshApi = () => {
    return axios.get<IAuthRes>('auth/refresh')
}

export const logoutApi = () => {
    return axios.get('auth/logout')
}