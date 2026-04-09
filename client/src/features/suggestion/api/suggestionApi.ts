import { axios } from "@/shared/api"
import { ISuggestionTrackReq } from "./suggestionApiTypes"
import { ISuggestion } from "@/entities/suggestion"

export const trackSuggestionApi = (params: ISuggestionTrackReq) => {
    return axios.post<{ message: string }>('/suggestion/track', params)
}

export const getTrackSuggestionApi = () => {
    return axios.get<{ suggestions: ISuggestion[] }>('/suggestion/track')
}

export const acceptTrackSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/track-accept', params)
}

export const rejectTrackSuggestionApi = (params: { suggestion: ISuggestion }) => {
    return axios.post('/suggestion/track-reject', params)
}