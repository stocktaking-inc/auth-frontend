import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

import { Button } from '@/components/ui/lib/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/lib/card'
import { Input } from '@/components/ui/lib/input'
import { Label } from '@/components/ui/lib/label'

import { routes } from '@/config/routes'

import { getLoginSchema } from './utils/schemas'
import { useSubmitLogin } from '@/hooks/auth/useSubmitLogin'

export const LoginForm = () => {
  const { t } = useTranslation()
  const schema = getLoginSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: submitLogin, isPending, data } = useSubmitLogin()

  const onSubmit = (data: { email: string; password: string }) => {
    submitLogin(data)
  }

  useEffect(() => {
    if (data?.redirectUrl) {
      const form = document.createElement('form')
      form.method = 'GET'
      form.action = data.redirectUrl
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    }
  }, [data])

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>{t('login.form.title')}</CardTitle>
        <CardDescription className='w-full text-center text-sm'>
          {t('login.form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{t('login.form.email')}</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                autoComplete='email'
                {...register('email')}
                required
              />
              {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>{t('login.form.password')}</Label>
              </div>
              <Input
                id='password'
                type='password'
                autoComplete='current-password'
                {...register('password')}
                required
              />
              {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={!isValid || isPending}
            >
              {isPending ? t('login.form.loading') : t('login.form.to_login')}
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          {t('login.form.no_account')}{' '}
          <Link
            to={routes.AUTH.REGISTER}
            className='underline text-blue-600'
          >
            {t('register.form.to_register')}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
