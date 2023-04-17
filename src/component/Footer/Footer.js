import React from 'react'
import Image from 'next/image'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import Logo from 'src/assets/images/logo.png'
import style from 'src/styles/component/footer.module.scss'
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaPinterestP } from 'react-icons/fa'
import { ContactUsRoute, FeaturesRoute, HashRoute, HomeRoute, PricingRoute, PrivacyPolicyRoute, TermsServicesRoute } from 'src/utils/constants/routeConstant'

const Footer = () => {
  return (
    <div className={`${style.footer_main_div}`}>
      <div className={`${style.footer_top}`}>
        <Container>
          <Row>
            <Col xl={4} md={4}>
              <div className={`${style.footer_left_sec_div}`}>
                <Nav.Link href={HomeRoute}>
                  <Image src={Logo} alt='Logo' className='img-fluid' />
                </Nav.Link>

                <p className='common_para'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <div className={`${style.social_div}`}>
                  <a href={HashRoute} className={`${style.icon_circle_div}`}>
                    <FaFacebookF />
                  </a>
                  <a href={HashRoute} className={`${style.icon_circle_div}`}>
                    <FaInstagram />
                  </a>
                  <a href={HashRoute} className={`${style.icon_circle_div}`}>
                    <FaLinkedinIn />
                  </a>
                  <a href={HashRoute} className={`${style.icon_circle_div}`}>
                    <FaTwitter />
                  </a>
                  <a href={HashRoute} className={`${style.icon_circle_div}`}>
                    <FaYoutube />
                  </a>
                  <a href={HashRoute} className={`${style.icon_circle_div}`}>
                    <FaPinterestP />
                  </a>
                </div>
              </div>
            </Col>
            <Col xl={8} md={8}>
              <div className={`${style.footer_links_main_div} divider_div`}>
                <Row>
                  <Col xl={4} md={4}>
                    <div className={`${style.footer_link_div} `}>
                      <h6>Address</h6>
                      <p className='common_para'>
                        Lorem ipsum dolor sit amet, <br /> consectetur adipiscing.
                      </p>
                    </div>
                  </Col>
                  <Col xl={4} md={4}>
                    <div className={`${style.footer_link_div} `}>
                      <h6>Email</h6>
                      <p className='common_para'>test@gmail.com</p>
                      <p className='common_para'>abc@gmail.com</p>
                    </div>
                  </Col>
                  <Col xl={4} md={4}>
                    <div className={`${style.footer_link_div} `}>
                      <h6>Phone</h6>
                      <p className='common_para'>+91 56856 65899</p>
                      <p className='common_para'>+91 25898 65968</p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`${style.footer_links_main_div} `}>
                <Row>
                  <Col xl={4} md={4}>
                    <div className={`${style.footer_link_div} `}>
                      <h6>Quicklinks</h6>
                      <a href={HomeRoute} className={`${style.footer_link_text} `}>
                        Home
                      </a>
                      <a href={HashRoute} className={`${style.footer_link_text} `}>
                        Create
                      </a>
                      <a href={FeaturesRoute} className={`${style.footer_link_text} `}>
                        Features
                      </a>
                      <a href={HashRoute} className={`${style.footer_link_text} `}>
                        Resources
                      </a>
                      <a href={PricingRoute} className={`${style.footer_link_text} `}>
                        Pricing
                      </a>
                    </div>
                  </Col>
                  <Col xl={4} md={4}>
                    <div className={`${style.footer_link_div} `}>
                      <h6>Support</h6>
                      <a href={ContactUsRoute} className={`${style.footer_link_text} `}>
                        Contact Us
                      </a>
                      <a href={HashRoute} className={`${style.footer_link_text} `}>
                        Blog
                      </a>
                      <a href={PrivacyPolicyRoute} className={`${style.footer_link_text} `}>
                        Privacy Policy
                      </a>
                      <a href={TermsServicesRoute} className={`${style.footer_link_text} `}>
                        Terms & Services
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${style.footer_bottom} `}>
        <Container>
          <p className='common_para mb-0 text-center'>Copyright © 2023 aplodu</p>
        </Container>
      </div>
    </div>
  )
}

export default Footer
