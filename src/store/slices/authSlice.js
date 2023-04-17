import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import {
  LoginWithEmail,
  LoginWithMobile,
  RegisterWithEmail,
  RegisterWithMobile,
  ResendOtp,
  VerifyOTP
} from 'src/services/authServices'
import { loginHandler, logoutHandler, setAccessRefresh } from 'src/services/axiosInstance/axiosInstance'
import { DEFAULT_ROLE } from 'src/utils/constants/constant'

export const userSignUp = createAsyncThunk('auth/userSignUp', async (signUpData, { rejectWithValue }) => {
  try {
    // const response = await PostUser(signUpData)
    // toast.success(SIGNUP_MESSAGE.SUCCESS)
    // return response
  } catch (error) {
    toast.error(error)

    return rejectWithValue(error)
  }
})

export const googleSignUp = createAsyncThunk('auth/googleSignUp', async (signUpData, { rejectWithValue }) => {
  try {
    // const response = await GoogleSignUp(signUpData)
    // if (response.data?.token) {
    //   setLocal(ACCESS_TOKEN, response.data.token)
    // }
    // return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const loginWithEmail = createAsyncThunk('auth/loginWithEmail', async (loginData, { rejectWithValue }) => {
  const response = await LoginWithEmail(loginData)

  if (!response.token) {
    return rejectWithValue(undefined)
  }

  loginHandler({
    userData: { ...response.data, role: response.data.role_data.role_key || 'admin' },
    accessToken: response?.token,
    refreshToken: response?.refreshToken
  })

  return response
})

export const loginWithMobile = createAsyncThunk('auth/loginWithMobile', async (loginData, { rejectWithValue }) => {
  const response = await LoginWithMobile(loginData)

  if (response?.response?.data) {
    return rejectWithValue(undefined)
  }

  return response
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    // const response = await ForgotPassword(email)
    // if (response.data?.token) {
    //   setLocal(ACCESS_TOKEN, response.data.token)
    // }
    // return response
  } catch (error) {
    toast.error(error)

    return rejectWithValue(error)
  }
})

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data, { rejectWithValue }) => {
  const response = await VerifyOTP(data)

  if (response?.response?.data) {
    return rejectWithValue(undefined)
  }

  loginHandler({
    userData: { ...response.data, role: response.data.role_data.role_key || DEFAULT_ROLE },
    accessToken: response?.token,
    refreshToken: response?.refreshToken
  })

  return response
})

export const resendOTP = createAsyncThunk('auth/resendOTP', async (otpData, { rejectWithValue }) => {
  const response = await ResendOtp(otpData)
  if (response?.response?.data) {
    return rejectWithValue(undefined)
  }
  toast.success('OTP re-send to registered mobile number.')
  return response
})

// User Register with Email
export const registerWithEmail = createAsyncThunk('auth/registerWithEmail', async registrationData => {
  const response = await RegisterWithEmail(registrationData)

  return response
})

// User Register with Mobile
export const registerWithMobile = createAsyncThunk('auth/registerWithMobile', async registrationData => {
  const response = await RegisterWithMobile(registrationData)

  return response
})

const authInitData = {
  loggedInUser: {},
  token: null,
  refreshToken: null,
  mobile: null,
  countryCode: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitData,
  reducers: {
    logout: state => {
      state.loggedInUser = {}
      state.token = null
      state.refreshToken = null
      state.mobile = null
      state.countryCode = null
      logoutHandler()
    },
    saveMobileNo: (state, action) => {
      state.mobile = action.payload
    },
    saveCountryCode: (state, action) => {
      state.countryCode = action.payload
    },
    updateUser: (state, action) => {
      // state.loggedInUser = { ...state.loggedInUser, ...action.payload };
      setAccessRefresh({
        accessToken: action.payload.token,
        refreshToken: action.payload.refreshToken
      })
      state.loggedInUser = action.payload.data
      state.mobile = action.payload.data.mobile
      state.countryCode = action.payload.data.countryCode
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },

    setUserDataStore: (state, action) => {
      state.loggedInUser = action.payload.data
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    },
    resetAuthState: (state, action) => {
      state.loggedInUser = authInitData.loggedInUser
      state.token = authInitData.token
      state.refreshToken = authInitData.refreshToken
      state.mobile = authInitData.mobile
      state.countryCode = authInitData.countryCode
    }
  },
  extraReducers: builder => {
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      state.loggedInUser = action.payload.data
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
    })
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loginError = action.payload
    })
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loginError = null
    })
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.signUpError = action.payload
    })
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.signUpError = null
    })
    builder.addCase(googleSignUp.fulfilled, (state, action) => {
      state.loggedInUser = action.payload.data.data
      state.token = action.payload.data.token
      state.refreshToken = action.payload.data.refreshToken
    })

    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.loggedInUser = action.payload.data
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.mobile = action.payload.mobile
      state.countryCode = action.payload.countryCode
    })
    // builder.addCase(resendOTP.fulfilled, (state, action) => {
    //   state.successMessage = 'OTP re-send to registered mobile number.'
    // })
  }
})

export const { logout, saveMobileNo, saveCountryCode, updateUser, resetAuthState, setUserDataStore } = authSlice.actions

export default authSlice.reducer
