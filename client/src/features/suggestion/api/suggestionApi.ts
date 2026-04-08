import { axios } from "@/shared/api"
import { ISuggestionTrackReq } from "./suggestionApiTypes"
import { ISuggestion } from "@/entities/suggestion"

export const trackSuggestionApi = (params: ISuggestionTrackReq) => {
    return axios.post<{ message: string }>('/track/suggestion', params)
}

export const getTrackSuggestionApi = () => {
    return axios.get<{ suggestions: ISuggestion[] }>('/track/suggestion')
}