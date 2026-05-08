import { axios } from "@/shared/api"
import { ISuggestionTrackReq, ISuggestionUpdateReq } from "./suggestionApiTypes"
import { ISuggestion } from "@/entities/suggestion"
import { IArtist } from "@/entities/artist"
import { IPagination } from "@/shared/types"

export const trackSuggestionApi = (params: ISuggestionTrackReq) => {
    return axios.post<{ message: string }>('/suggestion/create', params)
}

export const getSuggestionListApi = (params: { page: number, limit: number, filter: string }) => {
    return axios.get<{ suggestions: ISuggestion[], pagination: IPagination }>('/suggestion/list', { params: { page: params.page, limit: params.limit, status: params.filter } })
}

export const updateSuggestionArtistApi = (params: {id: number, req: IArtist}) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/update-artist/${params.id}`, params.req)
}

export const updateSuggestionFeatApi = (params: {id: number, tempId: string, req: IArtist}) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/update-feat/${params.id}`, {...params.req, tempId: params.tempId})
}

export const updateSuggestionApi = (params: ISuggestionUpdateReq) => {
    return axios.patch<{ suggestion: ISuggestion }>(`/suggestion/update/${params.id}`, params.req)
}

export const acceptSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/accept', params)
}

export const rejectSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/reject', params)
}