import Cookies from 'js-cookie'

export const setAccessToken = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) => {
  Cookies.set('accessToken', accessToken)
  Cookies.set('refreshToken', refreshToken)
}

export const getAccessToken = () => {
  return Cookies.get('accessToken')
}

export const getRefreshToken = () => {
  return Cookies.get('refreshToken')
}

export const removeAccessToken = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
