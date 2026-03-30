import { axios } from "@/shared/api"
import { IReviewReq } from "./reviewApiTypes"

export const createReviewApi = (params: IReviewReq) => {
    return axios.post('/review/create', params)
}

export const addTextReviewApi = (params: { id: number, req: { text: string, userId: number } }) => {
    return axios.patch(`/review/add-text/${params.id}`, params.req)
}

export const toggleLikeReviewApi = (params: { reviewId: number, userId: number }) => {
    return axios.post('/review/toggle-like', params)
}