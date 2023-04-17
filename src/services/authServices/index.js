import axios from 'axios'
import { SOMETHING_WRONG } from 'src/utils/constants/messageConstant'
import { axiosInstance } from '../axiosInstance/axiosInstance'
import { toast } from 'react-hot-toast'

export const LoginWithEmail = async loginData => {
  try {
    const response = await axiosInstance.post('/login', loginData)

    return response?.data
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

export const LoginWithMobile = async loginData => {
  try {
    const response = await axiosInstance.post('/login', loginData)

    return response?.data
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

export const VerifyOTP = async otpData => {
  try {
    const response = await axiosInstance.post('/verify-otp', otpData)

    return response?.data
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

export const RegisterWithEmail = async registrationData => {
  try {
    const response = await axiosInstance.post('/user', registrationData)

    return response
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

export const RegisterWithMobile = async registrationData => {
  try {
    const response = await axiosInstance.post('/user', registrationData)

    return response
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

export const ResendOtp = async otpData => {
  try {
    const response = await axiosInstance.post('/resend-otp', otpData)

    return response
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

// Change Password
export const ChangeUserPassword = async formData => {
  try {
    const response = await axiosInstance.post('/user/change-password', formData)

    return response
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

// Forgot password
export const ResetUserPassword = async formData => {
  try {
    const response = await axiosInstance.post('/forgot-password', formData)

    return response
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

// Update Password
export const UpdateUserPassword = async formData => {
  try {
    const response = await axiosInstance.post('/update-password', formData)

    return response
  } catch (error) {
    toast.error(error?.response?.data?.status_message || SOMETHING_WRONG)

    return error
  }
}

export const emailVerification = token =>
  new Promise((resolve, reject) =>
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_BACKEND_API_URL}/verify-token`, token, {
        headers: {
          api_key: process.env.NEXT_PUBLIC_APP_API_KEY
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.response?.data?.status_message || 'Something went wrong')
      })
  )
