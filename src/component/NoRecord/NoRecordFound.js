import React from 'react'

const NoRecordFound = ({ className, message }) => {
  return (
    <div className={`no-record-found ${className ? className : ''}`}>
      <p>{message ? message : 'No Record Found'}</p>
    </div>
  )
}

export default NoRecordFound
