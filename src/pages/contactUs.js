import Image from 'next/image'
import React from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import style from 'src/styles/pages/contactus/contact.module.scss'
import ContactImg from 'src/assets/images/contact-img.png'
import { FaMapMarkerAlt } from 'react-icons/fa'

const ContactUs = () => {
  return (
    <div>
      <div className={`${style.contact_us_main_div} common_padding`}>
        <Container>
          <div className={`${style.contact_us_box_div}`}>
            <Row>
              <Col xl={6} md={6}>
                <div className={`${style.contact_us_img}`}>
                  <Image src={ContactImg} alt='Icon' />
                </div>
                <div className={`${style.contact_info_div}`}>
                  <div className={`${style.contact_icon_div}`}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={`${style.contact_contains_div}`}>
                    <h5>Address</h5>
                    <p>
                      Lorem ipsum dolor sit amet, <br /> consectetur adipiscing.
                    </p>
                  </div>
                </div>

                <div className={`${style.contact_info_div}`}>
                  <div className={`${style.contact_icon_div}`}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={`${style.contact_contains_div}`}>
                    <h5>Email</h5>
                    <p>test@gmail.com</p>
                    <p>abc@gmail.com</p>
                  </div>
                </div>

                <div className={`${style.contact_info_div}`}>
                  <div className={`${style.contact_icon_div}`}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={`${style.contact_contains_div}`}>
                    <h5>Phone</h5>
                    <p>+91 56856 65899</p>
                    <p>+91 25898 65968</p>
                  </div>
                </div>
              </Col>
              <Col xl={6} md={6}>
                <Form>
                  <div class='common_heading_div'>
                    <h4 class='mb-3'>Contact Us</h4>
                  </div>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className='label_title_text'>Name</Form.Label>
                    <Form.Control className='input_filed' type='email' placeholder='Enter Name' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className='label_title_text'>Email</Form.Label>
                    <Form.Control className='input_filed' type='email' placeholder='Enter Email' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className='label_title_text'>Subject</Form.Label>
                    <Form.Control className='input_filed' type='email' placeholder='Enter Subject' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label className='label_title_text'>Message</Form.Label>
                    <Form.Control
                      className='textarea_filed'
                      as='textarea'
                      placeholder='Leave a comment here'
                      style={{ height: '100px' }}
                    />
                  </Form.Group>

                  <div className='mt-4'>
                    <Button type='submit' className='btn btn_common'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default ContactUs
