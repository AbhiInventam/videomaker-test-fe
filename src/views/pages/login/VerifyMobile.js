import React, { useState } from 'react'
import { Button, Form, Nav } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import customStyle from './SignIn.module.scss'
import PhoneInput from 'react-phone-input-2'

// form validation rules
const validationSchema = yup.object().shape({
  mobile: yup.object().shape({
    value: yup.string().required('Phone number is required')
  })
})
const defaultValues = {
  // countryCode: "+91",
  mobile: {
    value: ''
  }
}

const VerifyMobile = ({ style, onMobileSignIn, isBuffer, setIsBuffer }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [buffer, setBuffer] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isOtpPanel, setIsOtpPanel] = useState({
    show: false, // temp
    data: null
  })

  const methods = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const { handleSubmit, formState, control, watch, setError } = methods
  const form = watch()
  const { errors } = formState

  const onSubmit = data => {
    const { mobile, phone_number_otp, email_otp } = data

    if (form?.mobile?.country?.dialCode === form?.mobile?.value) {
      setError(
        'mobile.value',
        { type: 'custom', message: 'Phone number is required' },
        {
          shouldValidate: true
        }
      )
    } else {
      const loginData = {
        mobile: mobile.value.slice(mobile.country.dialCode.length),
        mobile_country_code: mobile.country.dialCode,
        login_type: 'mobile', // email or mobile
        otp_type: 'mobile' // temp pls convert to array and add selected otp type
      }
      setIsBuffer({
        ...isBuffer,
        logInBuffer: true
      })
      onMobileSignIn(form)
    }
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-4' controlId='countryCode'>
            <Form.Label>Phone number*</Form.Label>
            <Controller
              name={'mobile'}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <PhoneInput
                      country={'in'}
                      containerClass={customStyle.phoneNumberControl}
                      inputClass={customStyle.phonNumberInputControl}
                      value={value.value}
                      onChange={(value, country) => onChange({ value, country })}
                      placeholder='Enter Phone number'
                      countryCodeEditable={false}
                      className={`${errors?.mobile?.value ? 'is-invalid' : ''}`}
                      isInvalid={!!errors?.mobile?.value}
                      onEnterKeyPress={handleSubmit(onSubmit)}
                    />
                    <Form.Control.Feedback type='invalid' className={customStyle.validationText}>
                      {errors?.mobile?.value?.message}
                    </Form.Control.Feedback>
                  </>
                )
              }}
            />
          </Form.Group>
          <div className='text-center mt-5'>
            <Button type='submit' className='btn btn_common'>
              Send OTP
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default VerifyMobile
