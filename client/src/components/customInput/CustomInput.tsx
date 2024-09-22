// CustomInput.tsx
import React, { useState } from 'react'
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'
import './style.scss' // Import the CSS styles

interface CustomInputProps {
  label: string
  type: 'text' | 'email' | 'password' // The allowed types
  name: string
  register: UseFormRegister<FieldValues>
  required?: string // Required validation message
  errors?: FieldErrors<FieldValues> // Field error object from react-hook-form
  inputClass?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  name,
  register,
  required,
  errors,
  inputClass,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="input-container">
      <label htmlFor={name}>
        {label}
        {required && ' *'}
      </label>
      <div>
        <input
          id={name}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          {...register(name, { required })}
          className={`${inputClass} ${errors && errors[name] ? 'error' : ''}`}
        />
        {type === 'password' && (
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        )}
      </div>
      {errors && errors[name] && (
        <p className="error">
          {typeof errors[name]?.message === 'string' ? errors[name]?.message : 'This field is required'}
        </p>
      )}

    </div>
  )
}

export default CustomInput
