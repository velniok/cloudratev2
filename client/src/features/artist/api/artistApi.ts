import { IArtist } from "@/entities/artist"
import { axios } from "@/shared/api"
import { IArtistReq } from "./artistApiTypes"
import { IPagination } from "@/shared/types"
import { ITrack } from "@/entities/track"

export const getArtistListApi = (params: { page: number, limit: number }) => {
    return axios.get<{ artists: IArtist[], pagination: IPagination}>('/artist/list', { params: { page: params.page, limit: params.limit } })
}

export const createArtistApi = (params: IArtistReq) => {
    return axios.post<{ artist: IArtist }>('/artist/create', params)
}

export const getArtistProfileApi = (params: { id: number }) => {
    return axios.get<{ artist: IArtist }>(`/artist/profile/${params.id}`)
}

export const getArtistTracksApi = (params: { page: number, limit: number, id: number }) => {
    return axios.get<{ tracks: ITrack[], pagination: IPagination }>(`/artist/tracks/${params.id}`, { params: { page: params.page, limit: params.limit }})
}

export const updateArtistApi = (params: { id: number, req: IArtistReq }) => {
    return axios.patch<{ artist: IArtist }>(`/artist/update/${params.id}`, params.req)
}

export const toggleFollowApi = (params: { artistId: number, userId: number }) => {
    return axios.post('/artist/toggle-follow', params)
}

export const deleteArtistApi = (params: { id: number }) => {
    return axios.delete(`/artist/delete/${params.id}`)
}