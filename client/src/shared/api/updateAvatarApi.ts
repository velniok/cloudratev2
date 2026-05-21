import { axios } from "."

export const updateAvatarApi = (file: File, folder: string) => {
    const formData = new FormData()
    formData.append('image', file)
    return axios.post<{ url: string }>(`/upload?folder=${folder}`, formData)
}

export const updateAvatarUrlApi = (url: string, folder: string) => {
    return axios.post<{ url: string }>(`upload/url`, { url: url, folder: folder })
}