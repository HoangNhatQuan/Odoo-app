import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import Header from '@/components/header'
import { useProfile } from '@/providers/auth.provider'
import { removeAccessToken } from '@/utils'
import { getUser } from '@/apis/auth/auth.api'

const HomeLayout: React.FC = () => {
  const navigate = useNavigate()
  const { user, setUser, setLoading } = useProfile()

  const fetchUser = async () => {
    try {
      setLoading(true)
      if (!user) {
        const user = await getUser()
        setUser(user)
      } else navigate('/')
    } catch (error) {
      navigate('/login')
      removeAccessToken()
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="flex flex-col relative gap-4">
      <Header />
      <Outlet />
    </div>
  )
}

export default HomeLayout
