// src/services/axios.ts
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  (error) => {
    const auth = useAuthStore()

    if (error.response?.status === 401) {
      auth.logout()
    }

    return Promise.reject(error)
  }
)

export default api
