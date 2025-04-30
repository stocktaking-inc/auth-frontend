import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { useToast } from '@/hooks/use-toast'
import { post } from '@/config/api/api'
import { endpoints } from '@/config/api/endpoints'

import {AuthResponse, RegisterRequest} from "./types.ts";

export const useSubmitRegister = () => {
  const { t } = useTranslation()
  const { toast } = useToast()

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: async data => {
      return post<AuthResponse>(endpoints.AUTH.REGISTER, {
        name: data.name,
        email: data.email,
        password: data.password
      })
    },
    onSuccess: data => {
      toast({
        title: t('register.toasts.success.title'),
        description: t('register.toasts.success.description'),
        variant: 'default'
      })

      window.location.href = `http://localhost:3000?accessToken=${encodeURIComponent(data.accessToken)}&refreshToken=${encodeURIComponent(data.refreshToken)}`
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
