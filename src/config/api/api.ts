import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { endpoints } from './endpoints'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: 'https://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

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
        }>(endpoints.AUTH.REFRESH, {})
        localStorage.setItem('accessToken', response.data.AccessToken)
        localStorage.setItem('refreshToken', response.data.RefreshToken)
        originalRequest.headers.Authorization = `Bearer ${response.data.AccessToken}`
        return api(originalRequest)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = endpoints.AUTH.LOGIN
        return Promise.reject(error)
      }
    }
    throw error
  }
)

export const post = async <T>(url: string, data: unknown): Promise<T> => {
  try {
    const response = await api.post<T>(url, data)
    console.log('API Response Headers:', response.headers)
    console.log('Set-Cookie:', response.headers['set-cookie']) // Для отладки
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const message =
        error.response.data?.message ||
        `Error ${error.response.status}: ${error.response.statusText}`
      console.error('API Error:', message)
      throw new Error(message)
    } else {
      console.error('Network Error:', error)
      throw new Error('Network error. Please check your connection.')
    }
  }
}
