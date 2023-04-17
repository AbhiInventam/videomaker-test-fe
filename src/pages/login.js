import React from 'react'
import Image from 'next/image'
import style from 'src/styles/component/auth.module.scss'
import { Button, Container, Form, Nav, Tab, Tabs } from 'react-bootstrap'
import GmailLogo from 'src/assets/images/gmail-icon.png'
import { HashRoute, RegisterRoute } from 'src/utils/constants/routeConstant'
import LoginWithEmail from 'src/views/pages/login/LoginWithEmail'
import LoginWithMobile from 'src/views/pages/login/LoginWithMobile'

const Login = () => {
  return (
    <div>
      <div className={`${style.auth_spacing_div}`}>
        <Container>
          <div className={`${style.auth_modal_main_div}`}>
            <div className={`${style.auth_header_div}`}>
              <h5>Sign In</h5>
            </div>

            <div className='auth_tabs_main_div'>
              <Tabs defaultActiveKey='home'>
                {/* Login With Email */}
                <Tab eventKey='home' title='Login with Email'>
                  <LoginWithEmail style={style} />
                </Tab>

                {/* Login With Mobile */}
                <Tab eventKey='mobile' title='Login with Mobile'>
                  <LoginWithMobile style={style} />
                </Tab>
              </Tabs>
            </div>

            <div className={`${style.other_login_div}`}>
              <span className={`${style.small_text}`}> Or Continue with </span>
            </div>
            <Nav.Link href={HashRoute} className={`${style.email_signin_btn}`}>
              <Image src={GmailLogo} alt='Icon' /> Sign in with Google
            </Nav.Link>
            <div className='text-center mt-3'>
              <Nav.Link href={RegisterRoute} className='fs_14'>
                Don't have an account? <span className='link_text'>Sign Up</span>
              </Nav.Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Login
