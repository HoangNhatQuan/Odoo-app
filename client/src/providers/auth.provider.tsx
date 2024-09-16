import React from 'react'
import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'

import { IUser } from '@/apis/auth/auth.type'
import LoadingPage from '@/components/loading'

export type UserStore = {
  user: IUser | null
  setUser: (user: IUser | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      loading: false,
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

/**
 * Hook
 */

export const useProfile = () => {
  return useUserStore(({ setUser, user, loading, setLoading }) => ({
    setUser,
    user,
    setLoading,
    loading,
  }))
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading } = useProfile()

  if (loading) return <LoadingPage msg="Loading..." />
  return <>{children}</>
}

export default AuthProvider
