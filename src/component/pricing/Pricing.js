import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import style from 'src/styles/component/pricing.module.scss'
import { FaCheck } from 'react-icons/fa'

const Pricing = () => {
  return (
    <div className={`${style.pricing_sec_main_div} common_padding`}>
      <Container>
        <div className='common_heading_div text-center'>
          <h4 className='mb-3'>Pricing Plans</h4>
          <p className='common_para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
          </p>
        </div>
        <div className={`${style.pricing_box_main_div}`}>
          <Row className={`${style.mob_row_space}`}>
            <Col xl={4} md={4}>
              <div className={`${style.pricing_box_div}`}>
                <h5 className={`${style.plan_heading}`}>Great For Groups</h5>
                <p className={`${style.short_msg}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <p className={`${style.pricing_text}`}>$49</p>
                <div className={`${style.pricing_points_div}`}>
                  <ul>
                    <li>
                      <FaCheck className={`${style.icon}`} /> 1 Group Video{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Additional Montage Video{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Event Page{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Event page stays live for one year{' '}
                    </li>
                  </ul>
                </div>
                <div className='common_btn_main_div pricing_btn_div text-center'>
                  <a href='#get' className='btn btn_common'>
                    Basic
                  </a>
                </div>
              </div>
            </Col>
            <Col xl={4} md={4}>
              <div className={`${style.pricing_box_div} popular_package`}>
                <h5 className={`${style.plan_heading}`}>Most Popular</h5>
                <p className={`${style.short_msg}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <p className={`${style.pricing_text}`}>$79</p>
                <div className={`${style.pricing_points_div}`}>
                  <ul>
                    <li>
                      <FaCheck className={`${style.icon}`} /> 1 Group Video{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Additional Montage Video{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Event Page{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Event page stays live for one year{' '}
                    </li>
                  </ul>
                </div>
                <div className='common_btn_main_div pricing_btn_div text-center'>
                  <a href='#get' className='btn btn_common'>
                    premium bundle
                  </a>
                </div>
              </div>
            </Col>
            <Col xl={4} md={4}>
              <div className={`${style.pricing_box_div}`}>
                <h5 className={`${style.plan_heading}`}>Stream Your Event</h5>
                <p className={`${style.short_msg}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <p className={`${style.pricing_text}`}>$249</p>
                <div className={`${style.pricing_points_div}`}>
                  <ul>
                    <li>
                      <FaCheck className={`${style.icon}`} /> LIVE Streaming{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> 1 Montage Video{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> 1 Group Video{' '}
                    </li>
                    <li>
                      <FaCheck className={`${style.icon}`} /> Event Page{' '}
                    </li>
                  </ul>
                </div>
                <div className='common_btn_main_div pricing_btn_div text-center'>
                  <a href='#get' className='btn btn_common'>
                    Live Streaming Event Bundle
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Pricing
