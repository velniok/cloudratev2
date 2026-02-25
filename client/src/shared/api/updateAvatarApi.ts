import { axios } from "."

export const updateAvatarApi = (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return axios.post<{ url: string }>('/upload', formData)
}