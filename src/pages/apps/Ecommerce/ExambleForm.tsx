import React from "react"
import { Form } from "react-bootstrap"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface FormInputProps {
  label: string
  name: string
  placeholder?: string
  type?: string
  register: UseFormRegister<any>
  errors: FieldErrors
  containerClass?: string
  validation?: any // Validation object for react-hook-form
}

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  errors,
  containerClass,
  validation,
}: FormInputProps) => {
  return (
    <Form.Group className={containerClass}>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        isInvalid={!!errors[name]}
      />

      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

export default FormInput
