import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"
import { ITrackReq, ITrackUpdateReq } from "./trackApiTypes"
import { IPagination } from "@/shared/types"
import { IReview } from "@/entities/review"

export const getTrackListApi = (params: { page: number, limit: number }) => {
    return axios.get<{ tracks: ITrack[], pagination: IPagination }>('/track/list', { params: { page: params.page, limit: params.limit }})
}

export const getTrackProfileApi = (params: { trackId: number }) => {
    return axios.get<{ track: ITrack }>(`/track/profile/${params.trackId}`)
}

export const getTrackReviewsTextApi = (params: { id: number, page: number, limit: number }) => {
    return axios.get<{ reviews: IReview[], pagination: IPagination }>(`/track/reviews-text/${params.id}`, { params: { page: params.page, limit: params.limit } })
}

export const createTrackApi = (params: ITrackReq) => {
    return axios.post<{ track: ITrack }>('/track/create', params)
}

export const updateTrackApi = (params: ITrackUpdateReq) => {
    return axios.patch<{ track: ITrack }>(`/track/update/${params.id}`, params.req)
}

export const deleteTrackApi = (params: { id: number }) => {
    return axios.delete(`/track/delete/${params.id}`)
}