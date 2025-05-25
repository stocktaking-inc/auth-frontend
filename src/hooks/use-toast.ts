'use client'

import { sonnerToast } from '@/components/ui/lib/sonner.tsx'

type ToastOptions = {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

function toast({ title, description, action }: ToastOptions) {
  sonnerToast(title, {
    description,
    action: action ? { label: action.label, onClick: action.onClick } : undefined,
    duration: 5000,
    closeButton: true,
    className: 'group toast max-w-md'
  })
}

export { toast }
