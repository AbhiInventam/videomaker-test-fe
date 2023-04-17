import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'next/image'
import commonStyle from './CustomModel.module.scss'
import SuccessImage from '@/assets/images/SuccessImage.png'

const InformationModel = ({ showModel, setShowModel, showConfromationButton, title, subText }) => {
  const handleClose = () => setShowModel(!showModel)
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        contentClassName={commonStyle.modalContent}
        show={showModel}
        onHide={handleClose}
        backdrop='true'
        keyboard={false}
        centered
        backdropClassName={commonStyle.backdrop}
        // backdropClassName="backdrop"
      >
        <Modal.Header closeButton className={commonStyle.modelHeader}></Modal.Header>
        <Modal.Body className={commonStyle.modelBody}>
          <div className='text-center mb-3'>
            <Image
              src={SuccessImage}
              loader={() => SuccessImage}
              unoptimized={true}
              width={0}
              height={100}
              alt='Success'
            />
          </div>

          <Modal.Title className='text-center mb-2'>{title}</Modal.Title>

          <p className='text-center'>{subText}</p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default InformationModel
