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
  tokens: {
    accessToken: string
    refreshToken: string
  }
  redirectUrl?: string
}

export const useSubmitLogin = () => {
  const { t } = useTranslation()

  return useMutation<LoginResponse, Error, LoginRequest, {redirectUrl?: string}>({
    mutationFn: async data => {
      return post<LoginResponse>(endpoints.AUTH.LOGIN, data)
    },
    onSuccess: data => {
      toast(t('login.toasts.success.title'), {
        description: t('login.toasts.success.description')
      })
      return { redirectUrl: data.redirectUrl }
    },
    onError: error => {
      toast(t('login.toasts.error.title'), {
        description: error.message || t('login.toasts.error.description')
      })
    }
  })
}
