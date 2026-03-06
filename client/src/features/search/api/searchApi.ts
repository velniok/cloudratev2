import { axios } from "@/shared/api"
import { ISearchReq } from "./searchApiTypes"


export const searchApi = (params: ISearchReq) => {
    return axios.get('/search', { params: { search: params.search, filter: params.filter  } })
}