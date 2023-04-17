import React from 'react'
import { Form } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'
import propTypes from 'prop-types'
import inputStyle from './CustomSelect.module.scss'

const Select = ({ inputName, inputType, placeholder, options }) => {
  const methods = useFormContext()
  const { control, formState } = methods
  const { errors } = formState

  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          // <Form.Group>
          // {/* {inputLabel ? <Form.Label>{inputLabel}</Form.Label> : ""} */}
          <>
            <Form.Select
              name={inputName}
              aria-label={placeholder}
              placeholder={placeholder ? placeholder : 'Select'}
              onChange={onChange}
              className={`${inputStyle.selectControl} ${errors[inputName] ? 'is-invalid' : ''}`}
            >
              <option value=''>Select</option>
              {options.map(optionItem => (
                <option value={optionItem.value} key={optionItem.value}>
                  {optionItem.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>{errors?.[inputName]?.message}</Form.Control.Feedback>
          </>
          // </Form.Group>
        )
      }}
    />
  )
}

Select.propTypes = {
  inputName: propTypes.string.isRequired,
  inputType: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
  placeholder: propTypes.string
}

Select.defaultValue = {
  inputType: 'select'
}

export default Select
