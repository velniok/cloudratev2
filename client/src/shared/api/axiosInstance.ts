import axios from "axios"
import { API_URL } from "../config"

export const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})