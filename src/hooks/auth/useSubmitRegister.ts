import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { post } from '@/config/api/api'
import { endpoints } from '@/config/api/endpoints'

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

export interface RegisterResponse {
  tokens: {
    accessToken: string
    refreshToken: string
  }
  redirectUrl?: string
}

export const useSubmitRegister = () => {
  const { t } = useTranslation()

  return useMutation<RegisterResponse, Error, RegisterRequest, { redirectUrl?: string }>({
    mutationFn: async data => {
      return post<RegisterResponse>(endpoints.AUTH.REGISTER, data)
    },
    onSuccess: data => {
      toast(t('register.toasts.success.title'), {
        description: t('register.toasts.success.description')
      })
      return { redirectUrl: data.redirectUrl }
    },
    onError: error => {
      toast(t('register.toasts.error.title'), {
        description: error.message || t('register.toasts.error.description')
      })
    }
  })
}
