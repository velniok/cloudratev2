import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"

export const getTracksApi = () => {
    return axios.get<{ tracks: ITrack[] }>('/track/get')
}