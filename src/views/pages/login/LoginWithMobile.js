import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithMobile, resendOTP, saveCountryCode, saveMobileNo } from 'src/store/slices/authSlice'
import { LOGIN_SUCCESS } from 'src/utils/constants/messageConstant'
import { toast } from 'react-hot-toast'
import VerifyMobile from './VerifyMobile'
import VerifyOTP from './VerifyOtp'
import { verifyOTP } from 'src/store/slices/authSlice'
import { LoginSuccessRoute } from 'src/utils/constants/routeConstant'

const LoginWithMobile = ({ style }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { mobile, countryCode } = useSelector(state => state.auth)

  const [isOtpSend, setIsOtpSend] = useState(false)
  const [isBuffer, setIsBuffer] = useState({
    otpBuffer: false,
    resendBuffer: false,
    logInBuffer: false
  })

  const onOTPSubmit = formData => {
    formData.mobile = mobile
    formData.mobile_country_code = countryCode
    formData.otp_type = 'mobile'
    dispatch(verifyOTP(formData)).then(response => {
      if (response.payload) {
        toast.success(response?.payload?.status_message || LOGIN_SUCCESS)
        setTimeout(() => {
          router.push(router.query.returnUrl ? decodeURIComponent(router.query.returnUrl) : LoginSuccessRoute)
        }, 700)
      } else {
        setIsBuffer({
          ...isBuffer,
          otpBuffer: false
        })
      }
    })
  }

  const onMobileSignIn = ({ mobile }) => {
    const loginData = {
      mobile: mobile.value.slice(mobile.country.dialCode.length),
      mobile_country_code: mobile.country.dialCode,
      login_type: 'mobile', // email or mobile
      otp_type: 'mobile' // temp pls convert to array and add selected otp type
    }

    dispatch(loginWithMobile(loginData)).then(res => {
      if (res?.payload) {
        toast.success(res?.payload?.status_message)
        dispatch(saveMobileNo(loginData.mobile))
        dispatch(saveCountryCode(loginData.mobile_country_code))
        setIsOtpSend(true)
      }
      setIsBuffer({
        ...isBuffer,
        logInBuffer: false
      })
    })
  }

  const handleResendOTP = () => {
    const otpData = {
      mobile: mobile,
      mobile_country_code: countryCode,
      otp_type: 'mobile'
    }
    dispatch(resendOTP(otpData)).then(response => {
      if (response) {
        setIsBuffer({
          ...isBuffer,
          resendBuffer: false
        })
      }
    })
  }

  return (
    <div>
      {!isOtpSend ? (
        <VerifyMobile onMobileSignIn={onMobileSignIn} isBuffer={isBuffer} setIsBuffer={setIsBuffer} style={style} />
      ) : (
        <VerifyOTP
          onOTPSubmit={onOTPSubmit}
          handleResendOTP={handleResendOTP}
          isBuffer={isBuffer}
          setIsBuffer={setIsBuffer}
          style={style}
        />
      )}
    </div>
  )
}

export default LoginWithMobile
