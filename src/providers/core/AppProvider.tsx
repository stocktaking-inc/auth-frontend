import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { LoginForm, RegisterForm } from '@/components/forms'

import { routes } from '@/config/routes.ts'

export const AppProvider = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <main className='flex-grow flex items-center justify-center px-4'>
          <Routes>
            <Route
              path={routes.AUTH.LOGIN}
              element={<LoginForm />}
            />
            <Route
              path={routes.AUTH.REGISTER}
              element={<RegisterForm />}
            />
            <Route
              path={routes.HOME}
              element={
                <Navigate
                  to='/login'
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
