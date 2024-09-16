import axios from 'axios'

import { getAccessToken, getRefreshToken, setAccessToken } from '@/utils'

const api = axios.create({
  baseURL: `https://youtube-video-sharing-app-hm44.onrender.com`,
})

// Set the default config for axios
api.defaults.headers.post['Content-Type'] = 'application/json'

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    try {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        const response = await api.post(`/auth/refresh-token`, { refreshToken })
        const newAccessToken = response.data.accessToken
        if (newAccessToken) {
          setAccessToken({ accessToken: newAccessToken, refreshToken })
          error.config.headers.Authorization = `Bearer ${newAccessToken}`

          return axios(error.config)
        }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
