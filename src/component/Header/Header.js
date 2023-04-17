import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Logo from 'src/assets/images/logo.png'
import { clearAllLocalStore } from 'src/services/axiosInstance/axiosInstance'
import { resetAuthState } from 'src/store/slices/authSlice'
import {
  DashboardRoute,
  FeaturesRoute,
  HashRoute,
  HomeRoute,
  LoginRoute,
  PricingRoute,
  RegisterRoute
} from 'src/utils/constants/routeConstant'

const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userData = useSelector(({ auth }) => auth.loggedInUser)

  const logoutHandler = () => {
    dispatch(resetAuthState(null))
    clearAllLocalStore()
    router.push(LoginRoute)
  }

  const loginHandler = () => {
    router.push(LoginRoute)
  }

  const dashboardHandler = () => {
    router.push(DashboardRoute)
  }

  const getStartHandler = () => {
    router.push(RegisterRoute)
  }

  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand='lg' className='navbar_div'>
          <Container>
            <Navbar.Brand href={HomeRoute} className='header_logo'>
              <Image src={Logo} alt='Aplodu logo' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href={HashRoute}>Create</Nav.Link>
                <Nav.Link href={FeaturesRoute}>Features</Nav.Link>

                <Nav.Link href={HashRoute}>Resources</Nav.Link>
                <Nav.Link href={PricingRoute}>Pricing</Nav.Link>
              </Nav>
              <Nav>
                {userData?.user_id ? (
                  // <Nav.Link onClick={() => logoutHandler()}>Logout</Nav.Link>
                  <Button className='login_text' onClick={logoutHandler}>
                    Logout
                  </Button>
                ) : (
                  // <Nav.Link href={LoginRoute}>Login</Nav.Link>
                  <Button className='login_text' onClick={loginHandler}>
                    Login
                  </Button>
                )}
                {!userData?.user_id && (
                  <Button className='btn btn_common' onClick={getStartHandler}>
                    Get started
                  </Button>
                )}
                {userData?.user_id && router.pathname !== DashboardRoute && (
                  <Button className='btn btn_common' onClick={dashboardHandler}>
                    Dashboard
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  )
}

export default Header
