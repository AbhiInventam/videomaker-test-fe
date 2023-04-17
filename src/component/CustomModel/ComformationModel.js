import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Image from 'next/image'
import styles from './ComformationModel.module.scss'
import commonStyle from './CustomModel.module.scss'
import SuccessImage from 'src/assets/images/SuccessImage.png'

const ComformationModel = ({ title, message, showModel, setShowModel, confirmSaveHandle, showConfromationButton }) => {
  const handleClose = () => setShowModel(!showModel)
  const handleSave = () => setConfirmSaveHandle(true)
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
      >
        <Modal.Header closeButton className={commonStyle.modelHeader}></Modal.Header>
        <Modal.Body className={commonStyle.modelBody}>
          <Image
            src={SuccessImage}
            loader={() => SuccessImage}
            unoptimized={true}
            width={0}
            height={96}
            alt='Success'
          />
          <Modal.Title>{title ? title : 'Save Data'}</Modal.Title>
          <p>{message ? message : 'Are you sure?.'}</p>
        </Modal.Body>
        <Modal.Footer className={commonStyle.modelFooter}>
          <div className={styles.inLineButton}>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={confirmSaveHandle}>
              Confirm
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ComformationModel
