import React, { useState } from 'react'
import { Button, Form, Nav } from 'react-bootstrap'
import Input from 'src/component/FormComponents/CustomInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loginWithEmail, userLogin } from 'src/store/slices/authSlice'
import { LOGIN_SUCCESS } from 'src/utils/constants/messageConstant'
import { toast } from 'react-hot-toast'
import { FormProvider, useForm } from 'react-hook-form'
import { ForgotPassRoute, HomeRoute, LoginSuccessRoute } from 'src/utils/constants/routeConstant'

const loginEmailSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Please enter email address'),
  // isPassword: yup.bool(),
  // email_otp: yup.bool(),
  // password: yup.string()
  password: yup
    .string()
    // .matches(
    //   strongPasswordRegex,
    //   'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
    // )
    .max(20, 'Password should be at most 20 characters.')
    .required('Please enter password')
  // password: yup.string().when('isPassword', {
  //   is: true,
  //   then: yup
  //     .string()
  //     .matches(
  //       strongPasswordRegex,
  //       'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
  //     )
  //     .max(20, 'Password should be at most 20 characters.')
  //     .required('Please enter password')
  // })
})

const loginDefaultValues = {
  email: '',
  password: ''
}

const LoginWithEmail = ({ style }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [buffer, setBuffer] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: loginDefaultValues, // remove array after API Update
    resolver: yupResolver(loginEmailSchema)
  })
  const { register, reset, control, watch, handleSubmit, setValue, formState, setError } = methods
  const { errors } = formState
  const form = watch()

  const onSubmit = data => {
    const { email, password } = data

    let loginData = {
      email: email,
      password: password,
      otp_type: 'other',
      login_type: 'email' // email or mobile
    }

    dispatch(loginWithEmail(loginData)).then(res => {
      if (res?.payload) {
        toast.success(res?.payload?.status_message || LOGIN_SUCCESS)
        setTimeout(() => {
          router.push(LoginSuccessRoute)
        }, 700)
      }
    })
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Input
              className='mb-4'
              inputName='email'
              inputType='email'
              inputLabel='Email*'
              placeholder='Enter your email'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Input
              className='mb-4'
              inputName='password'
              inputType={!showPassword ? 'password' : 'text'}
              inputLabel='Password*'
              placeholder='Enter your password'
            />
          </Form.Group>
          <Form.Group className='mb-3 d-flex justify-content-between' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Remember me' className='fs_14' />
            <Nav.Link href={ForgotPassRoute} className='link_text fs_14'>
              Forgot Password
            </Nav.Link>
          </Form.Group>
          <div className='text-center mt-4'>
            <Button type='submit' className='btn btn_common'>
              Sign In
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginWithEmail
