import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerLoader = ({ height, style, size }) => {
  return (
    <div style={style}>
      <Spinner animation='border' role='status' size={size ? size : 'sm'}>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default SpinnerLoader
