import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import style from 'src/styles/pages/home/features.module.scss'
import icon1 from 'src/assets/images/Invite-icon.png'
import icon2 from 'src/assets/images/Record-icon.png'
import icon3 from 'src/assets/images/Personalized-icon.png'
import icon4 from 'src/assets/images/Share-icon.png'
// import icon5 from 'src/assets/images/export-icon.png'
// import icon6 from 'src/assets/images/upload-icon.png'

const Features = () => {
  return (
    <div className={`${style.features_sec_main_div} common_padding`}>
      <Container>
        {/* <div className='common_heading_div text-center'>
          <h4 className='mb-3'>Features</h4>
          <p className='common_para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
          </p>
        </div> */}
        <div className={`${style.features_div}`}>
          <Row className={`${style.row_gap}`}>
            <Col xl={3} md={6}>
              <div className={`${style.features_box_div}`}>
                <div className={`${style.icon_div}`}>
                  <Image src={icon1} alt='Icon' className='img-fluid'/>
                </div>
                <h6 className={`${style.card_heading}`}>Invite</h6>
                <p className={`${style.card_para}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s
                </p>
              </div>
            </Col>
            <Col xl={3} md={6}>
              <div className={`${style.features_box_div}`}>
                <div className={`${style.icon_div}`}>
                <Image src={icon2} alt='Icon' className='img-fluid'/>
                </div>
                <h6 className={`${style.card_heading}`}>Record</h6>
                <p className={`${style.card_para}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s
                </p>
              </div>
            </Col>
            <Col xl={3} md={6}>
              <div className={`${style.features_box_div}`}>
                <div className={`${style.icon_div}`}>
                <Image src={icon3} alt='Icon' className='img-fluid'/>
                </div>
                <h6 className={`${style.card_heading}`}>Personalized</h6>
                <p className={`${style.card_para}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s
                </p>
              </div>
            </Col>
            <Col xl={3} md={6}>
              <div className={`${style.features_box_div}`}>
                <div className={`${style.icon_div}`}>
                <Image src={icon4} alt='Icon' className='img-fluid'/>
                </div>
                <h6 className={`${style.card_heading}`}>Share</h6>
                <p className={`${style.card_para}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s
                </p>
              </div>
            </Col>
            {/* <Col xl={3} md={3}>
              <div className={`${style.features_box_div}`}>
                <div className={`${style.icon_div}`}>
                <Image src={icon5} alt='Icon' className='img-fluid'/>
                </div>
                <h6 className={`${style.card_heading}`}>Export</h6>
                <p className={`${style.card_para}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s
                </p>
              </div>
            </Col> */}
            {/* <Col xl={3} md={3}>
              <div className={`${style.features_box_div}`}>
                <div className={`${style.icon_div}`}>
                <Image src={icon6} alt='Icon' className='img-fluid'/>
                </div>
                <h6 className={`${style.card_heading}`}>Upload</h6>
                <p className={`${style.card_para}`}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s
                </p>
              </div>
            </Col> */}

          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Features
