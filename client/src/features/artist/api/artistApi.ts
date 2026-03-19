import { IArtist } from "@/entities/artist"
import { axios } from "@/shared/api"
import { IArtistReq } from "./artistApiTypes"
import { IPagination } from "@/shared/types"

export const getArtistListApi = (params: { page: number, limit: number }) => {
    return axios.get<{ artists: IArtist[], pagination: IPagination}>('/artist/get', { params: { page: params.page, limit: params.limit } })
}

export const createArtistApi = (params: IArtistReq) => {
    return axios.post<{ artist: IArtist }>('/artist/create', params)
}

export const getOneArtistApi = (params: { id: number, userId: number }) => {
    return axios.get<{ artist: IArtist }>(`/artist/getOne/${params.id}`, { params: { userId: params.userId } })
}

export const updateArtistApi = (params: { id: number, req: IArtistReq }) => {
    return axios.patch<{ artist: IArtist }>(`/artist/update/${params.id}`, params.req)
}

export const toggleFollowApi = (params: { artistId: number, userId: number }) => {
    return axios.post('/artist/toggleFollow', params)
}

export const deleteArtistApi = (params: { id: number }) => {
    return axios.delete(`/artist/delete/${params.id}`)
}