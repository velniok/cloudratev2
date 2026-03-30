import { IReview } from "@/entities/review"
import { ITrack } from "@/entities/track"
import { axios } from "@/shared/api"

export const getNewTracksApi = () => {
    return axios.get<{ tracks: ITrack[]}>('/track/new-tracks')
}

export const getNewReviewsApi = () => {
    return axios.get<{ reviews: IReview[] }>('/review/new-reviews')
}