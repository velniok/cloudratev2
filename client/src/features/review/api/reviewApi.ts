import { axios } from "@/shared/api"
import { IReviewReq } from "./reviewApiTypes"

export const createReviewApi = (params: IReviewReq) => {
    return axios.post('/review/create', params)
}