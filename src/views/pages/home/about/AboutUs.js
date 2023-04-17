import React from 'react'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import style from 'src/styles/pages/home/about.module.scss'
import AboutImg from 'src/assets/images/about-us-img.png'

const AboutUs = () => {
  return (
    <div className={`${style.common_contains_img_sec} common_padding common_bg`}>
      <Container>
        <Row>
          <Col xl={6} md={6} className='d-flex align-items-center'>
            <div className='mob_mb_35'>
              <Image src={AboutImg} alt='Banner image' className='img-fluid' />
            </div>
          </Col>
          <Col xl={6} md={6} className='align-items-center d-flex'>
            <div className={`${style.contains_main_div} padding_left_space`}>
              <div className='common_heading_div'>
                <h4 className='mb-3'>About Us</h4>
              </div>
              <p className='common_para'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              </p>
              <p className='common_para'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              </p>
              <p className='common_para'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              </p>
              <div className='common_btn_main_div'>
                <a href='#get' className='btn btn_common'>
                  Know More
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AboutUs
