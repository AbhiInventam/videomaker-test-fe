import { Button, Form, InputGroup, Nav } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Input from 'src/component/FormComponents/CustomInput'
import BtnLoader from 'src/component/Loaders/BtnLoader'

// form validation rules
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^[0-9]*$/, 'Only numbers are allowed')
    .min(6, 'Please enter valid otp')
    .max(6, 'Please enter valid otp')
})
const defaultValues = {
  otp: ''
}

const VerifyOTP = ({ onOTPSubmit, handleResendOTP, isBuffer, setIsBuffer }) => {
  // get functions to build form with useForm() hook
  const methods = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const { handleSubmit, formState, watch } = methods
  const form = watch()

  const submitHandler = () => {
    setIsBuffer({
      ...isBuffer,
      otpBuffer: true
    })
    onOTPSubmit(form)
  }

  const resendOtpHandler = () => {
    setIsBuffer({
      ...isBuffer,
      resendBuffer: true
    })
    handleResendOTP()
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group className='mb-3' controlId='textOtp'>
          <Form.Label>OTP*</Form.Label>
          <Input inputName='otp' inputType='text' placeholder='OTP' />
        </Form.Group>
        <Form.Group className='mb-3 d-flex justify-content-end' controlId='formBasicCheckbox'>
          <Button
            className='login_text me-0 p-0'
            type='button'
            disabled={isBuffer?.resendBuffer}
            onClick={() => resendOtpHandler()}
          >
            {isBuffer?.resendBuffer ? <BtnLoader width='90px' /> : 'Resend OTP'}
          </Button>
        </Form.Group>
        <div className='text-center mt-4'>
          <Button className='btn btn_common' type='submit' disabled={isBuffer?.otpBuffer}>
            {isBuffer?.otpBuffer ? <BtnLoader width='40px' /> : 'Log In'}
          </Button>
        </div>
        {/* </Form.Group> */}
      </Form>
    </FormProvider>
  )
}

export default VerifyOTP
