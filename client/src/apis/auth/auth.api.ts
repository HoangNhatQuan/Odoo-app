import api from '@/configs/axios'
import {
  ILogin,
  ILoginData,
  IRegister,
  IRegisterData,
  IUser,
} from './auth.type'

import { setAccessToken } from '@/utils'

export const login = async (params: ILogin) => {
  const { data } = await api.post<ILoginData>('/auth/sign-in', {
    username: params.email,
    password: params.password,
  })
  setAccessToken({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  })
  return data
}

export const signup = async (params: IRegister) => {
  const { data } = await api.post<IRegisterData>('/auth/sign-up', params)
  return data
}

export const getUser = async () => {
  const res = await api.get<IUser>('/users/me')
  return res.data
}
