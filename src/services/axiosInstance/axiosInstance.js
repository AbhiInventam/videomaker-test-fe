import axios from 'axios'
import { toast } from 'react-hot-toast'
import { NEXT_PUBLIC_APP_BACKEND_API_URL } from 'src/utils/config/config'
import { getLocal, setLocal, removeLocal } from 'src/utils/localstorage'
import { ACCESS_TOKEN, PERSIST_AUTH, REFRESH_TOKEN, USER_DATA } from 'src/utils/constants/constant'
import { LoginRoute } from 'src/utils/constants/routeConstant'
import { UNAUTHORIZED_MSG } from 'src/utils/constants/messageConstant'

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_APP_BACKEND_API_URL
})

// For Refreshing Token
let isAlreadyFetchingAccessToken = false

// For Refreshing Token
let subscribers = []

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  var token = getLocal(ACCESS_TOKEN)

  config.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  if (token) {
    config.headers.Authorization = `${token}`
  }

  return config
})

// Add a response interceptor || Middleware for 401
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const { config, response } = error
    const originalRequest = config
    if (response?.status === 401) {
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

              // setTimeout(() => {
              //   window.location.reload()
              // }, 500)
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

        // const retryOriginalRequest = new Promise((resolve) => {
        //   addSubscriber((accessToken) => {
        //     // Make sure to assign accessToken according to your response.
        //     // Change Authorization header
        //     originalRequest.headers["Authorization"] = `${accessToken}`;
        //     resolve(axios(originalRequest));
        //   });
        // });
        // return retryOriginalRequest;
      } else {
        // Refresh token not found
        setTimeout(() => {
          logoutHandler()
        }, 300)
      }
    } else if (response?.status === 403) {
      toast.error(response?.data?.status_message || UNAUTHORIZED_MSG)
      setTimeout(() => {
        window.location.href = '/'
      }, 300)
    } else {
      return Promise.reject(error)
    }
  }
)

const onAccessTokenFetched = accessToken => {
  subscribers = subscribers.filter(callback => callback(accessToken))
}

const addSubscriber = callback => {
  subscribers.push(callback)
}

export const refreshAccessToken = tokenData => axiosInstance.post('/refresh-token', tokenData) //refresh token API

export const setUserData = userData => {
  if (userData) {
    setLocal(USER_DATA, JSON.stringify(userData))
    // setCookieData(USER_DATA, JSON.stringify(userData))
  } else {
    removeLocal(USER_DATA)
    // removeCookieData(USER_DATA)
  }
}

export const setAccessToken = accessToken => {
  if (accessToken) {
    setLocal(ACCESS_TOKEN, accessToken)
    // setCookieData(ACCESS_TOKEN, accessToken)
  } else {
    removeLocal(ACCESS_TOKEN)
    // removeCookieData(ACCESS_TOKEN)
  }
}

export const setRefreshToken = refreshToken => {
  if (refreshToken) {
    setLocal(REFRESH_TOKEN, refreshToken)
    // setCookieData(REFRESH_TOKEN, refreshToken)
  } else {
    removeLocal(REFRESH_TOKEN)
    // removeCookieData(REFRESH_TOKEN)
  }
}

export const clearAccessRefresh = () => {
  removeLocal(ACCESS_TOKEN)
  removeLocal(REFRESH_TOKEN)
}

export const setAccessRefresh = ({ accessToken, refreshToken }) => {
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
}

// Clear App Cookies
// export const clearAllAPPCookies = () => {
//   removeCookieData(USER_DATA)
//   removeCookieData(ACCESS_TOKEN)
//   removeCookieData(REFRESH_TOKEN)
// }

// Clear All Keys
export const clearAllLocalStore = () => {
  removeLocal(USER_DATA)
  removeLocal(ACCESS_TOKEN)
  removeLocal(REFRESH_TOKEN)
  removeLocal(PERSIST_AUTH)
  // clearAllAPPCookies()
}

// Login Handler
export const loginHandler = ({ accessToken, refreshToken, userData }) => {
  setUserData(userData)
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
}

// Logout Handler
export const logoutHandler = () => {
  localStorage.clear()
  clearAllAPPCookies()
  window.location.href = LoginRoute
}
