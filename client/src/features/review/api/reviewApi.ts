import { axios } from "@/shared/api"
import { IReviewReq } from "./reviewApiTypes"
import { IReview } from "@/entities/review"
import { IPagination } from "@/shared/types"

export const createReviewApi = (params: IReviewReq) => {
    return axios.post('/review/create', params)
}

export const addTextReviewApi = (params: { id: number, req: { text: string, userId: number } }) => {
    return axios.patch(`/review/addText/${params.id}`, params.req)
}

export const getTrackReviewsTextApi = (params: { id: number, page: number, limit: number }) => {
    return axios.get<{ reviews: IReview[], pagination: IPagination }>(`/review/reviewsWithText/${params.id}`, { params: { page: params.page, limit: params.limit } })
}

export const toggleLikeApi = (params: { reviewId: number, userId: number }) => {
    return axios.post('/review/toggleLike', params)
}

export const getUserReviewsApi = (params: { page: number, limit: number, id: number }) => {
    return axios.get<{ reviews: IReview[], pagination: IPagination }>(`/user/getUserReviews/${params.id}`, { params: { page: params.page, limit: params.limit } })
}