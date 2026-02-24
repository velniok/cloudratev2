import { IArtist } from "@/entities/artist"
import { axios } from "@/shared/api"

export const getArtists = () => {
    return axios.get<{ artists: IArtist[]}>('/artist/get')
}