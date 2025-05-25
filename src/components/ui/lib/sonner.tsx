import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner'
import { cn } from '@/lib/utils.ts'

const Sonner = () => {
  return (
    <SonnerToaster
      richColors
      position='bottom-right'
      className={cn('toaster group', 'max-w-md')}
      toastOptions={{ className: 'group toast' }}
    />
  )
}

export { Sonner, sonnerToast }
