import { IGeneral } from "@/entities/general"
import { axios } from "@/shared/api"

export const getGeneralApi = () => {
    return axios.get<{ general: IGeneral }>('/general/get')
}