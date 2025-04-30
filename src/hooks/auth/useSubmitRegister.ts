import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/hooks/use-toast'
import { post } from '@/config/api/api'
import { endpoints } from '@/config/api/endpoints'

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse {
  accessToken: string
  refreshToken: string
}

export const useSubmitRegister = () => {
  const { t } = useTranslation()
  const { toast } = useToast()

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async data => {
      console.log('Sending register request:', data)
      return post<RegisterResponse>(endpoints.AUTH.REGISTER, data)
    },
    onSuccess: data => {
      toast({
        title: t('register.toasts.success.title'),
        description: t('register.toasts.success.description'),
        variant: 'default'
      })

      // Проверяем cookies (HttpOnly не видны, но для отладки)
      console.log('Cookies after register:', document.cookie)

      // Редирект с токенами в query-параметрах
      const urlParams = new URLSearchParams(window.location.search)
      const redirectUrl =
        urlParams.get('redirect') ||
        `http://localhost:3000?accessToken=${encodeURIComponent(data.accessToken)}&refreshToken=${encodeURIComponent(data.refreshToken)}`

      console.log('Redirecting to:', redirectUrl)
      window.location.href = redirectUrl
    },
    onError: error => {
      toast({
        title: t('register.toasts.error.title'),
        description: error.message || t('register.toasts.error.description'),
        variant: 'destructive'
      })
    }
  })
}
