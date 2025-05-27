import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { endpoints } from './endpoints'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL as string,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await api.post<{
          AccessToken: string
          RefreshToken: string
        }>(endpoints.AUTH.REGISTER, {})
        originalRequest.headers.Authorization = `Bearer ${response.data.AccessToken}`
        return api(originalRequest)
      } catch {
        return Promise.reject(error)
      }
    }
    throw error
  }
)

export const post = async <T>(url: string, data: unknown): Promise<T> => {
  try {
    const response = await api.post<T>(url, data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const message =
        error.response.data?.message ||
        `Error ${error.response.status}: ${error.response.statusText}`
      throw new Error(message)
    } else {
      throw new Error('Network error. Please check your connection.')
    }
  }
}
