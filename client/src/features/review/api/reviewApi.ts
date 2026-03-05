import { axios } from "@/shared/api"
import { IReviewReq } from "./reviewApiTypes"

export const createReviewApi = (params: IReviewReq) => {
    return axios.post('/review/create', params)
}

export const addTextReviewApi = (params: { id: number, req: { text: string } }) => {
    return axios.patch(`/review/addText/${params.id}`, params.req)
}