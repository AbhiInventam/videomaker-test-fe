import React from 'react'
import Features from 'src/views/pages/home/features/Features'
import style from 'src/styles/pages/features/features.module.scss'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import FeatureImg from 'src/assets/images/features-img.png'
import { FaPlay } from 'react-icons/fa'

const FeaturesSec = () => {
  return (
    <div>
      <div className={`${style.common_contains_img_sec} common_padding pb-0`}>
        <Container>
          <Row className='flex_direction_mob'>
            <Col xl={6} md={6} className='align-items-center d-flex'>
              <div className={`${style.contains_main_div} padding_right_space`}>
                <div className='common_heading_div'>
                  <h4 className='mb-3'>Easy way to become a Pro Video Editor</h4>
                </div>
                <p className='common_para'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.
                  Aliquam venenatis ultrices felis, nec aliquam velit elementum sit amet. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.
                </p>
                <p className='common_para'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.
                  Aliquam venenatis ultrices felis, nec aliquam velit elementum sit amet. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.
                </p>
                <div className={`${style.banner_multi_btn_div}`}>
                  <a href='#get' className='btn btn_common'>
                    Try Free Trial
                  </a>
                  <div className={`${style.how_it_works_btn}`}>
                    <span className={`${style.play_circle_div}`}>
                      <FaPlay />
                    </span>
                    Watch Demo
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={6} md={6} className='d-flex align-items-center'>
              <div>
                <Image src={FeatureImg} alt='Feature Image' className='img-fluid' />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Feature Section */}
      <Features />
    </div>
  )
}

export default FeaturesSec
