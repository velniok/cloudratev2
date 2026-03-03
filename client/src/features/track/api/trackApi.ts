import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"
import { ITrackReq, ITrackUpdateReq } from "./trackApiTypes"

export const getTracksApi = () => {
    return axios.get<{ tracks: ITrack[] }>('/track/get')
}

export const getOneTrackApi = (params: { id: number }) => {
    return axios.get<{ track: ITrack }>(`/track/getOne/${params.id}`)
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