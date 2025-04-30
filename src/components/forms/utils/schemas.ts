import { z } from 'zod'

interface TranslationFunction {
  (key: string): string
}

export const getLoginSchema = (t: TranslationFunction) =>
  z.object({
    email: z.string().email(t('errors.invalid_email')),
    password: z.string().min(6, t('errors.short_password'))
  })

export const getRegisterSchema = (t: TranslationFunction) =>
  z
    .object({
      name: z
        .string()
        .min(2, t('errors.required_name'))
        .max(100, t('errors.invalid_name'))
        .regex(/^[А-Яа-я\s]+$/, t('errors.invalid_name')),
      email: z.string().email(t('errors.invalid_email')).max(100),
      password: z.string().min(6, t('errors.short_password')).max(100),
      confirmPassword: z.string().min(6, t('errors.short_password')).max(100)
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('errors.password_mismatch'),
      path: ['confirmPassword']
    })

export const getForgotPasswordSchema = (t: TranslationFunction) =>
  z.object({
    email: z.string().email(t('errors.invalid_email'))
  })
