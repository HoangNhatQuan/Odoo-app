import React from 'react'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import ToastProvider from '@/providers/toast.provider'
import AuthProvider from '@/providers/auth.provider'

import '@/static/styles/index.scss'

const Layout: React.FC = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default Layout
