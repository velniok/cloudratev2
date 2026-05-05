import { axios } from "@/shared/api"
import { ISuggestionTrackReq } from "./suggestionApiTypes"
import { ISuggestion } from "@/entities/suggestion"
import { IArtist } from "@/entities/artist"

export const trackSuggestionApi = (params: ISuggestionTrackReq) => {
    return axios.post<{ message: string }>('/suggestion/track', params)
}

export const getTrackSuggestionApi = () => {
    return axios.get<{ suggestions: ISuggestion[] }>('/suggestion/track')
}

export const updateTrackSuggestionArtistApi = (params: {id: number, req: IArtist}) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/track-update-artist/${params.id}`, params.req)
}

export const updateTrackSuggestionFeatApi = (params: {id: number, tempId: string, req: IArtist}) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/track-update-feat/${params.id}`, {...params.req, tempId: params.tempId})
}

export const acceptTrackSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/track-accept', params)
}

export const rejectTrackSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/track-reject', params)
}