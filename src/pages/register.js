import React from 'react'
import Image from 'next/image'
import style from 'src/styles/component/auth.module.scss'
import { Button, Col, Container, Form, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import GmailLogo from 'src/assets/images/gmail-icon.png'
import { LoginRoute, OTPRoute } from 'src/utils/constants/routeConstant'
import RegisterWithEmail from 'src/views/pages/register/RegisterWithEmail'
import RegisterWithMobile from 'src/views/pages/register/RegisterWithMobile'

const Register = () => {
  return (
    <div>
      <div className={`${style.auth_spacing_div}`}>
        <Container>
          <div className={`${style.auth_modal_main_div}`}>
            <div className={`${style.auth_header_div}`}>
              <h5>Sign Up</h5>
            </div>
            <div className='auth_tabs_main_div'>
              <Tabs defaultActiveKey='registerWithEmail'>
                <Tab eventKey='registerWithEmail' title='Use Email Address'>
                  <RegisterWithEmail style={style} />
                </Tab>
                <Tab eventKey='registerWithMobile' title='Use Mobile Number'>
                  <RegisterWithMobile style={style} />
                </Tab>
              </Tabs>
            </div>
            <div className={`${style.other_login_div}`}>
              <span className={`${style.small_text}`}> Or Continue with </span>
            </div>
            <Nav.Link href='#' className={`${style.email_signin_btn}`}>
              <Image src={GmailLogo} alt='Icon' /> Sign in with Google
            </Nav.Link>
            <div className='text-center mt-3'>
              <Nav.Link href={LoginRoute} className='fs_14'>
                Already have an account? <span className='link_text'>Sign In</span>
              </Nav.Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Register
