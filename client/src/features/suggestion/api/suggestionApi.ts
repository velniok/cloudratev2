import { axios } from "@/shared/api"
import { ISuggestionTrackReq } from "./suggestionApiTypes"
import { ISuggestion } from "@/entities/suggestion"
import { IArtist } from "@/entities/artist"

export const trackSuggestionApi = (params: ISuggestionTrackReq) => {
    return axios.post<{ message: string }>('/suggestion/create', params)
}

export const getSuggestionListApi = () => {
    return axios.get<{ suggestions: ISuggestion[] }>('/suggestion/list')
}

export const updateSuggestionArtistApi = (params: {id: number, req: IArtist}) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/update-artist/${params.id}`, params.req)
}

export const updateSuggestionFeatApi = (params: {id: number, tempId: string, req: IArtist}) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/update-feat/${params.id}`, {...params.req, tempId: params.tempId})
}

export const acceptSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/accept', params)
}

export const rejectSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/reject', params)
}