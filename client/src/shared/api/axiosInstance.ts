import axios from "axios"
import { API_URL } from "../config"
import { logout, logoutApi, refreshApi, setToken } from "@/features/auth"
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

instance.interceptors.response.use(
    (response) => response,
    async (err) => {
        const original = err.config

        if (err.response?.status === 401 && !original._retry && !original.url.includes('/auth/refresh')) {
            original._retry = true

            try {
                const { data } = await instance.get('/auth/refresh')
                store.dispatch(setToken(data.accessToken))
    
                original.headers.Authorization = `Bearer ${data.accessToken}`
                return instance(original)
            } catch (err) {
                store.dispatch(logout())
                logoutApi()
                return Promise.reject(err)
            }
        }

        return Promise.reject(err)
    }
)