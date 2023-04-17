import React from 'react'
import style from 'src/styles/component/auth.module.scss'
import { Button, Container, Form, Nav } from 'react-bootstrap'
import { HashRoute } from 'src/utils/constants/routeConstant'

const OTP = () => {
  return (
    <div>
      <div className={`${style.auth_spacing_div}`}>
        <Container>
          <div className={`${style.auth_modal_main_div}`}>
            <div className={`${style.auth_header_div}`}>
              <h5>Validate OTP</h5>
              <p className=' text-center fs_14'>
                Please enter the OTP (one time password) to verify your account. A Code has been sent to *******179
              </p>
            </div>
            <Form>
              <div className={`${style.otp_main_div}`}>
                <Form.Control className={`${style.input_field}`} type='text' maxlength='1' />
                <Form.Control className={`${style.input_field}`} type='text' maxlength='1' />
                <Form.Control className={`${style.input_field}`} type='text' maxlength='1' />
                <Form.Control className={`${style.input_field}`} type='text' maxlength='1' />
                <Form.Control className={`${style.input_field}`} type='text' maxlength='1' />
                <Form.Control className={`${style.input_field}`} type='text' maxlength='1' />
              </div>
              <div className='text-center mt-4'>
                <Button type='submit' className='btn btn_common'>
                  Verify
                </Button>
              </div>
              <div className='text-center mt-3'>
                <Nav.Link href={HashRoute} className='fs_14'>
                  Not received your code? <span className='link_text'>Resend code</span>
                </Nav.Link>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default OTP
