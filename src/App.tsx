import './i18n'

import { AppProvider, ToastProvider, QueryProvider } from '@/providers'

export default function App() {
  return (
    <>
      <QueryProvider>
        <AppProvider />
        <ToastProvider />
      </QueryProvider>
    </>
  )
}
