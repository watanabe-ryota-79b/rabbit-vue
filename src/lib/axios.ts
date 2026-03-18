import axios from 'axios'
import type { AxiosError } from 'axios'
import type { ApiError } from '@/api/types'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// レスポンスインターセプター: HTTPエラーを ApiError に変換する
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: (error.response?.data as { message?: string })?.message ?? error.message,
    }
    return Promise.reject(apiError)
  },
)
