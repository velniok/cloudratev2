import { IArtist } from "@/entities/artist"
import { axios } from "@/shared/api"
import { IArtistReq } from "./artistApiTypes"

export const getArtistListApi = () => {
    return axios.get<{ artists: IArtist[]}>('/artist/get')
}

export const createArtistApi = (params: IArtistReq) => {
    return axios.post<{ artist: IArtist }>('/artist/create', params)
}

export const getOneArtistApi = (params: { id: number }) => {
    return axios.get<{ artist: IArtist }>(`/artist/getOne/${params.id}`)
}

export const updateArtistApi = (params: { id: number, req: IArtistReq }) => {
    return axios.patch<{ artist: IArtist }>(`/artist/update/${params.id}`, params.req)
}

export const searchArtistsApi = (query: string) => {
    return axios.get<{ artists: IArtist[] }>('/artist/search', { params: { search: query } })
}

export const deleteArtistApi = (params: { id: number }) => {
    return axios.delete(`/artist/delete/${params.id}`)
}