import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"
import { ITrackReq, ITrackUpdateReq } from "./trackApiTypes"
import { IPagination } from "@/shared/types"

export const getTracksApi = (params: { page: number, limit: number }) => {
    return axios.get<{ tracks: ITrack[], pagination: IPagination }>('/track/get', { params: { page: params.page, limit: params.limit }})
}

export const getOneTrackApi = (params: { trackId: number, userId: number }) => {
    return axios.get<{ track: ITrack }>(`/track/getOne/${params.trackId}`, { params: { userId: params.userId } })
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