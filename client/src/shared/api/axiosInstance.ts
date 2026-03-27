import axios from "axios"
import { API_URL } from "../config"
import { refreshApi, setToken } from "@/features/auth"
import { store } from "@/app/store"

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    const token = store.getState().auth.token
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
})

instance.interceptors.response.use(res => res,
    async (err) => {
        const original = err.config

        if (err.response?.status === 401 && !original._retry) {
            original._retry = true

            const { data } = await refreshApi()
            store.dispatch(setToken(data.token))

            original.headers.Authorization = `${data.token}`
            return instance(original)
        }

        return Promise.reject(err)
    }
)