import { axios } from "@/shared/api"
import { IUpdateUserReq } from "./userApiTypes"

export const updateUserApi = (params: IUpdateUserReq) => {
    return axios.patch(`user/update/${params.id}`, params.req)
}