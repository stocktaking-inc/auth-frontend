import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { useToast } from '@/hooks/use-toast'
import { post } from '@/config/api/api'
import { endpoints } from '@/config/api/endpoints'

import { AuthResponse, LoginRequest } from './types'

export const useSubmitLogin = () => {
  const { t } = useTranslation()
  const { toast } = useToast()

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async data => {
      return post<AuthResponse>(endpoints.AUTH.LOGIN, data)
    },
    onSuccess: data => {
      toast({
        title: t('login.toasts.success.title'),
        description: t('login.toasts.success.description'),
        variant: 'default'
      })

      window.location.href = `http://localhost:3000?accessToken=${encodeURIComponent(data.accessToken)}&refreshToken=${encodeURIComponent(data.refreshToken)}`
    },
    onError: error => {
      toast({
        title: t('login.toasts.error.title'),
        description: error.message || t('login.toasts.error.description'),
        variant: 'destructive'
      })
    }
  })
}
