import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Input from 'src/component/FormComponents/CustomInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { registerWithEmail, userLogin } from 'src/store/slices/authSlice'
import { toast } from 'react-hot-toast'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { nameRegex, strongPasswordRegex } from 'src/utils/regex'
import { LoginRoute } from 'src/utils/constants/routeConstant'
import inputStyle from 'src/component/FormComponents/CustomInput/CustomInput.module.scss'
import { USER_REGISTERED_MSG } from 'src/utils/constants/messageConstant'

const registerEmailSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(nameRegex, 'Please enter characters')
    .max(20, 'First Name must be at most 20 characters')
    .required('Please enter first Name'),
  last_name: yup
    .string()
    .matches(nameRegex, 'Please enter characters')
    .max(20, 'Last Name must be at most 20 characters')
    .required('Please enter last Name'),
  email: yup.string().email('Email must be a valid email').required('Please enter email address'),

  // password: yup.string().min(5).required('Please enter password')
  password: yup
    .string()
    .min(5) // update to 8 and enable matches for strong password
    .matches(
      strongPasswordRegex,
      'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
    )
    .required('Please enter password'),
  confirm_password: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  term_policy: yup.boolean().oneOf([true], 'Please accept policy')
})

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  term_policy: false
}

const RegisterWithEmail = ({ style }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  // ** States
  // const [showPassword, setShowPassword] = useState(false)
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false
  })

  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(registerEmailSchema)
  })

  const {
    control,
    setError,
    handleSubmit,
    watch,
    formState: { errors }
  } = methods
  const form = watch()

  const onSubmit = data => {
    const { first_name, last_name, email, password } = data

    const registrationData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      login_type: 'email' // email or mobile
    }

    // Post data
    dispatch(registerWithEmail(registrationData)).then(res => {
      if (res.payload?.data) {
        toast.success(res.payload?.data?.status_message || USER_REGISTERED_MSG)
        setTimeout(() => {
          router.push(LoginRoute)
        }, 500)
      }
    })
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xl={6} md={6}>
              <Form.Group className='mb-3'>
                <Input
                  className='mb-4'
                  inputName='first_name'
                  inputType='text'
                  inputLabel='First Name*'
                  placeholder='Enter your first name'
                />
              </Form.Group>
            </Col>
            <Col xl={6} md={6}>
              <Form.Group className='mb-3'>
                <Input
                  className='mb-4'
                  inputName='last_name'
                  inputType='text'
                  inputLabel='Last Name*'
                  placeholder='Enter your last name'
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-3'>
            <Input
              className='mb-4'
              inputName='email'
              inputType='email'
              inputLabel='Email*'
              placeholder='Enter your email'
            />
          </Form.Group>
          <Row>
            <Col xl={6} md={6}>
              <Form.Group className='mb-3'>
                <Input
                  className='mb-4'
                  inputName='password'
                  inputType={!showPassword.password ? 'password' : 'text'}
                  inputLabel='Password*'
                  placeholder='Enter your password'
                />
              </Form.Group>
            </Col>
            <Col xl={6} md={6}>
              <Form.Group className='mb-3'>
                <Input
                  className='mb-4'
                  inputName='confirm_password'
                  inputType={!showPassword.confirm_password ? 'password' : 'text'}
                  inputLabel='Confirm Password*'
                  placeholder='Enter your confirm password'
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mb-3 justify-content-start'>
            <Controller
              name={'term_policy'}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Form.Check.Input
                      type={'checkbox'}
                      value={value}
                      onChange={onChange}
                      isInvalid={!!errors?.term_policy}
                    />
                    <Form.Check.Label className={`${errors?.term_policy ? 'is-invalid' : ''} mx-3 mb-1`}>
                      I agree with Terms and Privacy Policy
                    </Form.Check.Label>
                    <Form.Control.Feedback type='invalid' className={inputStyle.validationText}>
                      {errors?.term_policy?.message}
                    </Form.Control.Feedback>
                  </>
                )
              }}
            />
          </Form.Group>
          <div className='text-center mt-4'>
            <Button type='submit' className='btn btn_common'>
              Sign Up
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default RegisterWithEmail
