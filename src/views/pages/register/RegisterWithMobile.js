import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Input from 'src/component/FormComponents/CustomInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { registerWithMobile, userLogin } from 'src/store/slices/authSlice'
import { toast } from 'react-hot-toast'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { nameRegex } from 'src/utils/regex'
import customStyle from './SignUp.module.scss'
import PhoneInput from 'react-phone-input-2'
import inputStyle from 'src/component/FormComponents/CustomInput/CustomInput.module.scss'
import { LoginRoute } from 'src/utils/constants/routeConstant'
import { USER_REGISTERED_MSG } from 'src/utils/constants/messageConstant'

const defaultValues = {
  first_name: '',
  last_name: '',
  mobile: {
    value: ''
  },
  email: '',
  term_policy: false
}

const registerPhoneSchema = yup.object().shape({
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
  mobile: yup.object().shape({
    value: yup.string().min(12, 'Please enter valid phone number').required('Phone number is required')
  }),
  term_policy: yup.boolean().oneOf([true], 'Please accept policy')

  // mobile: yup.number().nullable().typeError('Please enter phone number').required('Please enter phone number')
})

const RegisterWithMobile = ({ style }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  // ** States
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(registerPhoneSchema)
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = methods

  const onSubmit = data => {
    const { first_name, last_name, email, mobile } = data

    const registrationData = {
      // email: email,
      first_name: first_name,
      last_name: last_name,
      mobile: mobile.value.slice(mobile.country.dialCode.length),
      mobile_country_code: mobile.country.dialCode,
      login_type: 'mobile' // email or mobile
    }

    // Post data
    dispatch(registerWithMobile(registrationData)).then(res => {
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
            <div className='number_field_div'>
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
            </div>
          </Form.Group>

          {/* <Form.Group className='mb-3'>
            <Form.Label className={`${style.field_label_title}`}>Email</Form.Label>
            <Form.Control className={`${style.input_field}`} type='email' placeholder='enter email or mobile' />
          </Form.Group> */}
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

export default RegisterWithMobile
