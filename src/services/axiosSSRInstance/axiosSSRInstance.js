import axios from 'axios'
import { clearAccessRefresh, logoutHandler, refreshAccessToken, setAccessRefresh } from '../axiosInstance/axiosInstance'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/constants/constant'
import { getLocal } from 'src/utils/localstorage'
import { NEXT_PUBLIC_APP_BACKEND_API_URL } from 'src/utils/config/config'

export const axiosSSRInstance = axios.create({
  baseURL: NEXT_PUBLIC_APP_BACKEND_API_URL
})

// For Refreshing Token
let isAlreadyFetchingAccessToken = false

axiosSSRInstance.interceptors.request.use(function (config) {
  config.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  return config
})

// Add a response interceptor || Middleware for 401
axiosSSRInstance.interceptors.response.use(
  response => response,
  error => {
    const {
      config,
      response: { status }
    } = error
    const originalRequest = config
    // ==========================================
    // if (status === 401) {
    //   setTimeout(() => {
    //     window.location.href = "/";
    //   }, 500);
    // } else {
    //   return Promise.reject(error);
    // }
    // ==========================================
    if (status === 401) {
      // get tokens
      const refresh_token = getLocal(REFRESH_TOKEN)
      const access_token = getLocal(ACCESS_TOKEN)
      // ====================================================
      if (refresh_token && access_token) {
        // Refresh Token Promise
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true

          const tokenData = {
            refreshToken: refresh_token,
            accessToken: access_token
          }

          refreshAccessToken(tokenData)
            .then(response => {
              isAlreadyFetchingAccessToken = false
              // Clear Tokens
              clearAccessRefresh()

              setAccessRefresh({
                accessToken: response.data.token,
                refreshToken: response.data.refreshToken
              })

              setTimeout(() => {
                window.location.reload()
              }, 500)
            })
            .catch(error => {
              isAlreadyFetchingAccessToken = false
              toast.error('Session Expired')

              setTimeout(() => {
                logoutHandler()
              }, 500)
            })
        } else {
          return Promise.reject(error)
        }
      } else {
        // Refresh token not found
        setTimeout(() => {
          logoutHandler()
        }, 300)
      }
    } else {
      return Promise.reject(error)
    }
  }
)
