import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"
import { ITrackReq } from "./trackApiTypes"

export const getTracksApi = () => {
    return axios.get<{ tracks: ITrack[] }>('/track/get')
}

export const createTrackApi = (params: ITrackReq) => {
    return axios.post<{ track: ITrack }>('/track/create', params)
}