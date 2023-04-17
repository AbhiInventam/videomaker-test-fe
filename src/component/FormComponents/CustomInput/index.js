import React from 'react'
import { Form } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'
import propTypes from 'prop-types'
import inputStyle from './CustomInput.module.scss'

const Input = props => {
  const { inputName, inputLabel, inputType, placeholder, styleName } = props
  const methods = useFormContext()
  const { control, formState } = methods
  const { errors } = formState
  const otherProps = {
    as: props.as,
    rows: props.rows,
    style: props.style,
    disabled: props.disabled
  }
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <Form.Group>
            {inputLabel ? <Form.Label>{inputLabel}</Form.Label> : ''}
            <>
              <Form.Control
                type={inputType}
                name={inputName}
                value={value}
                onChange={onChange}
                placeholder={placeholder ? placeholder : ''}
                className={`${errors[inputName] ? 'is-invalid' : ''} ${inputStyle.inputControl} ${
                  styleName ? styleName : ''
                } `}
                isInvalid={!!errors?.inputName}
                {...otherProps}
              />
              <Form.Control.Feedback type='invalid' className={inputStyle.validationText}>
                {errors?.[inputName]?.message}
              </Form.Control.Feedback>
            </>
          </Form.Group>
        )
      }}
    />
  )
}

Input.propTypes = {
  inputName: propTypes.string.isRequired,
  inputType: propTypes.string.isRequired,
  placeholder: propTypes.string,
  styleName: propTypes.string,
  otherProps: propTypes.object
}

Input.defaultValue = {
  inputType: 'text'
}

export default Input
