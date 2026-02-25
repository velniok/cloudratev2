import { IArtist } from "@/entities/artist"
import { axios } from "@/shared/api"
import { IArtistReq } from "./artistApiTypes"

export const getArtistsApi = () => {
    return axios.get<{ artists: IArtist[]}>('/artist/get')
}

export const createArtistApi = (params: IArtistReq) => {
    return axios.post<{ artist: IArtist }>('/artist/create', params)
}

export const deleteArtistApi = (params: { id: number }) => {
    return axios.delete(`/artist/delete/${params.id}`)
}