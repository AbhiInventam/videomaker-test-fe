import React from 'react'
import style from 'src/styles/component/auth.module.scss'
import { Button, Container, Form, Nav } from 'react-bootstrap'
import { LoginRoute } from 'src/utils/constants/routeConstant'

const ForgotPassword = () => {
  return (
    <div>
      <div className={`${style.auth_spacing_div}`}>
        <Container>
          <div className={`${style.auth_modal_main_div}`}>
            <div className={`${style.auth_header_div}`}>
              <h5>Reset Password</h5>
            </div>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label className={`${style.field_label_title}`}>Email or Mobile Number</Form.Label>
                <Form.Control className={`${style.input_field}`} type='email' placeholder='Enter Email' />
              </Form.Group>
              <div className='text-center mt-4'>
                <Button type='submit' className='btn btn_common'>
                  Submit
                </Button>
              </div>
              <div className='text-center mt-3'>
                <Nav.Link href={LoginRoute} className='fs_14'>
                  Already have an account? <span className='link_text'>Sign In</span>
                </Nav.Link>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default ForgotPassword
