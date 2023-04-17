import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import style from 'src/styles/pages/home/contains.module.scss'
import PeopleImg from 'src/assets/images/people-img.png'

const ContainSec = () => {
  return (
    <div className={`${style.banner_sec_main_div} common_padding pb-0`}>
      <Container>
        <Row className='flex_direction_column'>
          <Col xl={5} md={5} className='d-flex align-items-center'>
            <div className='w-100'>
              <div className={`${style.contains_box_div}`}>
                <div className='common_heading_div'>
                  <h4 className='mb-2'>This tool is so awesome !!</h4>
                </div>
                <p className='common_para text-center'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.
                  Aliquam venenatis ultrices felis, nec aliquam velit elementum sit amet. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.{' '}
                </p>
                <p className='common_para text-center'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.
                  Aliquam venenatis ultrices felis, nec aliquam velit elementum sit amet. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Morbi blandit leo in ultrices laoreet.{' '}
                </p>
                <div className='common_btn_main_div text-center'>
                  <a href='#get' className='btn btn_common'>
                    Try free trial
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={7} md={7} className='d-flex align-items-center'>
            <div className={`${style.home_banner_img_div}`}>
              <Image src={PeopleImg} alt='Banner image' className='img-fluid' />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ContainSec
