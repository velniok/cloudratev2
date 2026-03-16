import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"

export const getNewTracksApi = () => {
    return axios.get<{ tracks: ITrack[]}>('/track/newTracks')
}