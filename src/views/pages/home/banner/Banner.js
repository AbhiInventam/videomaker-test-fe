import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import style from 'src/styles/pages/home/banner.module.scss'
import BannerImg from 'src/assets/images/banner-img.png'
import { FaPlay } from 'react-icons/fa'

const Banner = ({ userData }) => {
  return (
    <div className={`${style.banner_sec_main_div}`}>
      <Container>
        <Row>
          <Col xl={12} md={12}>
            <div className={`${style.banner_contains_div}`}>
              <h2>
                So Many <span className='high_light_text'>story's.</span>
              </h2>
              <h2>
                So Many <span className='high_light_text'>memories.</span>
              </h2>
              <p className='small_highlight_text'>Make a video for your milestone in minutes.</p>
              <div className={`${style.banner_multi_btn_div}`}>
                {!userData?.user_id && (
                  <a href='#get' className='btn btn_common'>
                    Get Started
                  </a>
                )}
                <div className={`${style.how_it_works_btn}`}>
                  <span className={`${style.play_circle_div}`}>
                    <FaPlay />
                  </span>
                  Watch Video
                </div>
              </div>
              <div className={`${style.tagline_text_div}`}>
                <p className='common_para mb-0'>✌️ Free to start, no card required</p>
              </div>
            </div>
          </Col>
          <Col xl={12} md={12} className='d-flex align-items-center'>
            <div className={`${style.home_banner_img_div}`}>
              <Image src={BannerImg} alt='Banner image' className='img-fluid' />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Banner
