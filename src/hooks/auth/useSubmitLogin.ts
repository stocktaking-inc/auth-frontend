import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { post } from '@/config/api/api'
import { endpoints } from '@/config/api/endpoints'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export const useSubmitLogin = () => {
  const { t } = useTranslation()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async data => {
      console.log('Sending login request:', data)
      return post<LoginResponse>(endpoints.AUTH.LOGIN, data)
    },
    onSuccess: data => {
      toast(t('login.toasts.success.title'), {
        description: t('login.toasts.success.description')
      })

      const urlParams = new URLSearchParams(window.location.search)
      const redirectUrl =
        urlParams.get('redirect') ||
        `http://localhost:3000/dashboard?accessToken=${encodeURIComponent(data.accessToken)}&refreshToken=${encodeURIComponent(data.refreshToken)}`

      console.log('Redirecting to:', redirectUrl)
      window.location.href = redirectUrl
    },
    onError: error => {
      toast(t('login.toasts.error.title'), {
        description: error.message || t('login.toasts.error.description')
      })
    }
  })
}
